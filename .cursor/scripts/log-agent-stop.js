#!/usr/bin/env node

/**
 * Cursor stop hook script.
 *
 * This script reads the stop-hook event payload from stdin (JSON),
 * extracts a concise summary of the last agent interaction if available,
 * and appends a short work-log style entry into `.cursor/logs/YYYY-MM-DD.md`.
 *
 * It is intentionally defensive: if anything goes wrong, it exits 0
 * without blocking the main Cursor action.
 */

const fs = require('fs');
const path = require('path');

function readStdin() {
  return new Promise((resolve) => {
    let data = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (chunk) => {
      data += chunk;
    });
    process.stdin.on('end', () => {
      resolve(data);
    });
  });
}

function getTodayParts() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const hh = String(now.getHours()).padStart(2, '0');
  const min = String(now.getMinutes()).padStart(2, '0');
  return {
    date: `${yyyy}-${mm}-${dd}`,
    time: `${hh}:${min}`,
  };
}

function ensureDirSync(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

async function main() {
  try {
    const raw = await readStdin();
    if (!raw) {
      // Nothing to log.
      process.stdout.write('{"followup_message":"no payload for stop hook"}\n');
      process.exit(0);
      return;
    }

    let event;
    try {
      event = JSON.parse(raw);
    } catch {
      process.stdout.write('{"followup_message":"invalid JSON payload for stop hook"}\n');
      process.exit(0);
      return;
    }

    // Heuristic: extract a short description of the last user request / agent response if available.
    // The exact schema may evolve; we fallback gracefully if fields are missing.
    const meta = event.meta || event; // be liberal
    const lastUserMessage =
      (meta.messages &&
        Array.isArray(meta.messages) &&
        meta.messages.filter((m) => m.role === 'user').slice(-1)[0]?.content) ||
      meta.userInput ||
      '';
    const lastAssistantMessage =
      (meta.messages &&
        Array.isArray(meta.messages) &&
        meta.messages.filter((m) => m.role === 'assistant').slice(-1)[0]?.content) ||
      meta.assistantOutput ||
      '';

    // If nothing meaningful, just skip logging.
    if (!lastUserMessage && !lastAssistantMessage) {
      process.stdout.write('{"followup_message":"nothing to log"}\n');
      process.exit(0);
      return;
    }

    const { date, time } = getTodayParts();
    const workspaceRoot = process.cwd();
    const logsDir = path.join(workspaceRoot, '.cursor', 'logs');
    ensureDirSync(logsDir);

    const logFile = path.join(logsDir, `${date}.md`);

    const header = `# 工作日志 ${date}\n\n`;

    const questionSummary = String(lastUserMessage)
      .replace(/\s+/g, ' ')
      .slice(0, 200);
    const answerSummary = String(lastAssistantMessage)
      .replace(/\s+/g, ' ')
      .slice(0, 300);

    const block =
      `---\n` +
      `### [${time}]\n` +
      `**问题：** ${questionSummary || '（无）'}\n` +
      `**解决：** ${answerSummary || '（无）'}\n` +
      `**涉及文件：** 无\n` +
      `---\n\n`;

    // Append to today's file, creating with header if needed.
    if (!fs.existsSync(logFile)) {
      fs.writeFileSync(logFile, header + block, 'utf8');
    } else {
      fs.appendFileSync(logFile, block, 'utf8');
    }

    process.stdout.write('{"followup_message":"stop hook logged conversation"}\n');
    process.exit(0);
  } catch (err) {
    // Never block Cursor; just report and exit 0.
    try {
      process.stdout.write(
        JSON.stringify({
          followup_message: `stop hook error: ${(err && err.message) || String(err)}`,
        }) + '\n',
      );
    } catch {
      // ignore
    }
    process.exit(0);
  }
}

main();


---
name: conversation-logger
description: Logs each Cursor agent execution by appending a brief entry with timestamp, request, and response summary to a per-day markdown log file under .cursor/logs. Use whenever handling a user query in this repository and conversation logging is desired.
---

# Conversation Logger

## Instructions

- **Goal**: Keep a lightweight, append-only log of agent activity for this project so the user can review what the agent did and why.

### When to use this skill

- The current workspace is this repository.
- The user has asked to "record", "log", or "trace" conversations, or explicitly mentioned a "Cursor hook" for logging.
- By default, assume conversation logging is desired in this project unless the user asks to disable it.

### What to log

参考 `.kiro/hook/log-qa-entry.kiro.hook` 的风格，对每次 **有实际工作产出** 的对话（分析 / 决策 / 修改代码或配置）创建 **一条结构化日志**。  
同一主题的多轮对话尽量合并成一条记录。

每条记录使用统一块格式（中间用分隔线 `---` 分开）：

```markdown
---
### [当前时间 HH:MM]
**问题：** 用一句话概括这次用户提出的核心问题或需求
**解决：** 用 2–3 句话概括你做了什么、给出了什么方案或改动
**涉及文件：** 列出这次真正修改或重点查看过的关键文件（没有则写“无”，只写必要的相对路径或文件名）
---
```

说明：

- `HH:MM`：本地时间，24 小时制，到分钟即可（不必精确到秒）。
- 日志块之间用 `---` 分隔，方便快速扫一眼看到每次工作。
- 如果本次对话只是闲聊、确认一句话，或没有任何实质性动作，可以选择**不写入**日志，避免噪音。

Avoid:
- Copying large code blocks into the log.
- Including secrets, environment variables, tokens, or passwords.
- Storing raw `.env` content or other sensitive configuration details.

### Where to log

- Use one markdown file **per day** under `.cursor/logs/`, named by date:
  - Example: `.cursor/logs/2026-02-17.md`
- If today’s log file does not exist, create it with:
  - A top-level heading `# 工作日志 YYYY-MM-DD`（使用当天日期，例如 `# 工作日志 2026-02-17`）。
  - 一个空行。

Desired structure for a daily file (append entries at the end):

```markdown
# 工作日志 2026-02-17

---
### [10:23]
**问题：** 根据新设计重构首页 Hero 区
**解决：** 更新布局、文案与样式以匹配新设计稿，并保持现有接口不变
**涉及文件：** HeroSection.vue, xingkou-home.scss
---
```

### How to write entries

1. **Check for today's log file**
   - Derive today’s date in `YYYY-MM-DD` format (best-effort, based on current local date).
   - Compose the path `.cursor/logs/YYYY-MM-DD.md`.
   - If the file does not exist, create it with:
     - A top-level heading `# 工作日志 YYYY-MM-DD`（用当天日期替换）。
     - An empty line after the heading.

2. **Append a new entry**
   - 按「What to log」中的块格式，构造一个新的日志块，**整体追加到文件末尾**。
   - 不要随意改写或重排旧记录，除非是为了对齐格式或纠正明显错误。
   - 保持内容简洁，重点写“做了什么”和“影响到哪里”，避免长篇大论。

3. **Privacy and security**
   - Redact or generalize any sensitive values:
     - For example, instead of `"API key sk-..."`, write `"API key (redacted)"`.
   - Never log full secrets from `.env` or other credential files.

4. **Performance considerations**
   - Keep the log file reasonably small:
     - Avoid adding detailed stack traces or very long explanations.
     - Summarize repetitive tasks instead of logging each trivial step.

## Examples

### Example 1: Simple refactor

Log entry:

- `2026-02-17T10:23` — Refactored home page hero section per design update. — Updated layout, typography, and CTA styles.
  - Files: HeroSection.vue, xingkou-home.scss
  - Notes: Follow-up to add responsive tweaks for mobile.

### Example 2: Dependency update

- `2026-02-17T11:05` — Updated Element Plus to latest minor version. — Adjusted import paths and fixed a breaking change in form components.
  - Files: main.ts, LoginModal.vue
  - Notes: User should run `npm install` before next build.


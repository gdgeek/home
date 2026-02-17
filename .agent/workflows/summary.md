---
description: Summarize the conversation when user says /summary or asks for a summary
---

# Conversation Summary Workflow

When the user requests a summary (e.g., `/summary`, "总结一下", "做个总结"), append a work log entry to `.kiro/work-log/raw-YYYY-MM-DD.md`.

## Steps

1. Determine today's date (from system context) in YYYY-MM-DD format
2. Check if `.kiro/work-log/raw-YYYY-MM-DD.md` exists
   - If not, create it with header: `# 工作日志 YYYY-MM-DD`
3. Append the following entry to the end of the file:

```
---
### [当前时间 HH:MM]
**问题：** （用一句话概括用户提出的问题或需求）
**解决：** （用 2-3 句话概括做了什么来解决）
**涉及文件：** （列出修改过的关键文件，没有则写"无"）
---
```

## Rules

- 直接追加到文件末尾，不要覆盖已有内容
- 如果本次对话只是闲聊或没有实质性工作，就不需要记录
- 保持简洁，不要写太多
- 【安全要求】严禁在日志中记录任何敏感信息，包括但不限于：API Key、密码、Token、Secret、数据库凭证、个人隐私信息。如果对话中涉及这些内容，一律用 [已脱敏] 替代，只记录操作行为本身
- 使用中文记录

---
description: Git commit and push workflow - remind user to disable proxy before pushing
---

# Git Push Workflow

1. Stage and commit changes with a descriptive commit message using `git add -A && git commit -m "..."`
2. **⚠️ NEVER run `git push` yourself.** Instead, notify the user that the commit is ready and remind them to:
   - Turn off their proxy/VPN
   - Run `git push` manually
3. List the changes included in the commit for the user's reference

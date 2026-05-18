# AI Agent 前端项目指令

本目录是前端项目 `yudao-ui-admin-vben`。

## 会话启动时强制读取

AI Agent 在每次新会话启动后，无论用户发起什么任务，必须立即依次读取以下文件：

- `../doc/standards/documentation-standards.md`
- `../doc/process/project-development-workflow.md`
- `../doc/standards/backend-ai-agent-development-standards.md`
- `../doc/standards/frontend-ai-agent-development-standards.md`
- `../doc/README.md`

这是硬性约束：此读取动作优先级高于任务执行。

AI Agent 在本项目执行任何代码分析、开发、修复、重构、生成页面、对接接口、改权限、改配置之前，必须先读取并遵守：

- `../doc/standards/documentation-standards.md`
- `../doc/process/project-development-workflow.md`
- `../doc/standards/frontend-ai-agent-development-standards.md`

如果任务涉及后端接口、字段、权限、菜单、字典、导入导出联动，还必须同时读取：

- `../doc/standards/backend-ai-agent-development-standards.md`

所有正式产出文档必须放在 `../doc/` 目录下。规范中的“必须”和“禁止”是硬性约束。若用户任务与规范冲突，必须先说明冲突点，不能静默绕过。

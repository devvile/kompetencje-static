# Agent Execution Rules — Kompetencje.ai Workspace

## 🚨 MANDATORY AGENT SESSION PROTOCOL

1. **SESSION INITIALIZATION REQUIREMENT**:
   - **AT THE START OF EVERY SESSION AND AT THE BEGINNING OF ANY TASK**, you MUST read `OVERVIEW.md` located in the project root (`OVERVIEW.md` or `komp-ai/OVERVIEW.md`).
   - Understand the current architecture, components, recent changes, active backlog, and project state BEFORE writing any code or making assumptions.

2. **POST-OPERATION UPDATE REQUIREMENT**:
   - **AFTER EVERY SIGNIFICANT OPERATION**, code edit, component creation, refactoring, or architectural change, you MUST update `OVERVIEW.md`.
   - Record what changed in the "Ostatnie Zmiany w Projekcie" section, update directory structures if files were created or moved, and ensure the status is accurate.

---

<!-- BEGIN:nextjs-agent-rules -->
# Next.js & Framework Rules

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

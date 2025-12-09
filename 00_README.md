# ApsnyTravel `ops/opus` Control Pack

This pack is for Claude Opus 4.5 to act as the senior Next.js/TypeScript engineer for ApsnyTravel. Everything is capsule-first, static, small, and honest.

## How to use (Claude)
- Load `10_system/10_system_instruction.md` then `10_system/11_guardrails.md`.
- Skim context (`20_context/**`), specs (`30_specs/**`), and UI tone.
- Use prompts in `40_prompts/**` to bootstrap, run tasks, create content, and review.
- Rely on capsules in `content/capsules/**`; avoid inventing schema or stack changes.

## Folder map
- `10_system/` — identity + guardrails for Claude.
- `20_context/` — project brief, capsule philosophy, business background.
- `30_specs/` — capsule schema, routes, structure, UI guidelines.
- `40_prompts/` — bootstrap, task, content, review templates.
- `50_examples/` — canonical example capsules for v0.0.0.
- `60_roadmaps/` — v0 and v1 roadmap intent.
- `70_checklists/` — Definition of Done, release, capsule creation.

# Master Bootstrap (start of session)

Use this when Claude begins a fresh session.

1) Load context  
- Read `10_system/10_system_instruction.md` and `10_system/11_guardrails.md`.  
- Skim `20_context/**`, `30_specs/**`, `33_ui_guidelines.md`.  
- Note flagship tour and places from `50_examples/50_example_capsules_index.md`.

2) Restate role and constraints  
- Senior TS/Next.js engineer; capsule-first; static/SSG; no DB/CMS/auth/booking; UI tone per guidelines.

3) Restate task  
- Summarize the user request in 3-7 bullets: scope, files, outputs.

4) Plan  
- Propose 2-6 steps with concrete paths. Use the planning tool unless the task is trivial.

5) Execute  
- Apply bounded edits; keep content in capsules; ensure deep-links/graph targets exist.

6) Self-review  
- Check against guardrails, routes/specs, capsule schema, DoD, release, capsule creation checklist.  
- Validate deep-links and `links[].targetSlug`.

7) Summarize  
- State what changed, files touched, tests run, remaining gaps/TODOs.

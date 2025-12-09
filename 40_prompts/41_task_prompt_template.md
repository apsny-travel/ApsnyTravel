# Task Prompt Template

Use this when starting a concrete task.

1) Goal (from user)  
- Describe the goal in your own words; note constraints (capsule-first, static).

2) Current state  
- Mention relevant files/capsules; note missing data or blockers.

3) Plan (2-6 steps)  
- Reference specific paths (e.g., `app/tours/[slug]/page.tsx`, `content/capsules/places/*.json`, `src/lib/capsules/loader.ts`).

4) Execution  
- Implement step-by-step; keep domain content in capsules; ensure deep-links/graph validity.

5) Review  
- Check against guardrails, routes/specs, schema, DoD, release, capsule creation checklist.  
- Confirm SSG viability and that `[[slug]]` targets exist.

6) Summary  
- What changed, files touched, tests/checks run, open TODOs.

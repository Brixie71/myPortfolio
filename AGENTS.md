# AGENTS.md

## Mission
Work in this repository as a careful junior application developer with a strong software quality assurance mindset.

The project is a **QA-first hybrid portfolio**:
- primary positioning: `Software QA Analyst / QA Engineer`
- supporting positioning: junior application development, especially `PHP`, `Laravel`, `JavaScript`, and `React`

## Repo Context
- Runtime: Node.js + Express
- App shape: Express serves a static portfolio from `public/`
- Tests: `npm test` using Node's built-in test runner
- Main frontend entry: `public/index.html`
- Styles: `public/css/main.css`, `public/css/components.css`, `public/css/pages.css`
- Scripts: `public/js/main.js`, `public/js/navigation.js`, `public/js/sections.js`
- Project detail pages: `public/projects/`
- Reference profile content: `Github-Readme.md`

## Core Working Rules
1. Keep the portfolio recruiter-friendly and easy to scan.
2. Preserve the QA-first positioning in homepage and project copy.
3. **Do not invent experience, certifications, job titles, metrics, or QA artifacts.**
4. Use honest placeholders when information is missing.
5. Prefer small, focused edits over broad rewrites.
6. Keep file structure simple and beginner-friendly.
7. Maintain portable relative asset paths in HTML unless there is a strong reason not to.
8. When changing behavior or structure, test before changing behavior and verify with `npm test`.

## Content Rules
- Write in plain professional English.
- Favor short paragraphs over long autobiographical sections.
- Treat `Github-Readme.md` as a reference source, not as something to automatically mirror into the website.
- Keep claims aligned with real skills and current evidence.
- If a section is future-facing, label it clearly as planned or coming soon.

## Engineering Rules
- Read existing files before editing them.
- Keep Express minimal; do not add backend complexity unless asked.
- Do not add frameworks or dependencies without a clear request.
- Preserve the current separation of:
  - `public/css/`
  - `public/js/`
  - `public/assets/`
  - `public/projects/`
- Prefer deterministic tests for regressions that matter to this site.

## QA Mindset
- Check root cause before fixing presentation bugs.
- Protect against regressions with tests when a change affects behavior, structure, or critical content rules.
- Verify both:
  - local static-file compatibility
  - Express-served compatibility

## Default Task Flow
1. Inspect the relevant files.
2. Identify the smallest valid change.
3. Add or update a test when behavior is changing.
4. Implement the change.
5. Run `npm test`.
6. Report what changed, what was verified, and what still needs real content from the repo owner.

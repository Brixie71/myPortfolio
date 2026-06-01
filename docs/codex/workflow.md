# Codex Workflow For This Repo

## Operating Principle
In this repository, **test before changing behavior** whenever the change affects rendering, structure, asset loading, navigation, or server behavior.

## Standard Workflow
1. Read the relevant files first.
2. Identify the actual problem or requested change.
3. Decide whether the change needs a regression test.
4. Add or update the test first when behavior is changing.
5. Edit the smallest relevant files.
6. Run `npm test`.
7. If needed, run the site locally with `npm start`.
8. Report:
   - files changed
   - reason for change
   - verification result

## Content Workflow
- Keep the portfolio QA-first.
- Keep development language supportive, not dominant.
- Avoid inflated marketing phrases.
- Use placeholders only when clearly labeled.
- Ask for owner-provided data when contact links, certifications, or resume content are missing.

## Frontend Workflow
- Use relative paths in HTML for CSS, JS, images, and linked pages.
- Keep CSS split by responsibility.
- Keep JavaScript minimal and focused on interaction.
- Avoid adding dependencies for simple UI changes.

## Debugging Workflow
- Reproduce first.
- Check whether the issue is caused by:
  - incorrect paths
  - missing assets
  - HTML structure
  - CSS specificity
  - JavaScript behavior
  - Express serving behavior
- Fix the root cause, not only the visual symptom.

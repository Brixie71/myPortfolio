# Theme Drawer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a global light/dark mode system with a lower-right launcher, right-side drawer, switch control, and persisted theme preference across every public page.

**Architecture:** Theme selection is applied through shared CSS variables on the document root. A tiny inline bootstrap sets the initial theme before paint, and a shared JavaScript module injects the launcher and drawer, synchronizes switch state, and persists the selection.

**Tech Stack:** Static HTML, CSS custom properties, vanilla JavaScript modules, Node test runner

---

## File Map

- Modify: `public/index.html`
- Modify: `public/resume.html`
- Modify: `public/projects/java-desktop-project.html`
- Modify: `public/projects/object-detection-thesis.html`
- Modify: `public/projects/qa-case-studies.html`
- Modify: `public/projects/qa-case-study-template.html`
- Modify: `public/css/main.css`
- Modify: `public/js/main.js`
- Create: `public/js/theme.js`
- Modify: `test/portfolio.test.js`

### Task 1: Lock the expected theme integration with tests

**Files:**
- Modify: `test/portfolio.test.js`

- [ ] **Step 1: Write the failing tests**
  - Add assertions that each public HTML page includes:
    - the inline theme bootstrap script marker
    - the shared `main.js` script reference
  - Add assertions that:
    - `public/js/theme.js` exists
    - `public/js/main.js` imports `initTheme`
    - `public/css/main.css` includes `:root[data-theme="dark"]`
    - `public/css/main.css` includes the theme launcher and drawer selectors

- [ ] **Step 2: Run the test suite to verify the new checks fail**

Run: `npm test`
Expected: FAIL in the new theme-related assertions because the theme assets and references do not exist yet.

### Task 2: Add the shared theme bootstrap and runtime

**Files:**
- Modify: `public/index.html`
- Modify: `public/resume.html`
- Modify: `public/projects/java-desktop-project.html`
- Modify: `public/projects/object-detection-thesis.html`
- Modify: `public/projects/qa-case-studies.html`
- Modify: `public/projects/qa-case-study-template.html`
- Modify: `public/js/main.js`
- Create: `public/js/theme.js`

- [ ] **Step 1: Add the inline theme bootstrap to every public page**
  - Insert the same small `<script>` in each page `<head>` before the CSS links.
  - The script reads `localStorage`, falls back to `prefers-color-scheme`, and sets `document.documentElement.dataset.theme`.

- [ ] **Step 2: Add the shared JavaScript entry point to every public page**
  - Keep `./js/main.js` on root pages.
  - Add `../js/main.js` to project pages.

- [ ] **Step 3: Create the theme module**
  - Add `public/js/theme.js` with:
    - theme getters and setters
    - launcher/drawer injection
    - label updates for `Dark mode` and `Light mode`
    - switch synchronization
    - close behavior for backdrop and `Escape`

- [ ] **Step 4: Wire the theme module into the shared entry**
  - Update `public/js/main.js` to import and call `initTheme()`.

- [ ] **Step 5: Run the tests again**

Run: `npm test`
Expected: Theme integration assertions move closer to green, but CSS-specific checks can still fail until the styles exist.

### Task 3: Add theme-aware CSS and drawer layout

**Files:**
- Modify: `public/css/main.css`

- [ ] **Step 1: Convert light-only shared colors into theme-aware variables**
  - Keep the current light palette as the base theme.
  - Add variables for header/footer surfaces, section alternates, elevated panels, and launcher/drawer elements.

- [ ] **Step 2: Add dark-mode overrides**
  - Define `:root[data-theme="dark"]` with dark surface, text, line, shadow, accent, and overlay values.

- [ ] **Step 3: Add the floating launcher and drawer styles**
  - Style the lower-right launcher.
  - Style the backdrop, slide-out drawer, and switch control.
  - Ensure keyboard focus remains visible and mobile spacing remains usable.

- [ ] **Step 4: Run the full test suite**

Run: `npm test`
Expected: PASS

### Task 4: Final verification

**Files:**
- Review only

- [ ] **Step 1: Confirm the homepage still loads through the local server test**

Run: `npm test`
Expected: PASS, including the existing server smoke test.

- [ ] **Step 2: Check the final diff for scope**

Run: `git diff -- public test docs/superpowers`
Expected: Only theme-related page, CSS, JS, test, and design/plan changes are present.

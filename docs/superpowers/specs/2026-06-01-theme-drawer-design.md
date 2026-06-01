# Theme Drawer Design

## Goal

Add a global light/dark theme system to the portfolio with a fixed control that appears on every public page. The site should default to the visitor's system theme until they choose a saved preference.

## UI Shape

- A fixed launcher button appears in the lower-right corner of every page.
- The launcher includes an arrow indicator and a label.
- The launcher label reflects the next action:
  - when the current theme is `light`, the launcher label is `Dark mode`
  - when the current theme is `dark`, the launcher label is `Light mode`
- Clicking the launcher opens a slide-out card from the right side.
- The slide-out card contains:
  - an appearance heading
  - brief guidance about system-default behavior
  - a single switch control for changing themes
  - current-mode status text

## Theme Behavior

- The site uses the current CSS variable palette model as the main theme mechanism.
- Light mode remains the current visual baseline.
- Dark mode is implemented by overriding the shared theme variables on the document root.
- On startup:
  1. use a saved theme from `localStorage` if it exists
  2. otherwise use the visitor's system theme via `prefers-color-scheme`
- Theme changes apply immediately and persist to `localStorage`.
- The active theme also updates the browser `color-scheme` value.

## Architecture

### HTML

- Add a tiny inline bootstrap script in the `<head>` of each public HTML page so the correct theme is applied before the page paints.
- Add the shared JavaScript entry script to every public HTML page so the theme control works everywhere.
- Do not hand-author repeated drawer markup in each page. Inject the shared launcher and drawer once from JavaScript to keep the static pages aligned.

### CSS

- Extend `public/css/main.css` with:
  - shared theme variables for light mode
  - dark-mode variable overrides on `:root[data-theme="dark"]`
  - shared styles for the floating launcher, backdrop, drawer, and theme switch
- Replace current hard-coded light-only background and border colors with theme-aware variables where needed.

### JavaScript

- Add `public/js/theme.js` with:
  - theme lookup helpers
  - theme application and persistence logic
  - launcher/drawer injection
  - launcher label updates
  - drawer open/close behavior
  - escape-key and backdrop close behavior
- Update `public/js/main.js` to initialize the theme module alongside the existing navigation and section behavior.

## Accessibility

- The launcher and close controls must be keyboard reachable.
- The drawer uses `aria-expanded`, `aria-hidden`, and a labelled switch control.
- The current theme state is described in readable text, not only color or switch position.
- Focus styles must remain visible in both themes.

## Scope

In scope:

- homepage
- resume page
- project detail pages
- QA case-study pages
- theme persistence and system-default behavior

Out of scope:

- per-section custom themes
- more than two themes
- user-selectable accent palettes

## Testing

- Add tests that confirm each public HTML page includes the theme bootstrap and the shared JavaScript entry point.
- Add tests that confirm the theme JavaScript module exists and is imported by `main.js`.
- Add tests that confirm dark-theme CSS overrides and theme control selectors exist.
- Run the full `npm test` suite after implementation.

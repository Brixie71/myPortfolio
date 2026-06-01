# Floating Card Reuse Guide

This document explains how to reuse the floating side card pattern from this portfolio in other projects.

The current implementation is used for the theme panel, but the same pattern can be adapted for:

- filters
- quick settings
- account tools
- contextual help
- notifications
- debug controls
- floating action menus

## What this component is

The floating card is a compact UI panel that:

- stays snapped to the right edge of the page
- shows only a small handle when closed
- keeps the handle vertically centered against the visible card
- slides in as a compact panel when opened
- keeps its bottom edge fixed while growing upward as content is added
- caps its height so it respects the same top and bottom viewport margin
- scrolls internally when content exceeds that max height
- keeps the main page layout untouched
- works well for small controls that should stay globally available

In this repo, the implementation lives in:

- [theme.js](D:/BRIX-PORTFOLIO/public/js/theme.js)
- [main.css](D:/BRIX-PORTFOLIO/public/css/main.css)

## Current architecture

The pattern is split into three parts:

1. **Bootstrap**
   - A small inline script in each HTML page sets initial state before the page paints.
   - In this repo that bootstrap is theme-specific, but the floating card pattern itself does not depend on it.

2. **Runtime module**
   - `public/js/theme.js`
   - Injects the floating card markup
   - Handles open/close state
   - Handles button behavior
   - Updates labels and accessibility state

3. **Shared CSS**
   - `public/css/main.css`
   - Positions the card
   - Keeps only the handle visible in the closed state
   - Controls the slide animation
   - Sizes the panel and its contents

## CSS structure

If you want to reuse the current pattern, copy the CSS in this shape and then rename it for your own feature.

```css
.theme-panel {
  position: fixed;
  inset: 0;
  z-index: 1300;
  pointer-events: none;
}

.theme-card {
  --theme-handle-width: 2.35rem;
  --theme-panel-width: min(36.5vw, 19.45rem);
  --theme-panel-offset: max(10vh, 1.5rem);
  position: absolute;
  right: 0;
  bottom: var(--theme-panel-offset);
  display: flex;
  align-items: center;
  width: calc(var(--theme-panel-width) + var(--theme-handle-width));
  overflow: hidden;
  pointer-events: auto;
  transform: translateX(var(--theme-panel-width));
  transition: transform 0.24s ease;
}

.theme-panel.is-open .theme-card {
  transform: translateX(0);
}

.theme-handle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 var(--theme-handle-width);
  width: var(--theme-handle-width);
  height: var(--theme-handle-width);
  border: 1px solid var(--card-border);
  border-right: 0;
  border-radius: 12px 0 0 12px;
  background: var(--surface-strong);
  color: var(--text);
  cursor: pointer;
}

.theme-card-body {
  align-self: flex-end;
  display: grid;
  gap: 0.9rem;
  width: var(--theme-panel-width);
  max-width: calc(100vw - var(--theme-handle-width));
  max-height: calc(100vh - (var(--theme-panel-offset) * 2));
  overflow-y: auto;
  scrollbar-gutter: stable;
  padding: 1rem 1rem 1.08rem;
  border: 1px solid var(--card-border);
  border-right: 0;
  border-radius: 12px 0 0 12px;
  background: var(--surface-elevated);
}

.theme-card-body[aria-hidden="true"] {
  pointer-events: none;
}

.theme-card-title {
  margin: 0;
  font-size: 1.06rem;
}

.theme-mode-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2.45rem;
  width: 100%;
  padding: 0.65rem 0.8rem;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--surface-strong);
  color: var(--text);
}
```

### What each CSS block does

- `.theme-panel`
  - creates a fixed full-screen layer without blocking the page by default
- `.theme-card`
  - controls the slide-in container, the fixed bottom offset, and the centered handle alignment
- `.theme-panel.is-open .theme-card`
  - moves the whole card into view
- `.theme-handle`
  - defines the visible snapped control at the side of the page
- `.theme-card-body`
  - controls the panel width, max height, bottom alignment, upward growth, and internal scrolling
- `.theme-card-body[aria-hidden="true"]`
  - disables interaction while closed
- `.theme-card-title`
  - styles the internal heading
- `.theme-mode-button`
  - styles the primary internal action

## `theme.js` structure

The current implementation mixes:

- floating-card shell behavior
- theme-specific behavior

Here is the current module shape in simplified form:

```js
const STORAGE_KEY = "portfolio-theme";
const DARK_QUERY = "(prefers-color-scheme: dark)";

function getSystemTheme() {}
function getStoredTheme() {}
function getActiveTheme() {}
function getThemeLabel(theme) {}
function applyTheme(theme) {}
function persistTheme(theme) {}

function createThemePanel() {}
function setPanelOpen(panel, isOpen) {}
function updateThemeUi(panel) {}
function bindSystemThemeSync(panel) {}

export function initTheme() {}
```

### What each function is responsible for

- `getSystemTheme()`
  - reads the browser system color preference
- `getStoredTheme()`
  - reads the saved theme from `localStorage`
- `getActiveTheme()`
  - reads the currently applied theme from the document
- `getThemeLabel(theme)`
  - converts theme state into button text such as `Dark mode` or `Light mode`
- `applyTheme(theme)`
  - applies the theme to `document.documentElement`
- `persistTheme(theme)`
  - saves the chosen theme
- `createThemePanel()`
  - injects the floating card markup into the page
- `setPanelOpen(panel, isOpen)`
  - toggles open/closed state, ARIA state, focus target, and arrow direction
- `updateThemeUi(panel)`
  - updates the internal button label for the next theme action
- `bindSystemThemeSync(panel)`
  - keeps the UI in sync with system theme changes if no saved override exists
- `initTheme()`
  - wires everything together and attaches the event handlers

## Recommended generic split

If you want to reuse this pattern in a cleaner way, split it into:

### Generic shell module

```js
function createFloatingCard() {}
function setFloatingCardOpen(card, isOpen) {}
function bindFloatingCardKeyboard(card) {}
```

This part should only know:

- how to render the shell
- how to open and close it
- how to manage ARIA state
- how to move focus

### Feature module

```js
function updateFeatureUi(card) {}
function runFeatureAction() {}
export function initFeatureCard() {}
```

This part should know:

- what title to show
- what button label to show
- what happens when the button is pressed
- what data or settings it reads and writes

## Reuse strategy

There are two good ways to reuse this pattern.

### Option 1: Copy and rename the existing pattern

Best when:

- you want the exact same interaction
- you need a fast starting point
- the new project already uses vanilla JS and CSS

What to do:

1. Paste this CSS shell into your stylesheet, then rename the selectors for your feature:

```css
.theme-panel {
  position: fixed;
  inset: 0;
  z-index: 1300;
  pointer-events: none;
}

.theme-card {
  --theme-handle-width: 2.35rem;
  --theme-panel-width: min(36.5vw, 19.45rem);
  --theme-panel-offset: max(10vh, 1.5rem);
  position: absolute;
  right: 0;
  bottom: var(--theme-panel-offset);
  display: flex;
  align-items: center;
  width: calc(var(--theme-panel-width) + var(--theme-handle-width));
  overflow: hidden;
  pointer-events: auto;
  transform: translateX(var(--theme-panel-width));
  transition: transform 0.24s ease;
}

.theme-panel.is-open .theme-card {
  transform: translateX(0);
}

.theme-handle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 var(--theme-handle-width);
  width: var(--theme-handle-width);
  height: var(--theme-handle-width);
  border: 1px solid var(--card-border);
  border-right: 0;
  border-radius: 12px 0 0 12px;
  background: var(--surface-strong);
  color: var(--text);
  cursor: pointer;
}

.theme-card-body {
  align-self: flex-end;
  display: grid;
  gap: 0.9rem;
  width: var(--theme-panel-width);
  max-width: calc(100vw - var(--theme-handle-width));
  max-height: calc(100vh - (var(--theme-panel-offset) * 2));
  overflow-y: auto;
  scrollbar-gutter: stable;
  padding: 1rem 1rem 1.08rem;
  border: 1px solid var(--card-border);
  border-right: 0;
  border-radius: 12px 0 0 12px;
  background: var(--surface-elevated);
}

.theme-card-body[aria-hidden="true"] {
  pointer-events: none;
}
```

2. Paste this JavaScript shell into your feature module, then keep the open/close logic intact:

```js
function createFeaturePanel() {
  const existingPanel = document.querySelector("[data-feature-panel]");

  if (existingPanel) {
    return existingPanel;
  }

  const panel = document.createElement("div");
  panel.className = "feature-panel";
  panel.dataset.featurePanel = "";
  panel.innerHTML = `
    <aside class="feature-card" data-feature-card>
      <button
        class="feature-handle"
        type="button"
        aria-controls="feature-card-body"
        aria-expanded="false"
        aria-label="Open panel"
        data-feature-handle
      >
        <span aria-hidden="true" data-feature-arrow>&lt;</span>
      </button>
      <div
        class="feature-card-body"
        id="feature-card-body"
        aria-hidden="true"
        data-feature-body
      >
        <h2 class="feature-card-title">Panel Title</h2>
        <button class="feature-action-button" type="button" data-feature-action>
          Primary action
        </button>
      </div>
    </aside>
  `;

  document.body.append(panel);
  return panel;
}

function setFeaturePanelOpen(panel, isOpen) {
  const handle = panel.querySelector("[data-feature-handle]");
  const body = panel.querySelector("[data-feature-body]");
  const actionButton = panel.querySelector("[data-feature-action]");
  const arrow = panel.querySelector("[data-feature-arrow]");

  panel.classList.toggle("is-open", isOpen);
  handle.setAttribute("aria-expanded", String(isOpen));
  handle.setAttribute("aria-label", isOpen ? "Close panel" : "Open panel");
  body.setAttribute("aria-hidden", String(!isOpen));
  actionButton.tabIndex = isOpen ? 0 : -1;
  arrow.textContent = isOpen ? ">" : "<";

  if (isOpen) {
    actionButton.focus();
    return;
  }

  handle.focus();
}

export function initFeaturePanel() {
  const panel = createFeaturePanel();
  const handle = panel.querySelector("[data-feature-handle]");
  const actionButton = panel.querySelector("[data-feature-action]");

  setFeaturePanelOpen(panel, false);

  handle.addEventListener("click", () => {
    const isOpen = panel.classList.contains("is-open");
    setFeaturePanelOpen(panel, !isOpen);
  });

  actionButton.addEventListener("click", () => {
    // Replace this with the real feature action.
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && panel.classList.contains("is-open")) {
      setFeaturePanelOpen(panel, false);
    }
  });
}
```

3. Replace the feature-specific content strings inside the panel markup with your own title and button label:

```html
<h2 class="feature-card-title">Panel Title</h2>
<button class="feature-action-button" type="button" data-feature-action>
  Primary action
</button>
```

Examples:

```html
<h2 class="help-card-title">Help</h2>
<button class="help-action-button" type="button" data-help-action>
  Open guide
</button>
```

```html
<h2 class="filter-card-title">Filters</h2>
<button class="filter-action-button" type="button" data-filter-action>
  Apply filters
</button>
```

4. Replace the action callback with the real behavior for your project:

```js
actionButton.addEventListener("click", () => {
  openHelpModal();
});
```

```js
actionButton.addEventListener("click", () => {
  applyFilters();
});
```

5. Rename the classes and data attributes consistently across CSS, markup, and JavaScript.

Example rename:

- `theme-card` -> `help-card`
- `theme-handle` -> `help-handle`
- `theme-card-body` -> `help-card-body`
- `theme-mode-button` -> `help-action-button`

### Option 2: Extract a generic floating card module

Best when:

- you want to use this pattern more than once
- you want different floating cards in the same project
- you want cleaner separation between layout and feature logic

In that version:

- one generic module handles the panel shell
- feature-specific code provides the title, content, labels, and action behavior

That is the better long-term design if this becomes a reusable internal UI primitive.

## Minimal structure

The pattern needs these parts:

```html
<aside class="floating-card">
  <button
    class="floating-card-handle"
    type="button"
    aria-controls="floating-card-body"
    aria-expanded="false"
    aria-label="Open panel"
  >
    <span aria-hidden="true"><</span>
  </button>

  <div
    class="floating-card-body"
    id="floating-card-body"
    aria-hidden="true"
  >
    <h2 class="floating-card-title">Panel Title</h2>
    <button class="floating-card-action" type="button">Primary action</button>
  </div>
</aside>
```

The current repo injects this structure from JavaScript instead of writing it directly in HTML. That is useful when the panel should exist on many pages without repeating markup.

## Behavior contract

The floating card should behave like this:

- closed state:
  - only the handle is visible
  - the body is off-canvas
  - the body is not interactive
- open state:
  - the full card slides into view
  - the handle stays attached to the card edge
  - the handle stays vertically centered even as the body grows
  - the primary control inside the card can receive focus
- growth behavior:
  - adding more controls increases the card height upward
  - the bottom edge stays fixed in place
  - once the body reaches its max height, the body scrolls internally

The current JS follows that pattern by toggling:

- `panel.classList.toggle("is-open", isOpen)`
- `aria-expanded`
- `aria-hidden`
- focus movement between the handle and the internal button

## Why the current implementation works

The important layout rule is that the whole card moves as one unit.

That prevents the bug where:

- the body disappears first
- the handle keeps animating alone

The stable approach is:

- the outer card translates horizontally
- the body does not run a separate hide animation
- hidden state disables interaction through `aria-hidden` and pointer behavior, not abrupt visual removal
- the handle is centered by the outer card layout
- the body uses `align-self: flex-end` so content growth happens upward
- the card uses a fixed bottom offset and a matching top limit through max height
- the body uses internal scrolling instead of expanding off-screen

## CSS control points

The key sizing variables in this repo are in [main.css](D:/BRIX-PORTFOLIO/public/css/main.css):

- `--theme-handle-width`
- `--theme-panel-width`
- `--theme-panel-offset`

If you reuse the pattern elsewhere, define equivalent variables for your new component.

Typical values to customize:

- handle width
- panel width
- bottom offset
- max height rule
- title size
- inner padding
- button height
- border radius

## Height and overflow behavior

The current pattern is designed so the panel grows upward, not downward.

That is controlled by:

- bottom anchoring on the outer card
- centered alignment on the outer card
- `align-self: flex-end` on the card body
- a max height on the body
- `overflow-y: auto` on the body

The practical effect is:

- with one button, the handle stays centered beside the card
- add one more button, the card gets taller upward
- add several buttons, the card keeps extending upward
- once it hits the viewport height limit, a scrollbar appears inside the card body

This is the safer behavior for reusable floating tools because it keeps the global trigger location stable.

## What to change for a different purpose

### Help panel

Change:

- title to `Help`
- action button to `Open guide`
- click behavior to open a docs modal or navigate to support content

### Filter panel

Change:

- title to `Filters`
- action button to `Apply filters`
- body content to checkboxes, dropdowns, or segmented controls

### Profile tools panel

Change:

- title to `Profile`
- action button to `Manage account`
- body content to profile shortcuts

### Debug panel

Change:

- title to `Debug`
- action button to `Toggle diagnostics`
- body content to environment or feature switches

## Copy checklist

If you are using this guide to move the floating card into another project, use this exact order:

1. Paste this CSS shell into your stylesheet:

```css
.feature-panel {
  position: fixed;
  inset: 0;
  z-index: 1300;
  pointer-events: none;
}

.feature-card {
  --feature-handle-width: 2.35rem;
  --feature-panel-width: min(36.5vw, 19.45rem);
  --feature-panel-offset: max(10vh, 1.5rem);
  position: absolute;
  right: 0;
  bottom: var(--feature-panel-offset);
  display: flex;
  align-items: center;
  width: calc(var(--feature-panel-width) + var(--feature-handle-width));
  overflow: hidden;
  pointer-events: auto;
  transform: translateX(var(--feature-panel-width));
  transition: transform 0.24s ease;
}

.feature-panel.is-open .feature-card {
  transform: translateX(0);
}

.feature-handle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 var(--feature-handle-width);
  width: var(--feature-handle-width);
  height: var(--feature-handle-width);
  border: 1px solid var(--card-border);
  border-right: 0;
  border-radius: 12px 0 0 12px;
  background: var(--surface-strong);
  color: var(--text);
  cursor: pointer;
}

.feature-card-body {
  align-self: flex-end;
  display: grid;
  gap: 0.9rem;
  width: var(--feature-panel-width);
  max-width: calc(100vw - var(--feature-handle-width));
  max-height: calc(100vh - (var(--feature-panel-offset) * 2));
  overflow-y: auto;
  scrollbar-gutter: stable;
  padding: 1rem 1rem 1.08rem;
  border: 1px solid var(--card-border);
  border-right: 0;
  border-radius: 12px 0 0 12px;
  background: var(--surface-elevated);
}

.feature-card-body[aria-hidden="true"] {
  pointer-events: none;
}
```

2. Paste this JavaScript shell into your module:

```js
function createFeaturePanel() {
  const existingPanel = document.querySelector("[data-feature-panel]");

  if (existingPanel) {
    return existingPanel;
  }

  const panel = document.createElement("div");
  panel.className = "feature-panel";
  panel.dataset.featurePanel = "";
  panel.innerHTML = `
    <aside class="feature-card" data-feature-card>
      <button
        class="feature-handle"
        type="button"
        aria-controls="feature-card-body"
        aria-expanded="false"
        aria-label="Open panel"
        data-feature-handle
      >
        <span aria-hidden="true" data-feature-arrow>&lt;</span>
      </button>
      <div
        class="feature-card-body"
        id="feature-card-body"
        aria-hidden="true"
        data-feature-body
      >
        <h2 class="feature-card-title">Panel Title</h2>
        <button class="feature-action-button" type="button" data-feature-action>
          Primary action
        </button>
      </div>
    </aside>
  `;

  document.body.append(panel);
  return panel;
}

function setFeaturePanelOpen(panel, isOpen) {
  const handle = panel.querySelector("[data-feature-handle]");
  const body = panel.querySelector("[data-feature-body]");
  const actionButton = panel.querySelector("[data-feature-action]");
  const arrow = panel.querySelector("[data-feature-arrow]");

  panel.classList.toggle("is-open", isOpen);
  handle.setAttribute("aria-expanded", String(isOpen));
  handle.setAttribute("aria-label", isOpen ? "Close panel" : "Open panel");
  body.setAttribute("aria-hidden", String(!isOpen));
  actionButton.tabIndex = isOpen ? 0 : -1;
  arrow.textContent = isOpen ? ">" : "<";

  if (isOpen) {
    actionButton.focus();
    return;
  }

  handle.focus();
}

export function initFeaturePanel() {
  const panel = createFeaturePanel();
  const handle = panel.querySelector("[data-feature-handle]");
  const actionButton = panel.querySelector("[data-feature-action]");

  setFeaturePanelOpen(panel, false);

  handle.addEventListener("click", () => {
    const isOpen = panel.classList.contains("is-open");
    setFeaturePanelOpen(panel, !isOpen);
  });

  actionButton.addEventListener("click", () => {
    // Replace this with the real feature action.
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && panel.classList.contains("is-open")) {
      setFeaturePanelOpen(panel, false);
    }
  });
}
```

3. Replace this default panel content:

```html
<h2 class="feature-card-title">Panel Title</h2>
<button class="feature-action-button" type="button" data-feature-action>
  Primary action
</button>
```

4. Use one of these replacements:

```html
<h2 class="help-card-title">Help</h2>
<button class="help-action-button" type="button" data-help-action>
  Open guide
</button>
```

```html
<h2 class="filter-card-title">Filters</h2>
<button class="filter-action-button" type="button" data-filter-action>
  Apply filters
</button>
```

5. Replace this placeholder callback:

```js
actionButton.addEventListener("click", () => {
  // Replace this with the real feature action.
});
```

6. Use a real callback like one of these:

```js
actionButton.addEventListener("click", () => {
  openHelpModal();
});
```

```js
actionButton.addEventListener("click", () => {
  applyFilters();
});
```

7. Rename every selector and data attribute so the CSS, markup, and JavaScript all match.

## JavaScript adaptation checklist

If reusing the current `theme.js` logic for another purpose:

1. Rename the selector tokens
2. Rename the content labels
3. Replace the action button callback
4. Keep the open/close logic
5. Keep the `Escape` close behavior
6. Keep the focus handoff logic

The theme-specific parts in the current file are:

- `STORAGE_KEY`
- `getSystemTheme()`
- `getStoredTheme()`
- `applyTheme()`
- `persistTheme()`
- `updateThemeUi()`

Those are feature logic, not floating-card logic.

The reusable panel logic is:

- `createThemePanel()`
- `setPanelOpen()`
- `Escape` key closing
- handle state updates

If you want a truly reusable version, split those into:

- `floating-card.js` for shell behavior
- feature module for the specific action

## Accessibility requirements

Keep these in any reused version:

- handle must be keyboard reachable
- handle must use `aria-expanded`
- panel body must use `aria-hidden`
- handle label must change between open/close states
- focus should move into the card when opened
- focus should return to the handle when closed

Do not rely on the arrow symbol alone to describe state.

## Animation guidance

Good animation here is simple:

- animate only the outer panel position
- keep duration short, around `0.2s` to `0.3s`
- avoid separate fade/hide animation on the body unless you deliberately coordinate it

If you animate body opacity separately, make sure it does not disappear before the panel finishes closing.

For expandable floating cards, keep these rules:

- the outer container owns the slide animation
- the body owns scrolling, not entry/exit visibility timing
- top growth should come from normal content flow, not manual height animation

## Integration checklist

Use this checklist when moving the pattern into another project:

- copy the panel CSS
- copy or extract the panel JS
- rename selectors for the new feature
- replace the title
- replace the button label
- replace the action callback
- verify closed state shows only the handle
- verify open state slides in cleanly
- verify the bottom edge stays fixed while content is added
- verify the card stops growing at the viewport limit
- verify overflow scrolls inside the card body
- verify `Escape` closes the card
- verify keyboard focus remains correct

## Recommended extraction path

If you plan to reuse this pattern more than once, refactor it into:

- `floating-card.css`
- `floating-card.js`
- optional feature modules like:
  - `theme-panel.js`
  - `help-panel.js`
  - `filter-panel.js`

That is the cleanest way to stop feature-specific naming from leaking into shared UI code.

## Summary

Use this floating card when you need a persistent, low-noise control that should stay available without occupying permanent page space.

Copy the current pattern for quick reuse. Extract it into a generic module if more than one project or more than one panel will depend on it.

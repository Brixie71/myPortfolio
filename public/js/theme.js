const STORAGE_KEY = "portfolio-theme";
const DARK_QUERY = "(prefers-color-scheme: dark)";

function getSystemTheme() {
  return window.matchMedia(DARK_QUERY).matches ? "dark" : "light";
}

function getStoredTheme() {
  try {
    const storedTheme = window.localStorage.getItem(STORAGE_KEY);
    return storedTheme === "light" || storedTheme === "dark" ? storedTheme : null;
  } catch (error) {
    return null;
  }
}

function getActiveTheme() {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function getThemeLabel(theme) {
  return theme === "dark" ? "Dark mode" : "Light mode";
}

function applyTheme(theme) {
  const resolvedTheme = theme === "dark" ? "dark" : "light";
  document.documentElement.dataset.theme = resolvedTheme;
  document.documentElement.style.colorScheme = resolvedTheme;
}

function persistTheme(theme) {
  try {
    window.localStorage.setItem(STORAGE_KEY, theme);
  } catch (error) {
    // Ignore storage failures and keep the theme applied for the current session.
  }
}

function createThemePanel() {
  const existingPanel = document.querySelector("[data-theme-panel]");

  if (existingPanel) {
    return existingPanel;
  }

  const panel = document.createElement("div");
  panel.className = "theme-panel";
  panel.dataset.themePanel = "";
  panel.innerHTML = `
    <aside class="theme-card" data-theme-card>
      <button
        class="theme-handle"
        type="button"
        aria-controls="theme-card-body"
        aria-expanded="false"
        aria-label="Open theme panel"
        data-theme-handle
      >
        <span aria-hidden="true" data-theme-arrow>&lt;</span>
      </button>
      <div
        class="theme-card-body"
        id="theme-card-body"
        aria-hidden="true"
        data-theme-body
      >
        <h2 class="theme-card-title">Theme</h2>
        <button class="theme-mode-button" type="button" data-theme-mode-button>Dark mode</button>
      </div>
    </aside>
  `;

  document.body.append(panel);

  return panel;
}

function setPanelOpen(panel, isOpen) {
  const handle = panel.querySelector("[data-theme-handle]");
  const body = panel.querySelector("[data-theme-body]");
  const modeButton = panel.querySelector("[data-theme-mode-button]");
  const arrow = panel.querySelector("[data-theme-arrow]");

  panel.classList.toggle("is-open", isOpen);
  handle.setAttribute("aria-expanded", String(isOpen));
  handle.setAttribute("aria-label", isOpen ? "Close theme panel" : "Open theme panel");
  body.setAttribute("aria-hidden", String(!isOpen));
  modeButton.tabIndex = isOpen ? 0 : -1;
  arrow.textContent = isOpen ? ">" : "<";

  if (isOpen) {
    modeButton.focus();
    return;
  }

  handle.focus();
}

function updateThemeUi(panel) {
  const activeTheme = getActiveTheme();
  const nextTheme = activeTheme === "dark" ? "light" : "dark";
  const modeButton = panel.querySelector("[data-theme-mode-button]");
  const nextThemeLabel = getThemeLabel(nextTheme);

  modeButton.textContent = nextThemeLabel;
  modeButton.setAttribute("aria-label", nextThemeLabel);
}

function bindSystemThemeSync(panel) {
  const mediaQuery = window.matchMedia(DARK_QUERY);

  const handleSystemThemeChange = (event) => {
    if (getStoredTheme()) {
      return;
    }

    applyTheme(event.matches ? "dark" : "light");
    updateThemeUi(panel);
  };

  if (typeof mediaQuery.addEventListener === "function") {
    mediaQuery.addEventListener("change", handleSystemThemeChange);
    return;
  }

  mediaQuery.addListener(handleSystemThemeChange);
}

export function initTheme() {
  const panel = createThemePanel();
  const handle = panel.querySelector("[data-theme-handle]");
  const modeButton = panel.querySelector("[data-theme-mode-button]");

  if (!document.documentElement.dataset.theme) {
    applyTheme(getStoredTheme() || getSystemTheme());
  }

  setPanelOpen(panel, false);
  updateThemeUi(panel);
  bindSystemThemeSync(panel);

  handle.addEventListener("click", () => {
    const isOpen = panel.classList.contains("is-open");
    setPanelOpen(panel, !isOpen);
  });

  modeButton.addEventListener("click", () => {
    const nextTheme = getActiveTheme() === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
    persistTheme(nextTheme);
    updateThemeUi(panel);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && panel.classList.contains("is-open")) {
      setPanelOpen(panel, false);
    }
  });
}

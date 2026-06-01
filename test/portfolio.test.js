const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const projectRoot = path.resolve(__dirname, "..");
const publicDir = path.join(projectRoot, "public");

test("server exports app/startServer and does not hardcode a LAN hostname", () => {
  const serverModule = require("../server");
  const source = fs.readFileSync(path.join(projectRoot, "server.js"), "utf8");

  assert.equal(typeof serverModule.app, "function");
  assert.equal(typeof serverModule.startServer, "function");
  assert.doesNotMatch(source, /192\.168\./);
});

test("homepage is QA-first and links to project detail pages", () => {
  const html = fs.readFileSync(path.join(publicDir, "index.html"), "utf8");

  assert.match(html, /QA Engineer|Software QA Analyst/i);
  assert.match(html, /Selected Projects/i);
  assert.match(html, /Education/i);
  assert.match(html, /projects\/java-desktop-project\.html/i);
  assert.match(html, /projects\/object-detection-thesis\.html/i);
  assert.match(html, /projects\/qa-case-studies\.html/i);
  assert.match(html, /resume\.html/i);
  assert.match(html, /Tech Exposure/i);
  assert.match(html, /qa-case-study-template\.html/i);
});

test("homepage reflects verified profile details from Github-Readme reference", () => {
  const html = fs.readFileSync(path.join(publicDir, "index.html"), "utf8");

  assert.match(html, /Central Luzon, Philippines/i);
  assert.match(html, /jbb7102\.work@gmail\.com/i);
  assert.match(html, /https:\/\/github\.com\/Brixie71/i);
  assert.match(html, /https:\/\/facebook\.com\/jbb\.7102/i);
  assert.match(html, /Junior Backend Developer/i);
  assert.match(html, /Internet of Things|IoT|Arduino/i);
  assert.match(html, /PostgreSQL/i);
  assert.match(html, /Vue/i);
  assert.doesNotMatch(html, /\bSample\b/i);
});

test("html files use portable relative asset paths", () => {
  const htmlFiles = [
    "public/index.html",
    "public/projects/java-desktop-project.html",
    "public/projects/object-detection-thesis.html",
    "public/projects/qa-case-studies.html",
  ];

  htmlFiles.forEach((relativePath) => {
    const html = fs.readFileSync(path.join(projectRoot, relativePath), "utf8");

    assert.doesNotMatch(
      html,
      /(href|src)="\/(css|js|assets|projects)\//i,
      `${relativePath} should use relative paths for local file compatibility`,
    );
  });
});

test("structured asset, css, and js files exist", () => {
  const expectedPaths = [
    "public/assets/images",
    "public/assets/files/jhon-brix-brion-resume.txt",
    "public/assets/files/qa-case-study-template.md",
    "public/css/main.css",
    "public/css/components.css",
    "public/css/pages.css",
    "public/js/main.js",
    "public/js/navigation.js",
    "public/js/sections.js",
    "public/resume.html",
    "public/projects/java-desktop-project.html",
    "public/projects/object-detection-thesis.html",
    "public/projects/qa-case-study-template.html",
    "public/projects/qa-case-studies.html",
  ];

  expectedPaths.forEach((relativePath) => {
    const fullPath = path.join(projectRoot, relativePath);
    assert.ok(fs.existsSync(fullPath), `${relativePath} should exist`);
  });
});

test("qa case study template scaffold includes practical sections", () => {
  const html = fs.readFileSync(
    path.join(projectRoot, "public/projects/qa-case-study-template.html"),
    "utf8",
  );
  const markdownTemplate = fs.readFileSync(
    path.join(projectRoot, "public/assets/files/qa-case-study-template.md"),
    "utf8",
  );

  assert.match(html, /System Under Test/i);
  assert.match(html, /Scope and Objectives/i);
  assert.match(html, /Test Cases/i);
  assert.match(html, /Defects Found/i);
  assert.match(html, /Severity and Priority/i);
  assert.match(html, /Lessons Learned/i);

  assert.match(markdownTemplate, /# QA Case Study Title/i);
  assert.match(markdownTemplate, /## System Under Test/i);
  assert.match(markdownTemplate, /## Defects Found/i);
});

test("section h2 headings use the revised professional copy", () => {
  const homeHtml = fs.readFileSync(path.join(projectRoot, "public/index.html"), "utf8");
  const resumeHtml = fs.readFileSync(path.join(projectRoot, "public/resume.html"), "utf8");

  [
    "Quality assurance first, development context always.",
    "Experience that connects QA, backend work, and systems thinking.",
    "Core skills built through real work, academic projects, and technical documentation.",
    "Technical exposure grouped by how it supports testing, delivery, and product understanding.",
    "Selected work that supports a QA-first profile with practical development context.",
    "A Computer Science foundation that strengthens QA judgment and software understanding.",
    "Open to QA, backend, and quality-focused conversations.",
  ].forEach((heading) => {
    assert.match(homeHtml, new RegExp(heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  });

  [
    "A QA-first profile supported by hands-on development context.",
    "Technical exposure organized for readability and practical hiring relevance.",
    "Computer Science training with application, testing, and systems context.",
  ].forEach((heading) => {
    assert.match(resumeHtml, new RegExp(heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  });
});

test("public pages do not contain patch marker residue", () => {
  const htmlFiles = [
    "public/index.html",
    "public/resume.html",
    "public/projects/java-desktop-project.html",
    "public/projects/object-detection-thesis.html",
    "public/projects/qa-case-studies.html",
    "public/projects/qa-case-study-template.html",
  ];

  htmlFiles.forEach((relativePath) => {
    const html = fs.readFileSync(path.join(projectRoot, relativePath), "utf8");
    assert.doesNotMatch(html, /\*\*\* (Add|Update|Delete) File:/, `${relativePath} contains patch residue`);
  });
});

test("long-form text blocks use justified alignment", () => {
  const componentCss = fs.readFileSync(
    path.join(projectRoot, "public/css/components.css"),
    "utf8",
  );
  const pageCss = fs.readFileSync(
    path.join(projectRoot, "public/css/pages.css"),
    "utf8",
  );

  assert.match(
    pageCss,
    /\.hero-role,\s*\.hero-support,\s*\.summary-copy p\s*\{[^}]*text-align:\s*justify;/s,
  );
  assert.match(
    componentCss,
    /\.project-copy p,\s*\.timeline-card p,\s*\.contact-card p\s*\{[^}]*text-align:\s*justify;/s,
  );
});

test("server serves the homepage and a project detail page", async (t) => {
  const { startServer } = require("../server");
  const server = await startServer({ port: 0 });

  t.after(() => {
    server.close();
  });

  const { port } = server.address();

  const homeResponse = await fetch(`http://127.0.0.1:${port}/`);
  const homeHtml = await homeResponse.text();

  assert.equal(homeResponse.status, 200);
  assert.match(homeResponse.headers.get("content-type") || "", /text\/html/i);
  assert.match(homeHtml, /Software QA Analyst|QA Engineer/i);

  const projectResponse = await fetch(
    `http://127.0.0.1:${port}/projects/java-desktop-project.html`,
  );

  assert.equal(projectResponse.status, 200);
});

test("public pages include shared theme bootstrap and runtime script", () => {
  const htmlFiles = [
    "public/index.html",
    "public/resume.html",
    "public/projects/java-desktop-project.html",
    "public/projects/object-detection-thesis.html",
    "public/projects/qa-case-studies.html",
    "public/projects/qa-case-study-template.html",
  ];

  htmlFiles.forEach((relativePath) => {
    const html = fs.readFileSync(path.join(projectRoot, relativePath), "utf8");

    assert.match(
      html,
      /localStorage\.getItem\("portfolio-theme"\)/,
      `${relativePath} should include the theme bootstrap`,
    );
    assert.match(
      html,
      /<script type="module" src="(?:\.\/|\.\.\/)js\/main\.js"><\/script>/i,
      `${relativePath} should load the shared runtime`,
    );
  });
});

test("theme runtime and compact panel styles are defined", () => {
  const mainJs = fs.readFileSync(path.join(projectRoot, "public/js/main.js"), "utf8");
  const themeJs = fs.readFileSync(path.join(projectRoot, "public/js/theme.js"), "utf8");
  const mainCss = fs.readFileSync(path.join(projectRoot, "public/css/main.css"), "utf8");

  assert.ok(
    fs.existsSync(path.join(projectRoot, "public/js/theme.js")),
    "public/js/theme.js should exist",
  );
  assert.match(mainJs, /import\s+\{\s*initTheme\s*\}\s+from\s+"\.\/theme\.js";/);
  assert.match(mainJs, /initTheme\(\);/);
  assert.match(themeJs, /class="theme-card"/);
  assert.match(themeJs, /class="theme-handle"/);
  assert.match(themeJs, /class="theme-mode-button"/);
  assert.match(themeJs, />Theme</);
  assert.match(themeJs, /&lt;/);
  assert.match(themeJs, /class="theme-handle"[\s\S]*class="theme-card-body"/);
  assert.doesNotMatch(themeJs, /class="theme-switch"/);
  assert.doesNotMatch(themeJs, /class="theme-backdrop"/);
  assert.match(mainCss, /:root\[data-theme="dark"\]/);
  assert.match(mainCss, /\.theme-card\b/);
  assert.match(mainCss, /\.theme-handle\b/);
  assert.match(mainCss, /\.theme-mode-button\b/);
  assert.match(mainCss, /\.theme-card\s*\{[^}]*display:\s*flex;[^}]*align-items:\s*center;[^}]*width:\s*calc\(var\(--theme-panel-width\)\s*\+\s*var\(--theme-handle-width\)\);/s);
  assert.match(mainCss, /\.theme-card\s*\{[^}]*transform:\s*translateX\(var\(--theme-panel-width\)\);/s);
  assert.match(mainCss, /\.theme-card-body\s*\{[^}]*width:\s*var\(--theme-panel-width\);/s);
  assert.match(mainCss, /\.theme-card-body\s*\{[^}]*align-self:\s*flex-end;/s);
  assert.match(mainCss, /--theme-handle-width:\s*2\.35rem/);
  assert.match(mainCss, /--theme-panel-width:\s*min\(36\.5vw,\s*19\.45rem\)/);
  assert.match(mainCss, /--theme-panel-offset:\s*max\(10vh,\s*1\.5rem\)/);
  assert.match(mainCss, /\.theme-card\s*\{[^}]*bottom:\s*var\(--theme-panel-offset\);/s);
  assert.match(mainCss, /\.theme-handle\s*\{[^}]*height:\s*var\(--theme-handle-width\);[^}]*font-size:\s*1\.125rem;/s);
  assert.match(mainCss, /\.theme-card-title\s*\{[^}]*font-size:\s*1\.06rem;/s);
  assert.match(mainCss, /\.theme-mode-button\s*\{[^}]*min-height:\s*2\.45rem;[^}]*padding:\s*0\.65rem\s+0\.8rem;/s);
  assert.match(mainCss, /\.theme-card-body\s*\{[^}]*max-height:\s*calc\(100vh\s*-\s*\(var\(--theme-panel-offset\)\s*\*\s*2\)\);/s);
  assert.match(mainCss, /\.theme-card-body\s*\{[^}]*overflow-y:\s*auto;/s);
  assert.doesNotMatch(mainCss, /\.theme-handle\s*\{[^}]*box-shadow:/s);
  assert.doesNotMatch(mainCss, /\.theme-card-body\s*\{[^}]*box-shadow:/s);
  assert.doesNotMatch(mainCss, /\.theme-card-body\s*\{[^}]*visibility:\s*hidden;/s);
  assert.doesNotMatch(mainCss, /\.theme-card-body\s*\{[^}]*opacity:\s*0;/s);
  assert.match(mainCss, /right:\s*0;/);
});

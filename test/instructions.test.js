const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const projectRoot = path.resolve(__dirname, "..");

function read(relativePath) {
  return fs.readFileSync(path.join(projectRoot, relativePath), "utf8");
}

test("repo instruction files exist and cover the junior dev plus QA role", () => {
  const expectedFiles = [
    "AGENTS.md",
    "AGENT.md",
    "SKILLS.md",
    "docs/codex/project-context.md",
    "docs/codex/workflow.md",
    "docs/codex/prompting-guide.md",
  ];

  expectedFiles.forEach((relativePath) => {
    assert.ok(fs.existsSync(path.join(projectRoot, relativePath)), `${relativePath} should exist`);
  });

  const agents = read("AGENTS.md");
  const agentAlias = read("AGENT.md");
  const skills = read("SKILLS.md");
  const projectContext = read("docs/codex/project-context.md");
  const workflow = read("docs/codex/workflow.md");
  const promptingGuide = read("docs/codex/prompting-guide.md");

  assert.match(agents, /QA-first hybrid portfolio/i);
  assert.match(agents, /do not invent experience/i);
  assert.match(agents, /Express/i);
  assert.match(agentAlias, /AGENTS\.md/i);
  assert.match(skills, /Junior Application Developer/i);
  assert.match(skills, /Software Quality Assurance/i);
  assert.match(projectContext, /public\/css\/main\.css/i);
  assert.match(workflow, /test before changing behavior/i);
  assert.match(promptingGuide, /Good Prompt/i);
});

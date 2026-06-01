# Prompting Guide

Use this guide when asking Codex to update this portfolio repository.

## Good Prompt Patterns

### Good Prompt: content update
`Update the summary section to sound more recruiter-friendly for a QA Engineer role. Keep it honest and under 80 words.`

### Good Prompt: styling change
`Change the project card paragraph text to justified alignment only. Do not affect headings or buttons.`

### Good Prompt: new page
`Create a new project detail page for my Laravel API work and add a card for it on the homepage. Keep the QA-first positioning.`

### Good Prompt: QA artifact addition
`Add a new QA case study page template with sections for scope, test cases, defects found, and lessons learned. Leave placeholder text where I still need to add real details.`

### Good Prompt: verification-focused request
`Fix the broken mobile navigation and add a regression test so the issue does not come back.`

## Weak Prompt Patterns

### Weak Prompt
`Make it better.`

Why it is weak:
- no target area
- no success criteria
- no scope boundary

### Weak Prompt
`Rewrite everything to be more professional.`

Why it is weak:
- too broad
- high risk of unnecessary churn
- likely to overwrite useful structure

## Better Prompt Formula
Use this structure:

`Change <specific area> so that <desired result>. Keep <constraints>. Verify with <test or check>.`

Example:

`Change the contact section so that it includes placeholder cards for email, GitHub, and LinkedIn. Keep the current layout system and verify with npm test.`

## When To Give More Context
Add more context when the task depends on:
- your real work history
- project-specific wording
- exact contact details
- certification names
- real QA artifacts

If the repository does not already contain those facts, Codex should not invent them.

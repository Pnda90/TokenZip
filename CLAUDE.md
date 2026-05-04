# CLAUDE.md — tokenzip

## README is a product artifact

README = product front door. Non-technical people read it to decide if tokenzip worth install. Treat like UI copy.

**Rules for any README change:**

- Readable by non-AI-agent users. If you write "SessionStart hook injects system context," invisible to most — translate it.
- Keep Before/After examples first. That the pitch.
- Install table always complete + accurate. One broken install command costs real user.
- What You Get table must sync with actual code. Feature ships or removed → update table.
- Preserve voice. TokenZip speak in README on purpose. "Power still max." "Cost go down forever." "One zip. That it." — intentional brand. Don't normalize.
- Benchmark numbers from real runs in `benchmarks/` and `evals/`. Never invent or round. Re-run if doubt.
- Adding new agent to install table → add detail block in `<details>` section below.
- Readability check before any README commit: would non-programmer understand + install within 60 seconds?

---

## Project overview

TokenZip makes AI coding agents respond in compressed tokenzip-style prose — cuts ~65-75% output tokens, full technical accuracy. Ships as Claude Code plugin, Codex plugin, Gemini CLI extension, agent rule files for Cursor, Windsurf, Cline, Copilot, 40+ others via `npx skills`.

---

## File structure and what owns what

### Single source of truth files — edit only these

| File | What it controls |
|------|-----------------|
| `skills/tokenzip/SKILL.md` | TokenZip behavior: intensity levels, rules, wenyan mode, auto-clarity, persistence. Only file to edit for behavior changes. |
| `rules/tokenzip-activate.md` | Always-on auto-activation rule body. CI injects into Cursor, Windsurf, Cline, Copilot rule files. Edit here, not agent-specific copies. |
| `skills/tokenzip-commit/SKILL.md` | TokenZip commit message behavior. Fully independent skill. |
| `skills/tokenzip-review/SKILL.md` | TokenZip code review behavior. Fully independent skill. |
| `skills/tokenzip-help/SKILL.md` | Quick-reference card. One-shot display, not a persistent mode. |
| `tokenzip-compress/SKILL.md` | Compress sub-skill behavior. |
| `skills/zipcrew/SKILL.md` | ZipCrew decision guide — when to delegate to tokenzip subagents vs vanilla. Edit only here. |
| `agents/zipcrew-investigator.md` | Read-only locator subagent (haiku). Output contract: `path:line — symbol — note`. |
| `agents/zipcrew-builder.md` | Surgical 1-2 file editor subagent. Refuses 3+ file scope. |
| `agents/zipcrew-reviewer.md` | Diff/file reviewer subagent (haiku). One-line findings with severity emoji. |

### Auto-generated / auto-synced — do not edit directly

Overwritten by CI on push to main when sources change. Edits here lost.

| File | Synced from |
|------|-------------|
| `tokenzip/SKILL.md` | `skills/tokenzip/SKILL.md` |
| `plugins/tokenzip/skills/tokenzip/SKILL.md` | `skills/tokenzip/SKILL.md` |
| `.cursor/skills/tokenzip/SKILL.md` | `skills/tokenzip/SKILL.md` |
| `.windsurf/skills/tokenzip/SKILL.md` | `skills/tokenzip/SKILL.md` |
| `tokenzip.skill` | ZIP of `skills/tokenzip/` directory |
| `.clinerules/tokenzip.md` | `rules/tokenzip-activate.md` |
| `.github/copilot-instructions.md` | `rules/tokenzip-activate.md` |
| `.cursor/rules/tokenzip.mdc` | `rules/tokenzip-activate.md` + Cursor frontmatter |
| `.windsurf/rules/tokenzip.md` | `rules/tokenzip-activate.md` + Windsurf frontmatter |
| `plugins/tokenzip/skills/zipcrew/SKILL.md` | `skills/zipcrew/SKILL.md` |
| `plugins/tokenzip/agents/zipcrew-*.md` | `agents/zipcrew-*.md` |

---

## CI sync workflow

`.github/workflows/sync-skill.yml` triggers on main push when `skills/tokenzip/SKILL.md` or `rules/tokenzip-activate.md` changes.

What it does:
1. Copies `skills/tokenzip/SKILL.md` to all agent-specific SKILL.md locations
2. Rebuilds `tokenzip.skill` as a ZIP of `skills/tokenzip/`
3. Rebuilds all agent rule files from `rules/tokenzip-activate.md`, prepending agent-specific frontmatter (Cursor needs `alwaysApply: true`, Windsurf needs `trigger: always_on`)
4. Commits and pushes with `[skip ci]` to avoid loops

CI bot commits as `github-actions[bot]`. After PR merge, wait for workflow before declaring release complete.

---

## Hook system (Claude Code)

Three hooks in `hooks/` plus a `tokenzip-config.js` shared module and a `package.json` CommonJS marker. Communicate via flag file at `$CLAUDE_CONFIG_DIR/.tokenzip-active` (falls back to `~/.claude/.tokenzip-active`).

```
SessionStart hook ──writes "full"──▶ $CLAUDE_CONFIG_DIR/.tokenzip-active ◀──writes mode── UserPromptSubmit hook
                                                       │
                                                    reads
                                                       ▼
                                              tokenzip-statusline.sh
                                            [TOKENZIP] / [TOKENZIP:ULTRA] / ...
```

`hooks/package.json` pins the directory to `{"type": "commonjs"}` so the `.js` hooks resolve as CJS even when an ancestor `package.json` (e.g. `~/.claude/package.json` from another plugin) declares `"type": "module"`. Without this, `require()` blows up with `ReferenceError: require is not defined in ES module scope`.

All hooks honor `CLAUDE_CONFIG_DIR` for non-default Claude Code config locations.

### `hooks/tokenzip-config.js` — shared module

Exports:
- `getDefaultMode()` — resolves default mode from `TOKENZIP_DEFAULT_MODE` env var, then `$XDG_CONFIG_HOME/tokenzip/config.json` / `~/.config/tokenzip/config.json` / `%APPDATA%\tokenzip\config.json`, then `'full'`
- `safeWriteFlag(flagPath, content)` — symlink-safe flag write. Refuses if flag target or its immediate parent is a symlink. Opens with `O_NOFOLLOW` where supported. Atomic temp + rename. Creates with `0600`. Protects against local attackers replacing the predictable flag path with a symlink to clobber files writable by the user. Used by both write hooks. Silent-fails on all filesystem errors.

### `hooks/tokenzip-activate.js` — SessionStart hook

Runs once per Claude Code session start. Three things:
1. Writes the active mode to `$CLAUDE_CONFIG_DIR/.tokenzip-active` via `safeWriteFlag` (creates if missing)
2. Emits tokenzip ruleset as hidden stdout — Claude Code injects SessionStart hook stdout as system context, invisible to user
3. Checks `settings.json` for statusline config; if missing, appends nudge to offer setup on first interaction

Silent-fails on all filesystem errors — never blocks session start.

### `hooks/tokenzip-mode-tracker.js` — UserPromptSubmit hook

Reads JSON from stdin. Three responsibilities:

**1. Slash-command activation.** If prompt starts with `/tokenzip`, writes mode to flag file via `safeWriteFlag`:
- `/tokenzip` → configured default (see `tokenzip-config.js`, defaults to `full`)
- `/tokenzip lite` → `lite`
- `/tokenzip ultra` → `ultra`
- `/tokenzip wenyan` or `/tokenzip wenyan-full` → `wenyan`
- `/tokenzip wenyan-lite` → `wenyan-lite`
- `/tokenzip wenyan-ultra` → `wenyan-ultra`
- `/tokenzip-commit` → `commit`
- `/tokenzip-review` → `review`
- `/tokenzip-compress` → `compress`

**2. Natural-language activation/deactivation.** Matches phrases like "activate tokenzip", "turn on tokenzip mode", "talk like tokenzip" and writes the configured default mode. Matches "stop tokenzip", "disable tokenzip", "normal mode", "deactivate tokenzip" etc. and deletes the flag file. README promises these triggers, the hook enforces them.

**3. Per-turn reinforcement.** When flag is set to a non-independent mode (i.e. not `commit`/`review`/`compress`), emits a small `hookSpecificOutput` JSON reminder so the model keeps tokenzip style after other plugins inject competing instructions mid-conversation. The full ruleset still comes from SessionStart — this is just an attention anchor.

### `hooks/tokenzip-statusline.sh` — Statusline badge

Reads flag file at `$CLAUDE_CONFIG_DIR/.tokenzip-active`. Outputs colored badge string for Claude Code statusline:
- `full` or empty → `[TOKENZIP]` (orange)
- anything else → `[TOKENZIP:<MODE_UPPERCASED>]` (orange)

Then appends the lifetime-savings suffix (`⛏ 12.4k`) read from `$CLAUDE_CONFIG_DIR/.tokenzip-statusline-suffix` — written by `tokenzip-stats.js` on every `/tokenzip-stats` run. **Default on**; users opt out with `TOKENZIP_STATUSLINE_SAVINGS=0`. The suffix file is absent until `/tokenzip-stats` runs at least once, so fresh installs render no fake number.

Configured in `settings.json` under `statusLine.command`. PowerShell counterpart at `hooks/tokenzip-statusline.ps1` for Windows. Both scripts symlink-refuse and whitelist-validate the flag/suffix file contents — never echo arbitrary bytes.

### Hook installation

**Plugin install** — hooks wired automatically by plugin system.

**Standalone install** — `hooks/install.sh` (macOS/Linux) or `hooks/install.ps1` (Windows) copies hook files into `~/.claude/hooks/` and patches `~/.claude/settings.json` to register SessionStart and UserPromptSubmit hooks plus statusline.

**Uninstall** — `hooks/uninstall.sh` / `hooks/uninstall.ps1` removes hook files and patches settings.json.

---

## Skill system

Skills = Markdown files with YAML frontmatter consumed by Claude Code's skill/plugin system and by `npx skills` for other agents.

### Intensity levels

Defined in `skills/tokenzip/SKILL.md`. Six levels: `lite`, `full` (default), `ultra`, `wenyan-lite`, `wenyan-full`, `wenyan-ultra`. Persists until changed or session ends.

### Auto-clarity rule

TokenZip drops to normal prose for: security warnings, irreversible action confirmations, multi-step sequences where fragment ambiguity risks misread, user confused or repeating question. Resumes after. Defined in skill — preserve in any SKILL.md edit.

### tokenzip-compress

Sub-skill in `tokenzip-compress/SKILL.md`. Takes file path, compresses prose to tokenzip style, writes to original path, saves backup at `<filename>.original.md`. Validates headings, code blocks, URLs, file paths, commands preserved. Retries up to 2 times on failure with targeted patches only. Requires Python 3.10+.

### tokenzip-commit / tokenzip-review

Independent skills in `skills/tokenzip-commit/SKILL.md` and `skills/tokenzip-review/SKILL.md`. Both have own `description` and `name` frontmatter so they load independently. tokenzip-commit: Conventional Commits, ≤50 char subject. tokenzip-review: one-line comments in `L<line>: <severity> <problem>. <fix>.` format.

---

## Agent distribution

How tokenzip reaches each agent type:

| Agent | Mechanism | Auto-activates? |
|-------|-----------|----------------|
| Claude Code | Plugin (hooks + skills) or standalone hooks | Yes — SessionStart hook injects rules |
| Codex | Plugin in `plugins/tokenzip/` plus repo `.codex/hooks.json` and `.codex/config.toml` | Yes on macOS/Linux — SessionStart hook |
| Gemini CLI | Extension with `GEMINI.md` context file | Yes — context file loads every session |
| Cursor | `.cursor/rules/tokenzip.mdc` with `alwaysApply: true` | Yes — always-on rule |
| Windsurf | `.windsurf/rules/tokenzip.md` with `trigger: always_on` | Yes — always-on rule |
| Cline | `.clinerules/tokenzip.md` (auto-discovered) | Yes — Cline injects all .clinerules files |
| Copilot | `.github/copilot-instructions.md` + `AGENTS.md` | Yes — repo-wide instructions |
| Others (Junie, Trae, Warp, Tabnine, Mistral, Qwen, Devin, Droid, ForgeCode, Bob, Crush, iFlow, OpenHands, Qoder, Rovo Dev, Replit, Antigravity, …) | `npx skills add JuliusBrussee/tokenzip -a <profile>` | No — user must say `/tokenzip` each session |

For agents without hook systems, minimal always-on snippet lives in README under "Want it always on?" — keep current with `rules/tokenzip-activate.md`.

**Adding a new agent.** When extending `install.sh` / `install.ps1`:

1. The profile slug must exist in upstream [vercel-labs/skills](https://github.com/vercel-labs/skills). Verify against the README before merging — wrong slugs cause `npx skills add` to fail at runtime, not at install-script load.
2. `install.ps1` is **not** auto-generated. It is a parallel source of truth, hand-kept in sync with `install.sh`. Any new agent row must land in both: `install.sh`'s `PROVIDER_*` arrays + `SKILLS_AGENTS` table, and `install.ps1`'s `$Providers` array. Run `bash install.sh --list` and `pwsh install.ps1 -List` and confirm the two outputs agree.
3. Soft probes (config-dir-only) are fine but tag them with `PROVIDER_SOFT=1` (sh) / `soft=1` (ps1). They render with `(soft)` in `--list` so users know detection is best-effort.

---

## Evals

`evals/` has three-arm harness:
- `__baseline__` — no system prompt
- `__terse__` — `Answer concisely.`
- `<skill>` — `Answer concisely.\n\n{SKILL.md}`

Honest delta = **skill vs terse**, not skill vs baseline. Baseline comparison conflates skill with generic terseness — that cheating. Harness designed to prevent this.

`llm_run.py` calls `claude -p --system-prompt ...` per (prompt, arm), saves to `evals/snapshots/results.json`. `measure.py` reads snapshot offline with tiktoken (OpenAI BPE — approximates Claude tokenizer, ratios meaningful, absolute numbers approximate).

Add skill: drop `skills/<name>/SKILL.md`. Harness auto-discovers. Add prompt: append line to `evals/prompts/en.txt`.

Snapshots committed to git. CI reads without API calls. Only regenerate when SKILL.md or prompts change.

---

## Benchmarks

`benchmarks/` runs real prompts through Claude API (not Claude Code CLI), records raw token counts. Results committed as JSON in `benchmarks/results/`. Benchmark table in README generated from results — update when regenerating.

To reproduce: `uv run python benchmarks/run.py` (needs `ANTHROPIC_API_KEY` in `.env.local`).

---

## Key rules for agents working here

- Edit `skills/tokenzip/SKILL.md` for behavior changes. Never edit synced copies.
- Edit `rules/tokenzip-activate.md` for auto-activation rule changes. Never edit agent-specific rule copies.
- README most important file for user-facing impact. Optimize for non-technical readers. Preserve tokenzip voice.
- Benchmark and eval numbers must be real. Never fabricate or estimate.
- CI workflow commits back to main after merge. Account for when checking branch state.
- Hook files must silent-fail on all filesystem errors. Never let hook crash block session start.
- Any new flag file write must go through `safeWriteFlag()` in `tokenzip-config.js`. Direct `fs.writeFileSync` on predictable user-owned paths reopens the symlink-clobber attack surface.
- Hooks must respect `CLAUDE_CONFIG_DIR` env var, not hardcode `~/.claude`. Same for `install.sh` / `install.ps1` / statusline scripts.

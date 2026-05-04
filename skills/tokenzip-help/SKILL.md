---
name: tokenzip-help
description: >
  Quick-reference card for all tokenzip modes, skills, and commands.
  One-shot display, not a persistent mode. Trigger: /tokenzip-help,
  "tokenzip help", "what tokenzip commands", "how do I use tokenzip".
---

# TokenZip Help

Display this reference card when invoked. One-shot — do NOT change mode, write flag files, or persist anything. Output in tokenzip style.

## Modes

| Mode | Trigger | What change |
|------|---------|-------------|
| **Lite** | `/tokenzip lite` | Drop filler. Keep sentence structure. |
| **Full** | `/tokenzip` | Drop articles, filler, pleasantries, hedging. Fragments OK. Default. |
| **Ultra** | `/tokenzip ultra` | Extreme compression. Bare fragments. Tables over prose. |
| **Wenyan-Lite** | `/tokenzip wenyan-lite` | Classical Chinese style, light compression. |
| **Wenyan-Full** | `/tokenzip wenyan` | Full 文言文. Maximum classical terseness. |
| **Wenyan-Ultra** | `/tokenzip wenyan-ultra` | Extreme. Ancient scholar on a budget. |

Mode stick until changed or session end.

## Skills

| Skill | Trigger | What it do |
|-------|---------|-----------|
| **tokenzip-commit** | `/tokenzip-commit` | Terse commit messages. Conventional Commits. ≤50 char subject. |
| **tokenzip-review** | `/tokenzip-review` | One-line PR comments: `L42: bug: user null. Add guard.` |
| **tokenzip-compress** | `/tokenzip:compress <file>` | Compress .md files to tokenzip prose. Saves ~46% input tokens. |
| **tokenzip-help** | `/tokenzip-help` | This card. |

## Deactivate

Say "stop tokenzip" or "normal mode". Resume anytime with `/tokenzip`.

## Configure Default Mode

Default mode = `full`. Change it:

**Environment variable** (highest priority):
```bash
export TOKENZIP_DEFAULT_MODE=ultra
```

**Config file** (`~/.config/tokenzip/config.json`):
```json
{ "defaultMode": "lite" }
```

Set `"off"` to disable auto-activation on session start. User can still activate manually with `/tokenzip`.

Resolution: env var > config file > `full`.

## More

Full docs: https://github.com/JuliusBrussee/tokenzip

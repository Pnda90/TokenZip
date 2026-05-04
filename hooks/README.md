# TokenZip Hooks

These hooks are **bundled with the tokenzip plugin** and activate automatically when the plugin is installed. No manual setup required.

If you installed tokenzip standalone (without the plugin), you can use `bash hooks/install.sh` to wire them into your settings.json manually.

## What's Included

### `tokenzip-activate.js` — SessionStart hook

- Runs once when Claude Code starts
- Writes `full` to `~/.claude/.tokenzip-active` (flag file)
- Emits tokenzip rules as hidden SessionStart context
- Detects missing statusline config and emits setup nudge (Claude will offer to help)

### `tokenzip-mode-tracker.js` — UserPromptSubmit hook

- Fires on every user prompt, checks for `/tokenzip` commands
- Writes the active mode to the flag file when a tokenzip command is detected
- Supports: `full`, `lite`, `ultra`, `wenyan`, `wenyan-lite`, `wenyan-ultra`, `commit`, `review`, `compress`

### `tokenzip-statusline.sh` / `tokenzip-statusline.ps1` — Statusline badge script

- Reads `~/.claude/.tokenzip-active` and outputs a colored badge
- Shows `[TOKENZIP]`, `[TOKENZIP:ULTRA]`, `[TOKENZIP:WENYAN]`, etc.

## Statusline Badge

The statusline badge shows which tokenzip mode is active directly in your Claude Code status bar.

**Plugin users:** If you do not already have a `statusLine` configured, Claude will detect that on your first session after install and offer to set it up for you. Accept and you're done.

If you already have a custom statusline, tokenzip does not overwrite it and Claude stays quiet. Add the badge snippet to your existing script instead.

**Standalone users:** `install.sh` / `install.ps1` wires the statusline automatically if you do not already have a custom statusline. If you do, the installer leaves it alone and prints the merge note.

**Manual setup:** If you need to configure it yourself, add one of these to `~/.claude/settings.json`:

```json
{
  "statusLine": {
    "type": "command",
    "command": "bash /path/to/tokenzip-statusline.sh"
  }
}
```

```json
{
  "statusLine": {
    "type": "command",
    "command": "powershell -ExecutionPolicy Bypass -File C:\\path\\to\\tokenzip-statusline.ps1"
  }
}
```

Replace the path with the actual script location (e.g. `~/.claude/hooks/` for standalone installs, or the plugin install directory for plugin installs).

**Custom statusline:** If you already have a statusline script, add this snippet to it:

```bash
tokenzip_text=""
tokenzip_flag="$HOME/.claude/.tokenzip-active"
if [ -f "$tokenzip_flag" ]; then
  tokenzip_mode=$(cat "$tokenzip_flag" 2>/dev/null)
  if [ "$tokenzip_mode" = "full" ] || [ -z "$tokenzip_mode" ]; then
    tokenzip_text=$'\033[38;5;172m[TOKENZIP]\033[0m'
  else
    tokenzip_suffix=$(echo "$tokenzip_mode" | tr '[:lower:]' '[:upper:]')
    tokenzip_text=$'\033[38;5;172m[TOKENZIP:'"${tokenzip_suffix}"$']\033[0m'
  fi
fi
```

Badge examples:
- `/tokenzip` → `[TOKENZIP]`
- `/tokenzip ultra` → `[TOKENZIP:ULTRA]`
- `/tokenzip wenyan` → `[TOKENZIP:WENYAN]`
- `/tokenzip-commit` → `[TOKENZIP:COMMIT]`
- `/tokenzip-review` → `[TOKENZIP:REVIEW]`

## How It Works

```
SessionStart hook ──writes "full"──▶ ~/.claude/.tokenzip-active ◀──writes mode── UserPromptSubmit hook
                                              │
                                           reads
                                              ▼
                                     Statusline script
                                    [TOKENZIP:ULTRA] │ ...
```

SessionStart stdout is injected as hidden system context — Claude sees it, users don't. The statusline runs as a separate process. The flag file is the bridge.

## Uninstall

If installed via plugin: disable the plugin — hooks deactivate automatically.

If installed via `install.sh`:
```bash
bash hooks/uninstall.sh
```

Or manually:
1. Remove `~/.claude/hooks/tokenzip-activate.js`, `~/.claude/hooks/tokenzip-mode-tracker.js`, and the matching statusline script (`tokenzip-statusline.sh` on macOS/Linux or `tokenzip-statusline.ps1` on Windows)
2. Remove the SessionStart, UserPromptSubmit, and statusLine entries from `~/.claude/settings.json`
3. Delete `~/.claude/.tokenzip-active`

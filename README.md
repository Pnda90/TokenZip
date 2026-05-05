<p align="center">
  <img src="https://em-content.zobj.net/source/apple/391/high-voltage_26a1.png" width="120" />
</p>

<h1 align="center">TokenZip</h1>

<p align="center">
  <strong>High-performance token compression for AI coding agents.</strong>
</p>

<p align="center">
  <a href="https://github.com/Pnda90/TokenZip/stargazers"><img src="https://img.shields.io/github/stars/Pnda90/TokenZip?style=flat&color=yellow" alt="Stars"></a>
  <a href="https://github.com/Pnda90/TokenZip/commits/main"><img src="https://img.shields.io/github/last-commit/Pnda90/TokenZip?style=flat" alt="Last Commit"></a>
  <a href="LICENSE"><img src="https://img.shields.io/github/license/Pnda90/TokenZip?style=flat" alt="License"></a>
</p>

<p align="center">
  <a href="#overview">Overview</a> •
  <a href="#installation">Installation</a> •
  <a href="#compression-levels">Levels</a> •
  <a href="#specialized-skills">Skills</a> •
  <a href="#benchmarks">Benchmarks</a>
</p>

---

## Overview

**TokenZip** is a professional suite of tools and skills designed to optimize AI agent interactions by reducing output token usage by up to **75%** while maintaining 100% technical accuracy. It supports Claude Code, Gemini CLI, Cursor, Windsurf, and 40+ other AI agents.

By implementing specialized brevity constraints, TokenZip forces models to focus on technical substance rather than conversational filler, leading to faster responses and significant cost savings.

## Before / After

| Normal Response (69 tokens) | TokenZip Optimized (19 tokens) |
|:---|:---|
| "The reason your React component is re-rendering is likely because you're creating a new object reference on each render cycle. When you pass an inline object as a prop, React's shallow comparison sees it as a different object every time. I'd recommend using useMemo." | "New object reference created each render. Inline object prop triggers re-render via shallow comparison. Wrap in `useMemo` to persist reference." |

## Installation

TokenZip features an automated installer that detects your environment and configures the appropriate plugins and rules.

```bash
# macOS / Linux / WSL
curl -fsSL https://raw.githubusercontent.com/Pnda90/TokenZip/main/install.sh | bash

# Windows (PowerShell)
irm https://raw.githubusercontent.com/Pnda90/TokenZip/main/install.ps1 | iex
```

### Supported Agents
- **Native Plugins**: Claude Code, Gemini CLI, Codex.
- **Rulesets**: Cursor, Windsurf, Cline, GitHub Copilot.
- **Universal**: Any agent supporting `npx skills`.

## Compression Levels

| Level | Command | Description |
|:---:|:---|:---|
| **Lite** | `/tokenzip lite` | Removes filler words while maintaining standard grammar. |
| **Full** | `/tokenzip full` | Maximum technical density. Removes articles and redundant phrasing. |
| **Ultra** | `/tokenzip ultra` | Telegraphic mode. Uses abbreviations and optimized technical notation. |

## Specialized Skills

- **`/tokenzip-commit`**: Generates terse, Conventional Commits-compliant messages focusing on "why" over "what".
- **`/tokenzip-review`**: Provides one-line code review findings in a standardized `L<line>: <severity> <issue>. <fix>.` format.
- **`/tokenzip:compress <file>`**: A tool to rewrite documentation and context files into optimized TokenZip prose, reducing input token costs.

## Benchmarks

Measured across real-world technical tasks using the Claude 3.5 Sonnet API.

| Task | Baseline (Tokens) | TokenZip (Tokens) | Reduction |
|:---|---:|---:|---:|
| React Re-render Debugging | 1180 | 159 | **87%** |
| Auth Middleware Refactor | 704 | 121 | **83%** |
| SQL Connection Pooling | 2347 | 380 | **84%** |
| **Average Savings** | **1214** | **294** | **65-75%** |

## Reproduce Benchmarks

Benchmarks are measured real-time against the Claude API. Reported numbers represent actual token consumption from recent runs.

To regenerate benchmarks locally:

```bash
# Setup
python3 -m venv .venv
source .venv/bin/activate
pip install -r benchmarks/requirements.txt

# Run benchmarks (requires ANTHROPIC_API_KEY)
cd benchmarks
python3 run.py

# Results saved to benchmarks/results/*.json
```

**Note:** Token counts may vary ±5% depending on Claude model version and API updates. Results are deterministic for the same model + prompt pair.

## License

This project is licensed under the MIT License.

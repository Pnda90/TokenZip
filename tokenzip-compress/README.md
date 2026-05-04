<p align="center">
  <img src="https://em-content.zobj.net/source/apple/391/high-voltage_26a1.png" width="80" />
</p>

<h1 align="center">tokenzip-compress</h1>

<p align="center">
  <strong>High-efficiency context compression for persistent memory.</strong>
</p>

---

A specialized tool that optimizes project memory files (`CLAUDE.md`, todos, preferences) into compressed prose. This ensures that every new session loads significantly fewer tokens without losing essential project context.

## Overview

Claude and other agents read `CLAUDE.md` and related context files at the start of every session. Large files increase token consumption and costs for every interaction. TokenZip optimizes these files to maintain high technical fidelity while minimizing token overhead.

## Usage

```bash
/tokenzip:compress <filepath>
```

When you run the compression, TokenZip creates:
- **`CLAUDE.md`**: The optimized version (read by the AI for lower token usage).
- **`CLAUDE.original.md`**: The human-readable backup (use this for editing).

After making manual changes to the `.original.md` file, run the command again to re-sync the compressed version.

## Benchmarks

Average results across standard project documentation:

| File Type | Reduction |
|:---|---:|
| Project Preferences | **~60%** |
| Technical Notes | **~53%** |
| Task Lists / TODOs | **~38%** |
| **Average Savings** | **~46%** |

*All headings, code blocks, URLs, and file paths are preserved byte-for-byte during compression.*

## How it Works

The tool follows a multi-stage validation process:
1. **Detection**: Analyzes the file type and structure.
2. **Compression**: The AI generates a condensed version focused on technical substance.
3. **Validation**: Local scripts verify that critical elements (links, code, paths) are unchanged.
4. **Targeted Patching**: If inconsistencies are found, the AI performs surgical fixes rather than a full re-compression.

## Security

`tokenzip-compress` uses subprocess and file I/O operations which may be flagged by some static analysis tools (like Snyk). These are essential for the validation and file management logic. For more details, see [SECURITY.md](./SECURITY.md).

## Installation

This skill is bundled with the main **TokenZip** installation.

---

Part of the [TokenZip Ecosystem](https://github.com/Pnda90/TokenZip).

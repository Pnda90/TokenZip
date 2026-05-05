# Development

Setup locale per sviluppare e testare TokenZip.

## Requisiti

- **Node.js** 18+
- **Python** 3.11+
- **Git** 2.30+

## Setup

```bash
git clone https://github.com/Pnda90/TokenZip.git
cd TokenZip

# Installa dipendenze Node (hooks, MCP server, test)
npm install

# Setup Python per benchmark/evals
python3 -m venv .venv
source .venv/bin/activate  # macOS/Linux
# oppure: .venv\Scripts\activate  # Windows

pip install -r benchmarks/requirements.txt
```

## Run Test

```bash
# Verifica integrità repo (skill sync, file completeness)
python3 tests/verify_repo.py

# Test MCP Shrink server
npm test tests/test_mcp_shrink.js

# Test hook integration
npm test tests/test_hooks.py

# Test TokenZip init
npm test tests/test_tokenzip_init.js

# Test stats
npm test tests/test_tokenzip_stats.js
```

## Rigenera Benchmark

```bash
source .venv/bin/activate
cd benchmarks
python3 run.py

# Output → benchmarks/results/
```

## Struttura

```
skills/
  tokenzip/SKILL.md              ← Logica core TokenZip (lite/full/ultra)
  tokenzip-commit/SKILL.md       ← Skill commit message
  tokenzip-review/SKILL.md       ← Skill code review
  compress/SKILL.md              ← Skill compress file
  
rules/
  tokenzip-activate.md           ← Regole auto-activation IDE

plugins/
  tokenzip/                       ← Plugin Claude Code (sync auto)
  
mcp-servers/
  tokenzip-shrink/              ← MCP server (compress stdout)
  
hooks/
  tokenzip-activate.js          ← CLI hook per status line
```

## Prima di Commit

1. **Vai root del repo**: `cd /Users/gianlucabernardo/Desktop/Gianluca/Progetti/APP\ 📱/TokenZip`
2. **Esegui test**: `python3 tests/verify_repo.py`
3. **Controlla sync**: Se modifichi `skills/tokenzip/SKILL.md`, il CI sincronizzerà automaticamente i duplicati
4. **Format code**: Mantieni stile minimalista (TokenZip ama brevità)

---

> **PRO TIP:** Se lavori sui skill, ricorda: TokenZip è auto-validante. I test controllano che SKILL.md esista in tutte le posizioni attese e sia sincronizzato.

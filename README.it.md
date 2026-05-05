<p align="center">
  <img src="https://em-content.zobj.net/source/apple/391/high-voltage_26a1.png" width="120" />
</p>

<h1 align="center">TokenZip</h1>

<p align="center">
  <strong>Ottimizzazione e compressione dei token ad alte prestazioni per agenti AI.</strong>
</p>

<p align="center">
  <a href="#panoramica">Panoramica</a> •
  <a href="#installazione">Installazione</a> •
  <a href="#livelli-di-compressione">Livelli</a> •
  <a href="#skill-specializzate">Skill</a> •
  <a href="#benchmark">Benchmark</a>
</p>

---

## Panoramica

**TokenZip** è una suite professionale di strumenti e skill progettata per ottimizzare le interazioni con gli agenti AI (come Claude, GPT e Gemini), riducendo l'utilizzo dei token di output fino al **75%** senza compromettere l'accuratezza tecnica.

Implementando vincoli di brevità specializzati, TokenZip spinge i modelli a concentrarsi sulla sostanza tecnica anziché sui riempitivi conversazionali, garantendo risposte più rapide e una significativa riduzione dei costi.

> **Nota:** TokenZip è stato ricreato per la comunità italiana, adattando i concetti di caveman per sviluppatori che preferiscono documentazione e interazioni 100% in italiano. Questo progetto mantiene la qualità professionale dello standard internazionale.

## Prima / Dopo

| Risposta Standard (69 token) | Risposta TokenZip (19 token) |
|:---|:---|
| "La ragione per cui il tuo componente React si sta re-renderizzando è probabilmente dovuta al fatto che stai creando un nuovo riferimento all'oggetto ad ogni ciclo di render. Quando passi un oggetto inline come prop, la comparazione di React lo vede come un oggetto diverso." | "Nuovo riferimento oggetto creato ad ogni render. Le prop oggetto inline attivano il re-render tramite comparazione shallow. Avvolgi in `useMemo` per persistere il riferimento." |

## Installazione

TokenZip dispone di un installer automatizzato che rileva il tuo ambiente e configura i plugin e le regole necessarie.

```bash
# macOS / Linux / WSL
curl -fsSL https://raw.githubusercontent.com/Pnda90/TokenZip/main/install.sh | bash

# Windows (PowerShell)
irm https://raw.githubusercontent.com/Pnda90/TokenZip/main/install.ps1 | iex
```

### Agenti Supportati
- **Plugin Nativi**: Claude Code, Gemini CLI, Codex.
- **Regole IDE**: Cursor, Windsurf, Cline, GitHub Copilot.
- **Universale**: Qualsiasi agente che supporti `npx skills`.

## Livelli di Compressione

| Livello | Comando | Descrizione |
|:---:|:---|:---|
| **Lite** | `/tokenzip lite` | Rimuove i riempitivi mantenendo una grammatica standard. |
| **Full** | `/tokenzip full` | Densità tecnica massima. Rimuove articoli e frasi ridondanti. |
| **Ultra** | `/tokenzip ultra` | Modalità telegrafica. Utilizza abbreviazioni e notazioni tecniche ottimizzate. |

## Skill Specializzate

- **`/tokenzip-commit`**: Genera messaggi di commit concisi conformi allo standard Conventional Commits.
- **`/tokenzip-review`**: Fornisce feedback sulla revisione del codice in un formato standardizzato su singola riga.
- **`/tokenzip:compress <file>`**: Strumento per riscrivere documentazione e file di contesto in stile TokenZip, riducendo i costi dei token di input.

## Benchmark

Misurati su compiti tecnici reali utilizzando l'API Claude 3.5 Sonnet.

| Task | Baseline (Token) | TokenZip (Token) | Riduzione |
|:---|---:|---:|---:|
| React Re-render Debugging | 1180 | 159 | **87%** |
| Auth Middleware Refactor | 704 | 121 | **83%** |
| SQL Connection Pooling | 2347 | 380 | **84%** |
| **Risparmio Medio** | **1214** | **294** | **65-75%** |

## Riproduci Benchmark

I benchmark sono misurati in tempo reale rispetto all'API Claude. I numeri riportati rappresentano il consumo di token effettivo da esecuzioni recenti.

Per rigenerare i benchmark localmente:

```bash
# Setup
python3 -m venv .venv
source .venv/bin/activate
pip install -r benchmarks/requirements.txt

# Esegui benchmark (richiede ANTHROPIC_API_KEY)
cd benchmarks
python3 run.py

# Risultati salvati in benchmarks/results/*.json
```

**Nota:** I conteggi di token possono variare ±5% a seconda della versione del modello Claude e degli aggiornamenti dell'API. I risultati sono deterministici per la stessa coppia model + prompt.

## Licenza

Questo progetto è distribuito sotto Licenza MIT.

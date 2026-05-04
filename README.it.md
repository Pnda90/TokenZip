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

## Licenza

Questo progetto è distribuito sotto Licenza MIT.

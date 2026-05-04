<p align="center">
  <img src="https://em-content.zobj.net/source/apple/391/high-voltage_26a1.png" width="120" />
</p>

<h1 align="center">tokenzip-it</h1>

<p align="center">
  <strong>perché usare molti token quando pochi bastano</strong>
</p>

<p align="center">
  <a href="#prima--dopo">Prima / Dopo</a> •
  <a href="#livelli-intensità">Livelli</a> •
  <a href="#skill-tokenzip">Skill</a> •
  <a href="#benchmark">Benchmark</a>
</p>

---

Una variante italiana di [tokenzip](https://github.com/JuliusBrussee/tokenzip), una skill per [Claude Code](https://docs.anthropic.com/en/docs/claude-code) e altri agenti che fa parlare l'IA come TokenZip — tagliando **~75% dei token di output** senza perdere precisione tecnica. Adattata per la lingua italiana, con trigger specifici e regole grammaticali ottimizzate.

## Prima / Dopo

<table>
<tr>
<td width="50%">

### 🗣️ Claude Normale (74 token)

> "Il motivo per cui il tuo componente React sta facendo re-render è probabilmente perché stai creando un nuovo riferimento oggetto ad ogni ciclo di render. Quando passi un oggetto inline come prop, la comparazione shallow di React lo vede come un oggetto diverso ogni volta, il che attiva il re-render. Ti consiglierei di usare useMemo per memorizzare l'oggetto."

</td>
<td width="50%">

### ⚡ TokenZip Claude (21 token)

> "Nuovo ref oggetto ogni render. Prop oggetto inline = nuovo ref = re-render. Avvolgi in `useMemo`."

</td>
</tr>
<tr>
<td>

### 🗣️ Claude Normale

> "Certamente! Sarei felice di aiutarti. Il problema che stai riscontrando è molto probabilmente causato dal tuo middleware di autenticazione che non convalida correttamente la scadenza del token. Lasciami dare un'occhiata e suggerire una correzione."

</td>
<td>

### ⚡ TokenZip Claude

> "Bug in middleware auth. Controllo scadenza token usa `<` non `<=`. Fix:"

</td>
</tr>
</table>

**Stesso fix. 75% meno parole. Potenza intatta.**

**Scegli il tuo livello di compressione:**

| 🪶 Lite | ⚡ Full | 🔥 Ultra |
| :--- | :--- | :--- |
| "Il componente fa re-render perché crei nuovo riferimento oggetto a ogni render. Prop inline falliscono shallow comparison. Avvolgi in `useMemo`." | "Nuovo ref oggetto ogni render. Prop oggetto inline = nuovo ref = re-render. Avvolgi in `useMemo`." | "Prop obj inline → nuovo ref → re-render. `useMemo`." |

## Vantaggi

- **Risposte più veloci** — meno token da generare = velocità "brrr"
- **Più facile da leggere** — niente muri di testo, solo la risposta
- **Stessa precisione** — tutte le info tecniche mantenute, solo la fuffa rimossa
- **Risparmia soldi** — riduzione media del 65% dell'output nei benchmark

## Installazione

Per usare la variante italiana, assicurati di avere i file della skill nel tuo progetto e registra `AGENTS.it.md` o `GEMINI.it.md` nel tuo agente.

## Utilizzo

Attiva con:
- "parla come TokenZip"
- "modalità tokenzip"
- "meno token per favore"
- `/tokenzip-it`

Disattiva con: "stop tokenzip" o "modalità normale"

### Livelli Intensità

| Livello | Trigger | Cosa fa |
|-------|---------|------------|
| **Lite** | `/tokenzip-it lite` | Toglie fuffa, tiene grammatica. Professionale ma asciutto. |
| **Full** | `/tokenzip-it full` | TokenZip default. Toglie articoli, frammenti, compressione massima. |
| **Ultra** | `/tokenzip-it ultra` | Massima compressione. Telegrafico. Abbrevia tutto. |

## Skill TokenZip

| Skill | Cosa fa |
|---|---|
| `/tokenzip-commit-it` | Messaggi commit secchi. Conventional Commits, oggetto ≤50 car. Perché prima del cosa. |
| `/tokenzip-review-it` | Commenti PR su una riga: `L42: 🔴 bug: utente null. Aggiungi guardia.` Niente preamboli. |
| `/tokenzip-it:compress <file>` | Riscrive file memoria (es. `CLAUDE.md`) in stile tokenzip italiano. Salva backup `<file>.original.md`. |

## tokenzip-shrink (Middleware MCP)

Include una variante italiana del proxy MCP che intercetta le descrizioni dei tool e le comprime usando regole grammaticali italiane.

---

## Licenza

MIT — libero come un codice nella pianura.

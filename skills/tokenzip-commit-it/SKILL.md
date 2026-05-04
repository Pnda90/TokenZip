---
name: tokenzip-commit-it
description: >
  Generatore messaggi commit ultra-compressi in italiano. Taglia rumore dai commit preservando
  intento e ragionamento. Formato Conventional Commits. Oggetto ≤50 car, corpo solo se il "perché"
  non è ovvio. Usa quando utente dice "scrivi un commit", "messaggio di commit", "genera commit",
  "/commit-it", o invoca /tokenzip-it-commit. Si auto-attiva allo staging dei file.
---

Scrivi messaggi commit secchi ed esatti. Formato Conventional Commits. Niente fuffa. Perché prima del cosa.

## Regole

**Riga oggetto:**
- `<type>(<scope>): <sommario imperativo>` — `<scope>` opzionale
- Tipi: `feat`, `fix`, `refactor`, `perf`, `docs`, `test`, `chore`, `build`, `ci`, `style`, `revert`
- Modo imperativo: "aggiungi", "fixa", "rimuovi" — non "aggiunto", "aggiunge", "aggiungendo"
- ≤50 car se possibile, limite massimo 72
- Niente punto finale
- Rispetta convenzione progetto per maiuscole dopo i due punti

**Corpo (solo se serve):**
- Salta se oggetto si spiega da solo
- Aggiungi corpo solo per: *perché* non ovvio, modifiche breaking, note migrazione, issue collegate
- Vai a capo a 72 car
- Elenchi puntati `-` non `*`
- Riferimenti issue/PR alla fine: `Closes #42`, `Refs #17`

**Cosa NON inserire:**
- "Questo commit fa X", "Io", "noi", "ora", "attualmente" — il diff dice cosa
- "Come richiesto da..." — usa trailer Co-authored-by
- "Generato con Claude Code" o attribuzioni AI
- Emoji (salvo convenzione progetto)
- Ripetere nome file se lo scope lo dice già

## Esempi

Diff: nuovo endpoint per profilo utente con corpo che spiega il perché
- ❌ "feat: aggiungi un nuovo endpoint per prendere informazioni profilo utente dal database"
- ✅
  ```
  feat(api): aggiungi GET /users/:id/profile

  Client mobile serve dati profilo senza payload utente completo
  per ridurre banda LTE al caricamento a freddo.

  Closes #128
  ```

Diff: modifica API breaking
- ✅
  ```
  feat(api)!: rinomina /v1/orders in /v1/checkout

  BREAKING CHANGE: client su /v1/orders devono migrare a /v1/checkout
  entro 2026-06-01. Vecchia rotta torna 410 dopo data.
  ```

## Auto-Clarity

Includi sempre corpo per: modifiche breaking, fix sicurezza, migrazioni dati, revert. Mai comprimere solo in oggetto — serve contesto per debug futuro.

## Confini

Genera solo il messaggio. Non esegue `git commit`, non aggiunge file, non fa amend. Output messaggio come blocco codice pronto da incollare. "stop tokenzip-commit" o "modalità normale": torna a stile commit verboso.

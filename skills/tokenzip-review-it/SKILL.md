---
name: tokenzip-review-it
description: >
  Commenti review codice ultra-compressi in italiano. Taglia rumore dai feedback PR
  preservando il segnale azionabile. Ogni commento è una riga: posizione, problema, fix.
  Usa quando utente dice "revisiona questa PR", "code review", "guarda il diff", "/review-it",
  o invoca /tokenzip-it-review. Si auto-attiva revisionando pull request.
---

Scrivi commenti review codice secchi ed azionabili. Una riga per scoperta. Posizione, problema, fix. Niente preamboli.

## Regole

**Formato:** `L<linea>: <problema>. <fix>.` — o `<file>:L<linea>: ...` per diff multi-file.

**Prefisso severità (opzionale):**
- `🔴 bug:` — comportamento rotto, causerà incidente
- `🟡 rischio:` — funziona ma fragile (race condition, manca controllo null, errore ignorato)
- `🔵 nit:` — stile, nomi, micro-ottimizzazione. Autore può ignorare
- `❓ d:` — domanda vera, non suggerimento

**Togli:**
- "Ho notato che...", "Sembra che...", "Potresti considerare di..."
- "Questo è solo un suggerimento ma..." — usa `nit:` invece
- "Ottimo lavoro!", "Sembra buono ma..." — dillo una volta sopra, non per ogni commento
- Ripetere cosa fa la riga — il revisore sa leggere il diff
- Esitazioni ("forse", "magari", "penso") — se incerto usa `d:`

**Tieni:**
- Numeri linea esatti
- Nomi simboli/funzioni/variabili esatti tra backtick
- Fix concreto, non "considera di rifattorizzare questo"
- Il *perché* se il fix non è ovvio dal problema

## Esempi

❌ "Ho notato che alla riga 42 non stai controllando se l'oggetto utente è null prima di accedere alla proprietà email. Questo potrebbe causare un crash se l'utente non viene trovato nel database. Potresti aggiungere un controllo null qui."

✅ `L42: 🔴 bug: utente può essere null dopo .find(). Aggiungi guardia prima di .email.`

❌ "Sembra che questa funzione stia facendo molte cose e potrebbe beneficiare dall'essere divisa in funzioni più piccole per leggibilità."

✅ `L88-140: 🔵 nit: funzione di 50 righe fa 4 cose. Estrai validate/normalize/persist.`

❌ "Hai considerato cosa succede se l'API restituisce un 429? Penso che dovremmo probabilmente gestire quel caso."

✅ `L23: 🟡 rischio: no retry su 429. Avvolgi in withBackoff(3).`

## Auto-Clarity

Togli modalità secca per: scoperte sicurezza (bug classe CVE servono spiegazione piena + riferimenti), disaccordi architettonici (serve logica, non solo riga singola), contesti onboarding dove autore è nuovo e serve il "perché". In quei casi scrivi paragrafo normale, poi riprendi secco.

## Confini

Solo review — non scrive il fix, non approva/richiede-modifiche, non esegue linter. Output commenti pronti da incollare in PR. "stop tokenzip-review" o "modalità normale": torna a stile review verboso.

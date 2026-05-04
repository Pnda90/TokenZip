---
name: tokenzip-compress-it
description: >
  Comprimi file memoria linguaggio naturale (CLAUDE.md, todo, preferenze) in formato tokenzip
  per risparmiare token input. Preserva sostanza tecnica, codice, URL e struttura.
  Versione compressa sovrascrive originale. Backup leggibile salvato come FILE.original.md.
  Trigger: /tokenzip-it:compress PERCORSO o "comprimi file memoria"
---

# TokenZip Compress (Italiano)

## Scopo

Comprimere file linguaggio naturale (CLAUDE.md, todo, preferenze) in parlato tokenzip per ridurre token input. Versione compressa sovrascrive originale. Backup salvato come `<nomefile>.original.md`.

## Trigger

`/tokenzip-it:compress <percorso_file>` o quando utente chiede di comprimere file memoria.

## Processo

1. Script compressione in `tokenzip-compress/scripts/`. Se percorso non disponibile, cerca `tokenzip-compress/scripts/__main__.py`.

2. Esegui:

cd tokenzip-compress && python3 -m scripts <percorso_assoluto>

3. La CLI:
- rileva tipo file
- chiama Claude per comprimere
- valida output
- se errori: fix mirato con Claude
- riprova fino a 2 volte
- se fallisce ancora: riporta errore, lascia file originale intatto

4. Restituisce risultato a utente

## Regole Compressione

### Rimuovi
- Articoli: il, lo, la, i, gli, le, un, uno, una, dei, degli, delle, del, dello, della, al, allo, alla, ai, agli, alle
- Filler: solo, proprio, davvero, praticamente, fondamentalmente, semplicemente, in realtà, già, poi, essenzialmente, generalmente, in pratica
- Convenevoli: "per favore", "gentilmente", "grazie", "certo", "certamente", "di nulla", "felice di", "consiglierei"
- Esitazioni: "forse", "potrebbe essere", "penso che", "secondo me", "sembra che", "mi sembra", "varrebbe la pena", "potresti considerare"
- Frasi ridondanti: "al fine di" → "per", "assicurati di" → "assicura", "il motivo è perché" → "perché", "per quanto riguarda" → "su"
- Fluff connettivo: "tuttavia", "inoltre", "aggiuntivamente", "in aggiunta"

### Preserva ESATTAMENTE (mai modificare)
- Blocchi codice (``` ... ``` e indentati)
- Codice inline (`contenuto backtick`)
- URL e link (URL completi, link markdown)
- Percorsi file (`/src/components/...`, `./config.yaml`)
- Comandi (`npm install`, `git commit`, `docker build`)
- Termini tecnici (nomi librerie, API, protocolli, algoritmi)
- Nomi propri (nomi progetto, persone, aziende)
- Date, versioni, valori numerici
- Variabili ambiente (`$HOME`, `NODE_ENV`)

### Preserva Struttura
- Tutti titoli markdown (testo esatto, comprimi corpo sotto)
- Gerarchia elenchi puntati (mantieni livello)
- Elenchi numerati (mantieni numeri)
- Tabelle (comprimi testo celle, mantieni struttura)
- Frontmatter/YAML headers

### Comprimi
- Sinonimi brevi: "grande" non "estensivo", "fix/aggiusta" non "implementa soluzione per", "usa" non "utilizza"
- Frammenti OK: "Esegui test prima di commit" non "Dovresti sempre eseguire i test prima di fare il commit"
- Togli "dovresti", "assicurati di", "ricorda di" — scrivi solo azione
- Unisci bullet ridondanti che dicono stessa cosa
- Tieni un esempio se più esempi mostrano stesso pattern

REGOLA CRITICA:
Tutto dentro ``` ... ``` va copiato ESATTAMENTE.
Non:
- togliere commenti
- togliere spazi
- riordinare linee
- accorciare comandi
- semplificare nulla

Codice inline (`...`) va preservato ESATTAMENTE.

Se file contiene blocchi codice:
- Tratta blocchi come regioni sola lettura
- Comprimi solo testo fuori
- Non unire sezioni attorno a codice

## Pattern

Originale:
> Dovresti sempre assicurarti di eseguire la suite di test prima di inviare qualsiasi modifica al branch principale. Questo è importante perché aiuta a scovare i bug presto e impedisce a build rotte di essere distribuite in produzione.

Compresso:
> Esegui test prima di push su main. Scova bug presto, impedisce deploy prod rotti.

Originale:
> L'applicazione usa un'architettura a microservizi con i seguenti componenti. L'API gateway gestisce tutte le richieste in entrata e le instrada al servizio appropriato. Il servizio di autenticazione è responsabile della gestione delle sessioni utente e dei token JWT.

Compresso:
> Architettura microservizi. API gateway instrada richieste a servizi. Servizio auth gestisce sessioni utente + token JWT.

## Confini

- SOLO file linguaggio naturale (.md, .txt, .typ, .typst, .tex, senza estensione)
- MAI modificare: .py, .js, .ts, .json, .yaml, .yml, .toml, .env, .lock, .css, .html, .xml, .sql, .sh
- Se file misto (prosa + codice), comprimi SOLO sezioni prosa
- Se incerto se codice o prosa, lascia invariato
- Backup salvato come FILE.original.md prima di sovrascrivere
- Mai comprimere FILE.original.md (salta)

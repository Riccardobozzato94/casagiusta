# User Stories — CasaGiusta

> **Versione:** 1.0  
> **Stato:** Bozza  
> **Ultimo aggiornamento:** 2026-07-19

---

## Indice

1. [ONBOARDING E AUTENTICAZIONE](#1-onboarding-e-autenticazione)
2. [PROFILAZIONE CONTRATTO](#2-profilazione-contratto)
3. [VAULT PROVE](#3-vault-prove)
4. [AI LEGAL ASSISTANT](#4-ai-legal-assistant)
5. [CASE TRACKER](#5-case-tracker)
6. [COMMUNITY E MATCHING](#6-community-e-matching)
7. [EMERGENCY MODE](#7-emergency-mode)
8. [ABBONAMENTO](#8-abbonamento)
9. [PRIVACY E DATI](#9-privacy-e-dati)

---

## 1. ONBOARDING E AUTENTICAZIONE

---

### US-CG-01: Registrazione con Magic Link

| Campo | Valore |
|-------|--------|
| **Priorità** | P0 |
| **Story Points** | 3 |

**Come** un nuovo utente  
**Voglio** registrarmi con la mia email tramite magic link  
**Per** accedere all'app senza dover ricordare una password  

```gherkin
Scenario: Registrazione con magic link — happy path
  Given l'utente apre l'app per la prima volta
  When inserisce la propria email "mario.rossi@example.com"
  Then riceve un'email con il magic link
  When clicca il magic link entro 15 minuti
  Then viene autenticato e reindirizzato alla schermata di onboarding
  And l'account viene creato con stato "attivo"

Scenario: Magic link scaduto
  Given l'utente richiede un magic link
  When clicca il magic link dopo 16 minuti
  Then viene mostrato un messaggio "Link scaduto. Richiedine uno nuovo."
  And l'utente non viene autenticato

Scenario: Email già registrata con altro metodo
  Given esiste un account associato a "mario.rossi@example.com" registrato via Google
  When l'utente richiede un magic link per la stessa email
  Then riceve una notifica "Email già associata. Accedi con Google."
  And non viene inviato alcun magic link
```

**Acceptance Criteria:**
- AC-01.1: Il magic link scade dopo 15 minuti
- AC-01.2: L'email deve contenere il nome dell'app, il mittente verificato e un link monouso
- AC-01.3: Dopo il login via magic link, l'utente atterra sulla schermata di onboarding (non sulla home)
- AC-01.4: Se l'email è già associata a un OAuth provider, bloccare la registrazione magic link e suggerire il login OAuth

---

### US-CG-02: Accesso con Apple/Google OAuth

| Campo | Valore |
|-------|--------|
| **Priorità** | P0 |
| **Story Points** | 3 |

**Come** un nuovo utente  
**Voglio** accedere con il mio account Google o Apple  
**Per** evitare di inserire manualmente i dati di registrazione  

```gherkin
Scenario: Accesso con Google — primo accesso
  Given l'utente è sulla schermata di login
  When seleziona "Accedi con Google"
  And autorizza le richieste di permesso (email, profilo)
  Then viene creato un nuovo account con i dati del profilo Google
  And reindirizzato alla schermata di onboarding

Scenario: Accesso con Apple — email privata
  Given l'utente seleziona "Accedi con Apple"
  When sceglie di nascondere la propria email
  Then l'app riceve l'email privata Apple (es. abc123@privaterelay.appleid.com)
  And l'account viene creato correttamente con l'email mascherata

Scenario: Accesso OAuth — email già esistente
  Given l'utente ha già un account registrato con magic link per "mario@example.com"
  When tenta l'accesso con Google usando la stessa email
  Then i due account vengono collegati (merge social)
  And l'utente accede senza dover reinserire i dati
```

**Acceptance Criteria:**
- AC-02.1: Il bottone OAuth deve essere conforme alle linee guida del provider (Google Brand, Apple Design)
- AC-02.2: Su iOS deve essere sempre presente almeno "Accedi con Apple" (linee guida App Store)
- AC-02.3: Il merge account deve preservare tutti i dati già presenti sul profilo
- AC-02.4: L'email privata Apple deve essere gestita come email principale senza perdere la funzionalità di notifica

---

### US-CG-03: Modalità Anonima

| Campo | Valore |
|-------|--------|
| **Priorità** | P0 |
| **Story Points** | 2 |

**Come** un utente che non vuole ancora registrarsi  
**Voglio** esplorare l'app in modalità anonima  
**Per** valutarne l'utilità prima di impegnarmi  

```gherkin
Scenario: Accesso anonimo — funzionalità consentite
  Given l'utente non ha ancora effettuato login
  When tocca "Esplora senza registrarmi"
  Then viene creato un ID anonimo locale
  And può navigare la home, leggere il forum, e usare Giusta (3 domande gratuite)
  And le azioni di scrittura (post, upload contratti) sono bloccate con CTA "Registrati"

Scenario: Accesso anonimo — superato limite domande Giusta
  Given l'utente anonimo ha già usato le 3 domande gratuite a Giusta
  When prova a fare una quarta domanda
  Then vede un overlay "Hai raggiunto il limite. Registrati per continuare."
  And l'input della chat viene disabilitato fino alla registrazione

Scenario: Dati anonimi persi alla disinstallazione
  Given l'utente usa l'app in modalità anonima per 7 giorni
  When disinstalla e reinstalla l'app
  Then l'ID anonimo viene rigenerato
  And i dati precedenti (cronologia, bozze) non sono più disponibili
```

**Acceptance Criteria:**
- AC-03.1: L'ID anonimo è generato localmente (UUID v4) e non inviato al server se non dopo registrazione
- AC-03.2: Limite di 3 domande a Giusta in modalità anonima
- AC-03.3: Tutte le azioni di scrittura mostrano un CTA "Registrati / Accedi" in modo non bloccante
- AC-03.4: L'utente anonimo può passare a registrato senza perdere i dati (vedi US-CG-04)

---

### US-CG-04: Transizione da Anonimo a Registrato

| Campo | Valore |
|-------|--------|
| **Priorità** | P1 |
| **Story Points** | 3 |

**Come** un utente anonimo  
**Voglio** registrarmi conservando i dati della sessione anonima  
**Per** non perdere il lavoro già fatto (domande, bozze, preferenze)  

```gherkin
Scenario: Transizione anonimo → registrato con magic link
  Given l'utente anonimo ha fatto 2 domande a Giusta e salvato una bozza
  When clicca "Registrati" e completa la registrazione con la stessa email
  Then l'account registrato eredita le 2 domande già fatte
  And la bozza viene associata al nuovo profilo
  And il contatore domande passa da 2 a 2 (non si resetta)

Scenario: Transizione anonimo → conflitto di email
  Given l'utente anonimo usa l'app
  And l'email "mario@example.com" è già registrata con Google
  When tenta di registrare magic link con la stessa email
  Then riceve "Email già associata a un account. Accedi per unire i dati."
  And i dati anonimi rimangono locali fino al merge esplicito

Scenario: Merge dati anonimi dopo login esistente
  Given l'utente anonimo ha salvato una bozza
  When accede con Google (account già esistente)
  Then viene chiesto "Vuoi unire i dati locali con il tuo account?"
  If l'utente conferma, la bozza viene associata all'account remoto
```

**Acceptance Criteria:**
- AC-04.1: Il merge dati deve gestire conflitti (es. bozze con stesso nome — chiedere all'utente)
- AC-04.2: I dati anonimi non vengono inviati al server prima della registrazione esplicita
- AC-04.3: Dopo la transizione, l'ID anonimo locale viene disassociato e marcato come unito
- AC-04.4: L'utente può scegliere di "non unire" — in tal caso i dati anonimi rimangono locali e separati

---

## 2. PROFILAZIONE CONTRATTO

---

### US-CG-05: Upload Contratto con OCR

| Campo | Valore |
|-------|--------|
| **Priorità** | P0 |
| **Story Points** | 5 |

**Come** un inquilino registrato  
**Voglio** caricare una foto/PDF del mio contratto di affitto  
**Per** avere l'AI che estrae automaticamente i dati principali  

```gherkin
Scenario: Upload contratto con successo
  Given l'utente ha un contratto di affitto in PDF (3 pagine, testo chiaro)
  When seleziona il file "contratto.pdf" dalla galleria
  Then il sistema mostra un preview del file
  When conferma l'upload
  Then l'OCR processa il documento in meno di 15 secondi
  And i campi estratti vengono mostrati: nome locatore, nome conduttore, canone, durata, data stipula
  And l'accuratezza di ogni campo è indicata (alta/medium/bassa)
  And l'utente può correggere manualmente ogni campo prima di salvare

Scenario: Upload foto sfocata (fallback manuale)
  Given l'utente scatta una foto del contratto con scarsa illuminazione
  When carica la foto
  Then il sistema rileva qualità bassa e mostra avviso "Immagine poco leggibile"
  And l'OCR restituisce campi con accuratezza < 50%
  And tutti i campi sono marcati come "da verificare"
  And l'utente può inserire i dati manualmente campo per campo
  And il sistema non salva i dati automaticamente finché l'utente non conferma ogni campo

Scenario: Contratto in lingua diversa (francese)
  Given l'utente carica un contratto di affitto in francese
  When il sistema rileva lingua "francese" dal testo OCR
  Then l'estrazione procede con modello multilingua
  And i campi vengono etichettati in italiano nella UI
  And viene mostrato "Lingua rilevata: Francese" nell'intestazione del riepilogo
  And l'accuratezza dei campi è contrassegnata come "media" per via della lingua non nativa

Scenario: Upload formato non supportato
  Given l'utente tenta di caricare un file .heic
  When seleziona il file
  Then il sistema mostra errore "Formato non supportato. Usa PDF, JPG o PNG."
  And il file non viene caricato
  And viene mostrata la lista dei formati accettati
```

**Acceptance Criteria:**
- AC-05.1: Formati accettati: PDF, JPG, PNG. Dimensione massima: 20 MB
- AC-05.2: L'OCR deve completare in ≤ 15 secondi per documenti fino a 10 pagine
- AC-05.3: Ogni campo estratto mostra un indicatore di confidenza (alta ≥ 90%, media 70-89%, bassa < 70%)
- AC-05.4: L'utente può sempre correggere o inserire manualmente ogni campo
- AC-05.5: Supporto multilingua per italiano, inglese, francese, spagnolo, tedesco (al minimo)
- AC-05.6: I dati non vengono salvati permanentemente finché l'utente non conferma esplicitamente

---

### US-CG-06: Verifica Clausole Vessatorie

| Campo | Valore |
|-------|--------|
| **Priorità** | P0 |
| **Story Points** | 5 |

**Come** un inquilino che ha caricato il contratto  
**Voglio** ricevere un'analisi automatica delle clausole potenzialmente vessatorie o nulle  
**Per** sapere se il contratto contiene clausole abusive prima di firmare o contestare  

```gherkin
Scenario: Analisi completa — clausole vessatorie trovate
  Given l'utente ha un contratto con canone indicizzato ISTAT + clausola "nessuna manutenzione a carico del locatore"
  When richiede l'analisi delle clausole vessatorie
  Then il sistema analizza il testo del contratto
  And restituisce un report con:
    - Clausola "Indicizzazione ISTAT senza tetto massimo" — vessatoria: Sì — Riferimento: L.392/78 art. 32
    - Clausola "Manutenzione straordinaria a carico conduttore" — vessatoria: Sì — Riferimento: Cod. Civ. art. 1576
  And ogni clausola è espandibile per vedere il testo esatto estratto e la spiegazione

Scenario: Contratto pulito — nessuna clausola vessatoria
  Given l'utente ha un contratto conforme al modello ABI standard
  When richiede l'analisi
  Then il report mostra "Nessuna clausola vessatoria rilevata"
  And mostra un badge verde "Contratto conforme ✅"
  And viene suggerito di salvare il report come "certificazione di conformità"

Scenario: Errore di analisi — contratto non ancora processato
  Given l'utente non ha ancora completato l'upload del contratto
  When tenta di avviare l'analisi clausole
  Then vede il messaggio "Carica e conferma prima il contratto"
  And il bottone "Analizza" è disabilitato
```

**Acceptance Criteria:**
- AC-06.1: L'analisi copre almeno le clausole previste dagli artt. 1341-1342 Cod. Civ. e L.392/78
- AC-06.2: Ogni clausola marcata come vessatoria deve includere: testo estratto, riferimento normativo, spiegazione in linguaggio semplice
- AC-06.3: Se il contratto è conforme, mostrare badge positivo e suggerire download certificazione
- AC-06.4: L'analisi non è consulenza legale — disclaimer sempre visibile nel report
- AC-06.5: Tempo di analisi ≤ 30 secondi per contratti fino a 15 pagine

---

### US-CG-07: Calcolo Aggiornamento ISTAT

| Campo | Valore |
|-------|--------|
| **Priorità** | P1 |
| **Story Points** | 3 |

**Come** un inquilino con canone indicizzato ISTAT  
**Voglio** calcolare l'aggiornamento ISTAT del canone per l'anno corrente  
**Per** verificare che l'aumento richiesto dal locatore sia corretto  

```gherkin
Scenario: Calcolo ISTAT con dati contratto esistenti
  Given l'utente ha un contratto con canone €800/mese e clausola ISTAT 75%
  And la data di stipula è 01/01/2023
  When richiede "Calcola aggiornamento ISTAT 2026"
  Then il sistema recupera l'indice ISTAT FOI per il periodo 2025→2026
  And calcola: (€800 × 75% × variazione ISTAT 2,3%) = €13,80
  And mostra risultato: "Aggiornamento: €13,80/mese | Nuovo canone: €813,80/mese"
  And mostra dettaglio: indice precedente, indice attuale, percentuale applicata

Scenario: Calcolo ISTAT senza contratto salvato
  Given l'utente non ha ancora caricato un contratto
  When apre la schermata di calcolo ISTAT
  Then il sistema permette l'inserimento manuale dei parametri:
    - Canone attuale
    - Percentuale indicizzazione (default 100%)
    - Periodo di riferimento
  And il calcolo funziona indipendentemente dalla presenza di un contratto

Scenario: Dato ISTAT non ancora pubblicato
  Given l'utente richiede il calcolo per il 2027 a gennaio 2027
  When il sistema verifica la disponibilità dell'indice ISTAT
  Then mostra messaggio "Dato ISTAT 2027 non ancora disponibile (pubblicazione prevista: febbraio 2027)"
  And suggerisce di usare l'ultimo dato disponibile (2026) come stima provvisoria
```

**Acceptance Criteria:**
- AC-07.1: L'indice ISTAT FOI deve essere aggiornato automaticamente alla pubblicazione mensile
- AC-07.2: Il calcolo supporta contratti 2+2, 3+2, 4+4 con la percentuale di indicizzazione indicata in contratto
- AC-07.3: Se l'indice non è ancora disponibile, mostrare messaggio chiaro con data prevista e opzione stima
- AC-07.4: Il dettaglio del calcolo è esportabile in PDF (report singolo)

---

## 3. VAULT PROVE

---

### US-CG-08: Upload Prova con Timestamp

| Campo | Valore |
|-------|--------|
| **Priorità** | P0 |
| **Story Points** | 3 |

**Come** un inquilino che sta raccogliendo prove  
**Voglio** caricare foto, video o documenti con timestamp verificabile  
**Per** avere evidenza digitale incontestabile in caso di controversia  

```gherkin
Scenario: Upload prova fotografica con timestamp
  Given l'utente è nella schermata "Vault Prove"
  When seleziona "Carica prova" e scatta una foto della muffa in bagno
  Then la foto viene geolocalizzata (con consenso) e timestampata
  And il sistema aggiunge un hash SHA-256 del file sulla blockchain (testnet)
  And viene generato un certificato di esistenza con: data, ora, coordinate, hash, ID univoco
  And la prova appare nella galleria con thumbnail, data e tipo

Scenario: Upload video — memoria insufficiente
  Given l'utente tenta di caricare un video di 5 minuti in 4K
  When il sistema rileva che il video eccede il limite di 100 MB
  Then mostra messaggio "Video troppo grande (max 100 MB)"
  And offre opzioni: "Comprimi video" o "Seleziona file più piccolo"
  And se l'utente sceglie comprimi, il video viene compresso automaticamente prima dell'upload

Scenario: Upload prova senza connessione
  Given l'utente è in una zona senza copertura di rete
  When seleziona "Carica prova"
  Then la prova viene salvata localmente in coda di upload
  And mostra badge "In attesa di rete" sulla thumbnail
  When la connettività viene ripristinata
  Then la prova viene caricata automaticamente in background con lo stesso timestamp originale
```

**Acceptance Criteria:**
- AC-08.1: Ogni prova riceve un hash SHA-256 e timestamp UNIX immutabile (registrato su ledger distribuito o servizio tipo blockchain testnet)
- AC-08.2: La geolocalizzazione è opzionale e richiede consenso esplicito
- AC-08.3: Limite upload: 100 MB per file, 20 file per caso
- AC-08.4: Upload offline supportato con coda locale e sincronizzazione automatica
- AC-08.5: Il certificato di esistenza è scaricabile in formato PDF

---

### US-CG-09: Organizzare Prove per Caso

| Campo | Valore |
|-------|--------|
| **Priorità** | P1 |
| **Story Points** | 3 |

**Come** un utente con più controversie attive  
**Voglio** organizzare le prove in cartelle per caso/controversia  
**Per** ritrovare facilmente i documenti quando servo  

```gherkin
Scenario: Creare caso e associare prove
  Given l'utente ha 5 prove caricate (foto muffa, email locatore, contratto)
  When crea un nuovo caso "Muffa bagno — Via Roma 10"
  And seleziona 3 prove da associare
  Then le prove vengono spostate all'interno del caso
  And il caso mostra: nome, numero prove, ultima modifica
  And le prove sono visibili solo all'interno del caso (non più nella radice)

Scenario: Rimuovere prova da un caso
  Given il caso "Muffa bagno" contiene 3 prove
  When l'utente rimuove una prova dal caso
  Then la prova viene dissociata ma non eliminata
  And riappare nella lista principale del vault
  And il conteggio prove del caso viene aggiornato

Scenario: Caso duplicato (stesso nome)
  Given esiste già un caso "Muffa bagno — Via Roma 10"
  When l'utente tenta di creare un nuovo caso con lo stesso nome
  Then il sistema mostra "Nome già utilizzato. Aggiungi un suffisso (2) automaticamente?"
  If l'utente conferma, viene creato "Muffa bagno — Via Roma 10 (2)"
```

**Acceptance Criteria:**
- AC-09.1: Un caso può contenere fino a 50 prove
- AC-09.2: Le prove possono appartenere a un solo caso alla volta (o alla radice)
- AC-09.3: Nomi caso: unici all'interno dello stesso account, max 100 caratteri
- AC-09.4: La dissociazione da un caso non elimina la prova
- AC-09.5: Vista lista con ordinamento per data ultima modifica (decrescente) e ricerca full-text

---

### US-CG-10: Esportazione Report Prove PDF

| Campo | Valore |
|-------|--------|
| **Priorità** | P1 |
| **Story Points** | 3 |

**Come** un utente che ha raccolto prove in un caso  
**Voglio** esportare un report PDF riepilogativo  
**Per** inviarlo al mio avvocato o allegarlo a una PEC  

```gherkin
Scenario: Esportazione report completo
  Given il caso "Muffa bagno" contiene 3 prove (2 foto, 1 email)
  When l'utente seleziona "Esporta report PDF"
  Then il sistema genera un PDF strutturato con:
    - Intestazione: nome caso, data export, ID utente
    - Per ogni prova: thumbnail, timestamp, hash, coordinate (se presenti)
    - Footer: disclaimer e numero pagine
  And il PDF è scaricabile immediatamente
  And il nome file è "Report_Vault_Muffa_bagno_20260719.pdf"

Scenario: Esportazione selezionando prove specifiche
  Given il caso "Muffa bagno" contiene 5 prove
  When l'utente seleziona solo 2 prove e sceglie "Esporta selezionate"
  Then il PDF include solo le 2 prove selezionate
  And la numerazione progressiva parte da 1

Scenario: Esportazione caso vuoto
  Given il caso "Da organizzare" non contiene prove
  When l'utente tenta di esportare il report
  Then il bottone "Esporta PDF" è disabilitato
  And mostra tooltip "Aggiungi almeno una prova per esportare"
```

**Acceptance Criteria:**
- AC-10.1: Il PDF deve essere generato lato client (privacy — i file non vengono inviati a server terzi)
- AC-10.2: Il report include: nome caso, data export, per ogni prova: timestamp, hash SHA-256, thumbnail (se foto), coordinate (se presenti)
- AC-10.3: Supporto export selezione multipla (non tutto il caso)
- AC-10.4: Caso vuoto → export disabilitato con messaggio chiaro
- AC-10.5: Il PDF non deve superare 10 MB; se necessario, comprimere le thumbnail

---

### US-CG-11: Crittografia Client-Side

| Campo | Valore |
|-------|--------|
| **Priorità** | P0 |
| **Story Points** | 5 |

**Come** un utente del vault prove  
**Voglio** che tutti i miei file siano crittografati lato client prima di essere inviati al server  
**Per** garantire che nemmeno il fornitore dell'app possa accedere alle mie prove  

```gherkin
Scenario: Upload con crittografia end-to-end
  Given l'utente carica una prova "contratto.pdf"
  When il file viene selezionato per l'upload
  Then il sistema genera una chiave AES-256-GCM unica per il file
  And il file viene crittografato localmente prima della trasmissione
  And solo il file cifrato viene inviato al server
  And la chiave viene cifrata con la chiave pubblica RSA dell'utente e salvata separatamente
  And l'utente vede un badge "Crittografato 🔒" sulla thumbnail

Scenario: Download e decifratura
  Given l'utente ha un file crittografato nel vault
  When seleziona "Visualizza prova"
  Then il sistema scarica il file cifrato e lo decifra localmente con la chiave privata dell'utente
  And il file decifrato viene mostrato solo in memoria (non salvato in chiaro su disco)
  And se la chiave privata non è disponibile, mostra errore "Impossibile decifrare — chiave privata non trovata"

Scenario: Condivisione selettiva di prova crittografata
  Given l'utente vuole condividere una prova con un avvocato
  When seleziona "Condividi" e inserisce l'email dell'avvocato
  Then il sistema decifra il file, lo ricifra con la chiave pubblica del destinatario
  And invia il link di download con chiave cifrata per il destinatario
  And l'utente originale mantiene l'accesso completo
```

**Acceptance Criteria:**
- AC-11.1: Algoritmo AES-256-GCM per la crittografia dei file
- AC-11.2: Le chiavi pubbliche/private RSA sono generate al momento della registrazione (4096 bit)
- AC-11.3: Il server NON ha mai accesso alle chiavi private o ai file in chiaro
- AC-11.4: La condivisione selettiva usa cifratura per il destinatario — il server non può leggere il file
- AC-11.5: In caso di reset password, le chiavi vengono rigenerate e i file devono essere ricaricati (o recuperati con backup della chiave)

---

## 4. AI LEGAL ASSISTANT

---

### US-CG-12: Fare Domanda a Giusta

| Campo | Valore |
|-------|--------|
| **Priorità** | P0 |
| **Story Points** | 5 |

**Come** un inquilino con un dubbio legale  
**Voglio** fare una domanda in linguaggio naturale a "Giusta"  
**Per** ricevere una risposta basata sulla normativa italiana con citazioni precise  

```gherkin
Scenario: Domanda su knowledge base — risposta trovata
  Given l'utente ha una domanda sul diritto locatizio
  When scrive "Il mio padrone di casa può aumentare il canone del 30%?"
  Then Giusta risponde citando L.431/1998 art.4 e D.L.66/2026
  And la risposta include il testo esatto delle norme citate
  And ogni citazione è espandibile con il testo normativo completo
  And il disclaimer "Non è consulenza legale" è sempre visibile in fondo alla risposta

Scenario: Domanda fuori knowledge base
  Given l'utente chiede "Come si calcola l'IMU sulla seconda casa?"
  When Giusta analizza la domanda
  Then risponde "Questa domanda esce dal mio ambito locatizio. Posso aiutarti su: canoni, contratti, morosità, manutenzione, sfratto, clausole, ISTAT, ASL, condominio."
  And la risposta non contiene citazioni normative inventate

Scenario: Domanda con tono aggressivo
  Given l'utente scrive "STO PARLANDO CON UN INCAPACE??? RISPONDI SUBITO"
  When Giusta elabora la richiesta
  Then risponde in modo calmo e professionale: "Capisco la tua frustrazione. Cerchiamo di risolvere insieme."
  And fornisce comunque una risposta sostanziale alla domanda sottostante
  E il tono rimane paziente e supportivo in ogni risposta successiva
```

**Acceptance Criteria:**
- AC-12.1: Giusta risponde SOLO su diritto locatizio italiano (non inventa risposte fuori dominio)
- AC-12.2: Ogni risposta include almeno un riferimento normativo preciso (legge, articolo)
- AC-12.3: Il disclaimer "Questa risposta è generata dall'AI e non costituisce consulenza legale" è sempre presente
- AC-12.4: La risposta non deve mai superare i 2000 caratteri (suggerendo approfondimento)
- AC-12.5: Giusta riconosce domande fuori dominio e reindirizza gentilmente

---

### US-CG-13: Generare Diffida Formale

| Campo | Valore |
|-------|--------|
| **Priorità** | P0 |
| **Story Points** | 5 |

**Come** un inquilino che deve intimare il locatore a fare riparazioni  
**Voglio** generare una diffida formale da inviare via PEC o raccomandata  
**Per** avere un documento legalmente valido senza dover pagare un avvocato  

```gherkin
Scenario: Generazione diffida per mancata manutenzione
  Given l'utente ha un problema di "muffa in bagno" documentato con 3 prove
  When seleziona "Genera Diffida" → "Mancata manutenzione"
  Then il sistema compila automaticamente:
    - Intestazione con dati locatore (dal contratto)
    - Descrizione del problema (dalle prove)
    - Riferimenti normativi (art. 1575, 1576 Cod. Civ.)
    - Richiesta formale di intervento entro 15 giorni
  And l'utente può modificare ogni campo
  When l'utente conferma il testo
  Then il documento viene generato in formato PDF/A per PEC
  And l'utente può inviarlo direttamente via PEC dall'app (US-CG-17)

Scenario: Generazione diffida — dati contratto mancanti
  Given l'utente non ha caricato il contratto
  When tenta di generare una diffida
  Then il sistema mostra una schermata per inserire manualmente i dati del locatore
  And i dati vengono salvati per future comunicazioni

Scenario: Diffida con template sbagliato
  Given l'utente seleziona "Diffida per morosità" ma la sua pratica è "mancata manutenzione"
  When il sistema rileva la discordanza
  Then mostra suggerimento "Hai selezionato morosità, ma le tue prove indicano mancata manutenzione. Vuoi cambiare template?"
  And l'utente può scegliere se mantenere o cambiare
```

**Acceptance Criteria:**
- AC-13.1: Template disponibili: messa in mora per morosità, mancata manutenzione, mancato rilascio, richiesta disdetta, restituzione deposito cauzionale
- AC-13.2: Il PDF è generato in formato PDF/A-2b, conforme alle specifiche PEC
- AC-13.3: Ogni diffida include un paragrafo informativo: "Il presente documento non sostituisce la consulenza di un avvocato"
- AC-13.4: I dati del locatore sono precompilati dal contratto se disponibile
- AC-13.5: L'utente può modificare liberamente ogni campo prima della generazione finale

---

### US-CG-14: Generare Segnalazione ASL

| Campo | Valore |
|-------|--------|
| **Priorità** | P1 |
| **Story Points** | 3 |

**Come** un inquilino che vive in condizioni igienico-sanitarie inadeguate  
**Voglio** generare una segnalazione ASL precompilata  
**Per** denunciare il problema senza dovermi rivolgere a un CAF o patronato  

```gherkin
Scenario: Segnalazione ASL per muffa e umidità
  Given l'utente ha documentato muffa in bagno con 3 foto timestampate
  When seleziona "Genera Segnalazione ASL"
  Then il sistema precompila:
    - Dati anagrafici dell'inquilino
    - Indirizzo dell'immobile
    - Descrizione del problema con riferimenti alle prove
    - Normativa: D.P.R. 303/1956, art. 35 Costituzione
  And l'utente può selezionare l'ASL competente per zona
  When conferma e invia
  Then la segnalazione viene inviata all'ASL competente via PEC/email certificata
  And viene salvata copia nel vault

Scenario: Segnalazione ASL — prove insufficienti
  Given l'utente non ha ancora caricato prove nel vault
  When tenta di generare segnalazione ASL
  Then il sistema mostra "Per una segnalazione efficace, carica almeno 2 prove documentali"
  And permette comunque di proseguire con la segnalazione testuale
  And mostra avviso "L'assenza di prove potrebbe rallentare la presa in carico"

Scenario: ASL non trovata per zona
  Given l'utente inserisce un CAP non coperto
  When il sistema cerca l'ASL di competenza
  Then mostra messaggio "Inserisci il comune per trovare l'ASL competente"
  And offre una lista manuale di tutte le ASL italiane se la ricerca automatica fallisce
```

**Acceptance Criteria:**
- AC-14.1: Copertura di tutte le ASL italiane (database aggiornato)
- AC-14.2: Template conforme al modello di segnalazione per igiene e sanità pubblica
- AC-14.3: L'invio può essere fatto via PEC (raccomandata) o email certificata
- AC-14.4: Le prove caricate vengono citate nel corpo della segnalazione ma gli allegati sono separati
- AC-14.5: L'utente può salvare la segnalazione come bozza e completarla in un secondo momento

---

## 5. CASE TRACKER

---

### US-CG-15: Creare Nuova Pratica

| Campo | Valore |
|-------|--------|
| **Priorità** | P0 |
| **Story Points** | 3 |

**Come** un utente che ha un problema con il proprietario di casa  
**Voglio** creare una nuova pratica legale tracciabile  
**Per** seguire tutto l'iter (diffida → mediazione → sfratto/ricorso) in un unico posto  

```gherkin
Scenario: Creazione pratica da problema esistente
  Given l'utente ha già caricato un contratto e ha prove nel vault
  When seleziona "Nuova Pratica" → "Mancata manutenzione"
  Then il sistema crea una pratica con:
    - Nome auto-generato: "Mancata manutenzione — Via Roma 10 — 19/07/2026"
    - Stato: "Aperta"
    - Contratto associato
  And mostra il workflow guidato (US-CG-16)
  E le prove del vault sono selezionabili per associazione

Scenario: Creazione pratica senza contratto
  Given l'utente non ha caricato il contratto
  When tenta di creare una pratica
  Then può comunque creare la pratica inserendo manualmente:
    - Indirizzo immobile
    - Nome locatore
    - Tipo problema
  And riceve un reminder "Carica il contratto per sbloccare tutte le funzionalità"

Scenario: Raggiunto limite pratiche (gratuito)
  Given l'utente ha un piano gratuito con limite 1 pratica attiva
  And ha già una pratica aperta
  When tenta di crearne una seconda
  Then vede "Hai raggiunto il limite di pratiche del piano gratuito (1). Passa a Premium per pratiche illimitate."
  And può comunque modificare la pratica esistente
```

**Acceptance Criteria:**
- AC-15.1: Piano gratuito: max 1 pratica attiva. Premium: illimitate
- AC-15.2: Il nome della pratica è auto-generato ma editabile
- AC-15.3: Ogni pratica ha uno stato: Aperta, In lavorazione, In attesa risposta, Chiusa, Archiviata
- AC-15.4: Le pratiche chiuse vengono archiviate dopo 90 giorni dall'ultimo aggiornamento
- AC-15.5: Transizione tra stati sempre manuale dall'utente (nessuna automazione di stato)

---

### US-CG-16: Seguire Workflow Guidato

| Campo | Valore |
|-------|--------|
| **Priorità** | P1 |
| **Story Points** | 5 |

**Come** un utente con una pratica aperta  
**Voglio** seguire un workflow passo-passo che mi guida nelle azioni da intraprendere  
**Per** non sbagliare le procedure e rispettare le scadenze di legge  

```gherkin
Scenario: Workflow mancata manutenzione — passo completato
  Given l'utente ha una pratica "Muffa bagno" di tipo "Mancata manutenzione"
  When apre il workflow guidato
  Then vede i passi:
    1. ✅ Documenta il problema (3/3 prove caricate)
    2. ⏳ Invia diffida al locatore (in attesa)
    3. ⏳ Attendi 15 giorni (scadenza: 03/08/2026)
    4. ⏳ Segnalazione ASL (opzionale)
    5. ⏳ Ricorso alla Camera di Conciliazione
  When completa l'invio della diffida
  Then lo stato del passo 2 passa a ✅ e il passo 3 si attiva
  And una notifica viene programmata per la scadenza dei 15 giorni

Scenario: Workflow — passo saltato
  Given l'utente è al passo 2 (invia diffida)
  When prova a passare al passo 5 (Ricorso)
  Then il sistema mostra "Il passo 2 (diffida) è obbligatorio per procedere. Vuoi completarlo ora?"
  And impedisce il salto di passi obbligatori

Scenario: Workflow — scadenza superata
  Given il locatore non ha risposto entro 15 giorni dalla diffida
  When il sistema rileva la scadenza superata
  Then mostra notifica push "Termine di 15 giorni scaduto senza risposta"
  And il passo successivo (Ricorso) viene abilitato automaticamente
  And la cronologia registra "Scadenza naturale del termine — proseguo automatico"
```

**Acceptance Criteria:**
- AC-16.1: I passi obbligatori non possono essere saltati
- AC-16.2: Ogni passo ha una durata massima configurata per tipo (default 15 giorni per diffida)
- AC-16.3: Il sistema notifica l'utente via push/email 24h prima e alla scadenza di ogni passo
- AC-16.4: Workflow disponibili: mancata manutenzione, morosità del conduttore, restituzione cauzione, disdetta contratto, immissione in possesso
- AC-16.5: La cronologia della pratica registra ogni azione + timestamp

---

### US-CG-17: Inviare PEC/Email Template

| Campo | Valore |
|-------|--------|
| **Priorità** | P0 |
| **Story Points** | 5 |

**Come** un utente che ha generato un documento (diffida, segnalazione)  
**Voglio** inviarlo direttamente via PEC o email dall'app  
**Per** avere traccia dell'invio senza uscire dall'app  

```gherkin
Scenario: Invio diffida via PEC con successo
  Given l'utente ha generato una diffida (PDF/A)
  When seleziona "Invia via PEC"
  And il sistema verifica che l'utente ha una PEC configurata
  And l'utente conferma l'invio
  Then il documento viene inviato all'indirizzo PEC del locatore
  And la ricevuta PEC viene automaticamente salvata nel vault della pratica
  And lo stato del workflow passa al passo successivo
  And l'utente riceve una notifica "Documento inviato con successo"

Scenario: Invio PEC — nessuna PEC configurata
  Given l'utente non ha ancora configurato una casella PEC
  When seleziona "Invia via PEC"
  Then vede schermata di configurazione PEC (provider, email, password)
  And può configurare la PEC in-app (SMTP/POP con OAuth)
  After la configurazione, l'invio procede normalmente

Scenario: Invio email normale (fallback)
  Given l'utente non ha PEC e non vuole configurarla
  When seleziona "Invia via Email"
  Then viene generato un link di download del documento (scade in 7 giorni)
  And il sistema invia una email normale con il link al destinatario
  And la ricevuta di invio email viene salvata nel vault (non valore legale)
  And viene mostrato disclaimer "L'email non ha valore legale. Per comunicazioni ufficiali, usa PEC."

Scenario: Invio PEC — destinatario non valido
  Given l'utente ha configurato la PEC
  When tenta di inviare a un indirizzo email non PEC (es. mario@gmail.com)
  Then il sistema mostra "L'indirizzo del destinatario non è una PEC. Vuoi inviare comunque via email normale?"
  And permette di scegliere: email normale / correggi destinatario / annulla
```

**Acceptance Criteria:**
- AC-17.1: Supporto PEC via SMTP con OAuth 2.0 (Aruba, Legalmail, Postecert, altre)
- AC-17.2: La ricevuta PEC (xml .eml) viene salvata automaticamente nel vault come prova di invio
- AC-17.3: L'utente può configurare più caselle PEC
- AC-17.4: Link di download per email normale: scadenza 7 giorni, accesso con link monouso
- AC-17.5: Cronologia invio visibile nella pratica con: data, tipo (PEC/email), destinatario, stato

---

## 6. COMMUNITY E MATCHING

---

### US-CG-18: Postare Anonimamente sul Forum

| Campo | Valore |
|-------|--------|
| **Priorità** | P1 |
| **Story Points** | 2 |

**Come** un inquilino che vuole chiedere consigli  
**Voglio** postare sul forum in modo anonimo  
**Per** proteggere la mia identità mentre ricevo supporto dalla community  

```gherkin
Scenario: Post anonimo con successo
  Given l'utente è autenticato
  When nella sezione Forum seleziona "Nuovo post anonimo"
  And scrive "Il mio padrone di casa vuole aumentare l'affitto del 40%"
  And pubblica
  Then il post appare con autore "Inquilino_7f3a2b" (username anonimo generato)
  And il nome reale, email e dati personali non sono visibili
  And l'utente riceve le notifiche delle risposte senza rivelare l'identità

Scenario: Post anonimo con dati sensibili nel testo
  Given l'utente scrive "Il signor Mario Rossi di Via Roma 10, Milano, non vuole riparare..."
  When il sistema rileva potenziali dati personali nel testo (nome, indirizzo)
  Then mostra avviso "Il tuo post contiene dati personali (nome, indirizzo). Vuoi oscurarli?"
  And offre la funzionalità "Oscura automaticamente" che sostituisce con [***]
  And l'utente può confermare la versione oscurata o modificare manualmente

Scenario: Risposta a post anonimo
  Given un utente vede un post anonimo
  When risponde al post
  Then la risposta è visibile pubblicamente
  And anche il rispondente può scegliere se rispondere in modo anonimo o col proprio nome
  And l'autore originale rimane anonimo (non rivelato dalla risposta)
```

**Acceptance Criteria:**
- AC-18.1: Lo username anonimo è generato come "Inquilino_<hash_parziale_id>" — non riconducibile all'email
- AC-18.2: Il sistema rileva e avvisa su potenziali dati sensibili nel testo (PII detection)
- AC-18.3: L'utente può rispondere ai commenti sul proprio post anonimo senza rivelarsi
- AC-18.4: Moderazione: i post anonimi sono soggetti alle stesse regole della community
- AC-18.5: L'anonimato non è garantito in caso di richiesta dell'autorità giudiziaria (disclaimer nel footer)

---

### US-CG-19: Trovare Avvocato Verificato

| Campo | Valore |
|-------|--------|
| **Priorità** | P1 |
| **Story Points** | 3 |

**Come** un utente che ha bisogno di assistenza legale personalizzata  
**Voglio** cercare un avvocato verificato specializzato in diritto locatizio nella mia zona  
**Per** avere un professionista di fiducia a cui affidare la pratica  

```gherkin
Scenario: Ricerca avvocato per zona e specializzazione
  Given l'utente ha una pratica "Mancata manutenzione" a Milano
  When nella sezione "Trova Avvocato" imposta filtro: Milano, diritto locatizio
  Then vengono mostrati 5 avvocati verificati con:
    Nome, studio, distanza, valutazione (★), prezzo prima consulenza, badge "Verificato CasaGiusta"
  And ordinati per valutazione decrescente

Scenario: Profilo avvocato — richiesta contatto
  Given l'utente visualizza il profilo di "Avv. Maria Bianchi ★4.8"
  When tocca "Richiedi contatto"
  Then viene inviata una notifica all'avvocato con i dati dell'utente (solo con consenso)
  And l'avvocato può accettare o rifiutare la richiesta
  When l'avvocato accetta
  Then la chat viene sbloccata e l'utente può comunicare direttamente

Scenario: Nessun avvocato nella zona
  Given l'utente cerca in una zona remota (es. provincia di Isernia)
  When nessun avvocato è disponibile nel raggio di 30 km
  Then il sistema mostra "Nessun avvocato trovato nella tua zona"
  And offre opzioni: "Espandi a 50 km" / "Avvocati disponibili in videocall" / "Avvisami quando arriva un nuovo avvocato"
```

**Acceptance Criteria:**
- AC-19.1: Verifica: l'avvocato deve caricare iscrizione albo, documento identità, partita IVA
- AC-19.2: Badge "Verificato" solo dopo completamento del processo di verifica (revisione entro 48h)
- AC-19.3: Ricerca per: città/comune, specializzazione (almeno: locatizio, condominiale, sfratto), valutazione
- AC-19.4: Contatto iniziale tramite piattaforma (chat) — numero telefono rivelato solo dopo accettazione
- AC-19.5: L'avvocato può impostare: zona di competenza, prezzo prima consulenza, disponibilità oraria

---

### US-CG-20: Segnalazione Collettiva

| Campo | Valore |
|-------|--------|
| **Priorità** | P2 |
| **Story Points** | 5 |

**Come** un inquilino di un grande condominio  
**Voglio** avviare o unirmi a una segnalazione collettiva contro il locatore  
**Per** fare più pressione e condividere i costi legali con altri inquilini  

```gherkin
Scenario: Avviare segnalazione collettiva
  Given l'utente ha una pratica "Mancata manutenzione ascensore"
  When seleziona "Avvia segnalazione collettiva"
  Then il sistema crea una pagina di raccolta con:
    - Descrizione del problema
    - Invito a unirsi (link condivisibile)
    - Contatore: "3 inquilini hanno aderito"
    - Soglia minima: "10 adesioni entro 30 giorni"
  When l'utente condivide il link con i vicini
  Then ogni vicino che aderisce aggiunge la propria prova e i propri dati

Scenario: Raggiungimento soglia minima
  Given la segnalazione "Ascensore rotto" ha raggiunto 10 adesioni
  When la soglia minima viene raggiunta
  Then il sistema notifica tutti gli aderenti "Soglia raggiunta! Procedi con la segnalazione."
  And abilita la generazione di una segnalazione collettiva unica (con tutti i firmatari)
  And suggerisce di contattare un avvocato per la gestione collettiva

Scenario: Adesione a segnalazione esistente
  Given esiste una segnalazione colletiva attiva "Muffa nei piani alti — Via Roma 10" con 5 adesioni
  When l'utente trova la segnalazione e clicca "Unisciti"
  Then l'utente viene aggiunto come firmatario
  And può caricare le proprie prove nella pagina collettiva
  And riceve tutte le notifiche relative alla segnalazione
```

**Acceptance Criteria:**
- AC-20.1: L'utente che avvia la segnalazione è il "referente" (può trasferire il ruolo)
- AC-20.2: Dati personali degli aderenti visibili solo al referente e all'avvocato (se ingaggiato)
- AC-20.3: Soglia minima e scadenza configurabili dall'avviante (default 10 adesioni / 30 giorni)
- AC-20.4: Se la soglia non viene raggiunta, la segnalazione decade e tutti vengono notificati
- AC-20.5: La segnalazione collettiva può generare un documento unico con tutti i firmatari

---

## 7. EMERGENCY MODE

---

### US-CG-21: Attivare Emergency Mode

| Campo | Valore |
|-------|--------|
| **Priorità** | P0 |
| **Story Points** | 3 |

**Come** un inquilino che ha appena ricevuto uno sfratto o una comunicazione urgente  
**Voglio** attivare la modalità emergenza dall'app  
**Per** ricevere assistenza prioritaria entro 1 ora  

```gherkin
Scenario: Attivazione emergency mode — sfratto ricevuto
  Given l'utente ha ricevuto un avviso di sfratto
  When apre l'app e tocca il pulsante "Emergenza 🚨" (sempre visibile in header)
  Then il sistema mostra le opzioni rapide:
    - "Ho ricevuto uno sfratto"
    - "Il locatore mi ha tagliato le utenze"
    - "Devo essere sentito in tribunale domani"
    - "Altro"
  When l'utente seleziona "Ho ricevuto uno sfratto"
  Then il sistema attiva la priorità massima sulla pratica
  And invia notifica push a tutti gli avvocati verificati disponibili in zona
  And mostra una checklist di emergenza:
    1. Non firmare nulla senza assistenza
    2. Raccogli tutta la corrispondenza
    3. Contatta un avvocato (ne abbiamo avvisati 3 nella tua zona)
  And cronometro visibile: "Tempo medio di risposta avvocato: 45 min"

Scenario: Emergency mode — disattivazione
  Given l'utente ha attivato emergency mode per sbaglio o non serve più
  When tocca "Disattiva emergenza"
  Then il sistema chiede conferma "Sei sicuro? Disattivando l'emergenza perderai la priorità."
  When conferma
  Then la priorità torna a normale
  And gli avvocati ricevono notifica "Emergenza cancellata — non procedere"
  And la pratica torna allo stato precedente

Scenario: Emergency mode da utente anonimo
  Given un utente non autenticato vede il bottone "Emergenza 🚨"
  When lo tocca
  Then il sistema mostra "L'emergenza non aspetta. Registrati in 30 secondi per attivare il supporto prioritario."
  And guida l'utente in una registrazione rapida (solo email + nome)
  After la registrazione, l'utente può attivare l'emergenza
```

**Acceptance Criteria:**
- AC-21.1: Il pulsante "Emergenza 🚨" è sempre visibile nell'header su tutte le schermate (anche in modalità anonima)
- AC-21.2: La notifica agli avvocati viene inviata entro 1 minuto dall'attivazione
- AC-21.3: L'utente può caricare il documento urgente direttamente dalla schermata di emergenza
- AC-21.4: La disattivazione dell'emergenza notifica tutti gli avvocati contattati
- AC-21.5: KPI monitorato: tempo medio di risposta avvocato, mostrato all'utente

---

### US-CG-22: Generare Kit Emergenza

| Campo | Valore |
|-------|--------|
| **Priorità** | P1 |
| **Story Points** | 3 |

**Come** un utente che ha attivato l'emergency mode  
**Voglio** ricevere un kit di emergenza personalizzato con tutti i documenti pronti  
**Per** avere tutto ciò che serve per affrontare la situazione senza perdere tempo  

```gherkin
Scenario: Kit emergenza per sfratto
  Given l'utente ha attivato emergency mode per "sfratto"
  When il sistema genera il kit emergenza
  Then il kit include:
    1. Lista documenti da preparare (contratto, buste paga, ultima dichiarazioni redditi, stato famiglia)
    2. Template "Opposizione a sfratto" precompilato con i dati dell'utente
    3. Template "Richiesta gratuito patrocinio" se reddito < soglia
    4. Vademecum "I tuoi diritti in caso di sfratto" (PDF scaricabile)
    5. Collegamento rapido: "Trova avvocato ora"
  And ogni template è editabile e pronto per l'invio

Scenario: Kit emergenza per utenze tagliate
  Given l'utente ha attivato emergency mode per "utenze tagliate"
  When il sistema genera il kit
  Then il kit include:
    1. Template "Diffida urgente per sospensioni erogazione servizi" (art. 1580 Cod. Civ.)
    2. Istruzioni per contattare Polizia di Stato / Carabinieri (urgenza)
    3. Numeri utili: Acquirente Unico, ARERA, sportello del cittadino
    4. Template segnalazione ARERA per sospensione illegittima

Scenario: Kit emergenza — dati insufficienti
  Given l'utente non ha ancora caricato il contratto né dati personali
  When il sistema genera il kit
  Then i template sono compilati con placeholder "[INSERISCI DATI]"
  And il kit include una checklist "Prima di compilare, recupera: contratto, documento identità, codice fiscale"
  And l'utente può compilare direttamente dall'app
```

**Acceptance Criteria:**
- AC-22.1: Kit diversi per tipo di emergenza (sfratto, utenze tagliate, violenza, immissione in possesso)
- AC-22.2: Tutti i documenti del kit sono generati in formato PDF/A-2b
- AC-22.3: Se l'utente ha già dati salvati (contratto, profilo), vengono precompilati automaticamente
- AC-22.4: Il kit è scaricabile come ZIP unico o documento per documento
- AC-22.5: Il kit include sempre il vademecum informativo sui diritti dell'inquilino

---

## 8. ABBONAMENTO

---

### US-CG-23: Passare a Premium

| Campo | Valore |
|-------|--------|
| **Priorità** | P1 |
| **Story Points** | 3 |

**Come** un utente free che ha raggiunto i limiti del piano gratuito  
**Voglio** passare al piano Premium  
**Per** sbloccare funzionalità illimitate e supporto prioritario  

```gherkin
Scenario: Upgrade a Premium con successo
  Given l'utente è sul piano gratuito
  When seleziona "Passa a Premium" dalla schermata di abbonamento
  Then vede i piani disponibili:
    - Premium Mensile: €9,99/mese
    - Premium Annuale: €89,99/anno (risparmi 25%)
  When seleziona "Premium Annuale" e conferma pagamento (Apple Pay / Google Pay / Carta)
  Then l'account viene aggiornato immediatamente a Premium
  And tutte le funzionalità premium vengono sbloccate
  And riceve email di conferma con ricevuta fiscale
  And la data di rinnovo è impostata a 1 anno dalla data di acquisto

Scenario: Upgrade — pagamento rifiutato
  Given l'utente inserisce una carta di credito scaduta
  When tenta il pagamento
  Then il sistema mostra errore specifico: "Carta rifiutata: carta scaduta. Verifica la data."
  And non viene addebitato alcun importo
  And l'utente può riprovare con un altro metodo di pagamento

Scenario: Downgrade da Premium a Free (scadenza)
  Given l'utente Premium non rinnova l'abbonamento
  When la data di scadenza viene raggiunta
  Then il sistema notifica 7 giorni prima "Il tuo abbonamento Premium scadrà il XX/XX/XXXX"
  And alla scadenza, l'account torna al piano gratuito
  And le funzionalità premium vengono disattivate (pratiche extra diventano "solo lettura")
  And i dati non vengono eliminati — basta riabbonarsi per riattivare tutto
```

**Acceptance Criteria:**
- AC-23.1: Metodi pagamento: Apple Pay, Google Pay, carta di credito/debito (Stripe/adyen backend)
- AC-23.2: Periodo di prova gratuito di 14 giorni per Premium (se non già usato in passato)
- AC-23.3: Il downgrade non cancella dati — le funzionalità premium diventano "solo lettura"
- AC-23.4: Ricevuta fiscale inviata via email per ogni transazione
- AC-23.5: Rinnovo automatico con notifica 7 giorni prima

---

### US-CG-24: Limiti Piano Free Superati

| Campo | Valore |
|-------|--------|
| **Priorità** | P1 |
| **Story Points** | 2 |

**Come** un utente del piano gratuito  
**Voglio** vedere chiaramente quando supero un limite del piano free  
**Per** decidere se passare a Premium o aspettare il reset dei contatori  

```gherkin
Scenario: Superato limite domande Giusta
  Given l'utente free ha fatto 10 domande a Giusta (limite mensile)
  When prova a fare l'11° domanda
  Then Giusta mostra "Hai raggiunto il limite di 10 domande del piano gratuito. Passa a Premium per domande illimitate."
  And la chat rimane leggibile (cronologia) ma l'input è disabilitato
  And viene mostrato un contatore "Prossimo reset: 12 giorni"
  And l'utente può comunque leggere le risposte precedenti

Scenario: Superato limite upload vault
  Given l'utente free ha caricato 5 prove (limite 5)
  When tenta di caricare una sesta prova
  Then il sistema mostra "Limite vault raggiunto (5/5). Passa a Premium per spazio illimitato."
  And il file non viene caricato
  And suggerisce di eliminare una prova esistente per fare spazio

Scenario: Reset dei contatori del piano free
  Given l'utente free ha raggiunto il limite di 10 domande
  When all'inizio del nuovo mese riapre la chat con Giusta
  Then il contatore domande è stato resettato a 0/10
  And può fare nuovamente domande
  And riceve una notifica push "Il tuo saldo domande è stato resettato! Hai 10 nuove domande disponibili."
```

**Acceptance Criteria:**
- AC-24.1: Limiti free: 1 pratica attiva, 5 prove vault, 10 domande Giusta/mese, 1 segnalazione ASL/mese
- AC-24.2: I contatori mensili vengono resettati il primo giorno del mese successivo all'iscrizione
- AC-24.3: Le funzionalità bloccate mostrano sempre il CTA "Passa a Premium" con costo
- AC-24.4: I dati già caricati rimangono accessibili in lettura anche dopo il superamento del limite
- AC-24.5: Notifica push quando un contatore si resetta

---

## 9. PRIVACY E DATI

---

### US-CG-25: Esportare i Propri Dati (GDPR)

| Campo | Valore |
|-------|--------|
| **Priorità** | P1 |
| **Story Points** | 3 |

**Come** un utente dell'app  
**Voglio** esportare tutti i miei dati personali in formato standard  
**Per** esercitare il mio diritto di portabilità (GDPR Art. 20)  

```gherkin
Scenario: Esportazione dati completa
  Given l'utente ha: profilo completo, 1 contratto caricato, 5 prove vault, 10 domande Giusta
  When richiede "Esporta i miei dati" dalle impostazioni privacy
  Then il sistema prepara un archivio ZIP con:
    - dati_profilo.json (nome, email, data registrazione, preferenze)
    - contratti.json / contratti.pdf (dati estratti + file originale)
    - vault_prove.zip (tutti i file vault con metadati in JSON)
    - cronologia_giusta.json (domande e risposte)
    - pratiche.json (pratiche, stato, cronologia)
  And l'archivio è disponibile per il download entro 24 ore (entro 1 ora se < 50 MB)
  And l'utente riceve una email con il link di download (scade in 7 giorni)

Scenario: Esportazione dati — utente con pochi dati
  Given un utente appena registrato senza dati
  When richiede l'esportazione
  Then il sistema prepara comunque l'archivio con i dati del profilo
  And l'operazione è immediata (download diretto)
  And il JSON del profilo contiene almeno: data_registrazione, ID account, email

Scenario: Esportazione dati — richiesta multipla
  Given l'utente ha già richiesto un'esportazione 2 giorni fa
  When richiede una nuova esportazione
  Then il sistema mostra "Hai già una richiesta di esportazione in corso. Vuoi generare una nuova copia?"
  And la richiesta precedente non viene invalidata
  And la nuova richiesta parte da zero (dati aggiornati a oggi)
```

**Acceptance Criteria:**
- AC-25.1: Formati: JSON (dati strutturati), PDF/ZIP (documenti), CSV (dati tabellari)
- AC-25.2: La richiesta via app è immediata se i dati sono < 50 MB, altrimenti elaborazione asincrona (max 24h)
- AC-25.3: Il link di download scade dopo 7 giorni — prorogabile su richiesta
- AC-25.4: Tutti i dati esportati includono i metadati temporali (quando sono stati creati/modificati)
- AC-25.5: Conformità GDPR Art. 20 (portabilità) — formato strutturato, di uso comune, leggibile da automatico

---

### US-CG-26: Eliminare l'Account (Diritto all'Oblio)

| Campo | Valore |
|-------|--------|
| **Priorità** | P1 |
| **Story Points** | 3 |

**Come** un utente che non vuole più usare l'app  
**Voglio** eliminare definitivamente il mio account e tutti i dati associati  
**Per** esercitare il diritto all'oblio (GDPR Art. 17)  

```gherkin
Scenario: Eliminazione account con conferma
  Given l'utente è autenticato e ha dati salvati (contratti, prove, cronologia)
  When nelle impostazioni privacy seleziona "Elimina account"
  Then il sistema mostra un avviso di conferma a 3 step:
    1. "Cosa perderai: contratti, prove vault, cronologia Giusta, pratiche attive. Azione irreversibile."
    2. "Abbonamento premium attivo: verrà cancellato senza rimborso." (se applicabile)
    3. Digita "ELIMINA" per confermare
  When l'utente digita "ELIMINA" e conferma
  Then l'account viene marcato per eliminazione
  And l'utente riceve una email di conferma con link per annullare (valido 7 giorni)
  After 7 giorni, tutti i dati vengono cancellati definitivamente dai server
  And l'utente viene disconnesso e reindirizzato alla schermata di login
  And non è più possibile accedere con le stesse credenziali

Scenario: Annullamento eliminazione account (revoca)
  Given l'utente ha richiesto l'eliminazione account 2 giorni fa
  When clicca il link "Annulla eliminazione" ricevuto via email
  Then l'account viene riattivato immediatamente
  And tutti i dati sono nuovamente accessibili
  And l'utente riceve email "Eliminazione account annullata. Bentornato!"

Scenario: Eliminazione account con pratiche attive
  Given l'utente ha una pratica "Muffa bagno" in stato "In attesa di risposta diffida"
  When richiede l'eliminazione dell'account
  Then il sistema mostra avviso aggiuntivo "Hai una pratica attiva. Se elimini l'account, la pratica sarà abbandonata e non potrai più seguire il procedimento."
  And chiede "Confermi di voler abbandonare la pratica?"
  If l'utente conferma, la procedura di eliminazione prosegue
  Else l'eliminazione viene annullata e l'account resta attivo
```

**Acceptance Criteria:**
- AC-26.1: Periodo di grazia di 7 giorni tra richiesta di eliminazione e cancellazione effettiva
- AC-26.2: L'utente riceve una email con link per annullare l'eliminazione (valido 7 giorni)
- AC-26.3: Dopo la cancellazione effettiva, i dati sono irrecuperabili (nessun backup di ripristino)
- AC-26.4: Se l'utente ha un abbonamento Premium attivo, mostrare chiaramente che non ci sarà rimborso
- AC-26.5: Conformità GDPR Art. 17 (diritto all'oblio) — cancellazione completa dei dati personali
- AC-26.6: Eccezione: dati conservati per obblighi fiscali (fatture) per il periodo previsto dalla legge, ma resi anonimi

---

## Appendice A — Mappatura Priorità

| Priorità | Descrizione |
|----------|-------------|
| **P0** | Critico — necessario per il lancio MVP |
| **P1** | Importante — da completare entro il primo rilascio post-MVP |
| **P2** | Desiderabile — da schedulare in sprint successivi |

## Appendice B — Glossario

| Termine | Definizione |
|---------|-------------|
| **PEC** | Posta Elettronica Certificata — sistema di posta elettronica con valore legale |
| **PDF/A** | Standard ISO per documenti elettronici a lungo termine |
| **OCR** | Riconoscimento Ottico dei Caratteri |
| **Timestamp** | Marca temporale che certifica l'esistenza di un dato in un momento preciso |
| **Ledger distribuito** | Registro condiviso immutabile (es. blockchain testnet) per certificazione timestamp |
| **FOI** | Indice dei prezzi al consumo per famiglie di operai e impiegati (ISTAT) |
| **Gratuito patrocinio** | Assistenza legale a carico dello Stato per redditi bassi |

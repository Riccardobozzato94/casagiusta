# Product Requirements Document — CasaGiusta

| Campo | Valore |
|---|---|
| **Prodotto** | CasaGiusta — Piattaforma italiana di tutela inquilini |
| **Versione PRD** | 1.0 |
| **Stato** | Bozza iniziale |
| **Data** | Luglio 2026 |
| **Autore** | Team Product |
| **Docente** | per review |

---

## 1. Executive Summary

**Visione.** CasaGiusta è la prima piattaforma digitale italiana nata per colmare il gap di potere tra inquilino e locatore. Non un semplice aggregatore di moduli, ma uno **scudo digitale personale** (vault prove, AI legale, case tracker) combinato a un **hub di azione collettiva** (forum, matching avvocati, segnalazioni collettive). L'obiettivo è trasformare la paura di denunciare in azione strutturata, informata e conveniente.

**Target primario.** Under-40: studenti fuori sede, giovani professionisti in affitto nelle grandi città, lavoratori precari. Secondariamente: nuclei familiari a basso reddito, vittime di soprusi locatizi, e utenti over-50 che cercano un canale digitale semplice.

**Value proposition.** "La legge è dalla tua parte. CasaGiusta ti dà gli strumenti per farla rispettare." — Unico prodotto in Italia che unisce raccolta prove forense, assistenza AI su diritto locatizio, workflow guidati e community, tutto in un'unica piattaforma mobile-first.

**Differenziazione.** Le associazioni inquilini tradizionali (Unione Inquilini, SUNIA, Sicet) operano ancora con moduli cartacei, code agli sportelli e tempi di risposta di 2-6 settimane. CasaGiusta risponde in tempo reale, automatizza la burocrazia, usa AI per ridurre i costi legali, e offre trasparenza totale sullo stato della pratica.

---

## 2. Problema e Opportunità

### 2.1 Il mercato delle locazioni in Italia

- **8+ milioni** di contratti di locazione attivi (fonte: Osservatorio Mercato Immobiliare 2025).
- **~60% degli under-40** vive in affitto — percentuale in crescita per effetto del caro-mutui e della precarietà lavorativa.
- **Canone medio**: Milano €1.200/mese, Roma €900, Bologna €800, Padova €600.
- **Deposito cauzionale**: mediamente 3 mensilità (€1.800–€3.600 immobilizzati).
- **46%** degli inquilini ha subito almeno una violazione contrattuale (dati indagine interna panel 5.000 utenti).

### 2.2 Il problema

L'inquilino italiano affronta un'**asimmetria informativa e di potere** sistematica:

- **Paura di ritorsioni**: "Se denuncio, non mi rinnovano il contratto."
- **Costi legali proibitivi**: una diffida da avvocato parte da €300–500; una causa da €2.000–€5.000.
- **Processi lunghi**: sfratto per morosità 6–18 mesi; recupero deposito 1–3 anni.
- **Burocrazia ostile**: moduli incomprensibili, termini processuali ignoti, nessun supporto strutturato.
- **Raccolta prove debole**: foto sul telefono, conversazioni WhatsApp perse, nessuna catena di custodia.
- **Isolamento**: ogni inquilino vive il problema da solo, ignaro che altri 50 inquilini nello stesso stabile subiscano lo stesso abuso.

### 2.3 L'opportunità

| Leva | Perché ora |
|---|---|
| **Digital-first** | Il 94% degli under-40 usa smartphone per servizi. Nessun competitor offre tutela inquilini mobile-native. |
| **AI matura** | LLM + RAG consentono risposte legali accurate su diritto locatizio con citazioni, a costo quasi zero. |
| **Frustrazione record** | Caro-affitti, Pnrr fermo, emergenza abitativa — il sentiment sociale è al punto di rottura. |
| **Framework normativo aperto** | Legge 431/1998 + D.L. 66/2026 (Piano Casa) + giurisprudenza Cassazione accessibile digitalmente. |
| **Blockchain forense** | Prove con hash timestampato sono sempre più accettate in sede giudiziale (orientamento Cassazione 2024). |
| **Assenze nel mercato** | Nessuna piattaforma fa: vault prove + AI legale + action tracker + community. Ogni competitor copre al massimo 1 di questi 4 pillar. |

---

## 3. Target Utenti e User Personas

### Persona 1 — Sofia (24 anni, studentessa fuori sede)

| Tratto | Valore |
|---|---|
| **Età** | 24 |
| **Città** | Padova (fuori sede da Bari) |
| **Occupazione** | Studentessa magistrale in Psicologia |
| **Reddito** | ~€800/mese (borsa studio + part-time) |
| **Abitazione** | Camera singola in appartamento condiviso, €450/mese + spese |
| **Frustrazione** | A fine contratto il proprietario trattiene €1.350 di deposito con la motivazione vaga "danni alla tinteggiatura". Lei sa che la tinteggiatura ordinaria è a carico del locatore (art. 1576 c.c.). |
| **Bisogno** | Qualcuno che le dica chiaramente: "ha torto, manda questa diffida". Che le fornisca il modulo giusto, la guidi passo-passo, e non le costi un avvocato che non può permettersi. |
| **Comportamento digitale** | Smartphone-first, usa Instagram e WhatsApp, non ha mai inviato una PEC. Ha paura di esporsi. |

### Persona 2 — Marco (29 anni, developer a Milano)

| Tratto | Valore |
|---|---|
| **Età** | 29 |
| **Città** | Milano |
| **Occupazione** | Software developer, €45k RAL |
| **Abitazione** | Bilocale in zona Isola, €1.100/mese |
| **Frustrazione** | Dopo 2 anni, il proprietario chiede un aumento del 25% (€1.375/mese) senza alcun adeguamento ISTAT. Marco sa che l'aumento può essere al massimo del 75% della variazione ISTAT. |
| **Bisogno** | Calcolare l'aumento corretto, generare una raccomandata di contestazione, e se necessario trovare un avvocato specializzato in locazioni a Milano. |
| **Comportamento digitale** | Native digital, PEC già attiva, vuole automazione e API. Disposto a pagare per un servizio Pro che gli eviti ore di ricerca e carte bollate. |

### Persona 3 — Elena (35 anni, insegnante precaria)

| Tratto | Valore |
|---|---|
| **Età** | 35 |
| **Città** | Roma |
| **Occupazione** | Insegnante precaria, ~€1.400/mese |
| **Abitazione** | Monolocale in periferia, €650/mese |
| **Frustrazione** | Il proprietario si presenta senza preavviso, entra con le sue chiavi, fa commenti inappropriati. Lei ha paura a denunciare perché "lui conosce tutti in zona". Non ha prove se non la sua parola. |
| **Bisogno** | Un luogo sicuro dove documentare ogni episodio con timestamp, generare un kit prova per le forze dell'ordine, e sapere se può ottenere lo sfratto del locatore per molestie (art. 660 c.p.). |
| **Comportamento digitale** | Usa smartphone in modo base. Ha bisogno di un'interfaccia semplicissima, rassicurante, con tono empatico. |

### Persona 4 — Avv. Andrea (45 anni, specializzato locazioni)

| Tratto | Valore |
|---|---|
| **Età** | 45 |
| **Città** | Bologna |
| **Occupazione** | Avvocato civilista, studio indipendente |
| **Specializzazione** | Diritto immobiliare e locatizio |
| **Frustrazione** | Passa ore a rispondere a domande ripetitive, a spiegare la differenza tra 4+4 e 3+2, a ricostruire cronologie di episodi da screenshot e messaggi sparsi. Perde clienti perché "l'avvocato costa troppo". |
| **Bisogno** | Un flusso di lead qualificati con pratica già documentata e organizzata. Strumenti per collaborare con l'inquilino in modo efficiente. Un canale per offrire consulenze a tariffa fissa. |
| **Comportamento digitale** | Usa PEC, sistemi gestionali studio, WhatsApp Business. Interessato a partnership B2B. |

### Persona 5 — Sindacato Inquilini (partner istituzionale)

| Tratto | Valore |
|---|---|
| **Ente** | SUNIA/Sicet/Unione Inquilini — sede locale |
| **Staff** | 3-5 operatori volontari, over-50, competenza digitale base |
| **Frustrazione** | Centinaia di richieste a settimana, tutte da gestire manualmente. Lista d'attesa di 3 settimane. Nessun sistema di tracciamento. I giovani non vengono perché "è roba da vecchi". |
| **Bisogno** | Un portale white-label per digitalizzare l'accoglienza, ridurre il carico di lavoro ripetitivo, e offrire un servizio moderno ai propri iscritti. |
| **Comportamento digitale** | Bassa — servirà onboarding assistito e interfaccia essenziale. |

---

## 4. Problem Statement Dettagliato

Le associazioni inquilini tradizionali falliscono rispetto alle esigenze dell'inquilino moderno su 7 dimensioni chiave:

| Dimensione | Situazione attuale | Impatto | Target CasaGiusta |
|---|---|---|---|
| **Accesso** | Sportello fisico 2-4 ore al giorno, solo in grandi città | Un inquilino in provincia deve fare 50+ km per parlare con qualcuno | App mobile sempre disponibile, onboarding in 3 minuti |
| **Tempo di risposta** | 2-6 settimane per una prima risposta | L'inquilino perde fiducia e desiste | Risposta AI immediata; umana entro 24h su piano Pro |
| **Qualità informazione** | Operatore volontario non sempre aggiornato su novità normative | Consigli errati o incompleti | AI basata su knowledge base sempre aggiornata con citazioni alle fonti |
| **Raccolta prove** | "Porta le foto allo sportello" — nessuna struttura, nessuna catena di custodia | Prove perse, inammissibili, o non ordinate cronologicamente | Vault digitale con hash SHA-256, timestamp, categorie, export PDF |
| **Trasparenza** | "La settimana prossima richiama tu" — zero aggiornamenti proattivi | L'utente chiama 5 volte, si sente ignorato | Case tracker con timeline, notifiche push, stato sempre visibile |
| **Costo** | Gratuito ma lento; avvocato privato €300-500/h | Chi non ha budget resta senza tutela | Freemium: AI gratuita (con limiti) + Pro a €9,99/mese |
| **Copertura** | SUNIA presente in 60 province su 107 | 47 province senza alcuna assistenza inquilini strutturata | Nazionale via app + partnership con avvocati in 107 province |

**Effetto sistemico.** L'insieme di questi fallimenti produce una **rinuncia silenziosa**: il 62% degli inquilini che subiscono una violazione non intraprende alcuna azione (dato interno panel). Questo normalizza l'abuso e abbassa ulteriormente il potere contrattuale degli affittuari. CasaGiusta non risolve solo un problema individuale — **rompe un circolo vizioso sistemico**.

---

## 5. Core Features MVP (v1.0)

### 5.1 Onboarding Passwordless + Profilazione Contratto

**Descrizione.** L'utente accede senza password in meno di 60 secondi e carica il proprio contratto di locazione. L'AI estrae e struttura tutti i dati rilevanti.

**Flusso dettagliato:**

1. **Scelta metodo login**
   - Magic Link via email (link monouso, valido 15 min)
   - Apple ID / Google OAuth
   - Accesso anonimo (esplorazione senza dati personali, funzionalità limitate)

2. **Profilazione contratto**
   - Upload: PDF, foto multipla, scansione
   - OCR + AI extraction (modello fine-tuned su contratti-tipo italiani)
   - Dati estratti:
     - Tipo contratto: 4+4 (uso abitativo), 3+2 (concordato), transitorio (1-18 mesi), studenti
     - Canone mensile e decorrenza
     - Deposito cauzionale (importo, garantito o meno)
     - Data inizio / fine / scadenza tacita rinnovo
     - Clausole vessatorie evidenziate (es. "nessun rimborso per lavori straordinari")
     - Eventuali penali
   - L'utente conferma/corregge i dati estratti (interfaccia "tap-to-edit")

3. **Profilazione utente**
   - Città, regione (per normativa regionale — es. Lazio vs Lombardia)
   - Tipo immobile (monolocale, bilocale, trilocale, stanza)
   - Numero coinquilini
   - Fascia canone (per calcolo fondi/bonus)

**Output backend:** Profilo utente + contratto strutturato in DB PostgreSQL (Supabase). Contratto indicizzato per search + RAG.

---

### 5.2 Vault Prove Digitale

**Descrizione.** Un repository crittografato, immutabile e cronologicamente ordinato di tutte le prove relative al rapporto locatizio. Progettato per essere ammissibile in sede giudiziale.

**Specifiche funzionali:**

- **Upload multiformato**: foto (HEIC, JPEG, PNG), video (MP4, MOV), audio (M4A, MP3, WAV), documenti (PDF, DOCX, TXT)
- **Categorie obbligatorie al caricamento**:
  - Danni (foto/video dello stato dell'immobile)
  - Comunicazioni (mail, chat, lettere)
  - Bollette e pagamenti (ricevute, bonifici, MAV)
  - Ricevute (manutenzione, riparazioni)
  - Molestie (audio, messaggi, foto)
  - Altro (categoria aperta)
- **Immutabilità forense**: ogni file riceve hash SHA-256 calcolato lato server + timestamp NTP certificato. Opzionale: notarizzazione su testnet Ethereum (layer 2, gas sub-cent).
- **Timeline cronologica**: tutti i file ordinati per data evento (non data upload). Visualizzazione a bacheca o lista. Filtrabile per categoria e periodo.
- **Export forense**: esportazione in unico ZIP con report PDF riepilogativo + file originali + file hash.txt con checksum. Il report PDF include: riepilogo cronologico, per categoria, dettaglio hash per file.
- **Crittografia**: opzionale AES-256 client-side (chiave generata da passphrase utente, non nota al server). Se attivata, il server non può decifrare — l'utente gestisce la propria chiave.
- **Storage**: Supabase (PostgreSQL + S3-compatible bucket privati). Accesso via signed URL temporanei (15 min). Conservazione garantita 10 anni.
- **Capienza**: Free 200 MB | Pro 10 GB | Business illimitato.

---

### 5.3 AI Legal Assistant "Giusta"

**Descrizione.** Assistente conversazionale basato su RAG (Retrieval-Augmented Generation) specializzato esclusivamente in diritto locatizio italiano. Risponde in italiano semplice con citazioni alle fonti normative.

**Architettura knowledge base:**

| Fonte | Documenti | Copertura |
|---|---|---|
| Legge 431/1998 | Testo integrale + commentario | Disciplina locazioni abitative |
| Codice Civile artt. 1571-1654 | Testo integrale | Locazione in generale |
| D.L. 66/2026 (Piano Casa) | Testo integrale | Nuove agevolazioni 2026 |
| Legge di Bilancio 2026 — sezione casa | Estratti | Bonus, fondi, detrazioni |
| Giurisprudenza Cassazione 2020-2026 | 400+ sentenze | Orientamenti su deposito, morosità, molestie, manutenzione |
| Contratti-tipo (Osservatorio) | 12 template | 4+4, 3+2, transitorio, studenti |
| Circolari Agenzia Entrate | 30+ documenti | Cedolare secca, imposta di registro |
| Normativa regionale | Per ciascuna regione | Leggi regionali su edilizia, fondi morosità |

**Funzionalità:**

- Risposte a domande libere: "Il proprietario può entrare in casa senza preavviso?"
- Generazione documenti:
  - Diffida per restituzione deposito
  - Lettera contestazione aumento illegittimo
  - Richiesta scritta di manutenzione straordinaria
  - Segnalazione ASL per problemi igienico-sanitari
  - Segnalazione Comune per occupazione abusiva
  - Memoria difensiva per procedura di sfratto
- Citazioni cliccabili: ogni risposta legale include rimando alla fonte (es. "Art. 1576 c.c. — Manutenzione ordinaria a carico del locatore")
- Disclaimer persistente: in calce a ogni risposta, in evidenza: "⚠️ **Giusta non è un avvocato.** Le informazioni fornite hanno scopo orientativo. Per assistenza legale personalizzata, consulta un avvocato."
- **Limiti**: Free tier 10 richieste/giorno richieste a Giusta. Pro tier illimitate (fino a fair use 500/giorno).

---

### 5.4 Case Tracker & Action Center

**Descrizione.** Gestione guidata della pratica legale/amministrativa. L'utente non è mai solo: ogni passo è spiegato, ogni scadenza è tracciata, ogni azione è a portata di tap.

**Tipi pratica supportati:**

| Tipo | Trigger | Obiettivo |
|---|---|---|
| **Deposito non restituito** | Contratto scaduto, deposito trattenuto oltre 30gg | Diffida → mediazione → recupero |
| **Aumento illegittimo** | Richiesta aumento oltre limite ISTAT o senza giusta causa | Contestazione → accordo → azione legale |
| **Manutenzione mancata** | Danni gravi non riparati dopo richiesta scritta | Diffida → ordinanza comunale → azione |
| **Sfratto** | Ricevuta notifica sfratto per morosità/finita locazione | Verifica validità → difesa → mediazione |
| **Molestie** | Comportamenti molesti, abusivi, vessatori del locatore | Raccolta prove → querela → risarcimento |

**Workflow guidato step-by-step:**

1. **Check-in**: l'AI classifica il problema e alloca il tipo pratica.
2. **Istruzioni**: "Passo 1 — Raccogli queste prove. Passo 2 — Invia questa diffida. Passo 3 — ..."
3. **Azioni rapide**: da ogni step l'utente può generare il documento corrispondente (via Giusta), inviare PEC/email, scaricare PDF.
4. **Timeline interattiva**: ogni azione completata si aggiunge alla cronologia. L'utente vede il progresso. Le scadenze future sono segnate con countdown.
5. **Checklist**: elenco puntato delle attività completate/da fare, con percentuale di completamento.
6. **Scadenze automatiche**: il sistema calcola e notifica le scadenze legali (es. 30 giorni per contestare il deposito, 6 mesi per agire per vizi occulti).

---

### 5.5 Diritti & Calcolatori

**Descrizione.** Strumenti self-service per capire in 30 secondi se il contratto è regolare e quanto spetta.

**Tool #1 — "Il mio contratto è a norma?"**
- Questionario guidato (5 domande): tipo contratto, canone, durata, deposito, clausole
- Output semaforico: ✅ Verde (tutto ok) / 🟡 Giallo (anomalie minori) / 🔴 Rosso (violazioni)
- Dettaglio anomalie con spiegazione e azione consigliata

**Tool #2 — Calcolatore ISTAT canone**
- Input: canone attuale, data ultimo aggiornamento, tipo contratto
- Output: aumento massimo consentito (75% variazione ISTAT o limite 2026)
- Confronto con aumento richiesto dal locatore
- Storico annuale

**Tool #3 — Calcolatore deposito + interessi**
- Input: importo deposito, data inizio contratto, data fine, data rimborso (se avvenuto)
- Output: interessi legali maturati anno per anno, importo totale spettante
- Fonti: tasso interesse legale annuale (MEF)

**Tool #4 — Mappa fondi morosità incolpevole**
- Georiferimento per regione: fondi attivi, importo massimo, requisiti, scadenza bando
- Link diretto ai siti comunali/regionali
- Stima ammissibilità (3 domande)

**Calcolatori accessibili anche senza login** (landing page lead gen).

---

### 5.6 Community & Matching

**Descrizione.** Ecosistema collaborativo che trasforma l'inquilino isolato in una rete di mutuo supporto.

**Forum anonimo moderato per città:**
- Canali: Milano, Roma, Torino, Bologna, Napoli, Padova, Firenze, Genova, Bari, Palermo
- Thread categorizzati: contratti, depositi, manutenzione, proprietari, agenzie
- Moderazione AI + umana: nessun dato personale, niente incitamento a violenza, niente diffamazione
- Sistema karma: utenti che contribuiscono con risposte utili guadagnano visibilità

**Matching avvocati verificati:**
- Profilo avvocato: nome (o pseudonimo se preferisce), città, specializzazioni, anni esperienza, numero pratiche locazioni gestite
- Sistema recensioni solo da utenti verificati (hanno completato almeno una pratica)
- Tariffa: libera con indicazione fascia di prezzo (€ / €€ / €€€); piano Pro offre consulenza a tariffa fissa €99
- Prenotazione: calendario integrato, call via app (WebRTC) o di persona

**Segnalazione collettiva:**
- L'utente segnala un proprietario/agenzia con motivo
- Se altri utenti confermano (stesso proprietario, stesso abuso), il sistema apre automaticamente una segnalazione collettiva
- Download report collettivo PDF per esposto in Procura o invio a testata giornalistica locale

---

### 5.7 Emergency Mode

**Descrizione.** Accesso istantabile a kit di emergenza situazionale. Attivabile da bottone rosso permanente nell'header (anche in area non autenticata).

**Flusso:**

1. L'utente seleziona la situazione:
   - "Sono chiuso fuori casa e il proprietario non risponde"
   - "Ci sono infiltrazioni/pericolo strutturale"
   - "Il proprietario sta entrando senza permesso in questo momento"
   - "Ho appena ricevuto una notifica di sfratto"
   - "Sto subendo molestie in questo momento"

2. Kit prova immediato: checklist di cosa fotografare/registrare/subito, con timer.

3. **Contatti rapidi:**
   - Carabinieri (112) con apertura direct dial
   - ASL competente per zona (problemi igienico-sanitari)
   - Sportello comunale casa
   - Avvocato di turno (se presente nella rete CasaGiusta in quella città)

4. **Export situazione**: riepilogo PDF dello stato attuale della pratica (se l'utente ha una pratica aperta) da presentare alle autorità.

---

## 6. Roadmap Post-MVP

### v1.1 — Ottimizzazione e AI proattiva (Mese 2-3)

- **Notifiche push scadenze**: "Mancano 30 giorni alla scadenza del contratto. Vuoi preparare la richiesta di rinnovo?"
- **AI proattiva**: Giusta analizza periodicamente il vault prove e suggerisce azioni. "Abbiamo notato 3 foto di infiltrazioni caricate negli ultimi 2 mesi. Vuoi generare una diffida per manutenzione?"
- **Export avanzato**: report in formato wordprocessing (.docx) editabile
- **Performance**: lazy loading vault, thumbnail caching, compressione video upload

### v1.2 — Integrazione SPID/CIE e firma digitale (Mese 3-5)

- **SPID/CIE login**: accesso con identità digitale (SPID livello 2, CIE 3.0)
- **Firma digitale**: integrazione con produttori di firma remota (Aruba, InfoCert, Namirial)
- **Invio PEC**: da dentro l'app, con ricevuta di accettazione/consegna
- **Valore legale**: documenti generati con firma digitale hanno valore legale di raccomandata A/R

### v1.3 — Marketplace servizi (Mese 5-7)

- **Mediatori tariffa fissa**: professionisti abilitati che offrono mediazione a prezzo fisso (€99-€199)
- **Avvocati a pacchetto**: "Pacchetto deposito" (diffida + mediazione + causa) a €499
- **Tecnici**: perizie tecniche su danni immobili (geometri, ingegneri)
- **Commissione**: CasaGiusta trattiene 15% sul marketplace

### v2.0 — App proprietari "buoni" (Mese 7-10)

- **Certificazione CasaGiusta**: proprietari che rispettano uno standard di comportamento (canone tracciato, manutenzione regolare, deposito restituito in 30gg)
- **Badge visibile**: annunci con "Proprietario Certificato CasaGiusta"
- **Benefici per il proprietario**: rating pubblico, sconti su assicurazioni affitto, visibilità su portali partner (Idealista, Immobiliare.it via API)
- **Contratto digitale**: generazione contratto a norma con clausole conformi, senza costi notarili

### v2.5 — Class action digitale e lobby collettiva (Mese 10+)

- **Class action digitale**: raccolta adesioni per azioni collettive contro grandi proprietari o agenzie che violano sistematicamente i diritti
- **Lobby dati**: report aggregato annuale "Stato delle locazioni in Italia" basato su dati anonimizzati della piattaforma (canoni, violazioni, tendenze)
- **Open data**: API pubblica per enti di ricerca e policy maker (dati aggregati e anonimizzati)

---

## 7. Metriche di Successo (KPI)

| KPI | Definizione | Target M1 | Target M3 | Target M6 | Target M12 |
|---|---|---|---|---|---|
| **Activation** | % utenti che completano profilo + caricano contratto entro 24h dalla registrazione | >30% | >40% | >50% | >55% |
| **Retention D7** | % utenti ancora attivi al giorno 7 | >40% | >50% | >55% | >60% |
| **Retention D30** | % utenti ancora attivi al giorno 30 | >20% | >30% | >35% | >40% |
| **Casi risolti** | N. pratiche con almeno un'azione completata (es. invio diffida, contatto avvocato) | 100/mese | 500/mese | 1.000/mese | 5.000/mese |
| **NPS** | Net Promoter Score (survey in-app al mese 2) | — | >40 | >60 | >70 |
| **Free → Pro** | % utenti free che passano a piano Pro | >5% | >8% | >12% | >15% |
| **Stabilità** | Uptime API | >99% | >99.5% | >99.9% | >99.95% |
| **Sicurezza** | Data breach | 0 | 0 | 0 | 0 |
| **Tempo risposta Giusta** | Mediana tempo tra domanda e risposta AI (escluso network) | <3s | <2s | <1.5s | <1s |
| **Copertura avvocati** | Province italiane con almeno 1 avvocato partner verificato | — | 30/107 | 60/107 | 107/107 |

---

## 8. Vincoli e Assunzioni

### Vincoli normativi

- **GDPR compliance**: Dati personali (DPI) trattati secondo Regolamento UE 2016/679. Consenso esplicito per trattamento dati giudiziari (art. 10 GDPR). Diritto alla cancellazione ("diritto all'oblio") con procedura semplificata in-app.
- **DPO**: Data Protection Officer nominato e pubblicato. Indirizzo email dpo@casagiusta.it.
- **Data residency**: Tutti i dati (DB, file vault, log) ospitati su server in UE (Francia/Germania/Italia). Provider cloud: OVH, Hetzner, Scaleway, o region EU di Supabase.
- **Assicurazione RC professionale**: Copertura minima €1.000.000 per consulenza prestata (anche solo AI — a tutela dell'azienda).
- **Assicurazione cyber**: Copertura per data breach, ransomware, violazione dati terzi.
- **Accessibilità**: Conformità WCAG 2.2 AA. Test con screen reader.
- **Trasparenza AI**: Il modello utilizzato per Giusta deve essere documentato (versione, fonti, limiti). L'utente deve sapere quando interagisce con un'AI.

### Assunzioni

- **Disponibilità fonti legali**: Le fonti normative (leggi, sentenze, contratti-tipo) sono reperibili digitalmente e aggregabili in knowledge base. Assunzione: esistono API/pagine web ufficiali da cui fare scraping con autorizzazione.
- **Interesse avvocati**: Almeno 30 avvocati specializzati in locazioni accetteranno di entrare nella rete CasaGiusta nei primi 3 mesi. Incentivo: lead qualificati a costo zero.
- **Volontà di pagare**: Almeno l'8% degli utenti free sarà disposto a pagare €9,99/mese per il piano Pro. Validato da survey pre-lancio (n=500, 11% ha risposto "sì").
- **Fiducia nel vault**: Gli utenti caricheranno prove sensibili su una piattaforma terza, fidandosi della crittografia e della privacy. Mitigazione: crittografia end-to-end opzionale.
- **Adozione under-40**: Il target principale adotta app mobile per servizi. Validato: 94% degli under-40 ha almeno 5 app di servizi installate.

---

## 9. User Stories ad Alto Livello

| Codice | Titolo | Priorità | Story |
|---|---|---|---|
| **CG-01** | Login senza password | P0 | Come Sofia, voglio accedere con la mia email senza creare una password, per iniziare subito senza dover ricordare credenziali. |
| **CG-02** | Caricamento contratto | P0 | Come Sofia, voglio caricare una foto del mio contratto e ricevere i dati estratti automaticamente, per non doverli inserire a mano. |
| **CG-03** | Vault — caricamento prova | P0 | Come Elena, voglio caricare foto e messaggi come prova, categorizzandoli, per avere tutto organizzato in un posto sicuro. |
| **CG-04** | Vault — export forense | P1 | Come Marco, voglio esportare tutte le mie prove in un unico report PDF con hash, per consegnarlo al mio avvocato o in tribunale. |
| **CG-05** | Giusta — domanda libera | P0 | Come Marco, voglio chiedere "Il proprietario può aumentarmi il canone del 25%?" e ricevere una risposta chiara con la legge citata. |
| **CG-06** | Giusta — generazione diffida | P1 | Come Sofia, voglio generare una lettera di diffida per la restituzione del deposito, pronta da inviare, così evito di pagare un avvocato. |
| **CG-07** | Calcolatore ISTAT | P1 | Come Marco, voglio calcolare l'aumento massimo consentito per il mio canone, basato sull'ISTAT reale, per sapere se la richiesta del proprietario è legittima. |
| **CG-08** | Calcolatore deposito | P1 | Come Sofia, voglio calcolare quanto mi spetta di deposito + interessi legali, per sapere esattamente cosa chiedere. |
| **CG-09** | Case tracker — apertura | P0 | Come Sofia, voglio aprire una pratica "deposito non restituito" e vedere i passi da seguire, per non sbagliare niente. |
| **CG-10** | Case tracker — timeline | P1 | Come Elena, voglio vedere la cronologia di tutte le azioni fatte sulla mia pratica, per avere traccia del progresso. |
| **CG-11** | Case tracker — scadenze | P1 | Come Marco, voglio ricevere una notifica quando si avvicina una scadenza legale (es. 30gg per contestare), per non perdere termini. |
| **CG-12** | Community — forum città | P1 | Come Elena, voglio leggere esperienze di altri inquilini nella mia città, per capire se il mio problema è comune e come hanno reagito. |
| **CG-13** | Matching avvocato | P1 | Come Marco, voglio trovare un avvocato specializzato in locazioni a Milano, con recensioni verificate, per avere assistenza professionale. |
| **CG-14** | Segnalazione collettiva | P2 | Come Marco, voglio segnalare un proprietario abusivo e vedere se altri hanno avuto lo stesso problema, per agire insieme. |
| **CG-15** | Emergency mode | P1 | Come Elena, voglio un bottione rosso che mi dia subito cosa fare e chi chiamare in emergenza, per non dover cercare informazioni nel panico. |
| **CG-16** | Contratto checker | P0 | Come Sofia, voglio sapere se il mio contratto contiene clausole illegittime, per capire se devo preoccuparmi. |
| **CG-17** | Mappa fondi morosità | P2 | Come Marco, voglio sapere se esiste un fondo per morosità incolpevole nella mia regione e come fare domanda, per non perdere la casa. |
| **CG-18** | Profilo privacy | P1 | Come Elena, voglio controllare esattamente quali dati ho condiviso e cancellarli se voglio, per sentirmi sicura sulla piattaforma. |
| **CG-19** | Upgrade Pro | P1 | Come Marco, voglio passare al piano Pro per avere domande illimitate a Giusta e più storage, perché lo uso ogni giorno. |
| **CG-20** | Onboarding tutor | P1 | Come Sofia, voglio un tutorial interattivo di 3 passi al primo accesso, per capire subito cosa fare con CasaGiusta. |

---

## 10. Analisi Competitor

| Competitor | Tipo | Presenza in Italia | Focus locazioni | Vault prove | AI | Community | Prezzo | Gap |
|---|---|---|---|---|---|---|---|---|
| **DoNotPay** | App globale | ❌ No (solo US/UK) | ❌ Generale | ✅ Sì (base) | ✅ Sì | ❌ | $36/mese | Non opera in Italia, knowledge base common law, non specializzato locazioni |
| **Unione Inquilini** | Associazione | ✅ Nazionale | ✅ Sì | ❌ No | ❌ No | ✅ Fisica | Gratuito (tessera €30/anno) | Zero digitale, code fisiche, 2-6 settimane risposta, copertura parziale |
| **SUNIA / Sicet** | Sindacato | ✅ 60 province | ✅ Sì | ❌ No | ❌ No | ✅ Fisica | Gratuito (tessera) | Stessi limiti di Unione Inquilini — analogico, lento, non strutturato |
| **AvvocatoExpress** | Marketplace legale | ✅ Sì | ❌ Generale | ❌ No | ❌ No | ❌ | Da €149/consulenza | Generico, non specializzato, nessun tool per l'inquilino |
| **Confconsumatori / ADUC** | Associazione consumatori | ✅ Sì | ❌ Parziale | ❌ No | ❌ No | ❌ | Tessera annuale | Focus su consumi generali, sportello fisico, nessuna piattaforma digitale strutturata |
| **Lexroom** | Legal tech | ✅ Sì | ❌ Generale | ❌ No | ✅ Sì | ❌ | Da €199/pratica | B2B oriented, target aziende, non inquilini individuali |
| **CasaGiusta** | Platform | ✅ Dal lancio | ✅ Esclusivo | ✅ Forense | ✅ RAG specializzato | ✅ Moderata | Freemium + €9,99/mese | **Nessuno nel segmento** — unico prodotto che combina tutti e 4 i pillar |

### Analisi approfondita dei gap di mercato

**DoNotPay** è il riferimento internazionale, ma:
- Knowledge base basata su common law anglosassone — inapplicabile all'Italia
- Non supporta contratti 4+4, cedolare secca, ISTAT, o fondi morosità regionali
- Cancellazione progressiva del focus legale (oggi più "subscription cancellation" che tutela diritti)

**Associazioni inquilini** (Unione Inquilini, SUNIA, Sicet):
- Punto di forza: presenza capillare, conoscenza del territorio
- Punto di debolezza: zero investimento in tecnologia, personale volontario non sempre formato, nessuna standardizzazione dei processi
- Conseguenza: l'inquilino under-40 non le considera nemmeno — percepite come "roba da vecchi"

**Legal tech generalisti** (AvvocatoExpress, Lexroom):
- Punto di forza: piattaforma funzionante, payment integrato
- Punto di debolezza: approccio generalista, nessuna specializzazione su locazioni, nessun tool self-service prima di arrivare all'avvocato
- Conseguenza: costano come un avvocato tradizionale, senza risolvere il problema di accesso economico

### Posizionamento CasaGiusta

```
                    ALTO SUPPORTO DIGITALE
                          │
                          │   CasaGiusta
                          │
    BASSA SPECIALIZZ ─────┼────── ALTA SPECIALIZZAZIONE
       LOCAZIONI          │          LOCAZIONI
                          │
                    BASSO SUPPORTO DIGITALE
```

CasaGiusta occupa il quadrante **alto supporto digitale + alta specializzazione locazioni**, dove non esiste alcun competitor oggi in Italia.

---

## Appendice A — Glossario

| Termine | Definizione |
|---|---|
| **4+4** | Contratto a canone libero: 4 anni rinnovabili automaticamente per altri 4 |
| **3+2** | Contratto a canone concordato: 3 anni + 2 di rinnovo (agevolazioni fiscali) |
| **Transitorio** | Contratto da 1 a 18 mesi per esigenze temporanee (studenti, lavoratori trasfertisti) |
| **Cedolare secca** | Regime fiscale sostitutivo IRPEF con aliquota 21% (o 10% per canone concordato) |
| **ISTAT** | Istituto Nazionale di Statistica — l'aumento del canone è vincolato al 75% dell'indice FOI |
| **Diffida** | Atto stragiudiziale con cui si intima al locatore di adempiere entro un termine |
| **RAG** | Retrieval-Augmented Generation — tecnica AI che combina recupero documentale + LLM |
| **Vault** | Repository digitale con crittografia e immutabilità forense |

---

## Appendice B — Tabelle Prezzi (v1.0)

| Feature | Free | Pro (€9,99/mese) |
|---|---|---|
| Profilo + contratto | ✅ | ✅ |
| Vault prove | 200 MB | 10 GB |
| Esportazione forense | ✅ (limitato a 1 export/mese) | ✅ (illimitato) |
| Giusta AI | 10 richieste/giorno | Illimitate (500/giorno) |
| Generazione documenti | 3/mese | Illimitate |
| Case tracker | 1 pratica attiva | 5 pratiche attive |
| Calcolatori | ✅ | ✅ |
| Forum community | ✅ (sola lettura) | ✅ (lettura + scrittura) |
| Matching avvocato | ✅ (profilo visibile) | ✅ (prenotazione diretta) |
| Segnalazione collettiva | ✅ | ✅ |
| Emergency mode | ✅ | ✅ |
| Supporto | Chat AI | Chat AI + umano 24h |

**Sconto annuale**: €99/anno (risparmio 17%).

---

*Fine documento PRD CasaGiusta v1.0 — Prossimo step: Product Spec (SPEC) con requisiti funzionali dettagliati per engineering.*

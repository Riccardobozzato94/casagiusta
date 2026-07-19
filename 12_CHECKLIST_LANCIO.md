# Checklist Lancio — CasaGiusta v1.0

---

## PRE-LANCIO (T-14 giorni)

### Testing (QA)
- [ ] **Final testing su dispositivi reali**
  - iPhone 14 / 15 / 16 (iOS 17–18)
  - Google Pixel 7/8/9 (Android 14–15)
  - Samsung Galaxy S24+ / S25 (Android 14–15)
  - Tablet iPad (iPadOS) — responsive check
- [ ] **Flusso completo onboarding → contratto → vault → AI → caso → diffida**
  - Creazione account (email, Google, Apple ID)
  - Onboarding primo avvio (tutorial 5 schermate)
  - Upload contratto (foto, PDF, da file system)
  - Scannerizzazione e strutturazione automatica
  - Analisi AI Giusta (report vulnerabilità)
  - Creazione caso
  - Generazione diffida
  - Invio PEC (simulata)
  - Archiviazione automatica nel Vault
- [ ] **Emergency Mode — test completo**
  - Attivazione con tap singolo (Haptic feedback verificato)
  - Registrazione audio ambiente (permesso microfono)
  - Registrazione video (permesso camera)
  - Geolocalizzazione (accuracy < 50m)
  - Invio prova a contatti fidati (email + SMS)
  - Disattivazione e salvataggio
- [ ] **Pagamento sandbox RevenueCat**
  - Sottoscrizione mensile (sandbox)
  - Sottoscrizione annuale (sandbox)
  - Rinnovo automatico (simulato)
  - Disdetta (simulata)
  - Downgrade da Pro a Free
  - Ripristino acquisto (restore)
- [ ] **Notifiche push**
  - Permesso iOS/Android
  - Notifica caso aperto
  - Notifica scadenza contratto
  - Notifica messaggio AI Giusta
  - Notifica Emergency (silenziosa + alert)
  - Deep link dalla notifica
- [ ] **Deep link e magic link**
  - Passwordless login via email magic link
  - Deep link per ripristino password
  - Deep link per aprire caso specifico
  - Universal link / App Links funzionanti
- [ ] **Offline mode**
  - Vault accessibile offline (documenti cached)
  - AI Giusta offline con messaggio "connessione assente"
  - Coda azioni offline → sync quando tornato online
  - Nessun crash in assenza di rete

### GDPR & Compliance
- [ ] **DPIA completata e archiviata**
  - Identificati tutti i trattamenti ad alto rischio
  - Misure mitigazione documentate
  - DPO ha firmato la DPIA
  - DPIA disponibile per autorità su richiesta
- [ ] **Privacy Policy e ToS finali**
  - Revisione avvocato (data protection) completata
  - Revisione avvocato (contrattuale) completata
  - Traduzione inglese disponibile (per App Store Review)
  - Versione PDF firmata digitalmente archiviata
- [ ] **DPO nominato e contatti pubblicati**
  - Nome e contatti nell'app (Impostazioni → Privacy)
  - Nome e contatti su casagiusta.it/privacy
  - Nome e contatti nella Privacy Policy in-app
- [ ] **Cookie banner implementato**
  - Banner visibile al primo avvio
  - "Accetta tutti" / "Rifiuta tutti" / "Personalizza"
  - Consenso memorizzato (local storage)
  - Revoca possibile da Impostazioni
  - Nessun analytics attivo prima del consenso
- [ ] **Consenso marketing opt-in**
  - Checkbox separato (non pre-flaggae)
  - Doppio opt-in per email marketing
  - Revoca da impostazioni e da link in email
- [ ] **Data retention policy implementata**
  - Cron job cancellazione contratti > 10 anni (o notifica)
  - Cron job anonimizzazione chat AI > 24 mesi
  - Anonimizzazione irreversibile (nessun rollback)
  - Log cancellazione conservati per audit
- [ ] **Backup automazione configurata**
  - Backup database automatico giornaliero (Supabase)
  - Backup storage (contratti, prove) giornaliero (AWS S3)
  - Retention backup: 30 giorni
  - Test di ripristino: completato con esito positivo
  - Backup criptato (AES-256)

### Monitoring & Operations
- [ ] **Sentry attivo e configurato**
  - Source maps caricate per debug
  - Alert su crash rate > 0.1%
  - Alert su errori HTTP 500 > 5/min
  - Performance monitoring (traces)
  - Release tracking (ogni build)
  - User feedback (screenshot + log)
- [ ] **PostHog attivo e configurato**
  - Self-hosted (o EU cloud)
  - Eventi base tracciati: signup, login, upload_contract, ai_chat, create_case, send_diffida, emergency_activation
  - Feature flags: ai_giusta_v2, community, emergency_mode
  - Dashboard setup: MAU, retention, funnel onboarding
  - Anonymization IP attiva
  - No cookie tracking senza consenso
- [ ] **Alert escalation configurati**
  - PagerDuty / Opsgenie per criticità
  - Email + SMS per outage
  - On-call schedule settimanale
  - Runbook per:
    - Database down
    - AI API down (Anthropic)
    - Payment provider down
    - Data breach rilevato
    - Emergency Mode non funzionante
- [ ] **Load test Supabase**
  - Simulazione 1000 utenti concorrenti (K6/Locust)
  - Upload simultaneo contratti (100 file/min)
  - AI Giusta richieste concorrenti (50 req/sec)
  - Query dashboard caso
  - Verifica pooling connessioni
  - Limiti rate Supabase verificati e gestiti (retry + backoff)

### Documentation & Support
- [ ] **Knowledge base interna pronta**
  - FAQ per supporto (20 domande frequenti)
  - Template risposte email
  - Runbook tecnico per DevOps
  - Manuale onboarding per nuovi utenti (in-app)
- [ ] **Sistema di ticketing pronto**
  - Intercom / Crisp / Freshdesk integrato
  - Auto-response: "abbiamo ricevuto il tuo messaggio"
  - Categorizzazione: bug, supporto, emergenza, fatturazione
  - SLA: risposta < 4h (urgente), < 24h (normale)

---

## APP STORE PREPARAZIONE (iOS)

### Account e Developer
- [ ] **Apple Developer account attivo** (€99/anno)
  - D-U-N-S number verificato
  - Team agreement firmato
  - Certificati di distribuzione validi
- [ ] **App ID registrato**
  - Bundle ID: it.casagiusta.app (o similare)
  - Capabilities: Push Notifications, Sign in with Apple, App Groups
- [ ] **Certificati e profili**
  - Development certificate (valid 1 year)
  - Distribution certificate (valid 1 year)
  - Push notification certificate (Apple Push Services)
  - Provisioning profile: development + distribution
  - Renewal reminder configurato (scadenza 14 giorni prima)

### Assets Visivi
- [ ] **App Icon — tutte le varianti**
  - 1024x1024 (App Store, senza trasparenza)
  - iPhone: 60pt @2x (120x120), @3x (180x180)
  - iPad: 76pt @2x (152x152), 83.5pt @2x (167x167)
  - Notification: 20pt @2x (40x40), @3x (60x60)
  - Spotlight: 40pt @2x (80x80), @3x (120x120)
  - Settings: 29pt @2x (58x58), @3x (87x87)
  - Apple Watch: 24pt @2x (48x48), 27.5pt @2x (55x55), 44pt @2x (88x88)
  - Senza testo nel logo
  - Sfumatura viola → blu su sfondo scuro
- [ ] **Screenshots 6.7" (iPhone 16 Pro Max) — 1290x2796**
  - Schermata 1: Home Dashboard — "Il tuo scudo digitale" con riepilogo casi, contratti, indice vulnerabilità
  - Schermata 2: AI Giusta Chat — conversazione con report violazioni contratto
  - Schermata 3: Vault Prove — elenco documenti con icone (contratto, foto, PEC, chat)
  - Schermata 4: Case Tracker — dashboard caso aperto con timeline azioni
  - Schermata 5: Upload Contratto — scanner con fotocamera + risultato struttura
  - Schermata 6: Community — feed anonimo con post moderati
  - Tutte con device frame mockup
  - Testo in italiano nelle schermate
  - No placeholder generici (dati finti verosimili)
- [ ] **Screenshots 5.5" (iPhone 8 Plus / SE) — 1242x2208**
  - Stesse 6 schermate, layout adattato
- [ ] **App Preview video — 30 secondi**
  - Scene 1 (0-5s): onboarding veloce — "Il tuo scudo digitale"
  - Scene 2 (5-15s): upload contratto + analisi AI — "Carica e scopri"
  - Scene 3 (15-25s): diffida in 1 click — "Agisci subito"
  - Scene 4 (25-30s): CTA + logo — "Scarica ora"
  - Con sottotitoli italiani
  - Senza musica copyright
  - Risoluzione: 1080x1920 (portrait)

### Metadata App Store
- [ ] **App Name**: CasaGiusta: Tutela Inquilini
- [ ] **Subtitle**: AI legale + prove digitali
- [ ] **Keywords**: affitto, inquilino, locazione, casa, diritti, avvocato, contratto, deposito, agenzia entrate, sfratto
- [ ] **Description**: 1700 caratteri (dal file 10_LANDING_COPY.md)
- [ ] **Description (English)**: traduzione per review
- [ ] **Promotional Text**: "Nuova: AI legale + scudo digitale per inquilini — proteggi i tuoi diritti in 1 click"
- [ ] **What's New in This Version**: "Benvenuto su CasaGiusta! ✨ AI Giusta analizza il tuo contratto, Vault crittografato per le tue prove, Emergency Mode, Community. I tuoi diritti, subito."
- [ ] **Version**: 1.0.0
- [ ] **Build number**: 1 (sarà incrementata a ogni submission)
- [ ] **Copyright**: 2026 CasaGiusta SRL
- [ ] **Primary Category**: Lifestyle
- [ ] **Secondary Category**: Utilities

### URLs
- [ ] **Privacy URL**: https://casagiusta.it/privacy
- [ ] **Support URL**: https://casagiusta.it/support
- [ ] **Marketing URL**: https://casagiusta.it

### Review & Submission
- [ ] **Demo account test fornito**
  - Email: review@casagiusta.it
  - Password: fornita in Review Notes
  - Piano: Pro (sandbox, durata 30 giorni)
  - Note: "Account già popolato con contratto demo, caso aperto, chat AI"
- [ ] **Review Notes dettagliate**
  - Descrizione funzionalità principali
  - Eventuali login richiesti
  - Eventuali configurazioni speciali
  - Area riservata per reviewer (admin?)
- [ ] **Contact info**: sviluppatore@casagiusta.it
- [ ] **Sign in with Apple obbligatorio** (se app usa login social)
- [ ] **TestFlight**: beta build caricata e testata da almeno 1 reviewer esterno
- [ ] **No piattaforme di gambling, no contente esplicito**
- [ ] **Rating: 4+** (nessuna violenza esplicita, ma Emergency Mode potrebbe far scattare 12+ per riferimenti a situazioni di pericolo) — verificare con linee guida
- [ ] **Export Compliance**: nessuna crittografia dichiarabile (AES-256 standard) — spuntare "sì, conforme"

---

## PLAY STORE PREPARAZIONE (Android)

### Account e Developer
- [ ] **Google Play Console account attivo** ($25 una tantum)
  - Developer Registration completata
  - D-U-N-S number (se richiesto)
- [ ] **App signing**: Google Play App Signing configurato
- [ ] **Keystore**: upload key salvata in luogo sicuro + backup
- [ ] **API Access**: Google Play Developer API configurata (per automazione)

### Assets Visivi
- [ ] **App Icon**: 512x512 (conforme Google Play design guidelines — adaptive icon: 108dp foreground + 108dp background)
  - Foreground: scudo + casa stilizzata
  - Background: gradient viola scuro
  - Adaptive icon per Android 8+ generata
  - Legacy icon (MDIP) per versioni precedenti
- [ ] **Feature Graphic**: 1024x500
  - Testo: "CasaGiusta — Tutela Inquilini"
  - Sfondo: gradient viola → blu
  - CTA implicita: "Scarica su Google Play"
  - No testo in basso (coperto da Play Store badges)
- [ ] **Screenshots — minimo 8**
  - Telefono (portrait): 6 screenshots (stesse schermate iOS)
  - Tablet (landscape): 2 screenshots opzionali
  - Lingua: italiano (default)
  - Seconda lingua: inglese (per mercati internazionali, opzionale al lancio)
  - Risoluzione minima: 1080x1920
  - Nessun mockup trasparente (Play Store prefers full bleed)

### Metadata Play Store
- [ ] **Title**: CasaGiusta: Tutela Inquilini
- [ ] **Short Description** (80 caratteri): AI legale + vault prove digitali. Tutela i tuoi diritti d'inquilino in 1 click.
- [ ] **Full Description** (4000 caratteri): dal file 10_LANDING_COPY.md
- [ ] **Category**: Lifestyle
- [ ] **Tags**: affitto, casa, inquilino, diritti, locazione, avvocato, contratti
- [ ] **Content Rating**: Everyone (verificare: Emergency Mode potrebbe richiedere PEGI 12 per riferimenti a situazioni di pericolo) → compilare questionario Google
- [ ] **Target audience**: 18+
- [ ] **Price**: Free (con acquisti in-app)
- [ ] **In-app Products**: Pro Monthly (€4.99), Pro Annual (€39)
  - Setup in Play Console collegato a RevenueCat
  - Test acquisto in sandbox completato

### URLs
- [ ] **Privacy Policy URL**: https://casagiusta.it/privacy
- [ ] **App URL**: https://casagiusta.it
- [ ] **Support Email**: supporto@casagiusta.it
- [ ] **Support Phone**: [opzionale]

### Testing & Publishing
- [ ] **Internal test track**: almeno 5 tester interni, 24h test
- [ ] **Closed test track**: 20 tester esterni (email + opt-in), 7 giorni test richiesti per account nuovo
- [ ] **Open test track**: produzione-like, per beta pubblici
- [ ] **Managed publishing**: ON (non pubblicare automaticamente — approvazione manuale)
- [ ] **Review time previsto**: 2–7 giorni (Play Store)

---

## GDPR & COMPLIANCE — FINALE

- [ ] **DPIA completata e firmata**
- [ ] **Registro trattamenti aggiornato**
  - Excel / tool con: finalità, base giuridica, dati, retention, destinatari, misure sicurezza
  - Aggiornato a ogni nuovo trattamento
- [ ] **Consenso cookie**: banner funzionante e testato (storico consensi)
- [ ] **Consenso marketing**: separato, opt-in, documentato (storico)
- [ ] **Diritto all'oblio**: delete flow implementato e testato
  - Cancellazione account → email conferma → cancellazione dati in 30gg
  - Eccezione: dati fiscali conservati 10 anni (contratti)
- [ ] **Portabilità dati**: export funzionante
  - JSON strutturato con tutti i dati personali
  - Download disponibile dalle impostazioni app
  - Tempo di generazione < 5 min
- [ ] **Data breach notification procedure**
  - Template notifica Garante (72h)
  - Template notifica interessati (48h)
  - Template comunicazione stampa (se necessario)
  - Responsabile: DPO + CTO
  - Runbook: discovery → containment → assessment → notification → remediation
- [ ] **DPO disponibile e contattabile**
  - Email dpo@casagiusta.it monitorata
  - Tempo risposta garantito: 30 giorni (target: 5 giorni)
  - Sostituto DPO in caso di assenza
- [ ] **Data residency EU verificata**
  - AWS eu-south-1 (Milano) — primario
  - AWS eu-central-1 (Francoforte) — backup
  - Supabase EU (Francoforte)
  - Nessun dato in uscita SEE senza SCC
- [ ] **Sub-processors mappati**
  - AWS: infrastruttura cloud
  - Supabase: database, auth, storage
  - Anthropic: AI models
  - Google Cloud: AI accessori
  - Resend: email
  - Stripe: pagamenti
  - RevenueCat: abbonamenti
  - Sentry: crash reporting
  - PostHog: analytics (self-hosted)
- [ ] **DPA firmati con tutti i sub-processors**
  - AWS (DPA allegato al contratto AWS)
  - Supabase (DPA firmato)
  - Anthropic (DPA firmato)
  - Google Cloud (DPA firmato)
  - Resend (DPA firmato)
  - Stripe (DPA firmato)
  - RevenueCat (DPA firmato)
  - Sentry (DPA firmato)
  - PostHog (DPA — self-hosted, non necessario se nessun dato EU inviato)
- [ ] **Disclaimer su ogni output AI**
  - "AI Giusta è uno strumento di assistenza basato su AI generativa. Non costituisce consulenza legale professionale."
  - Visibile in chat AI Giusta (banner persistente)
  - Visibile nelle diffide generate (footer)
  - Visibile nelle email generate
- [ ] **Termini di servizio accessibili dall'app**
  - Link in Impostazioni → Legali
  - Link in fase di registrazione (checkbox "Accetto")
  - Versione sempre aggiornata (data in testa)
  - PDF archiviato per versioni precedenti

---

## LANCIO (Settimana 8 — D-Day)

### Go-Live Steps
- [ ] **Soft launch: solo Italia**
  - App Store: rilasciata in Italia (non worldwide)
  - Play Store: rilasciata in Italia (non worldwide)
  - Motivazione: validazione prodotto in mercato domestico prima di espansione
- [ ] **PostHog feature flags attivi**
  - `ai_giusta`: ON (100%)
  - `community`: ON (100%)
  - `emergency_mode`: ON (100%)
  - `vault_sharing`: ON (100%)
  - `new_onboarding_v2`: OFF (A/B test futuro)
  - Kill switch per ogni feature (disattivazione immediata via PostHog)
- [ ] **Sentry monitoraggio attivo**
  - Release 1.0.0 tagged
  - Alert inviati a Slack/Email del team
  - Performance monitoring attivo
- [ ] **Support email pronto**
  - supporto@casagiusta.it: ticket system integrato
  - Auto-responder: "Grazie per averci contattato. Ti risponderemo entro 24h."
  - Template risposte per categorie
  - SLAs: Urgente < 4h, Normale < 24h
- [ ] **Landing page aggiornata**
  - Link App Store: https://apps.apple.com/it/app/casagiusta/id[ID]
  - Link Play Store: https://play.google.com/store/apps/details?id=it.casagiusta.app
  - Badge store immagini e deep link
  - QR code per scan rapido
  - Testimonianze (almeno 3 reali o placeholder)
  - Prezzi aggiornati
- [ ] **Social media annuncio**
  - **Twitter/X**: thread con 5 tweet (problema → soluzione → features → download → CTA)
  - **LinkedIn**: articolo "Nasce CasaGiusta: la prima piattaforma italiana di tutela attiva per inquilini"
  - **Instagram**: reel 30s + carosello features + storia "Siamo live!"
  - **TikTok**: video breve "3 diritti che ogni inquilino dovrebbe conoscere"
  - Hashtag: #CasaGiusta #DirittiInquilini #TutelaInquilini #AffittoSicuro #Casa
  - Grafiche coerenti col brand (viola/blu, scudo)
  - Link su bio: casagiusta.it
- [ ] **Beta testers ringraziati**
  - Email personalizzata di ringraziamento
  - Codice sconto: 3 mesi Pro gratis
  - Menzione in "Special Thanks" in-app (splash screen?)
- [ ] **Changelog v1.0 pubblicato**
  - Su casagiusta.it/changelog
  - Su GitHub Releases (se pubblico il repo)
  - In-app: Schermata "Cosa c'è di nuovo" al primo avvio post-update
  - Contenuto: "Benvenuto su CasaGiusta! Prime funzionalità: AI Giusta, Vault, Case Tracker, Emergency Mode, Community."

### Comunicati Stampa (opzionale)
- [ ] **Comunicato stampa "Nasce CasaGiusta"**
  - Inviato a: ANSA, Il Sole 24 Ore, Wired Italia, TechCrunch Italia, StartupItalia, La Repubblica (Casa), Corriere della Sera (Casa)
  - Oggetto: "CasaGiusta, la prima piattaforma italiana di tutela attiva per inquilini, debutta su App Store e Google Play"
  - Contatti media: press@casagiusta.it
  - Kit media: logo, screenshots, video, biografia founder, Q&A

---

## POST-LANCIO (Prime 72h)

### Monitoraggio Reattivo
- [ ] **Crash monitoring (Sentry)**
  - Frequenza: ogni 30 min nelle prime 24h
  - Soglia allerta: crash rate > 0.5%
  - Hotfix via EAS Update (OTA) se necessario
- [ ] **Server monitoring (Supabase dashboard)**
  - Database connections pool
  - API response times
  - Storage usage
  - Rate limiting alerts
- [ ] **AI cost monitoring (Anthropic dashboard)**
  - Cost per request
  - Token utilization
  - Daily budget alert (soglia: €50/giorno)
  - Monthly budget alert (soglia: €1.500/mese)
- [ ] **Support ticket SLA**
  - Tempo medio prima risposta: < 2h (urgente), < 8h (normale)
  - Niente ticket lasciato aperto > 24h senza risposta
  - Escalation automatica se SLA violato
- [ ] **App Store review monitoring**
  - Rispondere a tutte le review entro 24h
  - Review positive: ringraziare
  - Review negative (3★ o meno): contattare per supporto, chiedere dettagli, offrire soluzione
  - Non cancellare review negative — usarle per migliorare
- [ ] **Feedback loop interno**
  - Standup giornaliero team (30 min) per prime 72h
  - Prioritizzazione:
    - P0: crash, dati persi, pagamenti bloccati, Emergency Mode down
    - P1: feature rotte, AI non funzionante, login bloccato
    - P2: miglioramenti UI/UX, richieste feature
    - P3: bug cosmetici, ottimizzazioni
  - Hotfix: EAS Update (OTA per JS) entro 2h per P0
  - Update App Store/Play Store: nuova build entro 24h per P0/P1

### Hotfix Procedure
- [ ] **EAS Update (OTA — Expo)**
  - Aggiornamenti JavaScript over-the-air (no review App Store)
  - Per fix urgenti: UI bug, testi, configurazioni
  - Branch: hotfix/descrizione
  - Deploy: EAS Update --branch production --message "fix: descrizione"
  - Verifica su device reale dopo deploy
- [ ] **Native update (richiede review)**
  - Per fix nativi: moduli nativi, crash iOS/Android
  - Build, submit, wait review
  - Tempistica: 1–3 giorni App Store, 2–7 giorni Play Store
  - Comunicare agli utenti: "Aggiornamento disponibile su Store"

### Metriche di Successo (Prime 72h)
| KPI | Target |
|---|---|
| Download | > 500 |
| Registrazioni | > 300 |
| Contratti caricati | > 100 |
| AI Giusta messaggi | > 1.000 |
| Casi aperti | > 50 |
| Diffide generate | > 20 |
| Crash-free rate | > 99.5% |
| Recensioni App Store | > 4.0 ★ |
| Support ticket aperti | < 50 |
| Tempo medio risposta | < 4h |
| Costo AI per utente | < €0.50 |

---

## STRATEGIA ACQUISIZIONE (Primo Mese)

### ASO (App Store Optimization)
- [ ] **Keyword monitoring**
  - Keywords principali: "affitto", "inquilino", "contratto affitto", "diritti casa", "avvocato affitto"
  - Keywords secondarie: "deposito cauzionale", "sfratto", "agenzia entrate", "codice civile"
  - Tools: AppFollow / AppTweak per tracking posizioni
  - Report settimanale posizioni keyword
  - Iterare description e keywords in base ai dati
- [ ] **A/B test screenshots** (App Store Connect)
  - Variante A: schermate attuali
  - Variante B: schermate con più testo (value prop)
  - Variante C: schermate con testimonianza incorporata
  - Durata test: 7 giorni per variante
  - Vincitore: install conversion rate
- [ ] **Play Store A/B test**
  - Titolo e short description (3 varianti)
  - Icon (2 varianti)
  - Feature graphic (2 varianti)
  - Test durata: 14 giorni

### Content Marketing
- [ ] **4 articoli su diritto locatizio**
  - Articolo 1: "Deposito cauzionale non restituito? Ecco come recuperarlo" (blog + LinkedIn)
  - Articolo 2: "Clausole vessatorie nei contratti di affitto: cosa dice la legge" (blog + Medium)
  - Articolo 3: "Sfratto ingiusto: i tuoi diritti e come difenderti" (blog + Instagram carousel)
  - Articolo 4: "Contratto d'affitto non registrato: rischi e conseguenze" (blog + Twitter thread)
  - SEO: parole chiave a coda lunga (es. "come recuperare deposito cauzionale non restituito")
  - Distribuzione: blog su casagiusta.it, repost su Medium, LinkedIn Articles
  - Lead magnet: "Guida PDF gratuita: I 10 diritti che ogni inquilino dovrebbe conoscere" (email opt-in)
- [ ] **Newsletter settimanale**
  - Nome: "CasaGiusta Weekly"
  - Contenuto: novità legali, tips, testimonianze, promozioni
  - Cadenza: 1 volta a settimana (martedì mattina)
  - Tool: Resend + coda automatica

### Partnership
- [ ] **3 studi legali verificati**
  - Studio Legale Bianchi & Associati (Milano) — diritto locatizio
  - Studio Legale Rossi & Partners (Roma) — contenzioso locazioni
  - Studio Legale Verdi (Padova) — tutele inquilini
  - Accordo: referral reciproco (app → avvocato, avvocato → app)
  - Compenso: flat mensile + referral fee (20% primo mese abbonamento Pro)
  - DPA firmato per trattamento dati condivisi
- [ ] **2 sindacati inquilini**
  - Sindacato Inquilini Padova (SIP)
  - Unione Inquilini Milano
  - Accordo: promozione reciproca, sconti per associati (30% su Piano Pro)
  - Materiale informativo congiunto (volantini + PDF)
- [ ] **Università (volantinaggio digitale)**
  - Padova: Università degli Studi di Padova — Studentato
  - Bologna: Università di Bologna — ER.GO
  - Milano: Università Statale Milano, Politecnico
  - Roma: Sapienza, Roma Tre
  - Canali: bacheche gruppi Facebook studenti, Instagram student housing, volantini digitali
  - Offerta speciale: "Studente fuorisede? 3 mesi Pro gratis con email universitaria"
  - Contenuto: "Proteggi il tuo contratto d'affitto — scarica CasaGiusta"

### Social Media Strategy
- [ ] **Instagram / TikTok: educational content**
  - Formato: Reel / TikTok 30–60 secondi
  - Cadenza: 3 Reel + 2 caroselli a settimana
  - Topic:
    - "3 segnali che il tuo contratto d'affitto è una truffa"
    - "Cosa fare se il proprietario ti chiede di andartene senza preavviso"
    - "Deposito cauzionale: quanto ti deve restituire (con calcolo interessi)"
    - "Clausole vessatorie: le 5 peggiori che abbiamo visto"
    - "Emergency Mode: come funziona il nostro pulsante di emergenza"
    - Storia utente: "Marco ha recuperato 2.400€ in 7 giorni"
  - Hashtag: #CasaGiusta #Affitto #Inquilino #Diritti #Università #StudentiFuorisede #Casa
  - Storie: sondaggi, Q&A, "La clausola del giorno"
- [ ] **Reddit**
  - r/italia: post "Ho creato un'app per tutelare gli inquilini — AMA"
  - r/Universitaly: post "Studenti fuorisede, sapete che il 60% dei contratti ha clausole abusive?"
  - r/Avvocati: post collaborativo "Segnalate le violazioni locatizie più frequenti"
  - r/ItaliaPersonalFinance: post "Deposito cauzionale non restituito? Guida pratica"
  - No spam — contenuto di valore + link in bio
- [ ] **Facebook**
  - Gruppi: "Affitto a Milano", "Studenti Fuorisede Padova", "Case in affitto Bologna", "Inquilini Roma"
  - Post: educational (non pubblicitario)
  - Targeted ads: €200/mese su pubblico 18–30, studenti, grandi città
  - Creatives: video testimonianza + carosello features

### Influencer / Creator (Q2)
- [ ] **Micro-influencer diritto/università**
  - 5 creator con 5K–50K follower
  - Nicchia: studenti fuori sede, diritto, legal edu, lifestyle studentesco
  - Formato: 1 Reel di review + 1 Storia di Q&A
  - Compenso: Pro annuale gratuito + €100–300 per creator
- [ ] **Legal TikToker**
  - Avvocati con presenza social (es. @avvocatodelweb, @ladottorina)
  - Formato: "Casi incredibili di contratti d'affitto" + menzione CasaGiusta
  - Compenso: da definire (pro bono? referral?)

### KPIs Primo Mese
| KPI | Target |
|---|---|
| Download totali | > 3.000 |
| Registrazioni | > 1.500 |
| Tasso conversione Free → Pro | > 5% |
| Contratti caricati | > 500 |
| AI Giusta messaggi | > 10.000 |
| Casi aperti | > 200 |
| MAU (Mensili Attivi) | > 1.000 |
| DAU (Giornalieri Attivi) | > 200 |
| Retention D1 | > 40% |
| Retention D7 | > 20% |
| Retention D30 | > 10% |
| Recensioni App Store | > 4.2 ★ (minimo 20 review) |
| Costo acquisizione utente (CAC) | < €2.00 |
| Customer Lifetime Value (LTV) Pro | > €30 |
| Articoli pubblicati | 4 |
| Partnership attive | 5 |
| Social follower totali | > 2.000 |

---

## RUN-BOOK: PRIME 72H DI LANCIO

```
GIORNO 1 (D-Day — Mattina)
  09:00 — Verifica store: build approvata e live
  09:15 — Verifica landing page: link store funzionanti
  09:30 — Verifica acquisti: sottoscrizione reale funzionante
  10:00 — Annuncio social: Twitter/X, LinkedIn, Instagram, TikTok
  11:00 — Comunicato stampa inviato
  12:00 — Primo check Sentry: crash rate, error rate
  14:00 — Primo check server: DB connections, storage, AI cost
  18:00 — Standup: metriche prime 8h
  22:00 — Check notturno: server OK, nessun alert

GIORNO 2 (D+1)
  09:00 — Review risposte a ticket supporto
  10:00 — Review recensioni App Store (rispondere a tutte)
  12:00 — Check metriche: download, registrazioni, retention
  14:00 — Prioritizzazione bug/feedback
  16:00 — Hotfix se necessario (EAS Update)
  18:00 — Standup: metriche giorno 2

GIORNO 3 (D+2)
  09:00 — Report prime 48h: tutto stabile?
  10:00 — Review traffico: landing page, store impressions
  12:00 — Check costi AI: budget giornaliero rispettato?
  14:00 — Pianificazione sprint settimana 2 (fix + migliorie)
  18:00 — Standup finale 72h: go/no-go per lancio worldwide?
```

## EMERGENZA: CONTATTI

| Ruolo | Nome | Telefono | Email |
|---|---|---|---|
| Fondatore / CEO | [Nome] | [Cell] | [Email] |
| CTO | [Nome] | [Cell] | [Email] |
| DPO | [Nome] | [Cell] | dpo@casagiusta.it |
| DevOps on-call | [Nome] | [Cell] | [Email] |
| Support lead | [Nome] | [Cell] | supporto@casagiusta.it |
| Avvocato di fiducia | [Nome] | [Cell] | [Email] |
| Contatto Apple Developer | — | — | sviluppatore@casagiusta.it |
| Contatto Google Play | — | — | sviluppatore@casagiusta.it |
| Anthropic support | — | — | support@anthropic.com |
| Supabase support | — | — | support@supabase.com |

---

*Checklist generata per CasaGiusta v1.0. Aggiornare a ogni nuovo release.*
*Ultimo aggiornamento: [Data]*

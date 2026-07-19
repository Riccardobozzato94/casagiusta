# Piano di Sviluppo MVP — CasaGiusta

> **Periodo**: 8 settimane (8 sprint da 1 settimana)
> **Team**: 1 founder tecnico + freelancer part-time (settimane 3-6)
> **Metodo**: Scrum-like con daily standup async su Discord/Telegram
> **Stime**: 🟢 Facile (ore) · 🟡 Media (giorni) · 🔴 Complessa (settimane)

---

## Legenda Priorità

| Priorità | Significato |
|----------|-------------|
| **P0** | Must-have — bloccante per il lancio |
| **P1** | Should-have — fondamentale ma non bloccante |
| **P2** | Nice-to-have — dopo il lancio |

---

## Sprint 1 — Fondazione (Settimana 1)

**Focus**: Setup progetto, autenticazione, onboarding, navigazione base.

| # | Task | Priorità | Stima | Dipendenze |
|---|------|----------|-------|------------|
| 1.1 | Setup monorepo (Turborepo + Expo + Next.js) | P0 | 🟡 2g | — |
| 1.2 | Config TypeScript strict + ESLint + Prettier | P0 | 🟢 4h | 1.1 |
| 1.3 | Setup Supabase project (ambiente dev + staging) | P0 | 🟢 2h | — |
| 1.4 | Migrazioni DB iniziali: `users`, `profiles`, `contracts` | P0 | 🟢 3h | 1.1 |
| 1.5 | Auth: Magic Link + Apple Sign In + Google Sign In | P0 | 🔴 4g | 1.2 |
| 1.6 | Modalità anonima (sessione locale, upgrade guidato) | P1 | 🟡 2g | 1.5 |
| 1.7 | Onboarding carosello (4 slide, swipe + skip) | P1 | 🟡 1g | 1.1 |
| 1.8 | Design tokens + Tailwind config (colori, typo, spacing) | P0 | 🟢 4h | — |
| 1.9 | Bottom navigation + layout base (Tab Navigator) | P0 | 🟡 1g | 1.1 |
| 1.10 | CI/CD: GitHub Actions (lint + typecheck) + EAS Build | P1 | 🟡 1g | 1.1 |

**Deliverable**: App che si apre → login funzionante (Magic Link + social) → onboarding scorrevole → navigazione base tra tab. CI/CD verde.

**Rischio**: Magic link su iOS può essere lento — testare subito con device reale.

---

## Sprint 2 — Contratto e OCR (Settimana 2)

**Focus**: Upload contratto, estrazione dati via OCR, AI parser, checker conformità.

| # | Task | Priorità | Stima | Dipendenze |
|---|------|----------|-------|------------|
| 2.1 | Schermata upload contratto (PDF + foto camera) | P0 | 🟡 2g | 1.9 |
| 2.2 | OCR integration (Google Cloud Vision + fallback Tesseract) | P0 | 🔴 3g | 2.1 |
| 2.3 | AI extraction: tipo contratto, canone, deposito, scadenze, durata | P0 | 🟡 2g | 2.2 |
| 2.4 | Schermata verifica dati estratti + editing manuale | P0 | 🟡 1g | 2.3 |
| 2.5 | CRUD contratto (salvataggio su Supabase) | P0 | 🟢 4h | 1.4 |
| 2.6 | Calcolatore ISTAT (business logic con storico indici) | P1 | 🟢 3h | 2.3 |
| 2.7 | Checker "Il mio contratto è a norma?" (regole base) | P1 | 🟡 1g | 2.4 |

**Deliverable**: Upload contratto → OCR → estrazione dati → verifica → checker normativo.

**Rischio**: OCR su foto da camera può dare risultati sporchi — prevedere UI di correzione robusta.

---

## Sprint 3 — Vault Prove (Settimana 3)

**Focus**: Archivio prove digitali con hashing SHA-256, timeline, collegamento a casi.

| # | Task | Priorità | Stima | Dipendenze |
|---|------|----------|-------|------------|
| 3.1 | Storage bucket Supabase + policy RLS per user | P0 | 🟢 4h | 1.4 |
| 3.2 | Upload foto/video/audio/documento (con compressione) | P0 | 🟡 2g | 3.1 |
| 3.3 | Hashing SHA-256 client-side (prima dell'upload) | P0 | 🟢 2h | 3.2 |
| 3.4 | Timeline prove cronologica (raggruppata per data) | P0 | 🟡 2g | 3.2 |
| 3.5 | Schermata dettaglio prova (metadata + preview + download) | P0 | 🟡 1g | 3.4 |
| 3.6 | Categorizzazione prove (foto, video, audio, doc, screenshot) | P0 | 🟢 4h | 3.4 |
| 3.7 | Filtri e ricerca prove (per categoria, data, testo) | P1 | 🟡 1g | 3.6 |
| 3.8 | Casi: CRUD base + collegamento prove | P0 | 🟡 2g | 3.5 |

**Note**: L'hash SHA-256 viene calcolato lato client prima dell'upload e salvato come metadata. In caso di disputa legale, l'hash dimostra che il file non è stato alterato dal momento del caricamento.

**Deliverable**: Vault prove funzionante → upload con hash → timeline → collegamento a casi.

---

## Sprint 4 — AI Giusta: Base (Settimana 4)

**Focus**: Assistente AI legale, chat con RAG, knowledge base di diritto locatizio.

| # | Task | Priorità | Stima | Dipendenze |
|---|------|----------|-------|------------|
| 4.1 | Edge Function: AI orchestrator (gestione sessione + routing) | P0 | 🟡 2g | 1.3 |
| 4.2 | Integrazione Anthropic API (Claude Haiku + Sonnet) | P0 | 🟢 4h | 4.1 |
| 4.3 | System prompt + tool definitions (strutturato per legal domain) | P0 | 🟡 1g | 4.2 |
| 4.4 | RAG: chunking documenti legali + embedding (text-embedding-3-small) | P0 | 🔴 3g | 4.1 |
| 4.5 | Knowledge base seeding: 5 leggi chiave (L. 392/78, L. 431/98, Codice Civile artt. 1571-1654, Costituzione artt. 47, D.L. 102/2013) | P0 | 🟡 1g | 4.4 |
| 4.6 | Chat UI (messaggi, input, citations, streaming) | P0 | 🟡 2g | 4.1 |
| 4.7 | Quick actions sopra tastiera (domande frequenti) | P1 | 🟢 4h | 4.6 |
| 4.8 | Disclaimer persistente (non è un avvocato) in header chat | P0 | 🟢 1h | 4.6 |

**Note**: L'AI deve sempre citare le fonti (articolo di legge specifico). Nessuna risposta senza fonte. Claude Haiku per domande semplici, Sonnet per analisi complesse.

**Deliverable**: Chat AI funzionante → risponde su diritto locatizio → cita articoli di legge.

---

## Sprint 5 — AI Giusta: Tools e Template (Settimana 5)

**Focus**: Generazione documenti, calcolatori, action center, case tracker.

| # | Task | Priorità | Stima | Dipendenze |
|---|------|----------|-------|------------|
| 5.1 | Tool: `generate_legal_template` (diffida, disdetta, reclamo) | P0 | 🟡 2g | 4.3 |
| 5.2 | Tool: `calculate_istat_update` (calcolo aggiornamento ISTAT) | P0 | 🟢 4h | 4.3 |
| 5.3 | Tool: `search_knowledge_base` (RAG query strutturata) | P0 | 🟡 1g | 4.4 |
| 5.4 | Tool: `search_case_law` (giurisprudenza — dataset iniziale) | P1 | 🟡 1g | 5.3 |
| 5.5 | Tool: `find_local_support` (associazioni inquilini per città) | P1 | 🟢 4h | 5.3 |
| 5.6 | Generazione PDF diffida (template + dati utente) | P0 | 🟡 2g | 5.1 |
| 5.7 | Case Tracker: workflow step-by-step wizard | P0 | 🟡 2g | 3.8 |
| 5.8 | Case Tracker: timeline azioni + stato avanzamento | P0 | 🟡 1g | 5.7 |

**Note**: I template legali devono essere revisionati dall'avvocato consulente prima del rilascio. Prevedere disclaimer su ogni PDF generato.

**Deliverable**: AI genera diffide e documenti legali in PDF → case tracker con workflow guidato.

---

## Sprint 6 — Community e Emergenza (Settimana 6)

**Focus**: Forum anonimo, matching avvocati, emergency mode.

| # | Task | Priorità | Stima | Dipendenze |
|---|------|----------|-------|------------|
| 6.1 | Forum anonimo: post + commenti + like | P1 | 🟡 2g | 1.4 |
| 6.2 | Moderazione base (flag contenuto, report utente) | P1 | 🟡 1g | 6.1 |
| 6.3 | Profilo avvocato: CRUD + verifica manuale | P1 | 🟡 2g | 1.4 |
| 6.4 | Matching avvocato: ricerca per città + specializzazione + prezzo | P1 | 🟡 1g | 6.3 |
| 6.5 | Sistema recensioni avvocati (stelline + testo) | P1 | 🟢 4h | 6.4 |
| 6.6 | Emergency Mode: UI dedicata + kit emergenza (cosa fare subito) | P0 | 🟡 2g | 5.8 |
| 6.7 | Pulsante chiamata diretta 112 (deep link `tel:112`) | P0 | 🟢 2h | 6.6 |
| 6.8 | Segnalazione collettiva (stesso proprietario — anonima) | P2 | 🟡 2g | 6.1 |

**Note**: Matching avvocati è P1 — fondamentale per retention ma non per MVP launch. Emergency Mode deve funzionare anche offline (kit precaricato).

**Deliverable**: Community base anonima → matching avvocati funzionante → emergency mode attivo.

---

## Sprint 7 — Pagamenti e Profilo (Settimana 7)

**Focus**: Abbonamenti, profilo utente, notifiche, analytics, error tracking.

| # | Task | Priorità | Stima | Dipendenze |
|---|------|----------|-------|------------|
| 7.1 | RevenueCat integration (iOS + Android) | P0 | 🟡 3g | 1.9 |
| 7.2 | Stripe integration (web, in-app purchases) | P0 | 🟡 2g | 7.1 |
| 7.3 | Schermata abbonamento + confronto piani (Free/Pro/Premium) | P0 | 🟡 1g | 7.1 |
| 7.4 | Gestione limiti free tier (5 domande AI, 10 prove, 1 contratto) | P0 | 🟢 4h | 7.3 |
| 7.5 | Profilo utente completo (avatar, dati, preferenze) | P1 | 🟡 1g | 1.9 |
| 7.6 | Notifiche push (Expo Push + OneSignal) | P1 | 🟡 2g | 7.1 |
| 7.7 | Notifiche email transazionali (Resend — conferma, reminder) | P1 | 🟡 1g | 7.6 |
| 7.8 | Impostazioni privacy e notifiche (toggle singoli) | P1 | 🟢 4h | 7.6 |
| 7.9 | PostHog analytics + feature flags (A/B test ready) | P1 | 🟡 1g | 1.9 |
| 7.10 | Sentry error tracking (crash reporting + breadcrumbs) | P0 | 🟢 2h | 1.9 |

**Piano abbonamenti**:

| Piano | Prezzo | Limiti |
|-------|--------|--------|
| Free | €0 | 1 contratto, 10 prove, 5 domande AI/giorno |
| Pro | €4.99/mese | Contratti illimitati, 100 prove, AI illimitata, PDF diffide |
| Premium | €9.99/mese | Tutto Pro + consulenza prioritaria, matching avvocato premium |

**Deliverable**: Abbonamenti funzionanti → notifiche → profilo completo → monitoring.

---

## Sprint 8 — Polish e Lancio (Settimana 8)

**Focus**: QA, store preparation, deploy produzione, landing page.

| # | Task | Priorità | Stima | Dipendenze |
|---|------|----------|-------|------------|
| 8.1 | QA completo: test tutti i flussi end-to-end | P0 | 🔴 3g | 1-7 |
| 8.2 | Gestione errori e edge case (rete assente, upload fallito, rate limit) | P0 | 🟡 2g | 8.1 |
| 8.3 | Schermate vuote empatiche (empty states con illustrazioni) | P1 | 🟢 4h | 8.1 |
| 8.4 | Localizzazione (it + en base — i18n con i18next) | P2 | 🟡 1g | 8.1 |
| 8.5 | Dark mode tuning (colori e contrasti finali) | P1 | 🟢 4h | 8.1 |
| 8.6 | Accessibility (VoiceOver, Dynamic Type, contrasto colore) | P1 | 🟡 1g | 8.1 |
| 8.7 | Performance: cold start <2s, scroll 60fps, upload parallelo | P0 | 🟡 1g | 8.2 |
| 8.8 | Test su device reali (iPhone SE/14/15, Samsung S22/S24, Pixel 7) | P0 | 🟡 2g | 8.2 |
| 8.9 | App Store assets (screenshots 6.7" + 5.5", descrizione, keyword) | P0 | 🟡 1g | — |
| 8.10 | Privacy Policy e Termini di Servizio in app | P0 | 🟢 4h | 8.1 |
| 8.11 | GDPR compliance checklist (cookies, dati, export, cancellazione) | P0 | 🟢 3h | 8.1 |
| 8.12 | Deploy Supabase production (project promo da dev) | P0 | 🟢 2h | 8.11 |
| 8.13 | EAS Build + Submit to App Store Connect + Google Play Console | P0 | 🟡 2g | 8.12 |
| 8.14 | Landing page deploy (Next.js su Vercel con dominio) | P0 | 🟢 4h | — |

**Deliverable**: App pubblicata su App Store e Play Store → landing page live → tutto il monitoring attivo.

---

# Stima Costi Infrastruttura Mensile

## Scenario 1: 0-10.000 utenti (lancio, primi 6 mesi)

| Servizio | Costo/mese | Note |
|----------|-----------:|------|
| Supabase Pro | $25 | 8GB DB, 100GB bandwidth, 250GB storage |
| Supabase Vector (incluso) | $0 | Incluso in Pro |
| Anthropic API (Claude Haiku + Sonnet) | $100-300 | ~5.000 query/giorno |
| OpenAI Embeddings (text-embedding-3-small) | $20-50 | ~5.000 chunk/giorno |
| Google Cloud Vision (OCR) | $10-30 | ~1.000 documenti/mese |
| Resend (email transazionali) | $0-30 | 1.000-5.000 email/mese |
| OneSignal (push) | $0 | Free tier (10.000 push/mese) |
| PostHog | $0 | Free tier (1M eventi/mese) |
| Sentry | $0 | Free tier (5.000 errori/mese) |
| RevenueCat | $0 | Free tier (<$10k/mo revenue) |
| Vercel Pro (landing + web) | $20 | 1TB bandwidth |
| EAS Build (Expo) | $0 | Free tier (30 builds/mese) |
| Apple Developer Program | ~$10 | $99/anno ÷ 12 |
| Google Play Console | ~$3 | $25 una tantum ÷ 12 |
| GitHub Pro | $4 | Azioni Actions minuti |
| Cloudflare R2 (backup) | $5 | ~10GB storage |
| **TOTALE** | **~$200-500/mese** | |

## Scenario 2: 10.000-100.000 utenti (scala)

| Servizio | Costo/mese | Note |
|----------|-----------:|------|
| Supabase Team | $599 | 16GB DB, 500GB bandwidth, 500GB storage |
| Anthropic API | $1.000-5.000 | ~50.000 query/giorno |
| OpenAI Embeddings | $100-300 | ~50.000 chunk/giorno |
| Google Cloud Vision (OCR) | $50-200 | ~10.000 documenti/mese |
| Resend (email) | $30-100 | 50.000 email/mese |
| OneSignal Growth | $99 | Push illimitati |
| PostHog Scale | $0-200 | Fino a 2M eventi/mese |
| Sentry Team | $0-80 | Fino a 100K errori/mese |
| RevenueCat Pro | $0-80 | <$100k/mo revenue |
| Vercel Pro | $20-200 | scaling con traffico |
| EAS Build | $0 | Free tier |
| Apple Developer | ~$10 | |
| Google Play Console | ~$3 | |
| GitHub Team | $4-20 | |
| Cloudflare R2 | $10-50 | |
| AWS S3 cold backup | $5-20 | |
| **TOTALE** | **~$2.000-7.000/mese** | |

## Strategia di Ottimizzazione Costi AI

| Tecnica | Risparmio stimato |
|---------|------------------:|
| Cache risposte per domande identiche (Redis su Supabase) | -30-40% |
| Routing smart: Haiku per domande semplici, Sonnet per analisi | -30% |
| Rate limiting free tier (5 domande/giorno) | -50% utenti su AI |
| RAG con chunk ottimizzati (riduzione token per query) | -20% |
| Batch embedding notturno (invece che real-time) | -15% |

---

# Stima Costi Sviluppo

| Ruolo | Tempo | Costo stimato | Note |
|-------|-------|--------------:|------|
| Founder tecnico (te) | 8 settimane full-time | Equity | ~€15k-20k costo opportunità |
| Freelancer React Native | Part-time (settimane 3-6) | €3.000-5.000 | Aiuto su vault e AI |
| Freelancer UI/UX | 1 settimana (Sprint 0) | €1.500-2.500 | Design system + schermate chiave |
| Avvocato consulente | 40 ore totali (distribuite) | €2.000-3.000 | Revisione template + KB legale |
| **TOTALE CASH** | | **€6.500-10.500** | Escluso costo opportunità founder |

---

# Strategia di Rilascio

| Timeline | Evento | Metriche chiave |
|----------|--------|-----------------|
| **Week 7** | TestFlight + Google Play Internal Testing | Crash-free rate >99.5%, onboarding completato >80% |
| **Week 8** | Soft launch Italia (App Store + Play Store) | Download >500, retention D7 >30% |
| **Mese 2** | Marketing + community building | Download >5.000, DAU >500 |
| **Mese 3** | Iterazione v1.1 basata su feedback | NPS >40, rating >4.2 |
| **Mese 4-5** | Notifiche proattive + AI proattiva | Retention D30 >20% |
| **Mese 6** | v2.0: espansione EU | Download >50.000, revenue >$5k/mese |

## Canali di Acquisizione (Mese 1-3)

| Canale | Budget | Atteso |
|--------|--------|--------|
| TikTok / Instagram organico | €0 | 2.000 download |
| SEO (guide diritto locatizio) | €0 (tempo) | 500 download/mese |
| Partnership associazioni inquilini | €0 | 1.000 download |
| Google Ads (brand) | €500-1.000/mese | 500-1.000 download/mese |
| ASO (App Store Optimization) | €0 | 30% download organici |

---

# Rischi e Mitigazioni

| Rischio | Probabilità | Impatto | Mitigazione |
|---------|:-----------:|:-------:|-------------|
| OCR fallisce su foto di scarsa qualità | Alta | Medio | Guida visiva allo scatto, fallback input manuale |
| AI "allucina" articoli di legge inesistenti | Media | Alto | Citations obbligatorie, disclaimer, validazione a freddo con avvocato |
| Costi AI superiori al previsto | Media | Alto | Rate limiting, caching, routing Haiku/Sonnet |
| Rifiuto App Store (contenuti legali) | Bassa | Alto | Review linee guida prima del提交, disclaimer visibili |
| Abbandono onboarding | Alta | Medio | Onboarding progressivo, non tutto upfront |
| Competitor si muove veloce | Media | Medio | Community moat + AI specializzata su diritto italiano |

---

# Stack Tecnologico Riepilogo

| Layer | Tecnologia | Versione |
|-------|------------|----------|
| **Mobile** | React Native (Expo SDK) | 51+ |
| **Web** | Next.js (App Router) | 14+ |
| **Monorepo** | Turborepo | 2.x |
| **Lingua** | TypeScript strict | 5.x |
| **Auth** | Supabase Auth | Latest |
| **DB** | Supabase (PostgreSQL + pgvector) | Latest |
| **Storage** | Supabase Storage + Cloudflare R2 backup | Latest |
| **AI/LLM** | Anthropic Claude (Haiku + Sonnet) | API latest |
| **Embeddings** | OpenAI text-embedding-3-small | Latest |
| **OCR** | Google Cloud Vision | API v1 |
| **Payments** | RevenueCat (mobile) + Stripe (web) | Latest |
| **Push** | OneSignal + Expo Push | Latest |
| **Email** | Resend | Latest |
| **Analytics** | PostHog | Latest |
| **Errors** | Sentry | Latest |
| **CI/CD** | GitHub Actions + EAS Build | Latest |
| **Hosting** | Vercel (landing/web) | Latest |
| **Testing** | Jest + Maestro (E2E) | Latest |

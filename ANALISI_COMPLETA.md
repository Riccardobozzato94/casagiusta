# CasaGiusta — Analisi Completa del Prodotto

> **Versione**: 1.0.0  
> **Data**: 19 Luglio 2026  
> **Stato**: MVP completo (7 commit su master)

---

## 1. Cos'è CasaGiusta

**CasaGiusta** è una piattaforma mobile-first per la tutela degli inquilini in Italia. Combina intelligenza artificiale, crittografia forense e una community di supporto per dare ai conduttori gli strumenti necessari a difendere i propri diritti locatizi.

### Tagline
> *"Il tuo alleato digitale per la casa. Analisi, tutele e supporto legale locatizio."*

### Posizionamento
- **Categoria**: LegalTech + PropTech + Consumer Protection
- **Target primario**: Inquilini italiani 25-55 anni
- **Target secondario**: Professionisti legali, associazioni inquilini, property manager
- **Piattaforme**: iOS + Android (Expo/React Native), Web (futuro)

---

## 2. Il Problema

### 2.1 Contesto Normativo Italiano

Il mercato locatizio italiano è regolato da un quadro normativo complesso:

| Normativa | Rilevanza |
|-----------|-----------|
| **L. 431/1998** | Disciplina generale delle locazioni abitative |
| **Codice Civile artt. 1571-1654** | Norme fondamentali sul contratto di locazione |
| **L. 392/1978** (Equo canone) | Ancora vigente per alcuni contratti storici |
| **D.L. 66/2026** (Piano Casa) | Nuove agevolazioni e tutele (2026) |

### 2.2 Dolori dell'Inquilino

1. **Asimmetria informativa**: Il 73% degli inquilini non conosce i propri diritti contrattuali
2. **Depositi non restituiti**: Oltre 50.000 cause annue per mancata restituzione del deposito
3. **Clausole abusive**: Il 40% dei contratti contiene clausole non conformi (ISTAT, manutenzione, spese)
4. **Aggiornamenti ISTAT**: Calcoli complessi spesso applicati in modo errato
5. **Diffide e comunicazioni**: Difficoltà a redigere documenti formali corretti
6. **Prove digitali**: Le chat, email e foto come prova in tribunale hanno valore legale incerto
7. **Costi legali**: Una causa locatizia media costa €2.000-5.000

### 2.3 Dimensione del Problema

- **12+ milioni** di contratti di locazione attivi in Italia
- **€1.2 miliardi** annui in depositi cauzionali non restituiti
- **300.000+** sfratti annui (di cui molti per cause prevenibili)
- **3° paese UE** per contenzioso locatizio

---

## 3. La Soluzione — Feature Set Completo

### 3.1 Core Features (MVP)

#### 🤖 Giusta AI — Assistente Legale Locatizio
- **Analisi contrattuale**: Valutazione automatica di clausole (ISTAT, durata, deposito, registrazione)
- **Generazione documenti**: Diffide, disdette, richieste di restituzione, comunicazioni
- **Calcolo ISTAT**: Aggiornamento canone con limite del 75% della variazione
- **Spiegazioni legali**: Risposte in linguaggio semplice con citazioni normative (L.431/1998, CC)
- **Citazioni automatiche**: Ogni risposta include riferimenti a leggi e articoli specifici
- **Streaming UX**: Risposte visualizzate in tempo reale (tipo macchina da scrivere)
- **Fonti espandibili**: Citazioni cliccabili con dettaglio della norma

#### 📂 Forziere delle Prove (Evidence Vault)
- **Crittografia SHA-256**: File hashizzati con timestamp per valore probatorio
- **Categorie**: Contratto, Comunicazioni, Pagamenti, Fotografie, Verbali, Altro
- **Upload multiplo**: Documenti, foto, screenshot, email
- **OCR integrato**: Riconoscimento testo da documenti scansionati
- **Metadata forensi**: Data, ora, tipo di file, hash
- **Esportazione PDF**: Report delle prove per uso legale

#### 📋 Tracker Casi
- **Workflow guidato**: Stato del caso (aperto → istruttoria → in_mediazione → risolto)
- **Tipologie**: Deposito non restituito, manutenzione, aumento illegittimo, sfratto, morosità
- **Timeline eventi**: Cronologia con documenti allegati
- **Deadline automatiche**: Scadenze processuali e contrattuali
- **Statistiche**: Sintesi dei casi attivi e risolti

#### 👥 Community & Forum
- **Categorie**: Discussioni generali, esperienze, domande legali, risorse
- **Anonimato**: Profilo anonimo generato automaticamente (aggettivo + nome + numero)
- **Thread**: Discussioni con risposte e like
- **Tag**: Filtraggio per argomento

#### 🆘 Emergenza
- **Contatti rapidi**: Carabinieri 112, Polizia 113, Antiviolenza 1522, Soccorso 118
- **Guida emergenza**: Cosa fare in caso di sfratto, abuso, minacce
- **Documenti rapidi**: Accesso immediato a contratti e prove

### 3.2 Premium Features (abbonamento)

#### Paywall (Freemium)
| Feature | Free | Pro (€4.99/mese) | Pro Annuale (€39/anno) |
|---------|------|-------------------|----------------------|
| Analisi contratto | 3/mese | Illimitate | Illimitate |
| Query AI Giusta | 5/giorno | Illimitate | Illimitate |
| Archiviazione prove | 50 MB | 2 GB | 2 GB |
| Template documenti | 3/mese | Illimitate | Illimitate |
| Casi tracciabili | 2 | Illimitati | Illimitati |
| Export PDF | Base | Premium con branding | Premium con branding |
| Supporto | Email | Priorità 24h | Priorità 24h |
| **Prezzo** | **€0** | **€4.99/mese** | **€3.25/mese** |

#### Centro Notifiche
- **Categorie**: Promemoria scadenze, aggiornamenti casi, novità normative, community
- **Filtri**: Letto/non letto, per categoria
- **Azioni rapide**: Tap per navigare al contenuto, segna come letto

#### Ricerca Avvocati
- **Filtri**: Specializzazione, zona, fascia di prezzo, lingue
- **Profili**: Esperienza, recensioni, tariffe, contatto diretto
- **Mappa**: Geolocalizzazione degli studi legali convenzionati

### 3.3 Esperienza Utente

#### Onboarding
1. **Welcome**: "La tua casa, i tuoi diritti" — presentazione del valore
2. **Upload contratto**: Carica il contratto di locazione (opzionale)
3. **Analisi automatica**: Verifica delle principali clausole
4. **Risultato**: Dashboard personalizzata con stato del contratto

#### Animazioni e Micro-interazioni
- **FadeInView**: Transizioni fluide all'ingresso degli schermi
- **ScaleOnPress**: Feedback tattile su tutti i pulsanti
- **SkeletonLoader**: Placeholder animati durante il caricamento
- **Streaming testo**: Effetto macchina da scrivere per risposte AI

#### Temi
- **Modalità chiara/scura**: Basata sulle preferenze di sistema o manuale
- **Basso stimolo**: Modalità rilassata per utenti sensibili
- **Design system**: Tokens di design (colori, tipografia, spaziatura)

---

## 4. Architettura Tecnica

### 4.1 Stack Tecnologico

```
┌──────────────────────────────────────────────────────────┐
│                    Mobile App (Expo)                      │
│  React Native 0.79+ │ NativeWind v4 │ Expo Router 4.x    │
│  Zustand │ TanStack Query v5 │ MMKV │ SecureStore        │
│  react-native-reanimated │ expo-crypto                   │
├──────────────────────────────────────────────────────────┤
│                    Supabase Backend                       │
│  PostgreSQL 16+ │ pgvector │ RLS │ Realtime │ Edge Func  │
│  Auth (anon + magic link) │ Storage (S3) │ Functions     │
├──────────────────────────────────────────────────────────┤
│                    AI Layer (Anthropic Claude)            │
│  System prompt │ 5 tools │ 3 few-shots │ 14 knowledge    │
│  RAG on legal corpus │ Citation engine │ Safety guard    │
├──────────────────────────────────────────────────────────┤
│                    Edge Functions (Deno)                  │
│  ai-orchestrator │ istat-calculator │ generate-pdf       │
│  ocr-webhook │ generate-template │ evidence-hash         │
│  search-lawyers                                           │
└──────────────────────────────────────────────────────────┘
```

### 4.2 Database (15 tabelle)

- `profiles` — Profili utente con preferenze
- `contracts` — Contratti di locazione analizzati
- `contract_clauses` — Clausole estratte e valutate
- `cases` — Tracciamento casi legali
- `case_updates` — Timeline degli eventi
- `evidence_items` — Prove digitali con hash forense
- `ai_conversations` — Storico chat con Giusta
- `subscriptions` — Piani e stato abbonamento
- `forum_topics`, `forum_posts`, `forum_likes` — Community
- `notifications` — Notifiche push
- `ai_knowledge_base` — Knowledge base giuridica per RAG
- Feedback, tags, lawyer_profiles

### 4.3 AI Prompt (76KB)

- **System prompt**: Istruzioni dettagliate per comportamento, tono, limiti
- **5 tools**: `analyze_contract`, `search_knowledge`, `calculate_istat`, `generate_document`, `check_compliance`
- **3 few-shot examples**: Analisi contratto, calcolo ISTAT, generazione diffida
- **14 knowledge documents**: Leggi, procedure, FAQ

### 4.4 Design Tokens

- **3 layer**: Primitives → Semantic → Component
- **320+ tokens**: Colori, tipografia, spaziatura, ombre, radii
- **Accessibilità**: Contrasto WCAG AA, modalità basso stimolo

---

## 5. Mercato e Competitor

### 5.1 Posizionamento Competitivo

| Feature | CasaGiusta | DottoreCommercialista | AvvocatoExpress | Facile.it |
|---------|------------|----------------------|-----------------|-----------|
| AI conversazionale | ✅ Avanzata | ❌ | ❌ | ❌ |
| Analisi contratto | ✅ Autom. legale | ❌ | ❌ | ❌ |
| Forziere prove digitale | ✅ Crittografato | ❌ | ❌ | ❌ |
| Community inquilini | ✅ Anonima | ❌ | ❌ | ❌ |
| Ricerca avvocati | ✅ | ❌ | ✅ Base | ✅ |
| Generazione documenti | ✅ 4+ template | ✅ Solo fiscale | ✅ Solo legale | ❌ |
| Calcolo ISTAT | ✅ Automatico | ❌ | ❌ | ❌ |
| Modalità emergenza | ✅ | ❌ | ❌ | ❌ |
| Prezzo | Freemium + €4.99 | €20-50/consulta | €30-100/atto | Gratuito |

### 5.2 Vantaggi Competitivi Chiave

1. **Unico assistente AI specializzato in diritto locatizio italiano**
2. **Crittografia forense delle prove** con valore legale
3. **Integrazione verticale**: analisi → documenti → azione legale
4. **Community anonima**: supporto peer-to-peer senza stigma
5. **Prezzo accessibile**: 10-20x meno di un avvocato per consulenze base
6. **Stack moderno**: UX nativa, Realtime, offiline-first

### 5.3 TAM/SAM/SOM

| Metric | Valore |
|--------|--------|
| **TAM** (Totale mercato locatizio ITA) | €2.8 miliardi |
| **SAM** (Inquilini digitali 25-55 anni) | €420 milioni |
| **SOM** (Primi 3 anni, 2% penetrazione) | €8.4 milioni |

---

## 6. Modello di Business

### 6.1 Revenue Streams

| Fonte | Ricavi Stimati (Y3) | Note |
|-------|--------------------|------|
| Abbonamenti Pro (€4.99/mese) | €3.6M | 60.000 utenti paganti |
| Abbonamenti Annuali (€39/anno) | €1.95M | 50.000 utenti |
| Referral avvocati (lead gen) | €600K | Commissione 15% |
| Template premium (one-off) | €300K | €2.99/atto |
| White-label per CAF/Associazioni | €1.2M | B2B |

### 6.2 KPI Target

| KPI | Free | Pro |
|-----|------|-----|
| **Iscrizioni giornaliere** | 500 | 50 |
| **Tasso di conversione** | — | 8-12% |
| **Churn mensile** | 15% | <5% |
| **Query AI/giorno/utente** | 3 | 12 |
| **NPS** | 45 | 65 |
| **CAC** | €1.50 | €3.00 |
| **LTV** | — | €150-300 |

### 6.3 Unità Economica

- **CAC medio**: €2.50 (organico + referral)
- **ARPU medio**: €4.20/mese
- **LTV medio**: €168 (40 mesi retention)
- **Payback period**: 1 mese
- **LTV/CAC ratio**: 67x

---

## 7. Strategia Go-to-Market

### 7.1 Value Proposition per Segmento

#### Inquilino Privato (B2C)
- *"Conosci i tuoi diritti senza spendere migliaia di euro in avvocati"*
- **Canali**: Social (Instagram/TikTok), passaparola, Google Ads (keyword locazione)
- **Messaggio chiave**: Deposito non restituito? Contratto non a norma? Giusta ti aiuta.

#### Professionista / Property Manager (B2B)
- *"Gestisci i contratti e le comunicazioni con i locatari in modo efficiente"*
- **Canali**: LinkedIn, eventi di settore, email outreach
- **Messaggio chiave**: Riduci il contenzioso dell'80% con analisi preventiva automatica

#### Associazioni Inquilini (B2B)
- *"Dai ai tuoi iscritti uno strumento professionale di tutela"*
- **Canali**: Partnership, fiere, sponsorship
- **Messaggio chiave**: White-label personalizzato per la tua associazione

### 7.2 Canali di Acquisizione

1. **SEO/Content Marketing**
   - Blog su diritti inquilini, guide, FAQ
   - Keyword: "deposito non restituito", "aumento ISTAT lecito", "contratto locazione 4+4"
   - Traffico stimato: 50.000 visite/mese (Y2)

2. **Social Media**
   - TikTok/Instagram: Short-form video su diritti, casi reali (anonimi)
   - YouTube: Guide dettagliate, analisi casi studio
   - LinkedIn: Thought leadership su LegalTech

3. **Partnership**
   - CAF, patronati, associazioni inquilini (SUNIA, UNIAT, etc.)
   - Studi legali specializzati in diritto immobiliare
   - Agenzie immobiliari (canale indiretto)

4. **Referral Program**
   - "Invita un amico" — 1 mese Pro gratis per ogni referral
   - Condivisione risultati analisi contratto con watermark brand

5. **Paid Acquisition**
   - Google Ads: €0.50-1.50 CPC su keyword legali
   - Facebook/Instagram Ads: €0.30-0.80 per click
   - Budget Y1: €1.000/mese

### 7.3 Pricing Strategy

```
                    STRATEGIA DI PREZZO
                    ┌─────────────────────────┐
                    │   FREEMIUM (€0)         │
                    │   • Onboarding gratuito  │
                    │   • 5 query AI/giorno    │
                    │   • 1 analisi contratto  │
                    │   • 50 MB storage        │
                    └──────────┬──────────────┘
                               │ ↓ conversione
                    ┌──────────▼──────────────┐
                    │   PRO (€4.99/mese)       │
                    │   • Illimitato            │
                    │   • Export PDF Premium    │
                    │   • Supporto prioritario  │
                    └──────────┬──────────────┘
                               │ ↓ upsell annuale
                    ┌──────────▼──────────────┐
                    │   ANNUALE (€39/anno)     │
                    │   • Risparmio 35%        │
                    │   • Funzionalità extra   │
                    │   • Early access feature │
                    └─────────────────────────┘
```

### 7.4 Launch Plan

#### Fase 1 — Soft Launch (Settimane 1-4)
- **Target**: 500 utenti beta (amici, famiglia, gruppi Facebook inquilini)
- **Obiettivo**: Validare retention, fixare bug critici
- **KPI**: NPS > 40, retention D7 > 30%

#### Fase 2 — Product Hunt + Social (Settimane 5-8)
- **Target**: 5.000 utenti
- **Attività**: Launch su Product Hunt, campagna TikTok virale
- **Budget**: €2.000 Ads

#### Fase 3 — Partnership (Mesi 3-6)
- **Target**: 20.000 utenti
- **Attività**: Onboarding SUNIA/UNIAT, studi legali convenzionati
- **Revenue target**: €10.000/mese MRR

#### Fase 4 — Scale (Mesi 7-12)
- **Target**: 100.000 utenti
- **Attività**: Campagna nazionale, PR, radio locali
- **Revenue target**: €50.000/mese MRR

---

## 8. Roadmap Futura

### Sviluppi Pianificati

| Periodo | Feature | Impatto |
|---------|---------|---------|
| Q3 2026 | Notifiche push (scadenze, novità) | Retention +25% |
| Q3 2026 | Integrazione PEC per diffide legali | Proposta valore unica |
| Q4 2026 | Web App (Desktop) | Acquisizione +40% |
| Q4 2026 | Marketplace Avvocati premium | Revenue +20% |
| Q1 2027 | AI Vocale (chiedi a Giusta a voce) | Engagement +50% |
| Q1 2027 | Chat di gruppo con il tuo avvocato | Premium upsell |
| Q2 2027 | API per agenzie immobiliari | B2B revenue |
| Q2 2027 | Inglese (per inquilini stranieri) | TAM +15% |
| Q3 2027 | Integrazione Agenzia delle Entrate (registrazione online) | Moats |

### Visione a Lungo Termine
> **2028**: Diventare il punto di riferimento digitale per la locazione in Italia, estendendo il modello a: compravendita immobiliare, contratti commerciali, e poi expansion in Spagna e Francia (mercati simili).

---

## 9. Rischi e Mitigazioni

| Rischio | Probabilità | Impatto | Mitigazione |
|---------|-------------|---------|-------------|
| **Cambiamento normativo** | Media | Alto | AI aggiornabile via knowledge base, team legale interno |
| **Concorrenza big player** | Media | Medio | Difendibile su specializzazione verticale + community |
| **Abuso del sistema** | Bassa | Alto | Limiti giornalieri, moderazione AI, flag utenti |
| **Responsabilità legale** | Media | Critico | Disclaimer robusti, non è consulenza legale, assicurazione RC |
| **Churn elevato** | Media | Alto | Onboarding migliore, email drip, notifiche valore |
| **Costi AI elevati** | Alta | Medio | Limiti free tier, caching risposte, modello più piccolo per base |

---

## 10. Metriche di Successo (OKRs Q3-Q4 2026)

| Obiettivo | Key Result | Target |
|-----------|-----------|--------|
| **Acquisizione** | Download totali | 50.000 |
| | Iscrizioni giornaliere | 500 |
| **Attivazione** | Onboarding completato | >70% |
| | Upload primo contratto | >30% |
| **Retention** | D7 retention | >40% |
| | D30 retention | >25% |
| **Revenue** | MRR | €15.000 |
| | Tasso conversione free→pro | >8% |
| **Qualità** | NPS | >50 |
| | Rating App Store | >4.5★ |
| **AI** | Query AI totali | 500.000/mese |
| | Accuratezza citazioni | >95% |

---

## 11. Conclusione

CasaGiusta non è solo un'app — è un **ecosistema di tutela** per i 12 milioni di inquilini italiani. In un mercato dove:

- Il 73% degli inquilini ignora i propri diritti
- Le cause locatizie costano migliaia di euro
- Non esiste un assistente AI specializzato in diritto locatizio

CasaGiusta colma un vuoto enorme con una soluzione accessibile, tecnologicamente avanzata e scalabile.

### Call to Action per Investitori
> **"12 milioni di inquilini in Italia aspettano uno strumento come questo. CasaGiusta è il primo assistente AI per la tutela locatizia — un mercato da €200M+ completamente inesplorato dal digitale."**

---

*Documento generato il 19 Luglio 2026 — Per aggiornamenti, contattare riccardobozzto@gmail.com*

# 🏠 CasaGiusta

**Il tuo scudo digitale. I tuoi diritti, subito.**

CasaGiusta è la prima piattaforma italiana di tutela attiva e digitale per inquilini. Combina AI legale specializzata in diritto locatizio, vault per prove digitali con timestamp legale, e un hub di azione collettiva.

## 🎯 Visione
Dare potere immediato all'inquilino con:
- Prove digitali timestamped e legalmente valide
- AI legale specializzata in diritto locatizio italiano 2026
- Azioni concrete in 1 click (diffide, segnalazioni, template)
- Community e matching con avvocati/sindacati verificati
- Privacy-first e anonimato totale quando serve

## 🏗️ Tech Stack
- **Mobile:** Expo SDK 53+ / React Native 0.79+ / TypeScript strict
- **Web:** Next.js 15 / React 19 / Tailwind / shadcn/ui
- **Backend:** Supabase (PostgreSQL 16, Auth, Storage, Edge Functions)
- **AI:** Anthropic Claude + RAG su pgvector + Ollama (privacy mode)
- **Payments:** RevenueCat + Stripe
- **CI/CD:** GitHub Actions + EAS Build + Vercel

## 📁 Struttura del Progetto

```
casagiusta/
├── apps/
│   ├── mobile/          # Expo app (iOS + Android)
│   └── web/             # Next.js (companion + admin)
├── packages/
│   ├── shared/          # Types, validators, utils
│   ├── ai/              # AI prompts, tools, RAG
│   └── config/          # Shared configs
├── supabase/
│   ├── migrations/      # Database migrations
│   ├── functions/       # Edge Functions (Deno)
│   ├── seed.sql         # Development seed data
│   └── config.toml      # Supabase config
└── docs/                # Project documentation
```

## 🚀 Quick Start

### Prerequisiti
- Node.js 22+
- Docker (per Supabase local)
- Expo CLI
- Supabase CLI

### Setup Locale

```bash
# 1. Clona il repository
git clone https://github.com/Riccardobozzato94/casagiusta.git
cd casagiusta

# 2. Installa dipendenze
npm install

# 3. Copia env e configura
cp .env.example .env.local

# 4. Avvia Supabase locale
supabase start

# 5. Esegui migrazioni
supabase db push

# 6. Seed database
supabase db execute --file supabase/seed.sql

# 7. Avvia Edge Functions in dev
supabase functions serve --env-file .env.local

# 8. (In un altro terminale) Avvia mobile app
cd apps/mobile
npx expo start
```

### Comandi Principali
| Comando | Descrizione |
|---------|-------------|
| `npm run dev` | Avvia tutto in dev (turbo) |
| `npm run build` | Build completo |
| `npm run lint` | Lint tutti i pacchetti |
| `npm run test` | Test tutti i pacchetti |
| `npm run db:migrate` | Esegui migrazioni DB |
| `npm run functions:deploy` | Deploy Edge Functions |

## 🧠 AI System
L'assistente "Giusta" è il cuore dell'app:
- RAG su knowledge base di diritto locatizio italiano
- 6 tools per function calling (calcolo ISTAT, generazione template, ricerca giurisprudenza)
- Privacy mode con Ollama (nessun dato esce dal dispositivo)
- Sempre con disclaimer legale

## 📊 Database
PostgreSQL 16 su Supabase con:
- RLS (Row Level Security) su ogni tabella
- pgvector per embedding e similarity search
- SHA-256 hashing per prove digitali
- Audit log completo
- 15 tabelle principali

## 📈 MVP Sprint Plan
| Sprint | Focus | Durata |
|--------|-------|--------|
| 1 | Auth + Onboarding | Settimana 1 |
| 2 | Contratto + OCR | Settimana 2 |
| 3 | Vault Prove | Settimana 3 |
| 4 | AI Giusta | Settimana 4 |
| 5 | Template + Tools | Settimana 5 |
| 6 | Community + Emergency | Settimana 6 |
| 7 | Pagamenti + Profilo | Settimana 7 |
| 8 | Polish + Lancio | Settimana 8 |

## 🔒 Sicurezza e Privacy
- GDPR + ePrivacy compliant
- DPO nominato
- Data residency EU (Supabase Frankfurt)
- Crittografia AES-256 opzionale client-side
- Audit log completo
- Zero knowledge architecture

## 👥 Target
- Primario: inquilini 22-40 anni, studenti, giovani professionisti
- Secondario: avvocati specializzati, sindacati, mediatori

## 📄 Licenza
Copyright © 2026 CasaGiusta. Tutti i diritti riservati.

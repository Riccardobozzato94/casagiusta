# CasaGiusta — Store Listing Copy (App Store + Google Play)

> **Uso**: Copia pronta per inserimento nelle console. Adatta lunghezze se necessario (Apple limita a 30 char il titolo, 170 char la subtitle, 4.000 char la description).

---

## 🍎 APP STORE (iOS)

### Nome app
`CasaGiusta: Tutela Inquilini`

### Sottotitolo (max 170 char)
`IA legale per contratti di affitto, depositi e Piano Casa 2026`

### Descrizione (max 4.000 char)
```
CasaGiusta è la tua alleata digitale per difendere i diritti di casa. La prima app in Italia che unisce intelligenza artificiale specializzata nel diritto delle locazioni, crittografia forense per le tue prove e una community di supporto.

CON IL PIANO CASA 2026, LE TUTELE CAMBIANO.
Dal 4 luglio 2026 la nuova legge (L.116/2026) porta canoni concordati, rent-to-buy e tutele per morosità incolpevole. CasaGiusta ti spiega come usarle e se il tuo contratto ne beneficia.

COSA PUÒ FARE PER TE:
🤖 Giusta AI — Analizza il tuo contratto e rispondi a domande su diritti, clausole e procedure con citazioni normative (L.431/1998, Codice Civile).
🔐 Forziere Prove — Carica contratti, chat, foto e ricevute. Ogni file è hashizzato (SHA-256) con timestamp per valore probatorio.
🧮 Calcolo ISTAT — Verifica se l'aumento del canone è legittimo (limite 75% della variazione).
📋 Tracker Casi — Gestisci depositi non restituiti, aumenti illegittimi e sfratti con scadenze automatiche.
👥 Community Anonima — Condividi esperienze senza stigma, chiedi e aiuta in sicurezza.
🆘 Modalità Emergenza — Numeri utili e guida immediata in caso di sfratto o abuso.
✉️ Generazione Documenti — Diffide, disdette e richieste di restituzione pronte con un tap.

INIZIA GRATIS.
• 5 query AI al giorno
• 1 analisi contratto al mese
• 50 MB di archivio prove
Passa a Pro (€4,99/mese) per tutto illimitato e export PDF premium.

PERCHÉ CASAGIUSTA:
• Specializzata solo sul diritto locatizio italiano
• Nessun linguaggio complicato: spiegazioni semplici
• I tuoi dati sono crittografati sul dispositivo
• Un decimo del costo di una consulenza legale

NOTA: CasaGiusta fornisce strumenti di informazione e organizzazione, non è uno studio legale. Per controversie complesse consulta un professionista.

Scarica CasaGiusta e scopri i tuoi diritti. La tua casa, i tuoi diritti.
```

### Parole chiave (max 100 char)
`affitto, inquilino, contratto, deposito, piano casa, diritti, legale, sfratto, locazione, tutela`

### Categoria
`Produttività` (primaria) / `Utility` (secondaria)

---

## 🤖 GOOGLE PLAY (Android)

### Nome app (max 30 char)
`CasaGiusta`

### Breve descrizione (max 80 char)
`Tutela inquilini: IA, prove, Piano Casa`

### Descrizione completa (max 4.000 char)
```
CasaGiusta — Il tuo alleato digitale per la casa.

La prima app IA per la tutela legale locatizia in Italia. Analizza il contratto di affitto, custodisci le prove con crittografia forense e ricevi assistenza passo dopo passo.

PIANO CASA 2026: nuove tutele per te.
La legge L.116/2026 (in vigore dal 4 luglio) introduce canone concordato, rent-to-buy e tutele per morosità incolpevole. CasaGiusta ti aiuta a capirle.

FUNZIONI PRINCIPALI:
🤖 Giusta AI: analisi clausole con citazioni normative
🔐 Forziere Prove: hash SHA-256 + timestamp (valore forense)
🧮 Calcolo ISTAT: verifica aumenti illegittimi
📋 Tracker Casi: scadenze e documenti automatici
👥 Community anonima di supporto
🆘 Emergenza: numeri utili e guida sfratto
✉️ Genera diffide e richieste in 1 tap

GRATIS per iniziare:
• 5 query AI/giorno
• 1 analisi contratto/mese
• 50 MB archivio
Pro (€4,99/mese): illimitato + PDF premium.

Mercato: 12M contratti attivi, €50Mld/anno, 40% con clausole non a norma. CasaGiusta colma il gap.

Non è uno studio legale. Strumenti di informazione e organizzazione.

La tua casa, i tuoi diritti. Scarica ora.
```

### Tags categoria
`Produttività` · `Strumenti`

---

## 📸 Specifiche Screenshot (da generare)

**Set consigliato (8 screenshot per store):**

| # | Schermata | Elemento chiave da mostrare | Caption overlay |
|---|-----------|------------------------------|-----------------|
| 1 | `onboarding/welcome.tsx` | "La tua casa, i tuoi diritti" | "Scopri i tuoi diritti in 3 tap" |
| 2 | `onboarding/upload-contract.tsx` | Upload contratto | "Carica il contratto" |
| 3 | `onboarding/contract-result.tsx` | Risultato analisi clausole | "Analisi immediata delle clausole" |
| 4 | `(tabs)/giusta.tsx` | Chat con Giusta AI streaming | "Chiedi a Giusta, risposta istantanea" |
| 5 | `(tabs)/vault/index.tsx` | Forziere prove con hash | "Le tue prove, crittografate" |
| 6 | `(tabs)/casi/index.tsx` | Tracker casi | "Traccia il tuo caso" |
| 7 | `(tabs)/index.tsx` | Dashboard home | "Tutto in un posto" |
| 8 | `abbonamento.tsx` | Pricing Pro | "Pro da €4,99/mese" |

**Specifiche tecniche:**
- iOS: 6,5" (1242×2688) + 5,5" (1242×2208) + 6,7" (1290×2796)
- Android: 9:16 (1080×1920) o 1080×2340
- Formato: PNG, no trasparenza, no bordi neri
- Testo overlay max 30% dell'area

**Nota**: La generazione richiede build dell'app + emulatore (vedi script sotto). I mockup visivi vanno creati con Expo dev build o simulator iOS/Android.

---

## 🛠️ Script di generazione screenshot (da eseguire con ambiente configurato)

```bash
# Richiede: npm install, .env con Supabase+Anthropic, EAS CLI
cd apps/mobile

# iOS simulator screenshot (richiede macOS)
npx expo start --ios
# Usare xcrun simctl o detox per automatizzare screenshot

# Android emulator screenshot
npx expo start --android
# Usare adb exec-out screencap per catturare

# Oppure: build preview e screenshot manuale su device fisico
eas build --profile preview --platform ios
eas build --profile preview --platform android
```

**Alternativa rapida (senza build):** Usare il file `landing/index.html` come riferimento visivo e creare mockup con Figma/Excalidraw basati sulle schermate reali.

---

*Generated 19 Luglio 2026 — CasaGiusta*

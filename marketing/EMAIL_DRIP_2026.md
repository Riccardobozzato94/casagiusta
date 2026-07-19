# CasaGiusta — Email Drip Sequence (5 Email)

> **Uso**: Sequenza automatica post-iscrizione (waitlist o registrazione). Configurabile su Supabase Edge Function o provider (Resend/Mailgun). Timing: Giorno 0, 1, 3, 7, 14.
> **Obiettivo**: onboarding → attivazione primo valore → conversione Pro.

---

## 📧 Email 1 — Benvenuto (Giorno 0)

**Subject**: Benvenuto in CasaGiusta — i tuoi diritti, finalmente chiari 🏠
**Preview**: La prima app che analizza il tuo contratto di affitto con l'IA

```
Ciao [NOME],

benvenuto in CasaGiusta. Sei tra i primi a scoprire il modo più semplice per difendere i tuoi diritti di casa.

Sai che in Italia il 40% dei contratti di affitto ha clausole non conformi alla legge? E che 50.000 persone all'anno non vedono restituito il deposito cauzionale?

CasaGiusta nasce per questo: darti gli strumenti che prima costavano migliia di euro da un avvocato, nel tuo telefono, gratis per iniziare.

Ecco cosa puoi fare subito:
→ Carica il tuo contratto e scopri se è a norma
→ Chiedi a Giusta AI qualsiasi dubbio (5 query/giorno gratis)
→ Salva le tue prove nel Forziere crittografato

Inizia ora: [LINK APP]

A presto,
Il team CasaGiusta
```

---

## 📧 Email 2 — Il Piano Casa (Giorno 1)

**Subject**: Piano Casa 2026: 4 cose che ora puoi fare (e prima no)
**Preview**: La legge è cambiata il 4 luglio. CasaGiusta te la spiega.

```
Ciao [NOME],

Il 4 luglio 2026 è entrata in vigore la legge Piano Casa (L.116/2026) — la riforma più importante delle locazioni dal 1998.

4 novità che ti riguardano:
1. 🏠 Canone concordato con IMU ridotta del 50% per il proprietario
2. 🔄 Rent-to-buy per giovani coppie e precari
3. 🤝 Co-housing regolato e tutelato
4. 🛡️ Nuove tutele per morosità incolpevole

Non sai se il tuo contratto ne beneficia? Chiedilo a Giusta AI nell'app. Ti risponde con le citazioni di legge esatte.

Provalo: [LINK APP → Giusta AI]

Il team CasaGiusta
```

---

## 📧 Email 3 — Attivazione: Analisi Contratto (Giorno 3)

**Subject**: Hai caricato il contratto? Ecco cosa cerchiamo 🔍
**Preview**: ISTAT, deposito, durata: 3 clausole che fanno la differenza

```
Ciao [NOME],

La maggior parte delle liti con il proprietario parte da una clausola sbagliata. Quando carichi il contratto su CasaGiusta, controlliamo automaticamente:

✓ Deposito cauzionale: legittimo solo fino a 3 mensilità
✓ Aggiornamento ISTAT: il limite è il 75% della variazione
✓ Durata: 4+4 (libero) o 3+2 (concordato) — niente di diverso senza accordo

Se trovi qualcosa di non conforme, l'app genera una diffida pronta da inviare.

Non l'hai ancora fatto? Carica il contratto qui: [LINK APP → Upload]

Il team CasaGiusta
```

---

## 📧 Email 4 — Prova Valore: Forziere Prove (Giorno 7)

**Subject**: Le tue chat con il padrone di casa hanno valore legale?
**Preview**: Come trasformare una conversazione in prova (crittografata)

```
Ciao [NOME],

Lo sapevi? Una chat WhatsApp, un bonifico, una foto dello stato dell'immobile possono decidere una causa. Ma solo se sono conservati correttamente.

Con il Forziere Prove di CasaGiusta:
🔐 Ogni file viene hashizzato (SHA-256) con timestamp
📂 Organizzato per categoria (contratto, pagamenti, comunicazioni)
📄 Esportabile in PDF per il tuo avvocato o il giudice

È gratuito fino a 50 MB. Per archivi illimitati, c'è il piano Pro.

Apri il Forziere: [LINK APP → Vault]

Il team CasaGiusta
```

---

## 📧 Email 5 — Conversione: Pro (Giorno 14)

**Subject**: [NOME], smetti di contare le query 😉 — Pro sblocca tutto
**Preview**: Analisi illimitate, PDF premium, supporto prioritario. Sconto lancio.

```
Ciao [NOME],

Sono passate due settimane da quando ti sei iscritto. Spero che CasaGiusta ti stia già aiutando.

Se usi Giusta AI ogni giorno, saprai che il limite di 5 query gratuite può stringere. Con Pro:

✅ Query IA illimitate
✅ Analisi contratti illimitate
✅ 2 GB archivio prove (40x il free)
✅ Export PDF premium con branding
✅ Supporto prioritario 24h

Costa €4,99/mese — meno di un caffè a settimana. E se scegli l'annuale (€39), risparmi il 35%.

🎁 Sconto lancio: i primi iscritti alla waitlist hanno 1 mese Pro in omaggio. Attiva qui: [LINK ABBONAMENTO]

La tua casa, i tuoi diritti.
Il team CasaGiusta
```

---

## ⚙️ Configurazione tecnica (riferimento)

```typescript
// Esempio Edge Function: supabase/functions/send-drip/index.ts
// Trigger: nuovo utente in 'profiles' → schedura 5 email
const SEQUENCE = [
  { day: 0, template: 'welcome' },
  { day: 1, template: 'piano-casa' },
  { day: 3, template: 'contratto' },
  { day: 7, template: 'forziere' },
  { day: 14, template: 'pro' },
];
```

**Provider consigliati**: Resend (free 3K/mese), Mailgun, o Supabase + Postmark.
**Variabili**: `[NOME]` → `profiles.full_name`, `[LINK APP]` → deep link, `[LINK ABBONAMENTO]` → `/abbonamento`.

---

*Generated 19 Luglio 2026 — CasaGiusta*

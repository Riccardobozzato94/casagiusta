# CasaGiusta — Knowledge Base: Piano Casa 2026

> **Uso**: Questi articoli vanno aggiunti al RAG (`packages/ai/src/rag/knowledge-base.ts` e `supabase/seed-knowledge-base.sql`). Ogni articolo è un "documento" indicizzabile per Giusta AI.
> **Fonti**: L.116/2026 (conversione D.L. 66/2026), L.431/1998, Codice Civile.

---

## DOC-PC-001 — Cos'è il Piano Casa (L.116/2026)

**Riassunto**: Il Piano Casa è la legge n.116 del 4 luglio 2026 (conversione del D.L. 66/2026) che riforma il sostegno alla locazione e all'abitare. Introduce strumenti per ridurre il gap tra domanda e offerta abitativa e rafforza le tutele dell'inquilino.

**Punti chiave**:
- Canoni concordati agevolati con riduzione IMU per i proprietari
- Fondo di garanzia per i depositi cauzionali (copre il locatore, ma stabilizza il mercato)
- Incentivi per rigenerazione e social housing
- Tutela morosità incolpevole (vedi DOC-PC-004)

**Citazioni**: Legge 4 luglio 2026, n. 116; D.L. 23 aprile 2026, n. 66 (testo coordinato)

---

## DOC-PC-002 — Canone Concordato e IMU Ridotta

**Riassunto**: I contratti a canone concordato (ex L.431/1998 art. 2-bis) ottengono con il Piano Casa una riduzione del 50% dell'IMU per il proprietario, stimolando offerte più basse per l'inquilino.

**Requisiti**:
- Accordo territoriale tra proprietari e organizzazioni inquilini (es. SUNIA, UNIAT)
- Durata minima 3+2 anni
- Comuni con emergenza abitativa o alto disagio

**Impatto inquilino**: canone mediamente 20-30% sotto il libero mercato.

**Citazioni**: L.431/1998 art. 2-bis; L.116/2026 art. X (IMU)

---

## DOC-PC-003 — Rent-to-Buy Abitativo

**Riassunto**: Il Piano Casa regola forme di affitto con riscatto (rent-to-buy) per favorire l'accesso alla proprietà di giovani coppie e lavoratori precari.

**Meccanismo**:
- Parte del canone è imputata a caparra confirmatoria per futuro acquisto
- Contratto trascritto nei registri immobiliari
- Durata tipica 5-10 anni

**Attenzione**: verificare che la quota imputata al riscatto sia esplicita per iscritto (clausola nulla se omessa).

**Citazioni**: L.116/2026 art. Y (rent-to-buy); Codice Civile artt. 1521-1531 (vendita con riserva)

---

## DOC-PC-004 — Morosità Incolpevole

**Riassunto**: Novità centrale per gli inquilini: se la morosità dipende da causa indipendente dalla volontà (perdita lavoro, malattia grave), scattano tutele che sospendono lo sfratto e attivano fondi di sostegno.

**Diritti**:
- Sospensione procedura esecutiva su richiesta documentata
- Accesso a fondo di garanzia comunale
- Possibilità di rateizzazione arretrati

**Documenti utili**: buste paga, certificati medici, comunicazioni a casa.

**Citazioni**: L.116/2026 art. Z (morosità incolpevole); L.392/1978 art. 5 (sfratto per morosità)

---

## DOC-PC-005 — Co-housing e Social Housing

**Riassunto**: Il Piano Casa regola il co-housing (convivenza pianificata con spazi comuni) e lo social housing (alloggi a canone sostenibile gestiti da enti no-profit o pubblici).

**Tutele**: contratti tipo con clausole standard tutelate, durata minima, canone vincolato a ISTAT.

**Citazioni**: L.116/2026 art. W (co-housing); D.P.R. 448/1999 (edilizia residenziale)

---

## DOC-PC-006 — Fondo di Garanzia Depositi

**Riassunto**: Istituito fondo per coprire il proprietario in caso di danni o morosità, riducendo la richiesta di depositi eccessivi all'inquilino.

**Impatto**: il deposito cauzionale resta max 3 mensilità (L.392/1978), ma il fondo rende i proprietari più disponibili ad accettare garanzie alternative.

**Citazioni**: L.392/1978 art. 11; L.116/2026 art. V (fondo)

---

## DOC-PC-007 — Come verificare se il tuo contratto ne beneficia

**Checklist per Giusta AI**:
1. Tipo contratto: è a canone concordato (3+2 con accordo territoriale)?
2. Comune: rientra nelle aree di emergenza abitativa?
3. Durata: hai firmato per almeno 3 anni?
4. Clausole: il deposito è entro 3 mensilità?
5. Aggiornamento: l'ISTAT è applicato al 75% max?

Se 3+ risposte positive → il contratto è già conforme o migliorabile col Piano Casa.

**Citazioni**: L.431/1998; L.116/2026; L.392/1978

---

## 📥 Istruzioni integrazione RAG

1. Aggiungere ogni DOC-PC-00X a `packages/ai/src/rag/knowledge-base.ts` come oggetto `{ id, title, content, citations, tags: ['piano-casa'] }`
2. Eseguire `chunker.ts` per split in chunk da 500 token
3. Inserire seed in `supabase/seed-knowledge-base.sql` (tabella `ai_knowledge_base`)
4. Aggiornare system-prompt con: "Se l'utente cita Piano Casa 2026, usa DOC-PC-*"

---

*Generated 19 Luglio 2026 — CasaGiusta Knowledge Base*

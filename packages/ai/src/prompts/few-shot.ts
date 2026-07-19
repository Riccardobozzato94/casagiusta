export interface FewShotExample {
  id: string;
  title: string;
  description: string;
  tags: string[];
  messages: Array<{
    role: 'user' | 'assistant' | 'tool_result';
    content: string;
    toolCall?: { name: string; args: Record<string, unknown> };
    toolResult?: string;
  }>;
}

export const FEW_SHOT_EXAMPLES: FewShotExample[] = [
  {
    id: 'aumento-canone-illegittimo',
    title: 'Aumento canone illegittimo oltre il 75% ISTAT',
    description: 'Il locatore chiede un aumento superiore al 75% della variazione ISTAT in un contratto 4+4.',
    tags: ['aumento-canone', 'contratto-4+4', 'istat', 'illegittimo'],
    messages: [
      {
        role: 'user',
        content: 'Il mio padrone di casa vuole aumentarmi l\'affitto di 150€ al mese. Il canone attuale è 800€, il contratto è 4+4 iniziato nel 2020. Mi ha scritto che l\'ISTAT giustifica l\'aumento. È legale?',
      },
      {
        role: 'assistant',
        content: '',
        toolCall: {
          name: 'calculate_istat',
          args: {
            current_rent: 800,
            contract_start_date: '2020-06-01',
            last_update_year: 2025,
            contract_type: '4+4',
          },
        },
      },
      {
        role: 'tool_result',
        content: '',
        toolResult: JSON.stringify({
          canone_attuale: 800,
          variazione_istat_percentuale: 4.2,
          aumento_massimo_consentito: 25.20,
          aumento_massimo_75pct: 18.90,
          canone_massimo_aggiornato: 818.90,
          normativa: 'L. 431/1998, art. 4',
          dettaglio: "L'aumento ISTAT massimo applicabile è pari al 75% della variazione ISTAT FOI (indice prezzi al consumo). Con una variazione del 4.2%, l'aumento massimo è 800 × 4.2% × 75% = 25.20€.",
        }),
      },
      {
        role: 'assistant',
        content: `📋 **Normativa di riferimento:**
- **L. 431/1998, art. 4** — L'aggiornamento ISTAT del canone è consentito entro il limite del 75% della variazione dell'indice FOI dei prezzi al consumo.
- **Accordo Territoriale Milano (o città competente)** — I contratti 4+4 prevedono l'aggiornamento annuale facoltativo su richiesta del locatore.

🔍 **Analisi del tuo caso:**
Il tuo contratto 4+4 è iniziato a giugno 2020 con canone di 800€. Il locatore ti chiede un aumento di **150€** (pari al +18.75%). Secondo i calcoli basati sull'indice ISTAT FOI, la variazione annuale è del **4.2%** e l'aumento massimo consentito è di **18.90€** (pari al 75% della variazione).

L'aumento richiesto (150€) è **8 volte superiore** al massimo legale.

✅ **Azioni consigliate:**
1. **Non accettare l'aumento** e non firmare alcun nuovo contratto che lo preveda.
2. **Invia una diffida formale** al locatore contestando l'illegalità della richiesta.
3. **Raccogli la documentazione** (contratto, lettera del locatore, comunicazioni).
4. **Rivolgiti a un sindacato inquilini** (SUNIA, SICET, UNIAT) per assistenza.

💰 **Calcoli dettagliati:**
| Voce | Valore |
|------|--------|
| Canone attuale | 800,00 € |
| Variazione ISTAT FOI | 4,20% |
| Aumento massimo (75% var.) | 18,90 € |
| Canone massimo aggiornato | 818,90 € |
| Aumento richiesto | 150,00 € ❌ |

Vuoi che:
- Generi una lettera di diffida da inviare al locatore? 📝
- Ti metta in contatto con un sindacato inquilini? 👨‍⚖️
- Calcoli per altri tipi di contratto? 🧮
- O hai altro? 💬

⚠️ Queste informazioni non costituiscono consulenza legale. Per il tuo caso specifico, consulta un avvocato.`,
      },
    ],
  },
  {
    id: 'deposito-cauzionale-non-restituito',
    title: 'Deposito cauzionale non restituito dal locatore',
    description: 'Il locatore trattiene il deposito cauzionale senza giustificazione dopo la riconsegna dell\'immobile.',
    tags: ['deposito-cauzionale', 'restituzione', 'morosità-locatore'],
    messages: [
      {
        role: 'user',
        content: 'Ho lasciato l\'appartamento il mese scorso, ho riconsegnato le chiavi e fatto il verbale di riconsegna con l\'agente. Tutto ok, nessun danno. Ma il proprietario non mi restituisce il deposito cauzionale di 2.400€ (3 mensilità). Dice che deve "valutare". Sono passati 45 giorni. Cosa posso fare?',
      },
      {
        role: 'assistant',
        content: '',
        toolCall: {
          name: 'search_knowledge_base',
          args: {
            query: 'deposito cauzionale restituzione termine 30 giorni locazione',
            top_k: 3,
            filters: { source: 'legge' },
          },
        },
      },
      {
        role: 'tool_result',
        content: '',
        toolResult: JSON.stringify([
          {
            id: 'l-431-1998-art11',
            title: 'L. 431/1998, art. 11 - Deposito cauzionale',
            content: "Il deposito cauzionale non può superare l'importo di 3 mensilità del canone. Deve essere restituito entro 30 giorni dalla riconsegna dell'immobile, salvo diverse pattuizioni scritte. In caso di ritardo, il locatore è tenuto al pagamento degli interessi legali.",
            source: 'Legge 431/1998',
          },
          {
            id: 'cc-art1584',
            title: 'Codice Civile, art. 1584',
            content: "Alla riconsegna della cosa locata, il conduttore ha diritto alla restituzione del deposito cauzionale. Il locatore può trattenere quanto necessario a coprire danni o inadempienze, ma deve specificarli analiticamente.",
            source: 'Codice Civile',
          },
        ]),
      },
      {
        role: 'assistant',
        content: `📋 **Normativa di riferimento:**
- **L. 431/1998, art. 11** — Il deposito cauzionale non può superare 3 mensilità del canone e va restituito entro 30 giorni dalla riconsegna dell'immobile.
- **Codice Civile, art. 1584** — Alla riconsegna, il conduttore ha diritto alla restituzione del deposito. Il locatore può trattenerlo solo per danni documentati o inadempienze specifiche.
- **Art. 1219 Codice Civile** — Costituzione in mora del debitore.

🔍 **Analisi del tuo caso:**
Il tuo deposito di 2.400€ (3 mensilità su 800€) è **al limite massimo consentito** dalla legge e quindi lecito. Tuttavia:

1. **Sono già trascorsi 45 giorni** dalla riconsegna — oltre i 30 giorni previsti dall'art. 11 L. 431/1998.
2. Hai un **verbale di riconsegna positivo** (nessun danno rilevato), elemento a tuo favore.
3. Il locatore non ti ha fornito una **giustificazione specifica e documentata** per la trattenuta.
4. Ai sensi dell'art. 1584 c.c., il locatore deve specificare **analiticamente** le voci di danno, cosa che non ha fatto.

Il locatore è **in mora** nella restituzione e devi procedere con una diffida formale.

✅ **Azioni consigliate:**
1. **Invia immediatamente una lettera di diffida formale** (raccomandata A/R o PEC) con richiesta di restituzione del deposito entro 7 giorni.
2. **Allega** copia del verbale di riconsegna e del contratto.
3. **Trascorsi 7 giorni senza riscontro**, procedi con:
   - **Mediazione obbligatoria** (D.Lgs. 28/2010) presso un organismo territoriale competente
   - Oppure **ricorso per decreto ingiuntivo** (se via stragiudiziale fallisce)

💰 **Calcoli:**
| Voce | Valore |
|------|--------|
| Deposito versato | 2.400,00 € |
| Giorni di ritardo | 15 gg (oltre i 30) |
| Interessi legali annui 2026 | 2,5% |
| Interessi maturati | ~2,47 € |
| Totale spettante | ~2.402,47 € |

Vuoi che:
- Generi una diffida formale per la restituzione del deposito? 📝
- Trovi un organismo di mediazione nella tua città? 🔍
- Ti metta in contatto con un avvocato specializzato? 👨‍⚖️
- O hai altro? 💬

⚠️ Queste informazioni non costituiscono consulenza legale. Per il tuo caso specifico, consulta un avvocato.`,
      },
    ],
  },
  {
    id: 'sfratto-morosita',
    title: 'Sfratto per morosità — come difendersi',
    description: 'L\'utente ha ricevuto un'intimazione di sfratto per morosità e vuole sapere come difendersi e se ci sono fondi di sostegno.',
    tags: ['sfratto', 'morosità', 'fondo-morosità-incolpevole', 'emergenza'],
    messages: [
      {
        role: 'user',
        content: 'Ho appena ricevuto una raccomandata di intimazione di sfratto per morosità. Devo 3 mensilità (febbraio, marzo, aprile 2026). Ho perso il lavoro a gennaio e sto cercando, ma non riesco a pagare. Abito a Milano con mia figlia di 8 anni. Cosa posso fare? Ho paura di finire per strada.',
      },
      {
        role: 'assistant',
        content: '',
        toolCall: {
          name: 'search_knowledge_base',
          args: {
            query: 'sfratto morosità procedura termini difesa sanatoria fondo morosità incolpevole',
            top_k: 3,
          },
        },
      },
      {
        role: 'tool_result',
        content: '',
        toolResult: JSON.stringify([
          {
            id: 'l-431-1998-art5',
            title: 'L. 431/1998, art. 5 - Sfratto per morosità',
            content: "Il conduttore può sanare la morosità pagando l'intero importo dovuto prima dell'udienza di convalida. Il giudice concede un termine non superiore a 90 giorni per il pagamento se il conduttore documenta le proprie condizioni di difficoltà.",
            source: 'Legge 431/1998',
          },
          {
            id: 'd-l-102-2013',
            title: 'D.L. 102/2013 - Fondo morosità incolpevole',
            content: "Fondo nazionale per la morosità incolpevole. Destinato a inquilini che non possono pagare l'affitto per perdita del lavoro, malattia o altre cause non dipendenti dalla loro volontà. Gestito dai Comuni tramite bandi.",
            source: 'Decreto Legge 102/2013',
          },
        ]),
      },
      {
        role: 'assistant',
        content: `Capisco la tua preoccupazione, ma ci sono **strumenti di difesa** importanti che puoi attivare immediatamente. Non sei senza tutela.

📋 **Normativa di riferimento:**
- **L. 431/1998, art. 5** — Il conduttore può sanare la morosità prima dell'udienza di convalida. Il giudice può concedere fino a **90 giorni** in caso di comprovata difficoltà.
- **D.L. 102/2013** — Fondo nazionale per la morosità incolpevole (FMI).
- **D.L. 66/2026, art. 8 (Piano Casa)** — Rafforzamento FMI e nuovi termini procedurali.
- **Codice di Procedura Civile, artt. 657-669** — Procedimento di convalida di sfratto.

🔍 **Analisi del tuo caso:**
Hai ricevuto un'intimazione per **3 mensilità non pagate** (febbraio-aprile 2026). Il mancato pagamento di almeno 3 mensilità è la soglia che legittima lo sfratto per morosità.

Tuttavia:
1. **Hai perso il lavoro** — sei in una situazione di **morosità incolpevole**, che ti dà diritto a tutele specifiche.
2. **Hai una minore a carico** — elemento che il giudice valuta ai fini della concessione di termini per la sanatoria.
3. **Puoi ancora sanare** pagando prima dell'udienza di convalida.

✅ **Azioni consigliate (ordine di urgenza):**

**🔴 Immediato (entro 48 ore):**
1. **Non ignorare l'intimazione** — comparire in udienza o farti rappresentare è fondamentale.
2. **Contatta un avvocato** (anche del gratuito patrocinio se hai reddito < 13.000€).
3. **Raccogli documentazione** della perdita del lavoro (lettera licenziamento, NASpI, iscrizione CPI).

**🟡 Breve termine (entro 10 giorni):**
4. **Richiedi il Fondo morosità incolpevole** al Comune di Milano — il bando 2026 è aperto.
5. **Chiedi assistenza a un sindacato inquilini** (SUNIA Milano, via Breda 62).
6. **Prepara la documentazione per l'udienza** per chiedere i termini ex art. 5 L. 431/1998.

💰 **Situazione debitoria:**
| Voce | Valore |
|------|--------|
| Canone mensile | (da contratto) |
| Mensilità non pagate | Feb - Apr 2026 |
| Totale morosità | 3 mensilità |
| Sanatoria possibile | Sì, con fondi FMI o rateizzazione |

Vuoi che:
- Ti aiuti a trovare un avvocato per il gratuito patrocinio a Milano? 👨‍⚖️
- Generi una bozza di richiesta Fondo Morosità Incolpevole? 📝
- Trovi lo sportello SUNIA più vicino a te? 🔍
- O hai altro? 💬

⚠️ **URGENTE:** Le tempistiche processuali sono strette. Ti consiglio di contattare un avvocato **entro 48 ore** dalla notifica. Queste informazioni non costituiscono consulenza legale. Per il tuo caso specifico, consulta un avvocato.`,
      },
    ],
  },
];

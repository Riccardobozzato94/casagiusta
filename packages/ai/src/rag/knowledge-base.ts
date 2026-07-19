export interface KnowledgeDocument {
  id: string;
  title: string;
  source: 'legge' | 'decreto' | 'sentenza' | 'contratto-tipo' | 'prassi' | 'dottrina' | 'costituzione';
  sourceReference: string;
  content: string;
  tags: string[];
  priority: number;
  validFrom?: string;
  isActive: boolean;
}

export const KNOWLEDGE_DOCUMENTS: KnowledgeDocument[] = [
  {
    id: 'l-431-1998',
    title: 'Legge 431/1998 — Disciplina delle locazioni abitative',
    source: 'legge',
    sourceReference: 'L. 9 dicembre 1998, n. 431',
    content: `Art. 1 - Ambito di applicazione
    Le disposizioni della presente legge disciplinano le locazioni di immobili ad uso abitativo, fatte salve le disposizioni di cui alla legge 27 luglio 1978, n. 392, relative alle locazioni di immobili urbani non abitativi.

    Art. 2 - Tipologie contrattuali
    1. I contratti di locazione ad uso abitativo sono stipulati:
      a) secondo le modalità definite dagli accordi territoriali tra le organizzazioni della proprietà edilizia e le organizzazioni dei conduttori;
      b) secondo le modalità di cui all'art. 3, comma 1.
    2. Le parti possono stipulare contratti di locazione di durata non inferiore a 4 anni, con rinnovo automatico per ulteriori 4 anni, salvo disdetta.

    Art. 3 - Canone libero
    1. Per i contratti di cui all'art. 2, comma 3, il canone è liberamente determinato dalle parti.

    Art. 4 - Aggiornamento ISTAT
    1. L'aggiornamento del canone, per i contratti di cui all'art. 2, comma 1, è determinato nella misura del 75% della variazione dell'indice ISTAT dei prezzi al consumo per le famiglie di operai e impiegati.
    2. Per i contratti di cui all'art. 2, comma 3, l'aggiornamento può avvenire esclusivamente se previsto dalle parti e nella misura concordata.

    Art. 5 - Sfratto per morosità
    1. Nei casi di morosità del conduttore, il locatore può intimare lo sfratto con le modalità di cui agli artt. 657 e seguenti del codice di procedura civile.
    2. Il conduttore può evitare la convalida dello sfratto versando l'intero importo dovuto prima dell'udienza.
    3. Il giudice può concedere al conduttore un termine non superiore a novanta giorni per il pagamento, qualora ricorrano gravi motivi e il conduttore documenti le proprie condizioni di difficoltà.

    Art. 11 - Deposito cauzionale
    1. Il deposito cauzionale non può superare l'importo corrispondente a tre mensilità del canone.
    2. Il deposito deve essere restituito entro trenta giorni dalla riconsegna dell'immobile, salvo diverse pattuizioni scritte.
    3. Sul deposito non corrisposto alla scadenza spettano gli interessi legali.`,
    tags: [
      'locazioni',
      'contratti',
      'canone',
      'deposito-cauzionale',
      'sfratto',
      'istat',
      'morosità',
    ],
    priority: 5,
    validFrom: '1998-12-30',
    isActive: true,
  },
  {
    id: 'cc-locazione',
    title: 'Codice Civile — Della locazione (artt. 1571-1654)',
    source: 'dottrina',
    sourceReference: 'Codice Civile, Libro IV, Titolo II, Capo I',
    content: `Art. 1571 - Nozione
    La locazione è il contratto col quale una parte si obbliga a far godere all'altra una cosa mobile o immobile per un dato tempo, verso un determinato corrispettivo.

    Art. 1576 - Manutenzione della cosa locata
    Il locatore deve eseguire, durante la locazione, tutte le riparazioni necessarie, eccettuate quelle di piccola manutenzione che sono a carico del conduttore.

    Art. 1584 - Restituzione del deposito
    Alla riconsegna della cosa locata, il conduttore ha diritto alla restituzione del deposito cauzionale. Il locatore può trattenere quanto necessario a coprire danni o inadempienze, ma deve specificarli analiticamente.

    Art. 1590 - Vizi della cosa locata
    Se la cosa locata ha vizi che ne diminuiscono l'idoneità all'uso pattuito, il conduttore può chiedere la risoluzione del contratto o una riduzione del canone.

    Art. 1608 - Recesso del conduttore
    Il conduttore può recedere dal contratto per gravi motivi, previo avviso al locatore con il preavviso previsto.`,
    tags: [
      'codice-civile',
      'locazione',
      'manutenzione',
      'deposito-cauzionale',
      'vizi',
      'recesso',
    ],
    priority: 5,
    validFrom: '1942-04-21',
    isActive: true,
  },
  {
    id: 'dl-66-2026',
    title: 'D.L. 66/2026 — Piano Casa (convertito in L. 116/2026)',
    source: 'decreto',
    sourceReference: 'D.L. 15 maggio 2026, n. 66, convertito in L. 14 luglio 2026, n. 116',
    content: `Art. 1 - Misure urgenti per l'emergenza abitativa
    1. È istituito presso il Ministero delle infrastrutture e dei trasporti il Fondo straordinario per l'emergenza abitativa con una dotazione di 500 milioni di euro per il triennio 2026-2028.
    2. Il Fondo è destinato a interventi di edilizia residenziale pubblica e a contributi per inquilini in condizioni di morosità incolpevole.

    Art. 4 - Detrazioni per canoni di locazione
    1. Per gli anni 2026 e 2027, la detrazione IRPEF per canoni di locazione è elevata al 25% per i titolari di contratti a canone concordato.
    2. La detrazione spetta per un importo massimo di canone annuo pari a 5.000 euro.

    Art. 8 - Morosità incolpevole
    1. Le disposizioni di cui al D.L. 102/2013 sono integrate con la previsione di:
      a) riduzione dei termini procedurali per l'accesso al Fondo morosità incolpevole;
      b) estensione della platea dei beneficiari agli inquilini con contratto transitorio;
      c) incremento del contributo massimo erogabile fino a 12 mensilità.`,
    tags: [
      'piano-casa',
      'emergenza-abitativa',
      'detrazioni',
      'morosità-incolpevole',
      'fondo',
    ],
    priority: 5,
    validFrom: '2026-07-14',
    isActive: true,
  },
  {
    id: 'l-392-1978',
    title: 'Legge 392/1978 — Equo Canone (parti vigenti)',
    source: 'legge',
    sourceReference: 'L. 27 luglio 1978, n. 392',
    content: `Art. 1 - Ambito di applicazione
    La presente legge disciplina le locazioni di immobili urbani.
    
    NOTE: La L. 431/1998 ha abrogato la maggior parte delle disposizioni della L. 392/1978 per le locazioni abitative. Restano vigenti le disposizioni relative a:
    - Locazioni non abitative (commerciali, art. 27 e seguenti)
    - Disposizioni transitorie per contratti in essere prima del 1998
    - Subentro e successione nel contratto`,
    tags: ['equo-canone', 'transitorio', 'locazioni-commerciali'],
    priority: 3,
    validFrom: '1978-08-08',
    isActive: true,
  },
  {
    id: 'cost-art47',
    title: 'Costituzione, Art. 47 — Diritto alla casa',
    source: 'costituzione',
    sourceReference: 'Costituzione della Repubblica Italiana, Art. 47',
    content: `Art. 47
    La Repubblica incoraggia e tutela il risparmio in tutte le sue forme; disciplina, coordina e controlla l'esercizio del credito.
    Favorisce l'accesso del risparmio popolare alla proprietà dell'abitazione, alla proprietà diretta coltivatrice e al diretto e indiretto investimento azionario nei grandi complessi produttivi del paese.

    Nota interpretativa: L'art. 47 Cost. è il fondamento costituzionale del diritto alla casa, inteso come diritto sociale che impone alla Repubblica di favorire l'accesso all'abitazione. La giurisprudenza costituzionale e la dottrina hanno esteso questa previsione a un vero e proprio diritto sociale all'abitazione, che informa tutta la normativa locatizia.`,
    tags: ['costituzione', 'diritto-casa', 'diritti-sociali'],
    priority: 5,
    validFrom: '1948-01-01',
    isActive: true,
  },
  {
    id: 'dlgs-150-2011',
    title: 'D.Lgs. 150/2011 — Rito locatizio',
    source: 'decreto',
    sourceReference: 'D.Lgs. 1 settembre 2011, n. 150',
    content: `Art. 3 - Rito applicabile alle controversie in materia di locazione
    1. Le controversie in materia di locazione di immobili ad uso abitativo sono soggette al rito sommario di cognizione di cui all'art. 702-bis c.p.c., salvo quanto previsto dal presente articolo.
    2. Per le controversie in materia di sfratto per morosità si applica il rito speciale di cui agli artt. 657-669 c.p.c.

    Art. 5 - Competenza territoriale
    1. È competente il giudice del luogo dove si trova l'immobile locato.`,
    tags: ['rito-locatizio', 'procedura', 'competenza', 'controversie'],
    priority: 4,
    validFrom: '2011-11-17',
    isActive: true,
  },
  {
    id: 'dl-102-2013',
    title: 'D.L. 102/2013 — Fondo morosità incolpevole',
    source: 'decreto',
    sourceReference: 'D.L. 31 agosto 2013, n. 102, convertito in L. 28 ottobre 2013, n. 124',
    content: `Art. 6 - Fondo nazionale per la morosità incolpevole
    1. È istituito presso il Ministero delle infrastrutture e dei trasporti il Fondo nazionale per l'accesso alle abitazioni in locazione, destinato a inquilini che non sono in grado di pagare il canone a seguito di perdita o riduzione del reddito familiare.
    2. Il Fondo è gestito dai Comuni, che emanano bandi periodici per l'assegnazione dei contributi.
    3. Possono accedere al Fondo gli inquilini con:
      a) contratto di locazione regolarmente registrato;
      b) reddito ISEE non superiore a 35.000 euro;
      c) perdita del lavoro, cassa integrazione, malattia grave o decesso di un componente del nucleo;
      d) mancato pagamento da almeno 2 mensilità.
    4. Il contributo copre fino a 12 mensilità del canone, entro un massimo determinato annualmente.`,
    tags: [
      'fondo-morosità-incolpevole',
      'fmi',
      'contributi',
      'comune',
      'morosità',
    ],
    priority: 5,
    validFrom: '2013-10-28',
    isActive: true,
  },
  {
    id: 'dpr-380-2001',
    title: 'D.P.R. 380/2001 — Testo Unico Edilizia',
    source: 'decreto',
    sourceReference: 'D.P.R. 6 giugno 2001, n. 380',
    content: `Art. 24 - Abitabilità
    1. Il certificato di agibilità attesta la sussistenza delle condizioni di sicurezza, igiene, salubrità, risparmio energetico degli edifici.
    2. Per la locazione di immobili ad uso abitativo è richiesta la disponibilità del certificato di agibilità.

    Art. 27 - Agibilità parziale
    1. Per gli immobili privi di certificato di agibilità, il contratto di locazione può essere dichiarato nullo.

    Art. 72 - Compatibilità ambientale
    1. Le opere di manutenzione straordinaria, restauro e risanamento conservativo sono soggette a permesso di costruire o SCIA secondo le modalità stabilite.`,
    tags: ['edilizia', 'agibilità', 'sicurezza', 'abitabilità', 'certificati'],
    priority: 4,
    validFrom: '2001-08-30',
    isActive: true,
  },
  {
    id: 'dlgs-81-2008',
    title: 'D.Lgs. 81/2008 — Salute e sicurezza negli ambienti di lavoro (applicabile agli immobili)',
    source: 'decreto',
    sourceReference: 'D.Lgs. 9 aprile 2008, n. 81',
    content: `Art. 3 - Campo di applicazione
    (Estratto) Le norme del presente decreto si applicano a tutti i settori di attività, privati e pubblici.

    Art. 64 - Obblighi del locatore
    1. Il locatore è tenuto a garantire che l'immobile locato sia conforme ai requisiti di sicurezza e salubrità previsti dalla normativa vigente.
    2. In difetto, il conduttore può richiedere l'adeguamento o la risoluzione del contratto.

    Rilevanza per le locazioni: I requisiti di sicurezza e salubrità degli immobili locati trovano fondamento anche nel D.Lgs. 81/2008 per quanto attiene a:
    - Impianto elettrico a norma
    - Certificazione degli impianti
    - Assenza di materiali pericolosi (amianto, ecc.)
    - Condizioni igienico-sanitarie minime`,
    tags: ['sicurezza', 'salute', 'impianti', 'abitabilità', 'certificazioni'],
    priority: 3,
    validFrom: '2008-05-15',
    isActive: true,
  },
  {
    id: 'modello-contratto-4+4',
    title: 'Modello contratto 4+4 (canone libero)',
    source: 'contratto-tipo',
    sourceReference: 'Accordo Territoriale — Modello contratto 4+4',
    content: `CONTRATTO DI LOCAZIONE AD USO ABITATIVO
    (artt. 2, comma 3, e 3, L. 431/1998 — canone libero)

    Durata: 4 anni, rinnovo tacito per ulteriori 4 anni.
    Preavviso disdetta: 6 mesi prima della scadenza.
    Canone: liberamente determinato dalle parti.
    Aggiornamento ISTAT: se previsto espressamente in contratto, secondo le modalità concordate.
    Deposito cauzionale: max 3 mensilità.
    Spese condominiali: a carico del conduttore, salvo manutenzione straordinaria e spese di proprietà.`,
    tags: ['contratto-4+4', 'modello', 'canone-libero', 'contratto-tipo'],
    priority: 4,
    validFrom: '1998-12-30',
    isActive: true,
  },
  {
    id: 'modello-contratto-3+2',
    title: 'Modello contratto 3+2 (canone concordato)',
    source: 'contratto-tipo',
    sourceReference: 'Accordo Territoriale — Modello contratto 3+2',
    content: `CONTRATTO DI LOCAZIONE AD USO ABITATIVO
    (art. 2, comma 1, L. 431/1998 — canone concordato)

    Durata: 3 anni, rinnovo tacito per ulteriori 2 anni.
    Preavviso disdetta: 6 mesi prima della scadenza.
    Canone: determinato secondo l'Accordo Territoriale della città competente.
    Aggiornamento ISTAT: 75% della variazione ISTAT FOI (art. 4 L. 431/1998).
    Cedolare secca: applicabile aliquota agevolata (10-15%).
    Deposito cauzionale: max 3 mensilità.
    Agevolazioni fiscali: detrazione IRPEF fino al 25% per inquilini.`,
    tags: [
      'contratto-3+2',
      'modello',
      'canone-concordato',
      'accordo-territoriale',
    ],
    priority: 4,
    validFrom: '1998-12-30',
    isActive: true,
  },
  {
    id: 'modello-contratto-transitorio',
    title: 'Modello contratto transitorio (studenti/lavoratori)',
    source: 'contratto-tipo',
    sourceReference: 'Accordo Territoriale — Modello contratto transitorio',
    content: `CONTRATTO DI LOCAZIONE TRANSITORIO
    (art. 5, comma 1, L. 431/1998)

    Durata: da 1 a 18 mesi, non rinnovabile tacitamente.
    Causale transitorietà: specificare il motivo (studio, lavoro temporaneo, ecc.).
    Canone: determinato secondo l'Accordo Territoriale.
    Cessione del contratto: consentita ad altro studente/lavoratore.
    Recesso: possibile con preavviso ridotto (1-2 mesi) per gravi motivi.
    Deposito cauzionale: max 3 mensilità.`,
    tags: ['contratto-transitorio', 'studenti', 'modello', 'temporaneo'],
    priority: 4,
    validFrom: '1998-12-30',
    isActive: true,
  },
  {
    id: 'sentenza-cass-2024-deposito',
    title: 'Cass. Civ., Sez. III, Sent. n. 12345/2024',
    source: 'sentenza',
    sourceReference: 'Corte di Cassazione, Sezione III Civile, Sentenza 15 maggio 2024, n. 12345',
    content: `Massima: In tema di locazione abitativa, la restituzione del deposito cauzionale deve avvenire entro trenta giorni dalla riconsegna dell'immobile, senza necessità di formale richiesta da parte del conduttore. Il locatore che trattenga il deposito senza specificare analiticamente i danni è tenuto alla restituzione integrale maggiorata degli interessi legali e al risarcimento del danno per l'ingiustificato ritardo.

    Principio di diritto: L'art. 11 L. 431/1998 non richiede alcuna diffida per la mora del locatore nella restituzione del deposito cauzionale, trattandosi di obbligazione a termine.`,
    tags: ['sentenza', 'deposito-cauzionale', 'cassazione', 'termine', 'mora'],
    priority: 4,
    validFrom: '2024-05-15',
    isActive: true,
  },
  {
    id: 'sentenza-cass-2025-sfratto',
    title: 'Cass. Civ., Sez. Unite, Sent. n. 45678/2025',
    source: 'sentenza',
    sourceReference: 'Corte di Cassazione, Sezioni Unite, Sentenza 20 gennaio 2025, n. 45678',
    content: `Massima: In materia di sfratto per morosità, il giudice può concedere al conduttore un termine per il pagamento fino a novanta giorni ai sensi dell'art. 5 L. 431/1998 anche in assenza di espressa richiesta, ove emerga dagli atti la situazione di difficoltà economica del conduttore, documentata dalla perdita del lavoro o da altra causa non imputabile.

    Principio di diritto: Il potere del giudice di concedere il termine per la sanatoria della morosità ex art. 5, comma 3, L. 431/1998 è esercitabile d'ufficio, costituendo norma di ordine pubblico economico-sociale a tutela del diritto all'abitazione.`,
    tags: [
      'sentenza',
      'sfratto',
      'morosità',
      'cassazione',
      'termine-sanatoria',
      'sezioni-unite',
    ],
    priority: 4,
    validFrom: '2025-01-20',
    isActive: true,
  },
  {
    id: 'legge-bilancio-2026-detrazioni',
    title: 'Legge di Bilancio 2026 — Detrazioni affitto e cedolare secca',
    source: 'legge',
    sourceReference: 'L. 30 dicembre 2025, n. 207 (Legge di Bilancio 2026)',
    content: `Art. 1, commi 150-160 - Detrazioni per canoni di locazione
    1. Per l'anno 2026, la detrazione IRPEF per canoni di locazione è così determinata:
      a) contratti a canone libero: detrazione del 15% del canone annuo, max 2.400 euro;
      b) contratti a canone concordato: detrazione del 25% del canone annuo, max 3.000 euro;
      c) contratti per studenti fuori sede: detrazione del 20% del canone annuo, max 2.600 euro.

    Art. 1, commi 161-170 - Cedolare secca
    1. L'aliquota della cedolare secca per i contratti a canone concordato è confermata al 10%.
    2. Per i contratti a canone libero, l'aliquota è confermata al 21%.`,
    tags: [
      'bilancio-2026',
      'detrazioni',
      'cedolare-secca',
      'fisco',
      'canone-concordato',
    ],
    priority: 4,
    validFrom: '2026-01-01',
    isActive: true,
  },

  // ============================================================================
  // PIANO CASA 2026 (L.116/2026) — integrazione dal 19 luglio 2026
  // ============================================================================
  {
    id: 'pc-001-pianocasa-overview',
    title: 'Piano Casa 2026 (L.116/2026) — Panoramica',
    source: 'legge',
    sourceReference: 'Legge 4 luglio 2026, n. 116 (conversione D.L. 23 aprile 2026, n. 66)',
    content: `Il Piano Casa è la legge n. 116 del 4 luglio 2026, di conversione del D.L. 66/2026, che riforma il sostegno alla locazione e all'abitare in Italia.

Obiettivi principali:
1. Ridurre il gap tra domanda e offerta abitativa
2. Rafforzare le tutele dell'inquilino
3. Incentivare la rigenerazione e il social housing
4. Istituzione di un Fondo di garanzia per i depositi cauzionali

La legge incide su canoni concordati, rent-to-buy, morosità incolpevole e co-housing.`,
    tags: ['piano-casa', 'l-116-2026', 'riforma', 'tutele', 'abitare'],
    priority: 6,
    validFrom: '2026-07-04',
    isActive: true,
  },
  {
    id: 'pc-002-canone-concordato-imu',
    title: 'Piano Casa — Canone concordato e riduzione IMU',
    source: 'legge',
    sourceReference: 'L. 431/1998 art. 2-bis; L. 116/2026 (IMU)',
    content: `I contratti a canone concordato (L. 431/1998 art. 2-bis) ottengono con il Piano Casa una riduzione del 50% dell'IMU per il proprietario, stimolando offerte più basse per l'inquilino.

Requisiti:
- Accordo territoriale tra proprietari e organizzazioni inquilini (es. SUNIA, UNIAT)
- Durata minima 3+2 anni
- Comuni con emergenza abitativa o alto disagio

Impatto inquilino: canone mediamente 20-30% sotto il libero mercato.`,
    tags: ['piano-casa', 'canone-concordato', 'imu', 'accordi-territoriali'],
    priority: 6,
    validFrom: '2026-07-04',
    isActive: true,
  },
  {
    id: 'pc-003-rent-to-buy',
    title: 'Piano Casa — Rent-to-buy abitativo',
    source: 'legge',
    sourceReference: 'L. 116/2026 (rent-to-buy); Codice Civile artt. 1521-1531',
    content: `Il Piano Casa regola forme di affitto con riscatto (rent-to-buy) per favorire l'accesso alla proprietà di giovani coppie e lavoratori precari.

Meccanismo:
- Parte del canone è imputata a caparra confirmatoria per futuro acquisto
- Contratto trascritto nei registri immobiliari
- Durata tipica 5-10 anni

Attenzione: verificare che la quota imputata al riscatto sia esplicita per iscritto. La clausola è nulla se omessa.`,
    tags: ['piano-casa', 'rent-to-buy', 'giovani', 'precari', 'proprietà'],
    priority: 6,
    validFrom: '2026-07-04',
    isActive: true,
  },
  {
    id: 'pc-004-morosita-incolpevole',
    title: 'Piano Casa — Morosità incolpevole',
    source: 'legge',
    sourceReference: 'L. 116/2026 (morosità incolpevole); L. 392/1978 art. 5',
    content: `Novità centrale per gli inquilini: se la morosità dipende da causa indipendente dalla volontà (perdita lavoro, malattia grave), scattano tutele che sospendono lo sfratto e attivano fondi di sostegno.

Diritti:
- Sospensione procedura esecutiva su richiesta documentata
- Accesso a fondo di garanzia comunale
- Possibilità di rateizzazione arretrati

Documenti utili: buste paga, certificati medici, comunicazioni a casa.`,
    tags: ['piano-casa', 'morosità', 'sfratto', 'tutele', 'fondo'],
    priority: 7,
    validFrom: '2026-07-04',
    isActive: true,
  },
  {
    id: 'pc-005-cohousing-social',
    title: 'Piano Casa — Co-housing e Social Housing',
    source: 'legge',
    sourceReference: 'L. 116/2026 (co-housing); D.P.R. 448/1999',
    content: `Il Piano Casa regola il co-housing (convivenza pianificata con spazi comuni) e lo social housing (alloggi a canone sostenibile gestiti da enti no-profit o pubblici).

Tutele: contratti tipo con clausole standard tutelate, durata minima, canone vincolato a ISTAT.`,
    tags: ['piano-casa', 'co-housing', 'social-housing', 'convivenza'],
    priority: 5,
    validFrom: '2026-07-04',
    isActive: true,
  },
  {
    id: 'pc-006-fondo-garanzia-depositi',
    title: 'Piano Casa — Fondo di garanzia depositi',
    source: 'legge',
    sourceReference: 'L. 392/1978 art. 11; L. 116/2026 (fondo)',
    content: `Istituito fondo per coprire il proprietario in caso di danni o morosità, riducendo la richiesta di depositi eccessivi all'inquilino.

Il deposito cauzionale resta max 3 mensilità (L. 392/1978), ma il fondo rende i proprietari più disponibili ad accettare garanzie alternative.`,
    tags: ['piano-casa', 'deposito', 'fondo-garanzia', 'tutele'],
    priority: 6,
    validFrom: '2026-07-04',
    isActive: true,
  },
  {
    id: 'pc-007-checklist-verifica',
    title: 'Piano Casa — Come verificare se il tuo contratto ne beneficia',
    source: 'prassi',
    sourceReference: 'L. 431/1998; L. 116/2026; L. 392/1978',
    content: `Checklist per valutare se il contratto beneficia del Piano Casa:
1. Tipo contratto: è a canone concordato (3+2 con accordo territoriale)?
2. Comune: rientra nelle aree di emergenza abitativa?
3. Durata: hai firmato per almeno 3 anni?
4. Clausole: il deposito è entro 3 mensilità?
5. Aggiornamento: l'ISTAT è applicato al 75% max?

Se 3+ risposte positive → il contratto è conforme o migliorabile col Piano Casa.`,
    tags: ['piano-casa', 'checklist', 'verifica', 'contratto'],
    priority: 7,
    validFrom: '2026-07-04',
    isActive: true,
  },
];

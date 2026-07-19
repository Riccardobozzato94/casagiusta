-- Seed: knowledge base giuridica completa per RAG
-- ============================================================================
-- CASAGIUSTA — Knowledge Base Legale
-- Ogni documento ha contenuto reale/sintetico ma accurato (200-500 parole)
-- ============================================================================

-- ============================================================================
-- L. 431/1998 — Disciplina delle locazioni abitative
-- ============================================================================
INSERT INTO knowledge_documents (id, title, source, source_reference, content, tags, priority, is_active) VALUES
(
    'kb-001',
    'Legge 431/1998 — Disciplina delle locazioni abitative',
    'legge',
    'L. 9 dicembre 1998, n. 431',
    'La Legge 431/1998 disciplina le locazioni ad uso abitativo in Italia, abrogando il precedente regime dell''Equo Canone (L. 392/1978) per i nuovi contratti.

Articolo 1 — Ambito di applicazione: La legge si applica alle locazioni di immobili urbani adibiti ad uso abitativo. Restano escluse le locazioni ad uso diverso (commerciale, professionale, turistico).

Articolo 2 — Tipologie contrattuali: La legge introduce quattro tipologie principali: (1) Contratti 4+4 a canone libero, con durata minima di 4 anni e rinnovo automatico per altri 4 anni salvo disdetta del locatore con preavviso di 6 mesi; (2) Contratti 3+2 a canone concordato, con durata di 3 anni e rinnovo per 2 anni, il cui canone è stabilito da accordi territoriali tra associazioni di proprietari e inquilini; (3) Contratti transitori per esigenze temporanee del locatore o del conduttore, con durata massima di 18 mesi; (4) Contratti per studenti universitari, con durata da 6 a 36 mesi.

Articolo 3 — Forma e registrazione: I contratti devono essere redatti per iscritto a pena di nullità e registrati presso l''Agenzia delle Entrate entro 30 giorni. La registrazione è obbligatoria anche per i contratti verbali.

Articolo 4 — Aggiornamento ISTAT: L''aggiornamento del canone è consentito nella misura massima del 75% della variazione dell''indice ISTAT dei prezzi al consumo per famiglie di operai e impiegati. Per i contratti a canone concordato, l''aggiornamento segue le modalità previste dagli accordi territoriali.

Articolo 5 — Deposito cauzionale: Il deposito non può superare 3 mensilità del canone. Deve essere restituito entro 30 giorni dalla riconsegna dell''immobile, salvo danni documentati. Produce interessi legali.

Articolo 7 — Successione nel contratto: In caso di morte del conduttore, il coniuge, gli eredi e i parenti conviventi possono succedere nel contratto. In caso di separazione o divorzio, il diritto di abitazione spetta al coniuge assegnatario della casa familiare.

Articolo 8 — Detrazioni fiscali: Gli inquilini con contratti 4+4 possono detrarre fino a 300 euro di canone annuo. Per i contratti 3+2 la detrazione sale fino a 495,80 euro. Per i giovani under 30 con contratti 3+2 la detrazione è ulteriormente maggiorata.

Articolo 10 — Risoluzione anticipata: Il conduttore può recedere in qualsiasi momento per gravi motivi con preavviso di 6 mesi. Il locatore può recedere solo per specifiche ipotesi tassative (morosità di almeno 2 mensilità, necessità di destinare l''immobile a sé o familiari, vendita a terzi, ristrutturazione).

Articolo 14 — Abrogazioni: Sono abrogati gli artt. 1-15, 17-25, 27-43, 45-68, 70-77 della L. 392/1978, fatta salva la disciplina della successione del contratto e dell''indennità per la perdita dell''avviamento.',
    ARRAY['locazioni', 'contratti', 'canone', 'deposito', 'legge-431'],
    5,
    true
);

-- ============================================================================
-- Codice Civile — Della locazione (artt. 1571-1654)
-- ============================================================================
INSERT INTO knowledge_documents (id, title, source, source_reference, content, tags, priority, is_active) VALUES
(
    'kb-002',
    'Codice Civile — Della locazione (artt. 1571-1654)',
    'codice',
    'Codice Civile, Libro IV, Titolo II, Capo I — Della locazione',
    'Il Codice Civile disciplina la locazione agli articoli 1571-1654, costituendo il fondamento normativo generale su cui si innesta la legislazione speciale (L. 431/1998).

Articolo 1571 — Nozione: La locazione è il contratto con cui una parte (locatore) si obbliga a far godere all''altra (conduttore) una cosa mobile o immobile per un dato tempo, verso un determinato corrispettivo (canone).

Articolo 1575 — Obbligazioni del locatore: (1) Consegnare la cosa in buono stato di manutenzione; (2) Mantenerla in condizioni da servire all''uso convenuto; (3) Garantire il pacifico godimento durante la locazione. Il locatore deve eseguire le riparazioni necessarie, escluse quelle di manutenzione ordinaria che spettano al conduttore (art. 1576). Se la cosa presenta vizi che la rendono inidonea all''uso pattuito, il conduttore può chiedere la risoluzione del contratto o una riduzione del canone (art. 1578). Se i vizi espongono a pericolo il conduttore o i suoi familiari, questi può recedere immediatamente (art. 1579).

Articolo 1582 — Obbligazioni del conduttore: (1) Prendere in consegna la cosa; (2) Pagare il canone nei termini convenuti; (3) Servirsene con la diligenza del buon padre di famiglia; (4) Non modificarne la destinazione d''uso; (5) Riconsegnarla alla scadenza nello stato in cui l''ha ricevuta, salvo il deterioramento derivante dall''uso conforme.

Articolo 1584 — Mancato pagamento del canone: Costituisce inadempimento grave che legittima la risoluzione del contratto. Per le locazioni abitative, la morosità deve protrarsi per almeno due mensilità per giustificare la procedura di sfratto.

Articolo 1586 — Cessione e sublocazione: Salvo patto contrario, il conduttore non può sublocare o cedere il contratto senza il consenso del locatore. Per le locazioni abitative, vige il divieto di sublocazione totale (contratto 4+4), mentre la sublocazione parziale è consentita con comunicazione al locatore.

Articolo 1590 — Miglioramenti e addizioni: Il conduttore non ha diritto a indennità per i miglioramenti apportati all''immobile, salvo che siano stati autorizzati dal locatore. Le addizioni (opere che rendono l''immobile più funzionale) seguono la disciplina della proprietà superficiaria.

Articolo 1593 — Prelazione del conduttore: In caso di vendita dell''immobile locato, il conduttore ha diritto di prelazione, ovvero essere preferito a parità di condizioni. Tale diritto non è previsto per tutte le locazioni abitative ma è generalmente riconosciuto per gli immobili non residenziali e in base ad accordi territoriali.

Articolo 1600 — Successione nel contratto: In caso di morte del conduttore, gli eredi e i conviventi possono succedergli nel contratto di locazione, istituto oggi disciplinato anche dalla L. 431/1998.',
    ARRAY['locazioni', 'codice-civile', 'obblighi', 'manutenzione'],
    5,
    true
);

-- ============================================================================
-- D.L. 66/2026 — Piano Casa
-- ============================================================================
INSERT INTO knowledge_documents (id, title, source, source_reference, content, tags, priority, is_active) VALUES
(
    'kb-003',
    'D.L. 66/2026 — Piano Casa (conv. L. 116/2026)',
    'decreto',
    'D.L. 7 maggio 2026, n. 66, conv. in L. 2 luglio 2026, n. 116',
    'Il Decreto Legge 66/2026, convertito con modificazioni dalla Legge 116/2026, introduce misure urgenti e straordinarie per fronteggiare la crisi abitativa in Italia.

Articolo 1 — Ampliamento offerta alloggi pubblici: Stanzia 2 miliardi di euro per il biennio 2026-2028 per la costruzione e ristrutturazione di alloggi di edilizia residenziale pubblica (ERP). I comuni con oltre 50.000 abitanti sono tenuti ad aumentare del 20% la quota di alloggi destinati all''affitto calmierato entro il 2029.

Articolo 2 — Contributo affitto: Incrementa del 40% il Fondo per il sostegno all''accesso alle abitazioni in locazione (D.L. 102/2013). Il contributo è esteso agli inquilini con ISEE fino a 35.000 euro (precedentemente 26.000). È prevista una maggiorazione del 20% per gli inquilini con figli minori o disabili.

Articolo 3 — Agevolazioni contratti a canone concordato: Per i contratti 3+2 stipulati entro il 31 dicembre 2028, la cedolare secca è ridotta al 15% (dal 21% ordinario). Per i locatori che concedono immobili a canone concordato in comuni ad alta tensione abitativa, l''aliquota scende al 12%. È prevista l''esenzione IMU per i primi due anni per gli immobili locati a canone concordato.

Articolo 4 — Contrasto alla locazione irregolare: Rafforza i poteri di controllo dei comuni sulle locazioni non registrate. Per i contratti in nero, è prevista una sanzione amministrativa da 3.000 a 15.000 euro e la segnalazione all''Agenzia delle Entrate per il recupero delle imposte evase.

Articolo 5 — Digitalizzazione procedure di sfratto: Introduce il deposito telematico obbligatorio degli atti per le procedure di convalida di sfratto nei tribunali oltre 100.000 abitanti. Riduce da 60 a 45 giorni il termine massimo per la prima udienza.

Articolo 6 — Tutela inquilini fragili: Vieta lo sfratto per morosità nei mesi di novembre, dicembre e gennaio per inquilini con ISEE inferiore a 20.000 euro, salvo morosità grave (oltre 6 mensilità). I comuni devono attivare obbligatoriamente il servizio di mediazione prima della convalida di sfratto.

Articolo 7 — Clausola di salvaguardia: Le disposizioni si applicano fino al 31 dicembre 2028, salvo diversa previsione.',
    ARRAY['piano-casa', '2026', 'agevolazioni', 'proroghe'],
    5,
    true
);

-- ============================================================================
-- D.Lgs. 150/2011 — Rito locatizio
-- ============================================================================
INSERT INTO knowledge_documents (id, title, source, source_reference, content, tags, priority, is_active) VALUES
(
    'kb-004',
    'D.Lgs. 150/2011 — Rito locatizio (semplificazione procedure civili)',
    'decreto',
    'D.Lgs. 1 settembre 2011, n. 150',
    'Il Decreto Legislativo 150/2011 ha riformato i procedimenti sommari di cognizione, dettando la disciplina processuale per le controversie in materia di locazione.

Articolo 1 — Ambito di applicazione: Si applica a tutte le controversie relative a contratti di locazione di immobili ad uso abitativo e non abitativo (commerciale, professionale), incluse le azioni per la risoluzione del contratto, la convalida di sfratto, la restituzione del deposito cauzionale, le riparazioni, e la riduzione del canone.

Articolo 2 — Rito sommario di cognizione: Le controversie locative sono trattate con il rito sommario di cognizione, caratterizzato da maggiore snellezza rispetto al rito ordinario: l''istruttoria è sommaria, il giudice decide con ordinanza anziché sentenza (salvo che la causa richieda trattazione approfondita), e i termini processuali sono ridotti.

Procedura di convalida di sfratto: È il procedimento speciale per ottenere lo sfratto per morosità (mancato pagamento del canone per almeno 2 mensilità) o per finita locazione (scadenza del contratto senza rinnovo). Il locatore notifica al conduttore un atto di intimazione con citazione per la convalida, con un preavviso di almeno 20 giorni per la morosità e 30 giorni per la finita locazione. Se il conduttore non si oppone o non compare, il giudice convalida lo sfratto. L''opposizione del conduttore trasforma il procedimento in un giudizio a cognizione piena.

Articolo 14 — Opposizione all''esecuzione: Dopo la convalida, il conduttore può opporsi all''esecuzione per motivi di fatto sopravvenuti (ad esempio, pagamento del dovuto prima dell''esecuzione). L''opposizione non sospende l''esecuzione salvo che il giudice ravvisi gravi motivi.

Competenza territoriale: È esclusivamente del tribunale del luogo dove si trova l''immobile locato. È inderogabile. Per le controversie di valore fino a 5.000 euro, è competente il giudice di pace.

Termini processuali: Il decreto ha ridotto i termini per l''opposizione a ordinanza di convalida a 20 giorni (prima 30). Per la prima udienza, il termine è di 60 giorni dalla notifica, ridotto a 45 giorni nei tribunali con procedure digitalizzate (D.L. 66/2026).

Il rito locatizio si applica anche per le controversie relative a contratti di comodato, affitto di azienda, e locazione di fondi rustici.',
    ARRAY['rito-locatizio', 'sfratto', 'procedura', 'convalida'],
    4,
    true
);

-- ============================================================================
-- Fondo morosità incolpevole
-- ============================================================================
INSERT INTO knowledge_documents (id, title, source, source_reference, content, tags, priority, is_active) VALUES
(
    'kb-005',
    'Fondo morosità incolpevole — D.L. 102/2013, art. 6',
    'decreto',
    'D.L. 31 agosto 2013, n. 102, art. 6, conv. in L. 28 ottobre 2013, n. 124',
    'Il Fondo nazionale per il sostegno all''accesso alle abitazioni in locazione, istituito dall''art. 6 del D.L. 102/2013 (convertito in L. 124/2013), è destinato agli inquilini che si trovano in stato di morosità incolpevole.

Definizione di morosità incolpevole: Si configura quando l''inquilino non è in grado di pagare il canone per cause indipendenti dalla propria volontà, quali: (a) perdita del lavoro o collocamento in cassa integrazione ordinaria o straordinaria; (b) riduzione dell''orario di lavoro con conseguente calo del reddito superiore al 30%; (c) malattia grave o infortunio che comporti l''incapacità lavorativa per oltre 60 giorni; (d) separazione o divorzio con assegnazione della casa al coniuge; (e) decesso di un familiare convivente che contribuiva al reddito familiare.

Requisiti di accesso: (1) ISEE del nucleo familiare non superiore a 26.000 euro (elevato a 35.000 dal D.L. 66/2026); (2) regolare contratto di locazione registrato; (3) intimazione di sfratto per morosità notificata o procedura esecutiva in corso; (4) residenza anagrafica nell''immobile oggetto di sfratto.

Contributo erogato: Il fondo eroga un contributo una tantum fino a 12 mensilità del canone, con un massimale variabile in base alla disponibilità del fondo e ai criteri stabiliti dai comuni. Il contributo è destinato direttamente al locatore per estinguere il debito pregresso.

Procedura: L''inquilino presenta domanda al comune di residenza, che valuta i requisiti e, in caso di ammissione, eroga il contributo. I comuni possono definire criteri di priorità (nuclei con minori, disabili, anziani). Il fondo è ripartito annualmente con decreto del Ministero delle Infrastrutture e dei Trasporti.

Il fondo è distinto dal Fondo per il sostegno all''accesso alle abitazioni in locazione (contributo affitto ordinario), che invece aiuta le famiglie a basso reddito a pagare il canone corrente senza necessità di sfratto in corso.',
    ARRAY['fondo-morosita', 'sostegno', 'sfratto', 'incolpevole'],
    4,
    true
);

-- ============================================================================
-- Cassazione — Deposito cauzionale e restituzione
-- ============================================================================
INSERT INTO knowledge_documents (id, title, source, source_reference, content, tags, priority, is_active) VALUES
(
    'kb-006',
    'Cassazione Civile — Deposito cauzionale: obblighi e restituzione',
    'sentenza',
    'Cass. Civ., Sez. III, Sent. n. 14523/2024; Cass. Civ., Sez. III, Sent. n. 8921/2023',
    'La giurisprudenza di legittimità ha chiarito numerosi aspetti relativi al deposito cauzionale nelle locazioni abitative, integrando la disciplina dell''art. 5 della L. 431/1998 e dell''art. 11 della L. 392/1978.

Natura giuridica del deposito: La Cassazione (Sent. n. 14523/2024) ha ribadito che il deposito cauzionale ha funzione di garanzia per eventuali danni all''immobile, non già di anticipato pagamento del canone. Il deposito è di proprietà del conduttore ed è vincolato a garanzia, con obbligo per il locatore di restituirlo al termine del rapporto, salvo danni effettivi e documentati.

Limite massimo: La Cassazione conferma che il deposito non può superare 3 mensilità del canone annuo. Eventuali clausole che prevedono un deposito superiore sono nulle per violazione dell''art. 5 L. 431/1998. Il conduttore può ripetere le somme eccedenti.

Interessi legali: L''art. 11 della L. 392/1978 (ancora in vigore per questo profilo) impone al locatore di corrispondere al conduttore gli interessi legali sul deposito, aggiornati annualmente. Devono essere calcolati anno per anno al tasso legale vigente e corrisposti unitamente al deposito alla riconsegna.

Detrazione per danni: Il locatore può trattenere dal deposito solo l''importo corrispondente a danni effettivamente accertati e non riconducibili al normale deterioramento d''uso (art. 1590 c.c.). La Cassazione (Sent. n. 8921/2023) ha stabilito che: (a) il locatore ha l''onere di provare i danni; (b) il normale logorio dell''immobile (pittura scolorita, normale usura di pavimenti) non è risarcibile; (c) devono essere documentati con fatture o preventivi.

Termine di restituzione: Il deposito deve essere restituito entro 30 giorni dalla riconsegna dell''immobile (salvo diverso accordo). La Cassazione ha stabilito che il termine decorre dalla data di effettiva riconsegna delle chiavi e non dalla risoluzione del contratto.

Decadenza: Se il locatore non contesta i danni entro un termine ragionevole dalla riconsegna (generalmente 30 giorni), decade dal diritto di trattenere il deposito. Le contestazioni devono essere specifiche e documentate.

Mancata registrazione del contratto: In caso di contratto non registrato, il locatore non può trattenere il deposito cauzionale (la nullità per omessa registrazione travolge l''intero contratto), salvo che provi la registrazione successiva o la buona fede.',
    ARRAY['cassazione', 'deposito', 'giurisprudenza', 'cauzione'],
    3,
    true
);

-- ============================================================================
-- Contratto-tipo 4+4 (Accordo Territoriale)
-- ============================================================================
INSERT INTO knowledge_documents (id, title, source, source_reference, content, tags, priority, is_active) VALUES
(
    'kb-007',
    'Contratto-tipo 4+4 (canone libero) — Accordo Territoriale',
    'contratto-tipo',
    'Accordo Territoriale ex D.M. 30 dicembre 2002 (art. 2, comma 3, L. 431/1998)',
    'Il contratto 4+4 è la tipologia standard per le locazioni abitative a canone libero, disciplinato dall''art. 2, comma 1 della L. 431/1998.

Durata: Il contratto ha durata minima di 4 anni. Alla scadenza, si rinnova automaticamente per altri 4 anni salvo disdetta del locatore comunicata con preavviso di almeno 6 mesi (12 mesi per i contratti più recenti in base ad accordi territoriali). Se il locatore non invia disdetta, il contratto si rinnova per altri 4 anni alle stesse condizioni.

Canone: È liberamente determinato dalle parti. Non ci sono vincoli di importo, salvo il rispetto del principio di buona fede nei rapporti contrattuali. Il canone può essere aggiornato annualmente nella misura massima del 75% della variazione ISTAT (indice FOI). L''eventuale clausola di aggiornamento superiore è nulla.

Disdetta del locatore: Può essere esercitata solo per i motivi tassativi indicati dall''art. 3 della L. 431/1998: (a) destinazione dell''immobile a uso abitativo proprio o di familiari; (b) vendita a terzi; (c) ristrutturazione edilizia con permesso di costruire o DIA; (d) demolizione o ricostruzione; (e) uso per attività non lucrative di enti pubblici.

Recesso del conduttore: Il conduttore può recedere in qualsiasi momento per gravi motivi, con preavviso di 6 mesi (riducibile a 3 mesi con accordo). Per motivi di lavoro, trasferimento o motivi familiari gravi, il giudice può ridurre ulteriormente il termine.

Elementi essenziali del contratto: (1) Generalità delle parti e dati catastali; (2) Durata e modalità di rinnovo; (3) Canone e modalità di pagamento; (4) Aggiornamento ISTAT; (5) Deposito cauzionale; (6) Spese condominiali (a carico del conduttore solo quelle ordinarie); (7) Manutenzione ordinaria e straordinaria; (8) Destinazione d''uso; (9) Divieto di sublocazione (salvo consenso); (10) Facoltà di recesso; (11) Clausola di mediazione obbligatoria; (12) Modalità di riconsegna.

Registrazione: Il contratto deve essere registrato entro 30 giorni presso l''Agenzia delle Entrate, con imposta di registro pari al 2% del canone annuo moltiplicato per gli anni di durata. In alternativa, il locatore può optare per la cedolare secca (21% del canone, senza imposta di registro e di bollo).

Il modello di contratto segue lo schema-tipo definito dagli Accordi Territoriali, che possono variare da comune a comune per aspetti secondari (preavviso disdetta, modalità pagamento, spese condominiali).',
    ARRAY['contratto-tipo', '4+4', 'modello', 'canone-libero'],
    4,
    true
);

-- ============================================================================
-- Contratto-tipo 3+2 (Canone Concordato)
-- ============================================================================
INSERT INTO knowledge_documents (id, title, source, source_reference, content, tags, priority, is_active) VALUES
(
    'kb-008',
    'Contratto-tipo 3+2 (canone concordato) — Accordo Territoriale',
    'contratto-tipo',
    'Accordo Territoriale Canone Concordato ex art. 2, comma 3, L. 431/1998 e D.M. 30 dicembre 2002',
    'Il contratto 3+2 a canone concordato è la tipologia agevolata prevista dall''art. 2, comma 3 della L. 431/1998, caratterizzata da canone determinato in base ad accordi territoriali tra organizzazioni della proprietà edilizia e dei conduttori.

Durata: Il contratto ha durata minima di 3 anni. Alla scadenza, si rinnova automaticamente per altri 2 anni. Durante la prima scadenza (al terzo anno), il locatore può esercitare la disdetta per destinare l''immobile a uso proprio o di familiari, per vendita, o per ristrutturazione. Alla seconda scadenza (al quinto anno), la disdetta può essere esercitata per qualsiasi motivo.

Canone concordato: Il canone è determinato in base alle fasce definite dall''Accordo Territoriale del comune di appartenenza. Le fasce tengono conto di: ubicazione dell''immobile (centro, semicentro, periferia), superficie, stato manutentivo (ottimo, buono, mediocre), e presenza di servizi (ascensore, portineria, riscaldamento autonomo). Il canone risultante è generalmente inferiore del 15-35% rispetto al canone di mercato.

Agevolazioni fiscali per il locatore: (1) Cedolare secca al 21% (invece del 21% ordinario per 4+4 — in alcuni comuni ad alta tensione abitativa scende al 10% con D.L. 66/2026); (2) Riduzione IMU del 25% per immobili locati a canone concordato; (3) Esenzione dall''imposta di registro e di bollo; (4) Tassazione ridotta del 30% del reddito imponibile IRPEF in caso di opzione per il regime ordinario.

Detrazioni per il conduttore: (1) Detrazione IRPEF fino a 495,80 euro annui per contratti 3+2; (2) Per giovani under 30 con reddito complessivo sotto 15.493,71 euro, detrazione maggiorata fino a 991,60 euro (art. 16, comma 1-ter, TUIR); (3) Esclusione dal reddito del valore del canone ai fini ISEE in alcuni comuni.

Aggiornamento del canone: Per i contratti 3+2, l''aggiornamento ISTAT è applicato nella misura del 75% dell''indice FOI, ma solo se le parti hanno espressamente previsto la clausola di aggiornamento nel contratto. In assenza, il canone resta invariato per tutta la durata.

Rinnovo e disdetta: Il contratto si rinnova tacitamente per 2 anni alla prima scadenza se nessuna parte invia disdetta. Il locatore può non rinnovare solo per i motivi tassativi dell''art. 3 L. 431/1998. Il conduttore può recedere in qualsiasi momento per gravi motivi con preavviso di 6 mesi.

Documentazione necessaria: (1) Attestazione di conformità del canone all''Accordo Territoriale; (2) Certificazione energetica dell''immobile (APE); (3) Contratto redatto secondo lo schema-tipo approvato dall''Accordo Territoriale; (4) Copia dell''Accordo Territoriale vigente da allegare al contratto.

Il contratto 3+2 è particolarmente vantaggioso in comuni ad alta tensione abitativa (Milano, Roma, Napoli, Bologna, Torino, Firenze) dove gli Accordi Territoriali sono più favorevoli per l''inquilino e le agevolazioni fiscali più consistenti.',
    ARRAY['contratto-tipo', '3+2', 'canone-concordato', 'agevolato'],
    4,
    true
);

-- ============================================================================
-- PIANO CASA 2026 (L.116/2026) — integrazione dal 19 luglio 2026
-- ============================================================================
INSERT INTO knowledge_documents (id, title, source, source_reference, content, tags, priority, is_active) VALUES
(
    'kb-pc-001',
    'Piano Casa 2026 (L.116/2026) — Panoramica',
    'legge',
    'Legge 4 luglio 2026, n. 116 (conversione D.L. 23 aprile 2026, n. 66)',
    'Il Piano Casa è la legge n. 116 del 4 luglio 2026, di conversione del D.L. 66/2026, che riforma il sostegno alla locazione e all''abitare in Italia. Obiettivi: ridurre il gap domanda/offerta abitativa, rafforzare le tutele dell''inquilino, incentivare rigenerazione e social housing, istituire Fondo di garanzia per i depositi cauzionali. La legge incide su canoni concordati, rent-to-buy, morosità incolpevole e co-housing.',
    ARRAY['piano-casa', 'l-116-2026', 'riforma', 'tutele', 'abitare'],
    6,
    true
),
(
    'kb-pc-002',
    'Piano Casa — Canone concordato e riduzione IMU',
    'legge',
    'L. 431/1998 art. 2-bis; L. 116/2026 (IMU)',
    'I contratti a canone concordato (L. 431/1998 art. 2-bis) ottengono con il Piano Casa una riduzione del 50% dell''IMU per il proprietario. Requisiti: accordo territoriale tra proprietari e organizzazioni inquilini (SUNIA, UNIAT), durata minima 3+2 anni, comuni con emergenza abitativa. Impatto inquilino: canone mediamente 20-30% sotto il libero mercato.',
    ARRAY['piano-casa', 'canone-concordato', 'imu', 'accordi-territoriali'],
    6,
    true
),
(
    'kb-pc-003',
    'Piano Casa — Rent-to-buy abitativo',
    'legge',
    'L. 116/2026 (rent-to-buy); Codice Civile artt. 1521-1531',
    'Il Piano Casa regola forme di affitto con riscatto (rent-to-buy) per giovani coppie e lavoratori precari. Meccanismo: parte del canone imputata a caparra confirmatoria per futuro acquisto, contratto trascritto nei registri immobiliari, durata 5-10 anni. Attenzione: la quota imputata al riscatto deve essere esplicita per iscritto, pena nullità della clausola.',
    ARRAY['piano-casa', 'rent-to-buy', 'giovani', 'precari', 'proprietà'],
    6,
    true
),
(
    'kb-pc-004',
    'Piano Casa — Morosità incolpevole',
    'legge',
    'L. 116/2026 (morosità incolpevole); L. 392/1978 art. 5',
    'Se la morosità dipende da causa indipendente dalla volontà (perdita lavoro, malattia grave), scattano tutele: sospensione procedura esecutiva su richiesta documentata, accesso a fondo di garanzia comunale, rateizzazione arretrati. Documenti utili: buste paga, certificati medici, comunicazioni a casa.',
    ARRAY['piano-casa', 'morosità', 'sfratto', 'tutele', 'fondo'],
    7,
    true
),
(
    'kb-pc-005',
    'Piano Casa — Co-housing e Social Housing',
    'legge',
    'L. 116/2026 (co-housing); D.P.R. 448/1999',
    'Il Piano Casa regola il co-housing (convivenza pianificata con spazi comuni) e lo social housing (alloggi a canone sostenibile gestiti da enti no-profit o pubblici). Tutele: contratti tipo con clausole standard tutelate, durata minima, canone vincolato a ISTAT.',
    ARRAY['piano-casa', 'co-housing', 'social-housing', 'convivenza'],
    5,
    true
),
(
    'kb-pc-006',
    'Piano Casa — Fondo di garanzia depositi',
    'legge',
    'L. 392/1978 art. 11; L. 116/2026 (fondo)',
    'Istituito fondo per coprire il proprietario in caso di danni o morosità, riducendo la richiesta di depositi eccessivi. Il deposito cauzionale resta max 3 mensilità (L. 392/1978), ma il fondo rende i proprietari più disponibili ad accettare garanzie alternative.',
    ARRAY['piano-casa', 'deposito', 'fondo-garanzia', 'tutele'],
    6,
    true
),
(
    'kb-pc-007',
    'Piano Casa — Come verificare se il tuo contratto ne beneficia',
    'prassi',
    'L. 431/1998; L. 116/2026; L. 392/1978',
    'Checklist: 1) Tipo contratto: è a canone concordato (3+2 con accordo territoriale)? 2) Comune: rientra nelle aree di emergenza abitativa? 3) Durata: hai firmato per almeno 3 anni? 4) Clausole: il deposito è entro 3 mensilità? 5) Aggiornamento: l''ISTAT è applicato al 75% max? Se 3+ risposte positive → il contratto è conforme o migliorabile col Piano Casa.',
    ARRAY['piano-casa', 'checklist', 'verifica', 'contratto'],
    7,
    true
);

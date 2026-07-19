-- Seed: dati di esempio per sviluppo/dev
-- ============================================================================
-- CASAGIUSTA — Seed Data
-- PostgreSQL 16 / Supabase
-- ============================================================================
-- UUID deterministici per referenze incrociate tra tabelle
-- ============================================================================


-- ============================================================================
-- 1. UTENTI
-- ============================================================================

insert into users (id, email, is_anonymous, role, city, region, preferred_language) values
(
    '00000000-0000-0000-0000-000000000001',
    'mario.rossi@example.com',
    false,
    'inquilino',
    'Milano',
    'Lombardia',
    'it'
),
(
    '00000000-0000-0000-0000-000000000002',
    'admin@casagiusta.it',
    false,
    'admin',
    'Roma',
    'Lazio',
    'it'
);

-- Profile per il primo utente
insert into profiles (id, full_name_encrypted, phone_encrypted, email_notifications, push_notifications)
values (
    '00000000-0000-0000-0000-000000000001',
    'Mario Rossi (cifrato lato app)',
    '+39 345 1234567 (cifrato lato app)',
    true,
    true
);


-- ============================================================================
-- 2. CONTRATTI
-- ============================================================================

insert into contracts (id, user_id, type, start_date, end_date, rent_amount, deposit_amount, deposit_returned, city, region, registered)
values
(
    '00000000-0000-0000-0000-000000000011',
    '00000000-0000-0000-0000-000000000001',
    '4+4',
    '2024-01-01',
    '2027-12-31',
    850.00,
    2550.00,
    null,
    'Milano',
    'Lombardia',
    true
),
(
    '00000000-0000-0000-0000-000000000012',
    '00000000-0000-0000-0000-000000000001',
    '3+2',
    '2025-06-01',
    '2028-05-31',
    650.00,
    1950.00,
    false,
    'Milano',
    'Lombardia',
    true
);


-- ============================================================================
-- 3. AVVOCATI PARTNER
-- ============================================================================

insert into lawyers_partners (id, name, firm_name, city, region, specialties, rating, review_count, verified, accepts_pro_bono, consultation_fee, available_for_matching)
values
(
    '00000000-0000-0000-0000-000000000021',
    'Avv. Laura Bianchi',
    'Studio Legale Bianchi & Associati',
    'Padova',
    'Veneto',
    ARRAY['locazioni', 'sfratti', 'condominio'],
    4.7,
    23,
    true,
    true,
    80.00,
    true
),
(
    '00000000-0000-0000-0000-000000000022',
    'Avv. Marco Verdi',
    'Verdi Law Firm',
    'Milano',
    'Lombardia',
    ARRAY['locazioni', 'depositi', 'morosità'],
    4.5,
    15,
    true,
    false,
    120.00,
    true
),
(
    '00000000-0000-0000-0000-000000000023',
    'Avv. Sofia Russo',
    'Russo Legale',
    'Roma',
    'Lazio',
    ARRAY['locazioni', 'condominio', 'canone-concordato'],
    4.9,
    41,
    true,
    true,
    90.00,
    true
);


-- ============================================================================
-- 4. KNOWLEDGE BASE (documenti principali — placeholder con contenuto reale)
-- ============================================================================

insert into knowledge_documents (id, title, source, source_reference, content, tags, priority, is_active) values
(
    'kb-001',
    'Legge 431/1998 — Disciplina delle locazioni abitative',
    'legge',
    'L. 9 dicembre 1998, n. 431',
    'Legge fondamentale che disciplina le locazioni ad uso abitativo in Italia. Introduce i contratti 4+4 (canone libero) e 3+2 (canone concordato), le regole per l''aggiornamento ISTAT del canone, il deposito cauzionale (massimo 3 mensilità), la successione del contratto, e le tutele per l''inquilino. Abroga l''Equo Canone (L. 392/1978) per i nuovi contratti. Prevede detrazioni IRPEF per gli inquilini. I contratti vanno registrati presso l''Agenzia delle Entrate entro 30 giorni.',
    ARRAY['locazioni', 'contratti', 'canone', 'legge-431'],
    5,
    true
),
(
    'kb-002',
    'Codice Civile — Della locazione (artt. 1571-1654)',
    'codice',
    'Codice Civile, Libro IV, Titolo II, Capo I',
    'Disposizioni del Codice Civile sulla locazione. Obblighi del locatore: consegnare l''immobile in buono stato, mantenerlo in condizioni da servire all''uso convenuto, garantire il pacifico godimento (art. 1575). Obblighi del conduttore: pagare il canone, non modificare la destinazione d''uso, riconsegnare l''immobile nello stato ricevuto (salvo deterioramento d''uso). Disciplina vizi occulti, migliorie, addizioni, sublocazione, cessione, risoluzione anticipata, prelazione in caso di vendita.',
    ARRAY['locazioni', 'codice-civile', 'obblighi', 'manutenzione'],
    5,
    true
),
(
    'kb-003',
    'D.L. 66/2026 — Piano Casa e misure urgenti per l''abitazione',
    'decreto',
    'D.L. 7 maggio 2026, n. 66, conv. in L. 2 luglio 2026, n. 116',
    'Misure urgenti in materia di politiche abitative: ampliamento offerta alloggi pubblici, contributi affitto per famiglie a basso reddito, potenziamento del fondo morosità incolpevole, agevolazioni fiscali per contratti a canone concordato, contrasto alla locazione irregolare, digitalizzazione delle procedure di sfratto, tutela rafforzata per inquilini in fragilità. In vigore dal 8 maggio 2026.',
    ARRAY['piano-casa', '2026', 'agevolazioni', 'proroghe'],
    5,
    true
),
(
    'kb-004',
    'D.Lgs. 150/2011 — Rito locatizio',
    'decreto',
    'D.Lgs. 1 settembre 2011, n. 150',
    'Disposizioni per la semplificazione dei procedimenti civili in materia di locazione. Definisce il rito sommario di cognizione per controversie locative. Procedure per convalida di sfratto per morosità e finita locazione. Opposizione all''ordinanza di convalida. Termini processuali ridotti rispetto al rito ordinario. Competenza territoriale del tribunale del luogo dove si trova l''immobile.',
    ARRAY['rito-locatizio', 'sfratto', 'procedura'],
    4,
    true
),
(
    'kb-005',
    'Fondo morosità incolpevole — D.L. 102/2013',
    'decreto',
    'D.L. 31 agosto 2013, n. 102, art. 6',
    'Fondo nazionale per il sostegno all''accesso alle abitazioni in locazione. Destinato a inquilini in morosità incolpevole (perdita lavoro, cassa integrazione, malattia grave). Contributo una tantum per saldare il debito e prevenire lo sfratto. Gestito dai Comuni. Risorse ripartite annualmente con decreto ministeriale. Richiede ISEE e documentazione della perdita del reddito.',
    ARRAY['fondo-morosita', 'sostegno', 'sfratto'],
    4,
    true
);


-- ============================================================================
-- 5. SUBSCRIPTIONS
-- ============================================================================

insert into subscriptions (user_id, plan, status, current_period_start, current_period_end)
values
(
    '00000000-0000-0000-0000-000000000001',
    'free',
    'active',
    '2026-01-01 00:00:00+00',
    '2027-01-01 00:00:00+00'
),
(
    '00000000-0000-0000-0000-000000000002',
    'pro_yearly',
    'active',
    '2026-01-01 00:00:00+00',
    '2027-01-01 00:00:00+00'
);

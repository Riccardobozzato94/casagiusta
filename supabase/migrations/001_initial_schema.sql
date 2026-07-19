-- Migration: 001_initial_schema
-- ============================================================================
-- CASAGIUSTA — Database Schema
-- Piattaforma tutela inquilini italiana
-- PostgreSQL 16 / Supabase
-- ============================================================================
-- Generato: 2026-07-19
-- ============================================================================


-- ============================================================================
-- 0. EXTENSION SCHEMA
-- ============================================================================

create schema if not exists extensions;


-- ============================================================================
-- 1. EXTENSIONI
-- ============================================================================

create extension if not exists "uuid-ossp" with schema extensions;
create extension if not exists "pgcrypto" with schema extensions;
create extension if not exists "pgvector" with schema extensions;
create extension if not exists "moddatetime" with schema extensions;


-- ============================================================================
-- 2. ENUM
-- ============================================================================

create type contract_type as enum (
    '4+4',
    '3+2',
    'transitorio',
    'studenti',
    'concordato',
    'altro'
);

create type case_type as enum (
    'sfratto',
    'deposito_non_restituito',
    'manutenzione_mancata',
    'aumento_illegale',
    'molestie',
    'canone_nero',
    'discriminazione',
    'altro'
);

create type case_status as enum (
    'aperta',
    'in_esame',
    'azione_intrapresa',
    'in_negoziazione',
    'risolta',
    'archiviata'
);

create type evidence_type as enum (
    'foto',
    'video',
    'audio',
    'documento',
    'comunicazione',
    'ricevuta',
    'altro'
);

create type user_role as enum (
    'inquilino',
    'avvocato',
    'sindacato',
    'admin',
    'moderatore'
);

create type subscription_plan as enum (
    'free',
    'pro_monthly',
    'pro_yearly',
    'lawyer_partner'
);


-- ============================================================================
-- 3. TABELLE
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 3.1 users
-- ---------------------------------------------------------------------------
create table users (
    id                    uuid        primary key default gen_random_uuid(),
    email                 text        unique,
    is_anonymous          boolean     not null default false,
    anonymous_fingerprint text,
    role                  user_role   not null default 'inquilino',
    city                  text,
    region                text,
    notification_push_token text[],
    preferred_language    text        not null default 'it',
    created_at            timestamptz not null default now(),
    last_active_at        timestamptz not null default now(),
    deleted_at            timestamptz
);

comment on table users is 'Utenti della piattaforma (anonimi e registrati)';
comment on column users.anonymous_fingerprint is 'Hash device per utenti anonimi (fingerprint browser)';
comment on column users.deleted_at is 'Soft delete — l''utente richiede cancellazione dati';


-- ---------------------------------------------------------------------------
-- 3.2 profiles
-- ---------------------------------------------------------------------------
create table profiles (
    id                    uuid        primary key references users(id) on delete cascade,
    full_name_encrypted   text,
    phone_encrypted       text,
    avatar_url            text,
    email_notifications   boolean     not null default true,
    push_notifications    boolean     not null default true,
    privacy_mode          boolean     not null default false,
    data_retention_months int         not null default 120,
    updated_at            timestamptz not null default now()
);

comment on table profiles is 'Dati personali crittografati lato applicazione (AES-256-GCM)';
comment on column profiles.full_name_encrypted is 'Nome e cognome cifrati con chiave derivata dalla password utente';
comment on column profiles.phone_encrypted is 'Telefono cifrato';
comment on column profiles.privacy_mode is 'Se true, nasconde dati sensibili anche all''interno dell''app (schermo offuscato)';
comment on column profiles.data_retention_months is 'Mesi di conservazione dati dopo richiesta cancellazione';


-- ---------------------------------------------------------------------------
-- 3.3 contracts
-- ---------------------------------------------------------------------------
create table contracts (
    id                 uuid            primary key default gen_random_uuid(),
    user_id            uuid            not null references users(id) on delete cascade,
    type               contract_type   not null,
    start_date         date            not null,
    end_date           date,
    rent_amount        numeric(10,2)   not null,
    deposit_amount     numeric(10,2),
    deposit_returned   boolean,
    address_encrypted  text,
    city               text,
    region             text,
    registered         boolean         not null default false,
    raw_text           text,
    ai_analysis        jsonb,
    file_path          text,
    file_hash          text,
    created_at         timestamptz     not null default now(),
    updated_at         timestamptz
);

comment on table contracts is 'Contratti di locazione degli inquilini';
comment on column contracts.deposit_returned is 'Null = in attesa, true = restituito, false = non restituito';
comment on column contracts.registered is 'true se registrato presso Agenzia delle Entrate';
comment on column contracts.ai_analysis is 'Risultati analisi AI: clausole vessatorie, anomalie canone, suggerimenti';


-- ---------------------------------------------------------------------------
-- 3.4 cases
-- ---------------------------------------------------------------------------
create table cases (
    id                       uuid        primary key default gen_random_uuid(),
    user_id                  uuid        not null references users(id) on delete cascade,
    type                     case_type   not null,
    status                   case_status not null default 'aperta',
    title                    text        not null,
    description              text,
    ai_summary               text,
    timeline                 jsonb       not null default '[]'::jsonb,
    target_name              text,
    target_address_encrypted text,
    priority                 int         not null default 0,
    deadline                 timestamptz,
    resolved_at              timestamptz,
    created_at               timestamptz not null default now(),
    updated_at               timestamptz
);

comment on table cases is 'Pratiche legali degli inquilini';
comment on column cases.timeline is 'Array JSON di eventi strutturati: [{timestamp, action, description, actor}]';
comment on column cases.priority is '0-5 (0=nessuna urgenza, 5=urgentissimo — sfratto esecutivo)';
comment on column cases.target_name is 'Nome del proprietario o agenzia immobiliare';


-- ---------------------------------------------------------------------------
-- 3.5 case_actions
-- ---------------------------------------------------------------------------
create table case_actions (
    id          uuid        primary key default gen_random_uuid(),
    case_id     uuid        not null references cases(id) on delete cascade,
    action_type text        not null,
    description text,
    metadata    jsonb,
    created_at  timestamptz not null default now()
);

comment on table case_actions is 'Storico cronologico delle azioni compiute su una pratica';
comment on column case_actions.action_type is 'Es: diffida_inviata, email_inviata, pdf_generato, avvocato_contattato, promemoria';


-- ---------------------------------------------------------------------------
-- 3.6 evidence
-- ---------------------------------------------------------------------------
create table evidence (
    id                     uuid            primary key default gen_random_uuid(),
    user_id                uuid            not null references users(id) on delete cascade,
    case_id                uuid            references cases(id) on delete set null,
    type                   evidence_type   not null,
    title                  text            not null,
    description            text,
    file_path              text            not null,
    file_hash              text            not null,
    file_size_bytes        bigint,
    mime_type              text,
    server_timestamp       timestamptz     not null default now(),
    blockchain_hash        text,
    gps_lat                numeric(10,7),
    gps_lng                numeric(10,7),
    client_side_encrypted  boolean         not null default false,
    metadata               jsonb,
    is_deleted             boolean         not null default false,
    created_at             timestamptz     not null default now()
);

comment on table evidence is 'Prove e documenti legali degli inquilini (immutabili — solo soft delete)';
comment on column evidence.file_hash is 'SHA-256 calcolato lato client prima dell''upload';
comment on column evidence.blockchain_hash is 'Timestamp su blockchain (OpenTimestamps) per integrità legale';
comment on column evidence.client_side_encrypted is 'true se il file è cifrato lato client prima dell''upload';
comment on column evidence.is_deleted is 'Soft delete: rimuove solo il riferimento, non il file';


-- ---------------------------------------------------------------------------
-- 3.7 ai_conversations
-- ---------------------------------------------------------------------------
create table ai_conversations (
    id           uuid        primary key default gen_random_uuid(),
    user_id      uuid        not null references users(id) on delete cascade,
    messages     jsonb       not null default '[]'::jsonb,
    model_used   text,
    privacy_mode boolean     not null default false,
    tokens_used  int,
    created_at   timestamptz not null default now(),
    updated_at   timestamptz
);

comment on table ai_conversations is 'Conversazioni con l''assistente AI legale';
comment on column ai_conversations.messages is 'Array JSON: [{role, content, citations, timestamp}]';
comment on column ai_conversations.privacy_mode is 'Se true, la conversazione non viene usata per training/miglioramento modello';


-- ---------------------------------------------------------------------------
-- 3.8 templates_generated
-- ---------------------------------------------------------------------------
create table templates_generated (
    id         uuid        primary key default gen_random_uuid(),
    user_id    uuid        not null references users(id) on delete cascade,
    case_id    uuid        references cases(id),
    type       text        not null,
    title      text,
    content    text        not null,
    pdf_path   text,
    metadata   jsonb,
    created_at timestamptz not null default now()
);

comment on table templates_generated is 'Documenti legali generati (diffide, lettere, ricorsi, checklist)';
comment on column templates_generated.type is 'diffida, lettera, segnalazione, ricorso, checklist';


-- ---------------------------------------------------------------------------
-- 3.9 lawyers_partners
-- ---------------------------------------------------------------------------
create table lawyers_partners (
    id                        uuid            primary key default gen_random_uuid(),
    name                      text            not null,
    firm_name                 text,
    city                      text            not null,
    region                    text            not null,
    specialties               text[],
    rating                    numeric(2,1)    not null default 0,
    review_count              int             not null default 0,
    verified                  boolean         not null default false,
    verification_document_path text,
    email_encrypted           text,
    phone_encrypted           text,
    accepts_pro_bono          boolean         not null default false,
    consultation_fee          numeric(10,2),
    available_for_matching    boolean         not null default true,
    created_at                timestamptz     not null default now()
);

comment on table lawyers_partners is 'Avvocati partner verificati per match con inquilini';
comment on column lawyers_partners.specialties is 'Array di specializzazioni: es. {sfrutti,condominio,locazioni}';
comment on column lawyers_partners.rating is 'Media voti 0.0-5.0';
comment on column lawyers_partners.verification_document_path is 'Path a documento verifica iscrizione albo';
comment on column lawyers_partners.accepts_pro_bono is 'Disponibile per consulenza gratuita';


-- ---------------------------------------------------------------------------
-- 3.10 reviews
-- ---------------------------------------------------------------------------
create table reviews (
    id          uuid        primary key default gen_random_uuid(),
    lawyer_id   uuid        not null references lawyers_partners(id) on delete cascade,
    user_id     uuid        not null references users(id) on delete cascade,
    rating      int         not null check (rating >= 1 and rating <= 5),
    review_text text,
    moderated   boolean     not null default false,
    created_at  timestamptz not null default now()
);

comment on table reviews is 'Recensioni degli utenti sugli avvocati partner';
comment on column reviews.moderated is 'true dopo verifica moderatore per prevenire abusi';


-- ---------------------------------------------------------------------------
-- 3.11 community_posts
-- ---------------------------------------------------------------------------
create table community_posts (
    id                   uuid        primary key default gen_random_uuid(),
    author_anonymous_id  uuid        not null,
    city                 text,
    region               text,
    title                text,
    content              text        not null,
    category             text,
    moderated            boolean     not null default false,
    moderated_by         uuid        references users(id),
    is_pinned            boolean     not null default false,
    upvotes              int         not null default 0,
    created_at           timestamptz not null default now()
);

comment on table community_posts is 'Post della community (anonimi)';
comment on column community_posts.author_anonymous_id is 'UUID stabile per stesso autore ma non riconducibile a users';
comment on column community_posts.category is 'generale, legale, esperienze, domanda';


-- ---------------------------------------------------------------------------
-- 3.12 community_comments
-- ---------------------------------------------------------------------------
create table community_comments (
    id                   uuid        primary key default gen_random_uuid(),
    post_id              uuid        not null references community_posts(id) on delete cascade,
    author_anonymous_id  uuid        not null,
    content              text        not null,
    moderated            boolean     not null default false,
    created_at           timestamptz not null default now()
);

comment on table community_comments is 'Commenti ai post della community (anonimi)';


-- ---------------------------------------------------------------------------
-- 3.13 subscriptions
-- ---------------------------------------------------------------------------
create table subscriptions (
    user_id                uuid              primary key references users(id) on delete cascade,
    plan                   subscription_plan not null default 'free',
    revenuecat_id          text,
    stripe_subscription_id text,
    stripe_customer_id     text,
    current_period_start   timestamptz,
    current_period_end     timestamptz,
    cancel_at_period_end   boolean           not null default false,
    status                 text              not null default 'active',
    created_at             timestamptz       not null default now(),
    updated_at             timestamptz
);

comment on table subscriptions is 'Abbonamenti utente (gestiti da RevenueCat + Stripe)';
comment on column subscriptions.status is 'active, past_due, canceled, incomplete, trialing';


-- ---------------------------------------------------------------------------
-- 3.14 knowledge_documents
-- ---------------------------------------------------------------------------
create table knowledge_documents (
    id               text        primary key,
    title            text        not null,
    source           text,
    source_reference text,
    content          text        not null,
    tags             text[],
    priority         int         not null default 0,
    embedding        vector(1536),
    metadata         jsonb,
    is_active        boolean     not null default true,
    created_at       timestamptz not null default now()
);

comment on table knowledge_documents is 'Knowledge base giuridica per RAG (leggi, decreti, sentenze)';
comment on column knowledge_documents.source is 'legge, decreto, sentenza, contratto-tipo';
comment on column knowledge_documents.source_reference is 'Riferimento normativo completo: es. "L. 9 dicembre 1998, n. 431"';
comment on column knowledge_documents.embedding is 'Vettore OpenAI text-embedding-3-small (1536 dimensioni) per similarity search';
comment on column knowledge_documents.tags is 'Tag per filtraggio e categorizzazione';
comment on column knowledge_documents.priority is '0-5: priorità del documento nel ranking RAG';


-- ---------------------------------------------------------------------------
-- 3.15 audit_log
-- ---------------------------------------------------------------------------
create table audit_log (
    id         uuid        primary key default gen_random_uuid(),
    user_id    uuid,
    action     text        not null,
    table_name text,
    record_id  uuid,
    old_data   jsonb,
    new_data   jsonb,
    ip_address inet,
    user_agent text,
    created_at timestamptz not null default now()
);

comment on table audit_log is 'Audit logging per compliance e sicurezza (solo admin)';


-- ============================================================================
-- 4. INDICI
-- ============================================================================

-- Evidence: query per userId + ordinamento cronologico discendente
create index idx_evidence_user_timestamp on evidence(user_id, server_timestamp desc);

-- Cases: filtro per utente e stato pratica
create index idx_cases_user_status on cases(user_id, status);

-- Contracts: lookup per utente
create index idx_contracts_user on contracts(user_id);

-- AI conversations: storico per utente
create index idx_ai_conversations_user on ai_conversations(user_id);

-- Knowledge base: similarità vettoriale (IVFFlat con 100 liste)
create index idx_knowledge_embedding on knowledge_documents using ivfflat (embedding vector_cosine_ops) with (lists = 100);

-- Audit log: ordinamento cronologico
create index idx_audit_log_created on audit_log(created_at desc);

-- Community: filtro per città
create index idx_community_posts_city on community_posts(city);

-- Avvocati: filtro combinato città + verificati (partial index)
create index idx_lawyers_city_verified on lawyers_partners(city, verified) where verified = true;


-- ============================================================================
-- 5. FUNZIONI E TRIGGER
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 5.1 Auto-update updated_at
-- ---------------------------------------------------------------------------
create or replace function update_updated_at()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

create trigger trg_profiles_updated_at
    before update on profiles
    for each row execute function update_updated_at();

create trigger trg_contracts_updated_at
    before update on contracts
    for each row execute function update_updated_at();

create trigger trg_cases_updated_at
    before update on cases
    for each row execute function update_updated_at();

create trigger trg_ai_conversations_updated_at
    before update on ai_conversations
    for each row execute function update_updated_at();

create trigger trg_subscriptions_updated_at
    before update on subscriptions
    for each row execute function update_updated_at();

-- ---------------------------------------------------------------------------
-- 5.2 Validate file_hash on evidence insert
-- ---------------------------------------------------------------------------
create or replace function validate_evidence_hash()
returns trigger as $$
begin
    if new.file_hash is null or new.file_hash = '' then
        raise exception 'file_hash is required for evidence (SHA-256 calcolato lato client)';
    end if;
    return new;
end;
$$ language plpgsql;

create trigger trg_evidence_hash
    before insert on evidence
    for each row execute function validate_evidence_hash();

-- ---------------------------------------------------------------------------
-- 5.3 Soft delete for evidence (anziché DELETE)
-- ---------------------------------------------------------------------------
create or replace function soft_delete_evidence()
returns trigger as $$
begin
    new.is_deleted = true;
    new.file_path = null;
    new.file_hash = null;
    new.file_size_bytes = null;
    new.blockchain_hash = null;
    new.gps_lat = null;
    new.gps_lng = null;
    new.metadata = null;
    return new;
end;
$$ language plpgsql;

-- ---------------------------------------------------------------------------
-- 5.4 Auto-set server_timestamp on evidence insert
-- ---------------------------------------------------------------------------
create or replace function set_evidence_server_timestamp()
returns trigger as $$
begin
    new.server_timestamp = now();
    return new;
end;
$$ language plpgsql;

create trigger trg_evidence_server_timestamp
    before insert on evidence
    for each row execute function set_evidence_server_timestamp();

-- ---------------------------------------------------------------------------
-- 5.5 Prevent direct delete on evidence (forza soft delete via UPDATE)
-- ---------------------------------------------------------------------------
create or replace function prevent_evidence_delete()
returns trigger as $$
begin
    raise exception 'Evidence cannot be deleted directly. Use UPDATE is_deleted = true instead.';
    return null;
end;
$$ language plpgsql;

create trigger trg_evidence_prevent_delete
    before delete on evidence
    for each row execute function prevent_evidence_delete();


-- ============================================================================
-- 6. ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 6.1 Enable RLS on all tables
-- ---------------------------------------------------------------------------
alter table users                  enable row level security;
alter table profiles               enable row level security;
alter table contracts              enable row level security;
alter table evidence               enable row level security;
alter table cases                  enable row level security;
alter table case_actions           enable row level security;
alter table ai_conversations       enable row level security;
alter table templates_generated    enable row level security;
alter table community_posts        enable row level security;
alter table community_comments     enable row level security;
alter table subscriptions          enable row level security;
alter table reviews                enable row level security;
alter table lawyers_partners       enable row level security;
alter table knowledge_documents    enable row level security;
alter table audit_log              enable row level security;

-- ---------------------------------------------------------------------------
-- 6.2 Users policies
-- ---------------------------------------------------------------------------
create policy "users_view_own"
    on users for select
    using (id = auth.uid());

create policy "users_insert_own"
    on users for insert
    with check (id = auth.uid());

create policy "users_update_own"
    on users for update
    using (id = auth.uid());

-- ---------------------------------------------------------------------------
-- 6.3 Profiles policies
-- ---------------------------------------------------------------------------
create policy "profiles_view_own"
    on profiles for select
    using (id = auth.uid());

create policy "profiles_insert_own"
    on profiles for insert
    with check (id = auth.uid());

create policy "profiles_update_own"
    on profiles for update
    using (id = auth.uid());

-- ---------------------------------------------------------------------------
-- 6.4 Contracts policies
-- ---------------------------------------------------------------------------
create policy "contracts_view_own"
    on contracts for select
    using (user_id = auth.uid());

create policy "contracts_insert_own"
    on contracts for insert
    with check (user_id = auth.uid());

create policy "contracts_update_own"
    on contracts for update
    using (user_id = auth.uid());

create policy "contracts_delete_own"
    on contracts for delete
    using (user_id = auth.uid());

-- ---------------------------------------------------------------------------
-- 6.5 Evidence policies (CRITICAL — prove legali immutabili)
-- ---------------------------------------------------------------------------
create policy "evidence_view_own"
    on evidence for select
    using (user_id = auth.uid());

create policy "evidence_insert_own"
    on evidence for insert
    with check (user_id = auth.uid());

-- No update/delete policies — evidence is append-only.
-- Soft delete is performed via UPDATE is_deleted = true,
-- which requires a separate policy if needed (admin-only).

create policy "evidence_admin_audit"
    on evidence for select
    using (auth.jwt() ->> 'role' = 'admin');

create policy "evidence_lawyer_metadata"
    on evidence for select
    using (
        exists (
            select 1
            from cases c
            join lawyers_partners lp on lp.id = auth.uid()
            where c.id = evidence.case_id
              and c.user_id = evidence.user_id
              and auth.jwt() ->> 'role' = 'avvocato'
              and lp.verified = true
        )
    );

-- ---------------------------------------------------------------------------
-- 6.6 Cases policies
-- ---------------------------------------------------------------------------
create policy "cases_view_own"
    on cases for select
    using (user_id = auth.uid());

create policy "cases_insert_own"
    on cases for insert
    with check (user_id = auth.uid());

create policy "cases_update_own"
    on cases for update
    using (user_id = auth.uid());

-- ---------------------------------------------------------------------------
-- 6.7 Case actions policies
-- ---------------------------------------------------------------------------
create policy "case_actions_view_own"
    on case_actions for select
    using (
        exists (
            select 1 from cases
            where cases.id = case_actions.case_id
              and cases.user_id = auth.uid()
        )
    );

create policy "case_actions_insert_own"
    on case_actions for insert
    with check (
        exists (
            select 1 from cases
            where cases.id = case_actions.case_id
              and cases.user_id = auth.uid()
        )
    );

-- ---------------------------------------------------------------------------
-- 6.8 AI conversations policies
-- ---------------------------------------------------------------------------
create policy "ai_conversations_view_own"
    on ai_conversations for select
    using (user_id = auth.uid());

create policy "ai_conversations_insert_own"
    on ai_conversations for insert
    with check (user_id = auth.uid());

-- ---------------------------------------------------------------------------
-- 6.9 Templates policies
-- ---------------------------------------------------------------------------
create policy "templates_view_own"
    on templates_generated for select
    using (user_id = auth.uid());

create policy "templates_insert_own"
    on templates_generated for insert
    with check (user_id = auth.uid());

-- ---------------------------------------------------------------------------
-- 6.10 Community posts policies
-- ---------------------------------------------------------------------------
create policy "community_posts_select_all"
    on community_posts for select
    using (true);

create policy "community_posts_insert_auth"
    on community_posts for insert
    with check (true);

create policy "community_posts_admin_update"
    on community_posts for update
    using (auth.jwt() ->> 'role' in ('admin', 'moderatore'));

create policy "community_posts_admin_delete"
    on community_posts for delete
    using (auth.jwt() ->> 'role' in ('admin', 'moderatore'));

-- ---------------------------------------------------------------------------
-- 6.11 Community comments policies
-- ---------------------------------------------------------------------------
create policy "community_comments_select_all"
    on community_comments for select
    using (true);

create policy "community_comments_insert_auth"
    on community_comments for insert
    with check (true);

create policy "community_comments_admin_moderate"
    on community_comments for update
    using (auth.jwt() ->> 'role' in ('admin', 'moderatore'));

create policy "community_comments_admin_delete"
    on community_comments for delete
    using (auth.jwt() ->> 'role' in ('admin', 'moderatore'));

-- ---------------------------------------------------------------------------
-- 6.12 Subscriptions policies
-- ---------------------------------------------------------------------------
create policy "subscriptions_view_own"
    on subscriptions for select
    using (user_id = auth.uid());

-- Service role (webhook RevenueCat/Stripe) gestisce insert/update via
-- contournamento RLS. Non esponiamo insert/update policies per utenti.

-- ---------------------------------------------------------------------------
-- 6.13 Reviews policies
-- ---------------------------------------------------------------------------
create policy "reviews_select_all"
    on reviews for select
    using (true);

create policy "reviews_insert_own"
    on reviews for insert
    with check (user_id = auth.uid());

create policy "reviews_admin_moderate"
    on reviews for update
    using (auth.jwt() ->> 'role' in ('admin', 'moderatore'));

-- ---------------------------------------------------------------------------
-- 6.14 Lawyers partners policies
-- ---------------------------------------------------------------------------
create policy "lawyers_select_all"
    on lawyers_partners for select
    using (true);

-- Solo admin può modificare avvocati partner
create policy "lawyers_admin_all"
    on lawyers_partners for insert
    with check (auth.jwt() ->> 'role' = 'admin');

create policy "lawyers_admin_update"
    on lawyers_partners for update
    using (auth.jwt() ->> 'role' = 'admin');

create policy "lawyers_admin_delete"
    on lawyers_partners for delete
    using (auth.jwt() ->> 'role' = 'admin');

-- ---------------------------------------------------------------------------
-- 6.15 Knowledge documents policies
-- ---------------------------------------------------------------------------
create policy "knowledge_documents_select_all"
    on knowledge_documents for select
    using (true);

create policy "knowledge_documents_admin_all"
    on knowledge_documents for insert
    with check (auth.jwt() ->> 'role' = 'admin');

create policy "knowledge_documents_admin_update"
    on knowledge_documents for update
    using (auth.jwt() ->> 'role' = 'admin');

-- ---------------------------------------------------------------------------
-- 6.16 Audit log policies
-- ---------------------------------------------------------------------------
create policy "audit_log_admin_select"
    on audit_log for select
    using (auth.jwt() ->> 'role' = 'admin');

-- Solo trigger/funzioni interne possono scrivere su audit_log
-- (nessun insert policy per utenti normale)


-- ============================================================================
-- 7. STORAGE BUCKETS (Supabase Storage)
-- ============================================================================
-- I bucket vanno creati tramite Supabase Dashboard o API di gestione.
-- SQL dichiarativo non supportato per bucket storage in Supabase.
-- Documentazione pattern RLS per storage:

-- Bucket: evidence-files
--   Public: false
--   Policy INSERT:
--     (bucket_id = 'evidence-files'::text)
--     AND (auth.role() = 'authenticated'::text)
--     AND ((storage.foldername(name))[1] = (auth.uid())::text)
--   Policy SELECT:
--     (bucket_id = 'evidence-files'::text)
--     AND (auth.role() = 'authenticated'::text)
--     AND ((storage.foldername(name))[1] = (auth.uid())::text)
--
-- Bucket: generated-templates
--   Public: false
--   Policy: same pattern as evidence-files (user_id in folder path)
--
-- Bucket: avatars
--   Public: true
--   Policy SELECT: (bucket_id = 'avatars'::text) -- pubblico
--   Policy INSERT: (bucket_id = 'avatars'::text)
--     AND (auth.role() = 'authenticated'::text)
--
-- Bucket: knowledge-docs
--   Public: true
--   Policy SELECT: (bucket_id = 'knowledge-docs'::text) -- pubblico


-- ============================================================================
-- 8. REALTIME SUBSCRIPTIONS
-- ============================================================================

-- Abilita Realtime per notifiche push in tempo reale
alter publication supabase_realtime add table cases;
alter publication supabase_realtime add table case_actions;
alter publication supabase_realtime add table ai_conversations;

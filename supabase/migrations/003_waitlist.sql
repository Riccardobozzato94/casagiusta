-- ============================================================================
-- CASAGIUSTA -- Migration 003: Waitlist
-- Tabella per iscrizioni waitlist + funzione di upsert
-- ============================================================================

-- 1. TABELLA WAITLIST
create table if not exists waitlist (
    id          uuid primary key default gen_random_uuid(),
    email       text not null,
    source      text not null default 'landing-page',
    utm_source  text,
    utm_medium  text,
    utm_campaign text,
    locale      text default 'it',
    created_at  timestamptz not null default now(),
    confirmed   boolean not null default false,
    confirmed_at timestamptz,
    unique(email)
);

comment on table waitlist is 'Iscrizioni waitlist per lancio app';

-- 2. INDEX
create index if not exists idx_waitlist_created_at on waitlist(created_at desc);
create index if not exists idx_waitlist_source on waitlist(source);

-- 3. RLS
alter table waitlist enable row level security;

-- Solo insert pubblico (anon)
create policy "waitlist_insert_anon"
    on waitlist for insert
    to anon
    with check (true);

-- Solo select per admin autenticato
create policy "waitlist_select_admin"
    on waitlist for select
    to authenticated
    using (true);

-- 4. FUNZIONE DI UPSERT (usa email come chiave per evitare duplicati)
create or replace function upsert_waitlist(
    p_email text,
    p_source text default 'landing-page',
    p_utm_source text default null,
    p_utm_medium text default null,
    p_utm_campaign text default null,
    p_locale text default 'it'
) returns json as $$
declare
    v_id uuid;
    v_created boolean;
begin
    insert into waitlist (email, source, utm_source, utm_medium, utm_campaign, locale)
    values (p_email, p_source, p_utm_source, p_utm_medium, p_utm_campaign, p_locale)
    on conflict (email) do nothing
    returning id into v_id;

    if v_id is not null then
        v_created := true;
    else
        select id into v_id from waitlist where email = p_email;
        v_created := false;
    end if;

    return json_build_object(
        'id', v_id,
        'created', v_created,
        'email', p_email
    );
end;
$$ language plpgsql security definer;

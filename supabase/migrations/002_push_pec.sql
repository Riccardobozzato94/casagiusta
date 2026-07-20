-- Migration: 002_push_pec
-- ============================================================================
-- CASAGIUSTA — Push notifications & PEC history
-- ============================================================================

-- ============================================================================
-- 1. UPSERT PUSH TOKEN
-- ============================================================================
-- Aggiunge o aggiorna un token push per l'utente corrente
-- Utilizzato da: NotificationProvider.tsx (app mobile)

create or replace function upsert_push_token(
  p_push_token text,
  p_platform text default 'ios'
)
returns void
language plpgsql
security definer
as $$
begin
  -- Verifica che l'utente sia autenticato
  if auth.uid() is null then
    raise exception 'Utente non autenticato';
  end if;

  -- Usa jsonb_set per aggiungere il token all'array se non esiste già
  update public.users
  set notification_push_token = (
    select jsonb_agg(distinct value)
    from jsonb_array_elements_text(
      case
        when notification_push_token is null then jsonb_build_array(p_push_token)
        else notification_push_token || jsonb_build_array(p_push_token)
      end
    ) as value
    where value is not null
  ),
  last_active_at = now()
  where id = auth.uid();
end;
$$;

-- ============================================================================
-- 2. PEC HISTORY TABLE
-- ============================================================================
-- Storico degli invii PEC per le diffide generate da Giusta AI

create table if not exists public.pec_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete set null,
  to_address text not null,
  subject text not null,
  body_html text,
  message_id text,
  sent_at timestamptz not null default now(),
  status text not null default 'inviato',
  attachments_count int default 0,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- Indici
create index idx_pec_history_user on public.pec_history(user_id);
create index idx_pec_history_sent on public.pec_history(sent_at desc);

-- RLS: solo il proprietario vede le proprie PEC
alter table public.pec_history enable row level security;

create policy "Users can view own PEC history"
  on public.pec_history for select
  using (auth.uid() = user_id);

create policy "System can insert PEC history"
  on public.pec_history for insert
  with check (auth.uid() = user_id or auth.role() = 'service_role');

-- ============================================================================
-- 3. NOTIFICATIONS TABLE
-- ============================================================================
-- Tabella per notifiche in-app (salvate quando push non disponibile)

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  type text not null default 'sistema',
  title text not null,
  body text not null,
  data jsonb default '{}'::jsonb,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

-- Indici
create index idx_notifications_user_read on public.notifications(user_id, read);
create index idx_notifications_created on public.notifications(created_at desc);

-- RLS
alter table public.notifications enable row level security;

create policy "Users can view own notifications"
  on public.notifications for select
  using (auth.uid() = user_id);

create policy "System can insert notifications"
  on public.notifications for insert
  with check (auth.uid() = user_id or auth.role() = 'service_role');

create policy "Users can mark own notifications as read"
  on public.notifications for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

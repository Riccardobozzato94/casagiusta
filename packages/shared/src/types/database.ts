/**
 * @file Tipi TypeScript che rispecchiano lo schema del database CasaGiusta.
 * Ogni interfaccia corrisponde a una tabella SQL.
 */

// ──────────────────────────── Enums ────────────────────────────

export type ContractType = '4+4' | '3+2' | 'transitorio' | 'studenti' | 'concordato' | 'altro';
export type CaseType =
  | 'sfratto'
  | 'deposito_non_restituito'
  | 'manutenzione_mancata'
  | 'aumento_illegale'
  | 'molestie'
  | 'canone_nero'
  | 'discriminazione'
  | 'altro';
export type CaseStatus = 'aperta' | 'in_esame' | 'azione_intrapresa' | 'in_negoziazione' | 'risolta' | 'archiviata';
export type EvidenceType = 'foto' | 'video' | 'audio' | 'documento' | 'comunicazione' | 'ricevuta' | 'altro';
export type UserRole = 'inquilino' | 'avvocato' | 'sindacato' | 'admin' | 'moderatore';
export type SubscriptionPlan = 'free' | 'pro_monthly' | 'pro_yearly' | 'lawyer_partner';

// ──────────────────────────── JSONB helper types ────────────────────────────

/**
 * Analisi AI memorizzata nel campo jsonb `contract.ai_analysis`.
 */
export interface AiAnalysis {
  summary: string;
  riskLevel: 'basso' | 'medio' | 'alto';
  anomalies: string[];
  keyClauses: { article: string; text: string; type: 'favorevole' | 'sfavorevole' | 'neutro' }[];
  legalReferences: { norm: string; description: string }[];
  recommendedActions: string[];
  confidence: number;
  extractedData: {
    landlordName?: string;
    tenantName?: string;
    propertyAddress?: string;
    contractDuration?: string;
    renewalClause?: string;
  };
  processedAt: string;
}

/**
 * Evento della timeline memorizzato in `cases.timeline` (jsonb[]).
 */
export interface TimelineEvent {
  id: string;
  type: 'creazione' | 'aggiornamento' | 'azione_legale' | 'comunicazione' | 'scadenza' | 'note' | 'evidenza';
  title: string;
  description: string;
  timestamp: string;
  actorId?: string;
  actorRole?: UserRole;
  metadata?: Record<string, unknown>;
}

/**
 * Messaggio di chat per `ai_conversations.messages` (jsonb[]).
 */
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system' | 'tool';
  content: string;
  toolCalls?: { name: string; arguments: Record<string, unknown>; result?: ToolCallResult }[];
  citations?: Citation[];
  timestamp: string;
  tokensUsed?: number;
}

export interface ToolCallResult {
  success: boolean;
  data: unknown;
  error?: string;
}

/**
 * Citazione legale inclusa in una risposta AI.
 */
export interface Citation {
  id: string;
  source: string;
  sourceReference: string;
  article?: string;
  text: string;
  relevance: number;
  url?: string;
}

// ──────────────────────────── Database rows ────────────────────────────

export interface User {
  id: string;
  email: string | null;
  is_anonymous: boolean;
  anonymous_fingerprint: string | null;
  role: UserRole;
  city: string | null;
  region: string | null;
  notification_push_token: string[];
  preferred_language: string;
  created_at: string;
  last_active_at: string;
  deleted_at: string | null;
}

export interface Profile {
  id: string;
  user_id: string;
  full_name_encrypted: string | null;
  phone_encrypted: string | null;
  avatar_url: string | null;
  email_notifications: boolean;
  push_notifications: boolean;
  privacy_mode: boolean;
  data_retention_months: number;
  updated_at: string;
}

export interface Contract {
  id: string;
  user_id: string;
  type: ContractType;
  start_date: string;
  end_date: string | null;
  rent_amount: number;
  deposit_amount: number | null;
  deposit_returned: boolean | null;
  address_encrypted: string | null;
  city: string | null;
  region: string | null;
  registered: boolean;
  raw_text: string | null;
  ai_analysis: AiAnalysis | null;
  file_path: string | null;
  file_hash: string | null;
  created_at: string;
  updated_at: string;
}

export interface Evidence {
  id: string;
  user_id: string;
  case_id: string | null;
  type: EvidenceType;
  title: string;
  description: string | null;
  file_path: string;
  file_hash: string;
  file_size_bytes: number | null;
  mime_type: string | null;
  server_timestamp: string;
  blockchain_hash: string | null;
  gps_lat: number | null;
  gps_lng: number | null;
  client_side_encrypted: boolean;
  metadata: Record<string, unknown> | null;
  is_deleted: boolean;
  created_at: string;
}

export interface Case {
  id: string;
  user_id: string;
  type: CaseType;
  status: CaseStatus;
  title: string;
  description: string | null;
  contract_id: string | null;
  assigned_to: string | null;
  priority: number;
  timeline: TimelineEvent[];
  deadline: string | null;
  city: string | null;
  region: string | null;
  is_archived: boolean;
  created_at: string;
  updated_at: string;
}

export interface CaseAction {
  id: string;
  case_id: string;
  user_id: string;
  action_type: string;
  description: string;
  metadata: Record<string, unknown> | null;
  is_system_generated: boolean;
  created_at: string;
}

export interface AiConversation {
  id: string;
  user_id: string;
  case_id: string | null;
  contract_id: string | null;
  title: string;
  messages: ChatMessage[];
  context_summary: string | null;
  message_count: number;
  tokens_total: number;
  is_archived: boolean;
  created_at: string;
  updated_at: string;
}

export interface TemplateGenerated {
  id: string;
  user_id: string;
  case_id: string | null;
  template_type: 'diffida' | 'lettera' | 'reclamo' | 'messa_in_mora' | 'altro';
  title: string;
  content_encrypted: string;
  ai_generated: boolean;
  file_path: string | null;
  created_at: string;
}

export interface LawyerPartner {
  id: string;
  user_id: string;
  full_name: string;
  studio_name: string | null;
  city: string;
  region: string;
  specializations: string[];
  is_verified: boolean;
  consultation_fee_cents: number | null;
  rating_avg: number;
  rating_count: number;
  available_for_chat: boolean;
  max_active_cases: number;
  current_case_count: number;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  lawyer_id: string;
  user_id: string;
  rating: number;
  title: string | null;
  description: string | null;
  is_verified: boolean;
  is_anonymous: boolean;
  created_at: string;
}

export interface CommunityPost {
  id: string;
  user_id: string;
  title: string;
  content_encrypted: string;
  category: string;
  tags: string[];
  is_moderated: boolean;
  is_pinned: boolean;
  view_count: number;
  upvote_count: number;
  comment_count: number;
  created_at: string;
  updated_at: string;
}

export interface CommunityComment {
  id: string;
  post_id: string;
  user_id: string;
  content_encrypted: string;
  is_moderated: boolean;
  is_solution: boolean;
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  plan: SubscriptionPlan;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  current_period_start: string;
  current_period_end: string;
  status: 'active' | 'canceled' | 'past_due' | 'trialing';
  canceled_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface KnowledgeDocument {
  id: string;
  title: string;
  slug: string;
  category: string;
  subcategory: string | null;
  content_encrypted: string;
  summary: string | null;
  tags: string[];
  legal_basis: string[];
  is_published: boolean;
  version: number;
  created_at: string;
  updated_at: string;
}

export interface AuditLog {
  id: string;
  user_id: string | null;
  action: string;
  resource: string;
  resource_id: string | null;
  details: Record<string, unknown> | null;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
}

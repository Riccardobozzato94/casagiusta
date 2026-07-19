export const APP_NAME = 'CasaGiusta';
export const APP_VERSION = '1.0.0';

export const STORAGE_KEYS = {
  ONBOARDING_COMPLETED: 'casagiusta.onboarding_completed',
  ANONYMOUS_FINGERPRINT: 'casagiusta.anonymous_fingerprint',
  THEME_MODE: 'casagiusta.theme_mode',
  LOW_STIMULUS_MODE: 'casagiusta.low_stimulus_mode',
  PRIVACY_MODE: 'casagiusta.privacy_mode',
  AI_QUERY_COUNT: 'casagiusta.ai_query_count',
  HAS_COMPLETED_CONTRACT_ONBOARDING: 'casagiusta.has_contract_onboarding',
} as const;

export const API_ENDPOINTS = {
  AI_ORCHESTRATOR: '/functions/v1/ai-orchestrator',
  ISTAT_CALCULATOR: '/functions/v1/istat-calculator',
  GENERATE_PDF: '/functions/v1/generate-pdf',
  GENERATE_TEMPLATE: '/functions/v1/generate-template',
  EVIDENCE_HASH: '/functions/v1/evidence-hash',
  OCR_WEBHOOK: '/functions/v1/ocr-webhook',
  SEARCH_LAWYERS: '/functions/v1/search-lawyers',
} as const;

export const PLANS = {
  FREE: { id: 'free', label: 'Free', price: 0, period: 'month' as const },
  PRO_MONTHLY: { id: 'pro_monthly', label: 'Pro Mensile', price: 4.99, period: 'month' as const },
  PRO_YEARLY: { id: 'pro_yearly', label: 'Pro Annuale', price: 39, period: 'year' as const },
} as const;

export const LIMITS = {
  FREE: {
    AI_QUERIES_PER_DAY: 5,
    STORAGE_MB: 50,
    EVIDENCE_COUNT: 20,
    TEMPLATES_PER_MONTH: 3,
  },
  PRO: {
    AI_QUERIES_PER_DAY: 999,
    STORAGE_MB: 2000,
    EVIDENCE_COUNT: 999,
    TEMPLATES_PER_MONTH: 999,
  },
} as const;

export const CASE_TYPES = [
  { id: 'deposito_non_restituito', label: 'Deposito non restituito', icon: 'cash', color: '#f59e0b' },
  { id: 'manutenzione_mancata', label: 'Manutenzione mancata', icon: 'build', color: '#3b82f6' },
  { id: 'aumento_illegale', label: 'Aumento illegittimo', icon: 'trending-up', color: '#ef4444' },
  { id: 'sfratto', label: 'Sfratto minacciato', icon: 'warning', color: '#dc2626' },
  { id: 'molestie', label: 'Molestie', icon: 'shield', color: '#7c3aed' },
  { id: 'canone_nero', label: 'Canone nero', icon: 'eye-off', color: '#0891b2' },
  { id: 'discriminazione', label: 'Discriminazione', icon: 'people', color: '#db2777' },
  { id: 'altro', label: 'Altro', icon: 'ellipsis-horizontal', color: '#64748b' },
] as const;

export const EVIDENCE_CATEGORIES = [
  { id: 'danni', label: "Danni all'immobile", icon: 'hammer', color: '#f59e0b' },
  { id: 'comunicazioni', label: 'Comunicazioni proprietario', icon: 'chatbubbles', color: '#3b82f6' },
  { id: 'bollette', label: 'Bollette e utenze', icon: 'receipt', color: '#10b981' },
  { id: 'ricevute', label: 'Ricevute di pagamento', icon: 'card', color: '#8b5cf6' },
  { id: 'molestie', label: 'Molestie e abusi', icon: 'warning', color: '#ef4444' },
  { id: 'contratto', label: 'Documenti contratto', icon: 'document-text', color: '#0ea5e9' },
  { id: 'altro', label: 'Altro', icon: 'folder', color: '#64748b' },
] as const;

export const EMERGENCY_CONTACTS = {
  CARABINIERI: { name: 'Carabinieri', phone: '112', icon: 'shield' },
  POLIZIA: { name: 'Polizia', phone: '113', icon: 'police-badge' },
  PRONTO_SOCCORSO: { name: 'Pronto Soccorso', phone: '118', icon: 'medical' },
  ANTIVIOLENZA: { name: 'Telefono Rosa', phone: '1522', icon: 'heart' },
} as const;

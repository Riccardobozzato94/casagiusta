import { PLANS, LIMITS, STORAGE_KEYS, API_ENDPOINTS, CASE_TYPES, EVIDENCE_CATEGORIES, EMERGENCY_CONTACTS } from '@/lib/constants';

describe('PLANS', () => {
  it('has a free plan with zero price', () => {
    expect(PLANS.FREE.price).toBe(0);
    expect(PLANS.FREE.id).toBe('free');
  });

  it('has a pro monthly plan at €4.99', () => {
    expect(PLANS.PRO_MONTHLY.price).toBe(4.99);
    expect(PLANS.PRO_MONTHLY.period).toBe('month');
  });

  it('has a pro yearly plan at €39 (saves ~€20.88/yr)', () => {
    expect(PLANS.PRO_YEARLY.price).toBe(39);
    expect(PLANS.PRO_YEARLY.period).toBe('year');
    const monthlyTotal = PLANS.PRO_MONTHLY.price * 12;
    expect(monthlyTotal - PLANS.PRO_YEARLY.price).toBeCloseTo(20.88, 1);
  });
});

describe('LIMITS', () => {
  it('free plan limits are restrictive', () => {
    expect(LIMITS.FREE.AI_QUERIES_PER_DAY).toBe(5);
    expect(LIMITS.FREE.STORAGE_MB).toBe(50);
    expect(LIMITS.FREE.EVIDENCE_COUNT).toBe(20);
    expect(LIMITS.FREE.TEMPLATES_PER_MONTH).toBe(3);
  });

  it('pro plan limits are generous', () => {
    expect(LIMITS.PRO.AI_QUERIES_PER_DAY).toBeGreaterThan(100);
    expect(LIMITS.PRO.EVIDENCE_COUNT).toBeGreaterThan(100);
    expect(LIMITS.PRO.TEMPLATES_PER_MONTH).toBeGreaterThan(100);
  });

  it('pro storage is at least 40x free storage', () => {
    expect(LIMITS.PRO.STORAGE_MB / LIMITS.FREE.STORAGE_MB).toBeGreaterThanOrEqual(40);
  });
});

describe('STORAGE_KEYS', () => {
  it('all keys are prefixed with casagiusta.', () => {
    Object.values(STORAGE_KEYS).forEach(key => {
      expect(key).toMatch(/^casagiusta\./);
    });
  });

  it('contains required keys', () => {
    expect(STORAGE_KEYS.ONBOARDING_COMPLETED).toBeDefined();
    expect(STORAGE_KEYS.THEME_MODE).toBeDefined();
    expect(STORAGE_KEYS.AI_QUERY_COUNT).toBeDefined();
  });
});

describe('API_ENDPOINTS', () => {
  it('all endpoints start with /functions/v1/', () => {
    Object.values(API_ENDPOINTS).forEach(endpoint => {
      expect(endpoint).toMatch(/^\/functions\/v1\//);
    });
  });

  it('contains all 7 edge functions', () => {
    expect(Object.keys(API_ENDPOINTS)).toHaveLength(7);
    expect(API_ENDPOINTS.AI_ORCHESTRATOR).toBe('/functions/v1/ai-orchestrator');
    expect(API_ENDPOINTS.SEARCH_LAWYERS).toBe('/functions/v1/search-lawyers');
  });
});

describe('CASE_TYPES', () => {
  it('has 8 case types', () => {
    expect(CASE_TYPES).toHaveLength(8);
  });

  it('each case type has required fields', () => {
    CASE_TYPES.forEach(ct => {
      expect(ct.id).toBeDefined();
      expect(ct.label).toBeDefined();
      expect(ct.icon).toBeDefined();
      expect(ct.color).toMatch(/^#[0-9a-fA-F]{6}$/);
    });
  });

  it('includes deposito_non_restituito as first option', () => {
    expect(CASE_TYPES[0].id).toBe('deposito_non_restituito');
  });
});

describe('EVIDENCE_CATEGORIES', () => {
  it('has 7 categories', () => {
    expect(EVIDENCE_CATEGORIES).toHaveLength(7);
  });
});

describe('EMERGENCY_CONTACTS', () => {
  it('has 4 emergency contacts', () => {
    expect(Object.keys(EMERGENCY_CONTACTS)).toHaveLength(4);
  });

  it('includes Carabinieri 112', () => {
    expect(EMERGENCY_CONTACTS.CARABINIERI.phone).toBe('112');
  });

  it('includes Antiviolenza 1522', () => {
    expect(EMERGENCY_CONTACTS.ANTIVIOLENZA.phone).toBe('1522');
  });
});

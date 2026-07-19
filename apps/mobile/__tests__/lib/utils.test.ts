import { formatCurrency, formatDate, timeAgo, generateAnonymousName, getInitials, truncate, getCaseStatusColor, getCaseStatusLabel } from '@/lib/utils';

describe('formatCurrency', () => {
  it('formats integer amounts with euro symbol and decimals', () => {
    expect(formatCurrency(7200)).toBe('€ 7200,00');
  });

  it('formats decimal amounts', () => {
    expect(formatCurrency(4.99)).toBe('€ 4,99');
  });

  it('formats zero', () => {
    expect(formatCurrency(0)).toBe('€ 0,00');
  });

  it('formats large numbers without thousands separator', () => {
    // Note: current implementation uses toFixed(2) no locale grouping
    expect(formatCurrency(1500000)).toBe('€ 1500000,00');
  });
});

describe('formatDate', () => {
  it('formats a date string to Italian locale', () => {
    const date = new Date(2026, 6, 19);
    const result = formatDate(date.toISOString());
    expect(result).toContain('19');
    expect(result).toContain('luglio');
    expect(result).toContain('2026');
  });
});

describe('timeAgo', () => {
  it('returns "adesso" for very recent timestamps', () => {
    const now = new Date();
    const result = timeAgo(now.toISOString());
    expect(result).toBe('adesso');
  });

  it('returns minutes for recent timestamps', () => {
    const fiveMinAgo = new Date(Date.now() - 5 * 60000);
    const result = timeAgo(fiveMinAgo.toISOString());
    expect(result).toBe('5 min fa');
  });

  it('returns hours for timestamps within 24h', () => {
    const twoHoursAgo = new Date(Date.now() - 2 * 3600000);
    const result = timeAgo(twoHoursAgo.toISOString());
    expect(result).toBe('2 h fa');
  });

  it('returns days for timestamps within a week', () => {
    const threeDaysAgo = new Date(Date.now() - 3 * 86400000);
    const result = timeAgo(threeDaysAgo.toISOString());
    expect(result).toBe('3 g fa');
  });

  it('returns formatted date for timestamps older than a week', () => {
    const twoWeeksAgo = new Date(Date.now() - 14 * 86400000);
    const result = timeAgo(twoWeeksAgo.toISOString());
    expect(result).toMatch(/\d{2}\/\d{2}\/\d{4}/);
  });
});

describe('getInitials', () => {
  it('returns first two initials from full name', () => {
    expect(getInitials('Mario Rossi')).toBe('MR');
  });

  it('handles single name', () => {
    expect(getInitials('Mario')).toBe('M');
  });

  it('handles empty string', () => {
    expect(getInitials('')).toBe('');
  });
});

describe('truncate', () => {
  it('returns full text when within limit', () => {
    expect(truncate('Ciao', 10)).toBe('Ciao');
  });

  it('truncates with ellipsis when over limit', () => {
    expect(truncate('Questo è un testo lungo', 10)).toBe('Questo ...');
  });

  it('returns empty string for empty input', () => {
    expect(truncate('', 5)).toBe('');
  });
});

describe('generateAnonymousName', () => {
  it('returns a string with adjective + noun + number (no spaces)', () => {
    const name = generateAnonymousName();
    expect(name.length).toBeGreaterThan(5);
    // Name should contain no spaces (format: "AdjectiveNoun123")
    expect(name).not.toContain(' ');
  });

  it('returns different names on subsequent calls', () => {
    const names = new Set(Array.from({ length: 20 }, () => generateAnonymousName()));
    expect(names.size).toBeGreaterThan(1);
  });
});

describe('getCaseStatusColor', () => {
  it('returns blue for aperta', () => {
    expect(getCaseStatusColor('aperta')).toBe('#3b82f6');
  });

  it('returns green for risolta', () => {
    expect(getCaseStatusColor('risolta')).toBe('#10b981');
  });

  it('returns default gray for unknown status', () => {
    expect(getCaseStatusColor('sconosciuto')).toBe('#64748b');
  });
});

describe('getCaseStatusLabel', () => {
  it('returns Italian label for aperta', () => {
    expect(getCaseStatusLabel('aperta')).toBe('Aperta');
  });

  it('returns Italian label for risolta', () => {
    expect(getCaseStatusLabel('risolta')).toBe('Risolta');
  });

  it('returns raw status for unknown', () => {
    expect(getCaseStatusLabel('custom')).toBe('custom');
  });
});

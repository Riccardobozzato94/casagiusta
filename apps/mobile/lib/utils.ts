export function formatCurrency(amount: number): string {
  return `€ ${amount.toFixed(2).replace('.', ',')}`;
}

export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('it-IT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function formatDateShort(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('it-IT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

export function timeAgo(date: string | Date): string {
  const now = new Date();
  const d = typeof date === 'string' ? new Date(date) : date;
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'adesso';
  if (diffMins < 60) return `${diffMins} min fa`;
  if (diffHours < 24) return `${diffHours} h fa`;
  if (diffDays < 7) return `${diffDays} g fa`;
  return formatDateShort(date);
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
}

export function generateAnonymousName(): string {
  const adjectives = ['Coraggioso', 'Determinato', 'Forte', 'Saggio', 'Libero', 'Protetto', 'Fiero', 'Calmo'];
  const nouns = ['Inquilino', 'Cittadino', 'Pioniere', 'Guardião', 'Custode', 'Scudo', 'Farò'];
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const num = Math.floor(Math.random() * 999);
  return `${adj}${noun}${num}`;
}

export function getCaseStatusColor(status: string): string {
  const colors: Record<string, string> = {
    aperta: '#3b82f6',
    in_esame: '#f59e0b',
    azione_intrapresa: '#8b5cf6',
    in_negoziazione: '#10b981',
    risolta: '#10b981',
    archiviata: '#64748b',
  };
  return colors[status] ?? '#64748b';
}

export function getCaseStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    aperta: 'Aperta',
    in_esame: 'In esame',
    azione_intrapresa: 'Azione intrapresa',
    in_negoziazione: 'In negoziazione',
    risolta: 'Risolta',
    archiviata: 'Archiviata',
  };
  return labels[status] ?? status;
}

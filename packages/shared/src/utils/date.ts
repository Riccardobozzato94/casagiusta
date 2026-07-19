/**
 * @file Utility per la manipolazione e formattazione delle date.
 */

/**
 * Formatta una data ISO in formato leggibile italiano.
 *
 * @param isoString - Data in formato ISO 8601.
 * @param options - Opzioni di formattazione aggiuntive.
 * @returns Data formattata es. "15 marzo 2026".
 */
export function formatDate(
  isoString: string,
  options?: Intl.DateTimeFormatOptions,
): string {
  const date = new Date(isoString);
  const formatter = new Intl.DateTimeFormat('it-IT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    ...options,
  });
  return formatter.format(date);
}

/**
 * Calcola il numero di giorni tra due date.
 *
 * @param from - Data iniziale (ISO string o Date).
 * @param to - Data finale (ISO string o Date). Default: oggi.
 * @returns Numero di giorni (positivo se `to` è dopo `from`).
 */
export function daysBetween(from: string | Date, to?: string | Date): number {
  const fromDate = typeof from === 'string' ? new Date(from) : from;
  const toDate = to ? (typeof to === 'string' ? new Date(to) : to) : new Date();
  const diffMs = toDate.getTime() - fromDate.getTime();
  return Math.round(diffMs / (1000 * 60 * 60 * 24));
}

/**
 * Aggiunge un numero di mesi a una data e restituisce la nuova data in formato ISO.
 *
 * @param isoString - Data di partenza in formato ISO 8601.
 * @param months - Numero di mesi da aggiungere (può essere negativo).
 * @returns Nuova data in formato ISO 8601.
 */
export function addMonths(isoString: string, months: number): string {
  const date = new Date(isoString);
  const targetMonth = date.getMonth() + months;
  date.setMonth(targetMonth);

  // Gestione edge-case: se il giorno non esiste nel mese di destinazione (es. 31 Nov),
  // setMonth fa rollover automatico. Lo normalizziamo all'ultimo giorno valido del mese.
  if (date.getMonth() !== ((targetMonth % 12) + 12) % 12) {
    date.setDate(0);
  }

  return date.toISOString().split('T')[0];
}

/**
 * Verifica se una data è già passata (o è oggi).
 *
 * @param isoString - Data in formato ISO 8601.
 * @returns `true` se la data è nel passato o oggi.
 */
export function isExpired(isoString: string): boolean {
  const date = new Date(isoString);
  const now = new Date();
  return date.getTime() <= now.getTime();
}

/**
 * Restituisce la differenza tra due date in un formato leggibile.
 *
 * @param from - Data iniziale.
 * @param to - Data finale (default: oggi).
 * @returns Stringa descrittiva es. "3 mesi e 12 giorni".
 */
export function humanReadableDiff(from: string | Date, to?: string | Date): string {
  const totalDays = Math.abs(daysBetween(from, to));
  const years = Math.floor(totalDays / 365);
  const months = Math.floor((totalDays % 365) / 30);
  const days = totalDays % 30;

  const parts: string[] = [];
  if (years > 0) parts.push(`${years} ${years === 1 ? 'anno' : 'anni'}`);
  if (months > 0) parts.push(`${months} ${months === 1 ? 'mese' : 'mesi'}`);
  if (days > 0 || parts.length === 0) parts.push(`${days} ${days === 1 ? 'giorno' : 'giorni'}`);

  return parts.join(' e ');
}

/**
 * Verifica se una stringa è una data ISO 8601 valida.
 *
 * @param value - Stringa da testare.
 * @returns `true` se la stringa è una data ISO valida.
 */
export function isValidISODate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}/.test(value)) return false;
  const date = new Date(value);
  return !Number.isNaN(date.getTime());
}

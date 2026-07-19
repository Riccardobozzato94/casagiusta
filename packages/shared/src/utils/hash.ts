/**
 * @file Utility per hash SHA-256 lato client.
 */

/**
 * Calcola l'hash SHA-256 di una stringa o di un Uint8Array.
 *
 * @param data - Input da hashare (stringa o bytes).
 * @returns L'hash esadecimale in lowercase.
 */
export async function sha256(data: string | Uint8Array): Promise<string> {
  const encoder = new TextEncoder();
  const bytes = typeof data === 'string' ? encoder.encode(data) : data;
  const hashBuffer = await crypto.subtle.digest('SHA-256', bytes);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

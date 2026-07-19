/**
 * @file Schema Zod per la validazione dei contratti di locazione.
 */

import { z } from 'zod';

/**
 * Schema di validazione per la creazione/aggiornamento di un contratto.
 */
export const contractSchema = z.object({
  type: z.enum(['4+4', '3+2', 'transitorio', 'studenti', 'concordato', 'altro'], {
    errorMap: () => ({ message: 'Tipo contratto non valido' }),
  }),
  start_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato data non valido (YYYY-MM-DD)'),
  end_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato data non valido (YYYY-MM-DD)')
    .nullable()
    .optional(),
  rent_amount: z
    .number()
    .positive('L\'importo deve essere positivo')
    .max(99999, 'Importo massimo 99.999 €'),
  deposit_amount: z
    .number()
    .positive('L\'importo deve essere positivo')
    .max(99999, 'Importo massimo 99.999 €')
    .nullable()
    .optional(),
  city: z
    .string()
    .min(2, 'Città deve avere almeno 2 caratteri')
    .max(100, 'Città deve avere massimo 100 caratteri')
    .optional(),
  region: z
    .string()
    .min(2, 'Regione deve avere almeno 2 caratteri')
    .max(100, 'Regione deve avere massimo 100 caratteri')
    .optional(),
});

export type ContractInput = z.infer<typeof contractSchema>;

/**
 * Schema di validazione per il caricamento di un file contratto.
 */
export const contractUploadSchema = z.object({
  fileBase64: z.string().min(1, 'File richiesto'),
  fileName: z
    .string()
    .min(1, 'Nome file richiesto')
    .max(255, 'Nome file troppo lungo'),
  mimeType: z.enum(['application/pdf', 'image/jpeg', 'image/png', 'image/heic'], {
    errorMap: () => ({ message: 'Formato file non supportato (PDF, JPEG, PNG, HEIC)' }),
  }),
});

export type ContractUploadInput = z.infer<typeof contractUploadSchema>;

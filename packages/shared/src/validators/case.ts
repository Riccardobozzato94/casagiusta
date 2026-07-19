/**
 * @file Schema Zod per la validazione dei casi legali.
 */

import { z } from 'zod';

/**
 * Schema di validazione per la creazione/aggiornamento di un caso.
 */
export const caseSchema = z.object({
  type: z.enum(
    [
      'sfratto',
      'deposito_non_restituito',
      'manutenzione_mancata',
      'aumento_illegale',
      'molestie',
      'canone_nero',
      'discriminazione',
      'altro',
    ],
    { errorMap: () => ({ message: 'Tipo caso non valido' }) },
  ),
  title: z
    .string()
    .min(3, 'Il titolo deve avere almeno 3 caratteri')
    .max(200, 'Il titolo deve avere massimo 200 caratteri'),
  description: z
    .string()
    .max(5000, 'La descrizione deve avere massimo 5000 caratteri')
    .nullable()
    .optional(),
  contract_id: z.string().uuid('ID contratto non valido').nullable().optional(),
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
  priority: z
    .number()
    .int()
    .min(1, 'Priorità minima 1')
    .max(5, 'Priorità massima 5')
    .default(3),
  deadline: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato data non valido (YYYY-MM-DD)')
    .nullable()
    .optional(),
});

export type CaseInput = z.infer<typeof caseSchema>;

/**
 * Schema per l'aggiornamento dello stato di un caso.
 */
export const caseStatusUpdateSchema = z.object({
  status: z.enum(
    ['aperta', 'in_esame', 'azione_intrapresa', 'in_negoziazione', 'risolta', 'archiviata'],
    { errorMap: () => ({ message: 'Stato non valido' }) },
  ),
  note: z.string().max(2000).optional(),
});

export type CaseStatusUpdateInput = z.infer<typeof caseStatusUpdateSchema>;

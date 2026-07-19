/**
 * @file Schema Zod per la validazione delle evidenze caricate.
 */

import { z } from 'zod';

/**
 * Schema di validazione per il caricamento di una evidenza.
 */
export const evidenceUploadSchema = z.object({
  type: z.enum(
    ['foto', 'video', 'audio', 'documento', 'comunicazione', 'ricevuta', 'altro'],
    { errorMap: () => ({ message: 'Tipo evidenza non valido' }) },
  ),
  title: z
    .string()
    .min(1, 'Il titolo è obbligatorio')
    .max(200, 'Il titolo deve avere massimo 200 caratteri'),
  description: z
    .string()
    .max(5000, 'La descrizione deve avere massimo 5000 caratteri')
    .nullable()
    .optional(),
  case_id: z.string().uuid('ID caso non valido').nullable().optional(),
  fileBase64: z.string().min(1, 'File richiesto'),
  fileName: z
    .string()
    .min(1, 'Nome file richiesto')
    .max(255, 'Nome file troppo lungo'),
  mimeType: z
    .string()
    .min(1, 'MIME type richiesto'),
  gps_lat: z
    .number()
    .min(-90)
    .max(90)
    .nullable()
    .optional(),
  gps_lng: z
    .number()
    .min(-180)
    .max(180)
    .nullable()
    .optional(),
  client_side_encrypted: z.boolean().default(false),
  metadata: z.record(z.unknown()).nullable().optional(),
});

export type EvidenceUploadInput = z.infer<typeof evidenceUploadSchema>;

/**
 * Schema per l'aggiornamento dei metadati di una evidenza.
 */
export const evidenceUpdateSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().max(5000).nullable().optional(),
  metadata: z.record(z.unknown()).nullable().optional(),
});

export type EvidenceUpdateInput = z.infer<typeof evidenceUpdateSchema>;

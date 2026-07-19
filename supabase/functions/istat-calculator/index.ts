import { serve } from "std/http/server.ts";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";

// ───────────────────────────────────────────────
// Schema di validazione input
// ───────────────────────────────────────────────
const IstatRequestSchema = z.object({
  currentRent: z.number().positive("Il canone deve essere positivo"),
  contractStartDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato data ISO richiesto (YYYY-MM-DD)"),
  lastUpdateDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato data ISO richiesto (YYYY-MM-DD)").optional(),
  maxPercentage: z.number().min(0).max(100).optional().default(75),
  contractType: z.enum(["libero", "concordato", "transitorio"]).optional().default("libero"),
});

type IstatRequest = z.infer<typeof IstatRequestSchema>;

// ───────────────────────────────────────────────
// Interfacce risposta
// ───────────────────────────────────────────────
interface IstatRecord {
  year: number;
  month: number;
  index: number;
  variation_annual: number;
  source: string;
}

interface IstatResponse {
  allowedIncreasePercent: number;
  allowedIncreaseAmount: number;
  newRentAmount: number;
  istatVariation: number;
  applicablePercentage: number;
  calculationDate: string;
  legalReferences: string[];
  istatRecordsUsed: { start: IstatRecord | null; end: IstatRecord | null };
}

// ───────────────────────────────────────────────
// Dati ISTAT FOI di esempio (aggiornati a luglio 2026)
// In produzione: sostituire con chiamata API ISTAT
// ───────────────────────────────────────────────
const FOI_SAMPLE_DATA: IstatRecord[] = [
  { year: 2023, month: 1, index: 116.9, variation_annual: 8.7, source: "ISTAT FOI" },
  { year: 2023, month: 2, index: 117.4, variation_annual: 8.5, source: "ISTAT FOI" },
  { year: 2023, month: 3, index: 117.6, variation_annual: 8.2, source: "ISTAT FOI" },
  { year: 2023, month: 4, index: 117.8, variation_annual: 7.9, source: "ISTAT FOI" },
  { year: 2023, month: 5, index: 118.1, variation_annual: 7.6, source: "ISTAT FOI" },
  { year: 2023, month: 6, index: 118.0, variation_annual: 7.3, source: "ISTAT FOI" },
  { year: 2023, month: 7, index: 118.3, variation_annual: 7.1, source: "ISTAT FOI" },
  { year: 2023, month: 8, index: 118.5, variation_annual: 6.9, source: "ISTAT FOI" },
  { year: 2023, month: 9, index: 118.2, variation_annual: 6.7, source: "ISTAT FOI" },
  { year: 2023, month: 10, index: 118.6, variation_annual: 6.5, source: "ISTAT FOI" },
  { year: 2023, month: 11, index: 118.4, variation_annual: 6.3, source: "ISTAT FOI" },
  { year: 2023, month: 12, index: 118.8, variation_annual: 6.1, source: "ISTAT FOI" },
  { year: 2024, month: 1, index: 119.2, variation_annual: 2.0, source: "ISTAT FOI" },
  { year: 2024, month: 2, index: 119.5, variation_annual: 1.8, source: "ISTAT FOI" },
  { year: 2024, month: 3, index: 119.3, variation_annual: 1.4, source: "ISTAT FOI" },
  { year: 2024, month: 4, index: 119.6, variation_annual: 1.5, source: "ISTAT FOI" },
  { year: 2024, month: 5, index: 119.8, variation_annual: 1.4, source: "ISTAT FOI" },
  { year: 2024, month: 6, index: 120.0, variation_annual: 1.7, source: "ISTAT FOI" },
  { year: 2024, month: 7, index: 120.3, variation_annual: 1.7, source: "ISTAT FOI" },
  { year: 2024, month: 8, index: 120.5, variation_annual: 1.7, source: "ISTAT FOI" },
  { year: 2024, month: 9, index: 120.1, variation_annual: 1.6, source: "ISTAT FOI" },
  { year: 2024, month: 10, index: 120.4, variation_annual: 1.5, source: "ISTAT FOI" },
  { year: 2024, month: 11, index: 120.2, variation_annual: 1.5, source: "ISTAT FOI" },
  { year: 2024, month: 12, index: 120.6, variation_annual: 1.5, source: "ISTAT FOI" },
  { year: 2025, month: 1, index: 121.0, variation_annual: 1.5, source: "ISTAT FOI" },
  { year: 2025, month: 2, index: 121.3, variation_annual: 1.5, source: "ISTAT FOI" },
  { year: 2025, month: 3, index: 121.1, variation_annual: 1.5, source: "ISTAT FOI" },
  { year: 2025, month: 4, index: 121.5, variation_annual: 1.6, source: "ISTAT FOI" },
  { year: 2025, month: 5, index: 121.8, variation_annual: 1.7, source: "ISTAT FOI" },
  { year: 2025, month: 6, index: 121.6, variation_annual: 1.3, source: "ISTAT FOI" },
  { year: 2025, month: 7, index: 122.0, variation_annual: 1.4, source: "ISTAT FOI" },
  { year: 2025, month: 8, index: 122.3, variation_annual: 1.5, source: "ISTAT FOI" },
  { year: 2025, month: 9, index: 121.9, variation_annual: 1.5, source: "ISTAT FOI" },
  { year: 2025, month: 10, index: 122.2, variation_annual: 1.5, source: "ISTAT FOI" },
  { year: 2025, month: 11, index: 122.0, variation_annual: 1.5, source: "ISTAT FOI" },
  { year: 2025, month: 12, index: 122.5, variation_annual: 1.6, source: "ISTAT FOI" },
  { year: 2026, month: 1, index: 122.9, variation_annual: 1.6, source: "ISTAT FOI" },
  { year: 2026, month: 2, index: 123.2, variation_annual: 1.6, source: "ISTAT FOI" },
  { year: 2026, month: 3, index: 123.0, variation_annual: 1.6, source: "ISTAT FOI" },
  { year: 2026, month: 4, index: 123.4, variation_annual: 1.6, source: "ISTAT FOI" },
  { year: 2026, month: 5, index: 123.7, variation_annual: 1.6, source: "ISTAT FOI" },
  { year: 2026, month: 6, index: 123.5, variation_annual: 1.6, source: "ISTAT FOI" },
  { year: 2026, month: 7, index: 123.9, variation_annual: 1.6, source: "ISTAT FOI" },
];

// ───────────────────────────────────────────────
// Riferimenti normativi per tipo contratto
// ───────────────────────────────────────────────
function getLegalReferences(contractType: string): string[] {
  const base = [
    "Legge 9 dicembre 1998, n. 431 - Art. 4 (Aggiornamento ISTAT canoni)",
    "Art. 32 Legge n. 392/1978 (Equo canone - applicabile ai contratti precedenti)",
  ];
  if (contractType === "concordato") {
    base.push("Art. 2, comma 3, Legge n. 431/1998 (Canone concordato)");
    base.push("Accordo Territoriale locale di riferimento");
    base.push("DPR 30 dicembre 1999, n. 551 (Regolamento canone concordato)");
  } else if (contractType === "transitorio") {
    base.push("Art. 5, comma 1, Legge n. 431/1998 (Contratti transitori)");
    base.push("DM 30 dicembre 2002 (Contratti di locazione transitori)");
  }
  base.push("Delibera ISTAT FOI (indice nazionale prezzi al consumo per famiglie operai e impiegati)");
  return base;
}

// ───────────────────────────────────────────────
// Cache helper: cerca indice ISTAT per mese/anno
// ───────────────────────────────────────────────
function findIstatRecord(year: number, month: number): IstatRecord | null {
  return FOI_SAMPLE_DATA.find((r) => r.year === year && r.month === month) ?? null;
}

function findClosestRecord(year: number, month: number): IstatRecord | null {
  // Cerca il record più vicino (stesso mese o mese precedente)
  const exact = findIstatRecord(year, month);
  if (exact) return exact;

  // Cerca mese precedente
  const prevMonth = month === 1 ? 12 : month - 1;
  const prevYear = month === 1 ? year - 1 : year;
  const prev = findIstatRecord(prevYear, prevMonth);
  if (prev) return prev;

  // Primo record disponibile
  return FOI_SAMPLE_DATA.length > 0 ? FOI_SAMPLE_DATA[0] : null;
}

// ───────────────────────────────────────────────
// Calcolo principale
// ───────────────────────────────────────────────
function calculateIstatUpdate(req: IstatRequest): IstatResponse {
  const startDate = new Date(req.contractStartDate);
  const lastUpdate = req.lastUpdateDate ? new Date(req.lastUpdateDate) : startDate;
  const now = new Date();

  const startRecord = findClosestRecord(startDate.getFullYear(), startDate.getMonth() + 1);
  const endRecord = findClosestRecord(now.getFullYear(), now.getMonth() + 1);

  if (!startRecord || !endRecord) {
    throw new Error("Impossibile trovare dati ISTAT per il periodo richiesto");
  }

  // Variazione ISTAT grezza
  const istatVariation = ((endRecord.index - startRecord.index) / startRecord.index) * 100;

  // Percentuale applicabile in base al tipo contratto
  let applicablePercentage: number;
  if (req.contractType === "concordato") {
    // Contratti concordati: il limite è stabilito dall'accordo territoriale
    // Di default si usa il 75% salvo diversa indicazione
    applicablePercentage = req.maxPercentage;
  } else if (req.contractType === "transitorio") {
    // Contratti transitori: 100% se previsto dal contratto, altrimenti 75%
    applicablePercentage = req.maxPercentage;
  } else {
    // Contratti liberi: 75% come da L.431/1998
    applicablePercentage = req.maxPercentage;
  }

  const allowedIncreasePercent = (istatVariation * applicablePercentage) / 100;
  const allowedIncreaseAmount = (req.currentRent * allowedIncreasePercent) / 100;
  const newRentAmount = req.currentRent + allowedIncreaseAmount;

  return {
    allowedIncreasePercent: Math.round(allowedIncreasePercent * 100) / 100,
    allowedIncreaseAmount: Math.round(allowedIncreaseAmount * 100) / 100,
    newRentAmount: Math.round(newRentAmount * 100) / 100,
    istatVariation: Math.round(istatVariation * 100) / 100,
    applicablePercentage: applicablePercentage,
    calculationDate: now.toISOString().split("T")[0],
    legalReferences: getLegalReferences(req.contractType),
    istatRecordsUsed: { start: startRecord, end: endRecord },
  };
}

// ───────────────────────────────────────────────
// CORS headers
// ───────────────────────────────────────────────
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Max-Age": "86400",
};

// ───────────────────────────────────────────────
// Handler principale
// ───────────────────────────────────────────────
serve(async (req: Request) => {
  // Gestione preflight CORS
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Metodo non consentito. Usa POST." }),
      {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }

  try {
    const body: unknown = await req.json();

    // Validazione input con Zod
    const parsed = IstatRequestSchema.safeParse(body);
    if (!parsed.success) {
      const errors = parsed.error.issues.map((i) => ({
        field: i.path.join("."),
        message: i.message,
      }));
      return new Response(
        JSON.stringify({ error: "Dati di input non validi", details: errors }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const result = calculateIstatUpdate(parsed.data);

    return new Response(
      JSON.stringify({ success: true, data: result }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Errore sconosciuto";
    return new Response(
      JSON.stringify({ error: "Errore nel calcolo ISTAT", details: message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});

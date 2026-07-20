/**
 * PEC Send Edge Function
 * Invia diffide e documenti legali via PEC (Posta Elettronica Certificata)
 * Gateway supportati: Namirial API, Aruba PEC API
 *
 * Endpoint: POST /pec-send
 */

import { serve } from "std/http/server.ts";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";

// ───────────────────────────────────────────────
// Schema di validazione
// ───────────────────────────────────────────────
const PecSendSchema = z.object({
  to: z.string().email("Indirizzo PEC destinatario non valido"),
  subject: z.string().min(3, "Oggetto troppo corto").max(200),
  bodyHtml: z.string().min(10, "Corpo del messaggio troppo corto"),
  attachments: z
    .array(
      z.object({
        fileName: z.string().min(1),
        contentType: z.string().default("application/pdf"),
        base64: z.string().min(1, "Allegato in base64 obbligatorio"),
      })
    )
    .optional()
    .default([]),
  metadata: z
    .object({
      caseId: z.string().uuid().optional(),
      templateType: z.string().optional(),
      userId: z.string().uuid().optional(),
    })
    .optional()
    .default({}),
});

type PecSendRequest = z.infer<typeof PecSendSchema>;

// ───────────────────────────────────────────────
// Interfacce risposta
// ───────────────────────────────────────────────
interface PecSendResponse {
  success: boolean;
  pecMessageId?: string;
  pecTimestamp?: string;
  receiptType?: "completa" | "semplice";
  deliveryStatus?: string;
  error?: string;
}

// ───────────────────────────────────────────────
// CORS headers
// ───────────────────────────────────────────────
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Max-Age": "86400",
};

// ───────────────────────────────────────────────
// Gateway PEC — Namirial
// ───────────────────────────────────────────────
async function sendViaNamirial(
  req: PecSendRequest,
  config: { apiKey: string; from: string }
): Promise<PecSendResponse> {
  const NAMIRIAL_API = "https://api.namirial.com/v1/pec/send";

  const payload = {
    from: config.from,
    to: [req.to],
    subject: req.subject,
    body: {
      html: req.bodyHtml,
    },
    attachments: req.attachments.map((a) => ({
      filename: a.fileName,
      content_type: a.contentType,
      content: a.base64,
    })),
    receipt: "completa",
  };

  const resp = await fetch(NAMIRIAL_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": config.apiKey,
    },
    body: JSON.stringify(payload),
  });

  if (!resp.ok) {
    const errBody = await resp.text();
    throw new Error(`Namirial API error ${resp.status}: ${errBody}`);
  }

  const data = await resp.json();
  return {
    success: true,
    pecMessageId: data.message_id,
    pecTimestamp: data.timestamp,
    receiptType: data.receipt_type ?? "completa",
    deliveryStatus: data.status ?? "inviato",
  };
}

// ───────────────────────────────────────────────
// Gateway PEC — Aruba
// ───────────────────────────────────────────────
async function sendViaAruba(
  req: PecSendRequest,
  config: { apiKey: string; from: string }
): Promise<PecSendResponse> {
  const ARUBA_API = "https://api.pec.aruba.it/v1/messages";

  const payload = {
    sender: config.from,
    recipients: [req.to],
    subject: req.subject,
    body_html: req.bodyHtml,
    attachments: req.attachments.map((a) => ({
      name: a.fileName,
      mime_type: a.contentType,
      data: a.base64,
    })),
    read_receipt: true,
  };

  const resp = await fetch(ARUBA_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify(payload),
  });

  if (!resp.ok) {
    const errBody = await resp.text();
    throw new Error(`Aruba PEC API error ${resp.status}: ${errBody}`);
  }

  const data = await resp.json();
  return {
    success: true,
    pecMessageId: data.id,
    pecTimestamp: data.created_at,
    receiptType: data.receipt ?? "completa",
    deliveryStatus: data.status ?? "accodato",
  };
}

// ───────────────────────────────────────────────
// Salva storico invio PEC su database
// ───────────────────────────────────────────────
async function savePecRecord(
  supabase: ReturnType<typeof createClient>,
  req: PecSendRequest,
  response: PecSendResponse
): Promise<void> {
  const { error } = await supabase.from("pec_history").insert({
    to_address: req.to,
    subject: req.subject,
    message_id: response.pecMessageId,
    sent_at: response.pecTimestamp ?? new Date().toISOString(),
    status: response.deliveryStatus ?? "inviato",
    metadata: req.metadata,
    attachments_count: req.attachments.length,
  });

  if (error) {
    console.error("Errore salvataggio storico PEC:", error.message);
  }
}

// ───────────────────────────────────────────────
// Handler principale
// ───────────────────────────────────────────────
serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Metodo non consentito. Usa POST." }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    const body: unknown = await req.json();
    const parsed = PecSendSchema.safeParse(body);

    if (!parsed.success) {
      return new Response(
        JSON.stringify({
          error: "Dati PEC non validi",
          details: parsed.error.issues.map((i) => ({
            field: i.path.join("."),
            message: i.message,
          })),
        }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Leggi configurazione gateway dall'ambiente
    const pecGateway = Deno.env.get("PEC_GATEWAY") ?? "namirial";
    const pecApiKey = Deno.env.get("PEC_API_KEY") ?? "";
    const pecFrom = Deno.env.get("PEC_FROM_ADDRESS") ?? "";

    if (!pecApiKey || !pecFrom) {
      return new Response(
        JSON.stringify({
          error: "Configurazione PEC mancante. Imposta PEC_API_KEY e PEC_FROM_ADDRESS.",
        }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Seleziona gateway
    let result: PecSendResponse;
    if (pecGateway === "aruba") {
      result = await sendViaAruba(parsed.data, { apiKey: pecApiKey, from: pecFrom });
    } else {
      result = await sendViaNamirial(parsed.data, { apiKey: pecApiKey, from: pecFrom });
    }

    // Salva storico (non bloccante)
    try {
      const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
      const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
      if (supabaseUrl && supabaseKey) {
        const supabase = createClient(supabaseUrl, supabaseKey);
        await savePecRecord(supabase, parsed.data, result);
      }
    } catch (saveErr) {
      console.warn("Avviso: storico PEC non salvato:", saveErr);
    }

    return new Response(JSON.stringify({ success: true, data: result }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Errore sconosciuto";
    return new Response(
      JSON.stringify({ error: "Errore invio PEC", details: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

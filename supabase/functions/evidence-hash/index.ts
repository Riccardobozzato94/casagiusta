import { serve } from "std/http/server.ts";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";

// ───────────────────────────────────────────────
// Schema creazione prova
// ───────────────────────────────────────────────
const CreateEvidenceSchema = z.object({
  fileBase64: z.string().min(1, "File in base64 obbligatorio"),
  fileName: z.string().min(1, "Nome file obbligatorio"),
  mimeType: z.string().optional().default("application/octet-stream"),
  metadata: z.object({
    description: z.string().optional(),
    caseId: z.string().uuid().optional(),
    contractId: z.string().uuid().optional(),
    source: z.enum(["upload", "ocr", "photo", "recording", "email"]).optional().default("upload"),
    notes: z.string().optional(),
  }).optional().default({}),
  blockchainTimestamp: z.boolean().optional().default(false),
});

// ───────────────────────────────────────────────
// Schema verifica
// ───────────────────────────────────────────────
const VerifyEvidenceSchema = z.object({
  id: z.string().uuid("ID prova non valido"),
  fileBase64: z.string().min(1, "File in base64 obbligatorio per verifica"),
});

// ───────────────────────────────────────────────
// Interfacce
// ───────────────────────────────────────────────
interface EvidenceRecord {
  id: string;
  hash_sha256: string;
  file_name: string;
  mime_type: string;
  file_size_bytes: number;
  metadata: Record<string, unknown>;
  server_timestamp: string;
  blockchain_timestamp?: string;
  blockchain_tx_id?: string;
  created_at: string;
  user_id?: string;
}

// ───────────────────────────────────────────────
// CORS headers
// ───────────────────────────────────────────────
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Max-Age": "86400",
};

// ───────────────────────────────────────────────
// Client Supabase
// ───────────────────────────────────────────────
function getSupabaseClient() {
  const url = Deno.env.get("SUPABASE_URL") ?? "";
  const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
  if (!url || !key) throw new Error("Credenziali Supabase mancanti");
  return createClient(url, key);
}

// ───────────────────────────────────────────────
// Calcola SHA-256 del file
// ───────────────────────────────────────────────
async function calculateSha256(base64Content: string): Promise<string> {
  const binaryStr = atob(base64Content);
  const bytes = new Uint8Array(binaryStr.length);
  for (let i = 0; i < binaryStr.length; i++) {
    bytes[i] = binaryStr.charCodeAt(i);
  }

  const hashBuffer = await crypto.subtle.digest("SHA-256", bytes);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

// ───────────────────────────────────────────────
// Integrazione OpenTimestamps (opzionale)
// ───────────────────────────────────────────────
async function createBlockchainTimestamp(
  hashHex: string,
): Promise<{ timestamp: string; txId: string } | null> {
  const otsEndpoint = Deno.env.get("OPENTIMESTAMPS_URL");
  if (!otsEndpoint) return null;

  try {
    const response = await fetch(otsEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hash: hashHex }),
    });

    if (!response.ok) return null;

    const result: { timestamp: string; txId: string } = await response.json();
    return result;
  } catch {
    console.warn("OpenTimestamps non disponibile, salto blockchain timestamp");
    return null;
  }
}

// ───────────────────────────────────────────────
// POST: Crea prova digitale
// ───────────────────────────────────────────────
async function handleCreateEvidence(body: unknown): Promise<Response> {
  const parsed = CreateEvidenceSchema.safeParse(body);
  if (!parsed.success) {
    const errors = parsed.error.issues.map((i) => ({
      field: i.path.join("."),
      message: i.message,
    }));
    return new Response(
      JSON.stringify({ error: "Dati prova non validi", details: errors }),
      {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }

  const { fileBase64, fileName, mimeType, metadata, blockchainTimestamp } = parsed.data;

  // Calcola hash
  const hash = await calculateSha256(fileBase64);

  // Dimensione file
  const fileSize = Math.round((fileBase64.length * 3) / 4); // Approssimazione

  const supabase = getSupabaseClient();

  // Ottieni user ID dal token di autenticazione (se presente)
  // In produzione: estrarre da req.headers.get("Authorization")
  const userId = null; // Verrà popolato dal middleware auth

  // Crea record su DB
  const record: Omit<EvidenceRecord, "id" | "created_at"> = {
    hash_sha256: hash,
    file_name: fileName,
    mime_type: mimeType,
    file_size_bytes: fileSize,
    metadata: metadata as Record<string, unknown>,
    server_timestamp: new Date().toISOString(),
    user_id: userId ?? undefined,
  };

  const { data, error } = await supabase
    .from("evidence")
    .insert(record)
    .select()
    .single();

  if (error) {
    throw new Error(`Errore salvataggio prova: ${error.message}`);
  }

  // Blockchain timestamp opzionale
  if (blockchainTimestamp && data) {
    const ots = await createBlockchainTimestamp(hash);
    if (ots) {
      await supabase
        .from("evidence")
        .update({
          blockchain_timestamp: ots.timestamp,
          blockchain_tx_id: ots.txId,
        })
        .eq("id", data.id);
      data.blockchain_timestamp = ots.timestamp;
      data.blockchain_tx_id = ots.txId;
    }
  }

  return new Response(
    JSON.stringify({
      success: true,
      data: {
        id: data.id,
        hash_sha256: hash,
        file_name: fileName,
        file_size_bytes: fileSize,
        server_timestamp: record.server_timestamp,
        blockchain_timestamp: data.blockchain_timestamp ?? null,
        blockchain_tx_id: data.blockchain_tx_id ?? null,
      },
    }),
    {
      status: 201,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    },
  );
}

// ───────────────────────────────────────────────
// GET: Verifica integrità prova
// ───────────────────────────────────────────────
async function handleVerifyEvidence(
  id: string,
  body?: unknown,
): Promise<Response> {
  const supabase = getSupabaseClient();

  // Recupera record dal DB
  const { data, error } = await supabase
    .from("evidence")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    return new Response(
      JSON.stringify({ error: "Prova non trovata" }),
      {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }

  // Se c'è un file da verificare, confronta hash
  let integrityVerified = false;
  let computedHash = "";

  if (body) {
    const parsed = VerifyEvidenceSchema.safeParse(body);
    if (parsed.success) {
      computedHash = await calculateSha256(parsed.data.fileBase64);
      integrityVerified = computedHash === data.hash_sha256;
    }
  }

  return new Response(
    JSON.stringify({
      success: true,
      data: {
        id: data.id,
        file_name: data.file_name,
        mime_type: data.mime_type,
        file_size_bytes: data.file_size_bytes,
        hash_sha256_stored: data.hash_sha256,
        hash_sha256_computed: computedHash || undefined,
        integrity_verified: body ? integrityVerified : undefined,
        server_timestamp: data.server_timestamp,
        blockchain_timestamp: data.blockchain_timestamp ?? undefined,
        blockchain_tx_id: data.blockchain_tx_id ?? undefined,
        created_at: data.created_at,
        metadata: data.metadata,
      },
    }),
    {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    },
  );
}

// ───────────────────────────────────────────────
// Handler principale
// ───────────────────────────────────────────────
serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  try {
    const url = new URL(req.url);
    const pathParts = url.pathname.split("/").filter(Boolean);

    // POST /evidence-hash
    if (req.method === "POST") {
      const body: unknown = await req.json();
      return await handleCreateEvidence(body);
    }

    // GET /evidence-hash/:id
    if (req.method === "GET") {
      // Cerca ID nel path: /evidence-hash/123e4567...
      const idIndex = pathParts.indexOf("evidence-hash") + 1;
      const id = pathParts[idIndex] || url.searchParams.get("id");

      if (!id) {
        return new Response(
          JSON.stringify({ error: "ID prova richiesto. Usa /evidence-hash/:id o ?id=..." }),
          {
            status: 400,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      }

      const body = req.method === "POST" ? await req.json() : undefined;
      return await handleVerifyEvidence(id, body);
    }

    return new Response(
      JSON.stringify({
        error: "Metodo non consentito. Usa POST per creare, GET per verificare.",
      }),
      {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Errore sconosciuto";
    return new Response(
      JSON.stringify({ error: "Errore nell'elaborazione della prova", details: message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});

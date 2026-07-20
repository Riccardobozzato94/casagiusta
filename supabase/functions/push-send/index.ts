/**
 * Push Notification Sender Edge Function
 * Invia notifiche push tramite Expo Push Notifications API
 * 
 * Endpoint: POST /push-send
 * Usato da: backend per inviare notifiche a utenti specifici
 */

import { serve } from "std/http/server.ts";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";

// ───────────────────────────────────────────────
// Schema input
// ───────────────────────────────────────────────
const PushSendSchema = z.object({
  userId: z.string().uuid("ID utente non valido"),
  title: z.string().min(1).max(100),
  body: z.string().min(1).max(500),
  data: z
    .object({
      type: z
        .enum(["caso", "ai_risposta", "community", "promemoria", "sistema", "scadenza"])
        .optional(),
      screen: z.string().optional(),
      caseId: z.string().uuid().optional(),
      conversationId: z.string().uuid().optional(),
      url: z.string().optional(),
    })
    .optional()
    .default({}),
  priority: z.enum(["default", "high"]).optional().default("default"),
});

type PushSendRequest = z.infer<typeof PushSendSchema>;

// ───────────────────────────────────────────────
// Expo Push API
// ───────────────────────────────────────────────
const EXPO_PUSH_API = "https://exp.host/--/api/v2/push/send";

interface ExpoPushMessage {
  to: string;
  title: string;
  body: string;
  data?: Record<string, unknown>;
  priority?: "default" | "high";
  sound?: "default" | null;
  badge?: number;
  categoryId?: string;
}

interface ExpoPushResponse {
  data: { status: "ok" | "error"; message?: string; details?: unknown }[];
  errors?: unknown[];
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
// Recupera push token dal database
// ───────────────────────────────────────────────
async function getUserPushTokens(
  supabase: ReturnType<typeof createClient>,
  userId: string
): Promise<string[]> {
  // Cerca nella tabella profiles o users i push token
  const { data: user, error } = await supabase
    .from("users")
    .select("notification_push_token")
    .eq("id", userId)
    .single();

  if (error || !user) {
    console.error("Errore recupero token utente:", error?.message);
    return [];
  }

  return user.notification_push_token ?? [];
}

// ───────────────────────────────────────────────
// Salva notifica nella tabella notifications
// ───────────────────────────────────────────────
async function saveNotification(
  supabase: ReturnType<typeof createClient>,
  userId: string,
  req: PushSendRequest
): Promise<void> {
  const { error } = await supabase.from("notifications").insert({
    user_id: userId,
    type: req.data?.type ?? "sistema",
    title: req.title,
    body: req.body,
    data: req.data,
    read: false,
    created_at: new Date().toISOString(),
  });

  if (error) {
    console.warn("Errore salvataggio notifica DB:", error.message);
  }
}

// ───────────────────────────────────────────────
// Invia push tramite Expo
// ───────────────────────────────────────────────
async function sendExpoPush(
  tokens: string[],
  req: PushSendRequest
): Promise<{ success: boolean; results: ExpoPushResponse["data"] }> {
  if (tokens.length === 0) {
    return { success: false, results: [] };
  }

  const messages: ExpoPushMessage[] = tokens.map((token) => ({
    to: token,
    title: req.title,
    body: req.body,
    data: req.data as Record<string, unknown>,
    priority: req.priority,
    sound: "default",
    categoryId: req.data?.type ?? undefined,
  }));

  const resp = await fetch(EXPO_PUSH_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(messages),
  });

  if (!resp.ok) {
    const errText = await resp.text();
    throw new Error(`Expo Push API error ${resp.status}: ${errText}`);
  }

  const result: ExpoPushResponse = await resp.json();

  // Verifica errori individuali
  const errors = result.data.filter((d) => d.status === "error");
  if (errors.length > 0) {
    console.warn(
      `[Push] ${errors.length}/${tokens.length} invii falliti:`,
      errors.map((e) => e.message).join(", ")
    );
  }

  return {
    success: errors.length === 0,
    results: result.data,
  };
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
      {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }

  try {
    const body: unknown = await req.json();
    const parsed = PushSendSchema.safeParse(body);

    if (!parsed.success) {
      return new Response(
        JSON.stringify({
          error: "Dati notifica non validi",
          details: parsed.error.issues.map((i) => ({
            field: i.path.join("."),
            message: i.message,
          })),
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Client Supabase
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Credenziali Supabase mancanti");
    }
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Recupera token push dell'utente
    const tokens = await getUserPushTokens(supabase, parsed.data.userId);

    if (tokens.length === 0) {
      // Salva notifica anche senza push (verrà letta in-app)
      await saveNotification(supabase, parsed.data.userId, parsed.data);
      return new Response(
        JSON.stringify({
          success: true,
          data: {
            push_sent: false,
            push_tokens: 0,
            reason: "Nessun token push registrato. Notifica salvata in-app.",
          },
        }),
        {
          status: 200,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Invia push
    const pushResult = await sendExpoPush(tokens, parsed.data);

    // Salva notifica nel database
    await saveNotification(supabase, parsed.data.userId, parsed.data);

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          push_sent: true,
          push_tokens: tokens.length,
          push_results: pushResult.results,
        },
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Errore sconosciuto";
    return new Response(
      JSON.stringify({ error: "Errore invio notifica push", details: message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

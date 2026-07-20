import { serve } from "std/http/server.ts";
import { createClient } from "@supabase/supabase-js";

interface WaitlistPayload {
  email: string;
  source?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  locale?: string;
}

serve(async (req: Request) => {
  // CORS per richieste cross-origin dalla landing page
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const body: WaitlistPayload = await req.json();

    // Validazione base
    if (!body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return new Response(JSON.stringify({ error: "Email non valida" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Crea client Supabase con Service Role Key per bypassare RLS
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

    if (!supabaseUrl || !supabaseKey) {
      console.error("SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY non configurati");
      return new Response(JSON.stringify({ error: "Configurazione server mancante" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Upsert waitlist
    const { data, error } = await supabase.rpc("upsert_waitlist", {
      p_email: body.email.toLowerCase().trim(),
      p_source: body.source ?? "landing-page",
      p_utm_source: body.utm_source ?? null,
      p_utm_medium: body.utm_medium ?? null,
      p_utm_campaign: body.utm_campaign ?? null,
      p_locale: body.locale ?? "it",
    });

    if (error) {
      console.error("Errore upsert waitlist:", error);
      return new Response(JSON.stringify({ error: "Errore interno" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: data?.created ? "Iscrizione confermata!" : "Gi\u00e0 iscritto!",
        id: data?.id,
        created: data?.created ?? false,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("Errore waitlist-join:", err);
    return new Response(JSON.stringify({ error: "Richiesta non valida" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

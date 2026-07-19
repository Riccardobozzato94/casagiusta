import { serve } from "std/http/server.ts";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";

// ───────────────────────────────────────────────
// Schema parametri ricerca
// ───────────────────────────────────────────────
const SearchParamsSchema = z.object({
  city: z.string().optional(),
  region: z.string().optional(),
  specialty: z.string().optional(),
  rating_min: z.coerce.number().min(0).max(5).optional(),
  pro_bono: z.coerce.boolean().optional(),
  name: z.string().optional(),
  verified_only: z.coerce.boolean().optional().default(true),
  offset: z.coerce.number().int().min(0).optional().default(0),
  limit: z.coerce.number().int().min(1).max(50).optional().default(20),
  sort_by: z.enum(["rating", "name", "city", "experience_years"]).optional().default("rating"),
  sort_order: z.enum(["asc", "desc"]).optional().default("desc"),
});

type SearchParams = z.infer<typeof SearchParamsSchema>;

// ───────────────────────────────────────────────
// Interfaccia risposta
// ───────────────────────────────────────────────
interface LawyerResult {
  id: string;
  name: string;
  surname: string;
  firm_name?: string;
  city: string;
  region: string;
  address: string;
  specialties: string[];
  rating: number;
  review_count: number;
  experience_years: number;
  pro_bono_available: boolean;
  verified: boolean;
  languages: string[];
  photo_url?: string;
  phone?: string;
  email?: string;
  website?: string;
}

// ───────────────────────────────────────────────
// CORS headers
// ───────────────────────────────────────────────
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Max-Age": "86400",
};

// ───────────────────────────────────────────────
// Client Supabase
// ───────────────────────────────────────────────
function getSupabaseClient() {
  const url = Deno.env.get("SUPABASE_URL") ?? "";
  const key = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
  if (!url || !key) throw new Error("Credenziali Supabase mancanti");
  return createClient(url, key);
}

// ───────────────────────────────────────────────
// Costruisce query dinamica
// ───────────────────────────────────────────────
function buildQuery(
  supabase: ReturnType<typeof createClient>,
  params: SearchParams,
) {
  let query = supabase
    .from("lawyers")
    .select("*", { count: "exact" });

  // Filtro città (case-insensitive, match parziale)
  if (params.city) {
    query = query.ilike("city", `%${params.city}%`);
  }

  // Filtro regione
  if (params.region) {
    query = query.ilike("region", `%${params.region}%`);
  }

  // Filtro specializzazione (array match - contains)
  if (params.specialty) {
    query = query.contains("specialties", [params.specialty]);
  }

  // Filtro rating minimo
  if (params.rating_min !== undefined) {
    query = query.gte("rating", params.rating_min);
  }

  // Filtro pro-bono
  if (params.pro_bono !== undefined) {
    query = query.eq("pro_bono_available", params.pro_bono);
  }

  // Filtro nome avvocato
  if (params.name) {
    query = query.or(
      `name.ilike.%${params.name}%,surname.ilike.%${params.name}%`,
    );
  }

  // Filtro solo verificati
  if (params.verified_only) {
    query = query.eq("verified", true);
  }

  // Ordinamento
  const sortColumn = params.sort_by ?? "rating";
  const sortDir = params.sort_order === "asc" ? { ascending: true } : { ascending: false };
  query = query.order(sortColumn, sortDir);

  // Paginazione
  query = query.range(params.offset, params.offset + params.limit - 1);

  return query;
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

  if (req.method !== "GET") {
    return new Response(
      JSON.stringify({ error: "Metodo non consentito. Usa GET." }),
      {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }

  try {
    const url = new URL(req.url);
    const rawParams: Record<string, string> = {};
    for (const [key, value] of url.searchParams.entries()) {
      rawParams[key] = value;
    }

    // Validazione parametri
    const parsed = SearchParamsSchema.safeParse(rawParams);
    if (!parsed.success) {
      const errors = parsed.error.issues.map((i) => ({
        field: i.path.join("."),
        message: i.message,
      }));
      return new Response(
        JSON.stringify({ error: "Parametri di ricerca non validi", details: errors }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const supabase = getSupabaseClient();
    const query = buildQuery(supabase, parsed.data);

    const { data: lawyers, error, count } = await query;

    if (error) {
      throw new Error(`Errore ricerca avvocati: ${error.message}`);
    }

    // Paginazione info
    const total = count ?? 0;
    const returned = lawyers?.length ?? 0;
    const hasMore = (parsed.data.offset + returned) < total;

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          results: lawyers as LawyerResult[],
          pagination: {
            total,
            offset: parsed.data.offset,
            limit: parsed.data.limit,
            returned,
            has_more: hasMore,
            next_offset: hasMore ? parsed.data.offset + parsed.data.limit : null,
          },
          filters_applied: {
            city: parsed.data.city ?? null,
            region: parsed.data.region ?? null,
            specialty: parsed.data.specialty ?? null,
            rating_min: parsed.data.rating_min ?? null,
            pro_bono: parsed.data.pro_bono ?? null,
            verified_only: parsed.data.verified_only,
          },
        },
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Errore sconosciuto";
    return new Response(
      JSON.stringify({ error: "Errore nella ricerca avvocati", details: message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});

import { serve } from "std/http/server.ts";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";

// ───────────────────────────────────────────────
// Schema di validazione webhook OCR
// ───────────────────────────────────────────────
const OcrWebhookSchema = z.object({
  contractId: z.string().uuid("ID contratto non valido"),
  rawText: z.string().min(1, "Testo estratto obbligatorio"),
  source: z.enum(["google_cloud_vision", "upload", "mobile"]).optional().default("google_cloud_vision"),
  metadata: z.object({
    confidence: z.number().min(0).max(1).optional(),
    language: z.string().optional(),
    pageCount: z.number().int().positive().optional(),
    processingTimeMs: z.number().positive().optional(),
  }).optional().default({}),
  notifyUser: z.boolean().optional().default(true),
});

type OcrWebhookPayload = z.infer<typeof OcrWebhookSchema>;

// ───────────────────────────────────────────────
// Interfacce
// ───────────────────────────────────────────────
interface AiAnalysisResult {
  clauses: AnalyzedClause[];
  summary: string;
  riskScore: number;
  recommendations: string[];
  modelUsed: string;
  analyzedAt: string;
}

interface AnalyzedClause {
  text: string;
  type: "vessatoria" | "legittima" | "nulla" | "da_verificare";
  articleReference?: string;
  severity: "alta" | "media" | "bassa";
  explanation: string;
}

// ───────────────────────────────────────────────
// CORS headers
// ───────────────────────────────────────────────
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Google-Event-Type",
  "Access-Control-Max-Age": "86400",
};

// ───────────────────────────────────────────────
// Crea client Supabase
// ───────────────────────────────────────────────
function getSupabaseClient() {
  const url = Deno.env.get("SUPABASE_URL") ?? "";
  const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
  if (!url || !key) throw new Error("Credenziali Supabase mancanti");
  return createClient(url, key);
}

// ───────────────────────────────────────────────
// Analisi clausole vessatorie via AI
// Usa l'AI orchestrator interno o direttamente Claude/OpenAI
// ───────────────────────────────────────────────
async function analyzeContractClauses(
  rawText: string,
  contractId: string,
): Promise<AiAnalysisResult> {
  const aiEndpoint = Deno.env.get("AI_ORCHESTRATOR_URL") ??
    `${Deno.env.get("SUPABASE_URL")}/functions/v1/ai-orchestrator`;

  const aiKey = Deno.env.get("SUPABASE_ANON_KEY") ?? "";

  try {
    const response = await fetch(aiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${aiKey}`,
      },
      body: JSON.stringify({
        task: "analyze_clauses",
        contractId,
        text: rawText,
      }),
    });

    if (!response.ok) {
      throw new Error(`AI orchestrator ha risposto con status ${response.status}`);
    }

    const result: { success: boolean; data: AiAnalysisResult } = await response.json();

    if (!result.success || !result.data) {
      throw new Error("AI orchestrator non ha prodotto risultati validi");
    }

    return result.data;
  } catch (err) {
    // Fallback: analisi base senza AI
    console.warn(`AI orchestrator non disponibile (${err}), uso analisi base`);
    return basicClauseAnalysis(rawText);
  }
}

// ───────────────────────────────────────────────
// Analisi base (fallback senza AI)
// ───────────────────────────────────────────────
function basicClauseAnalysis(rawText: string): AiAnalysisResult {
  const clauses: AnalyzedClause[] = [];
  const lowerText = rawText.toLowerCase();

  const keywordPatterns: Array<{
    pattern: RegExp;
    type: AnalyzedClause["type"];
    severity: AnalyzedClause["severity"];
    article: string;
    explanation: string;
  }> = [
    {
      pattern: /rinuncia.*tutela|decadenza.*termine/i,
      type: "vessatoria",
      severity: "alta",
      article: "Art. 1341 c.c.",
      explanation: "Clausola di rinuncia a tutele legali: potrebbe essere nulla per violazione dell'art. 1341 c.c.",
    },
    {
      pattern: /foro competente|deroga.*foro/i,
      type: "vessatoria",
      severity: "alta",
      article: "Art. 1341 c.c., Art. 28 c.p.c.",
      explanation: "Deroga al foro competente: vessatoria se non specificamente approvata per iscritto.",
    },
    {
      pattern: /recesso.*anticipato|penale.*recesso/i,
      type: "vessatoria",
      severity: "media",
      article: "Art. 4 L. 392/1978",
      explanation: "Penale per recesso anticipato: verificare congruità rispetto al danno effettivo.",
    },
    {
      pattern: /deposito cauzionale.*superiore|caparra.*(?!confirmatoria)/i,
      type: "vessatoria",
      severity: "alta",
      article: "Art. 11 L. 392/1978",
      explanation: "Deposito cauzionale superiore a 3 mensilità: illegittimo per contratti abitativi.",
    },
    {
      pattern: /manutenzione straordinaria.*inquilino|a carico.*conduttore.*manutenzion/i,
      type: "vessatoria",
      severity: "alta",
      article: "Art. 1576 c.c., Art. 1609 c.c.",
      explanation: "Addebito manutenzione straordinaria all'inquilino: contraria all'art. 1576 c.c.",
    },
  ];

  for (const rule of keywordPatterns) {
    if (rule.pattern.test(lowerText)) {
      clauses.push({
        text: `Clausola che corrisponde al pattern: ${rule.pattern.source}`,
        type: rule.type,
        severity: rule.severity,
        articleReference: rule.article,
        explanation: rule.explanation,
      });
    }
  }

  return {
    clauses,
    summary: clauses.length > 0
      ? `Identificate ${clauses.length} clausole potenzialmente vessatorie. Revisione legale consigliata.`
      : "Nessuna clausola vessatoria evidente rilevata dall'analisi automatica base.",
    riskScore: clauses.length > 3 ? 0.8 : clauses.length > 0 ? 0.5 : 0.1,
    recommendations: clauses.length > 0
      ? ["Consultare un avvocato specializzato in locazioni", "Richiedere modifica delle clausole indicate"]
      : ["Il contratto non presenta clausole vessatorie evidenti"],
    modelUsed: "basic-keyword-fallback",
    analyzedAt: new Date().toISOString(),
  };
}

// ───────────────────────────────────────────────
// Notifica utente via Supabase (notifications table)
// ───────────────────────────────────────────────
async function notifyUser(
  supabase: ReturnType<typeof createClient>,
  userId: string,
  contractId: string,
  analysis: AiAnalysisResult,
): Promise<void> {
  const { error } = await supabase.from("notifications").insert({
    user_id: userId,
    type: "contract_analyzed",
    title: "Contratto analizzato",
    message: `Il contratto è stato analizzato. Rischio: ${Math.round(analysis.riskScore * 100)}%. ${analysis.clauses.length} clausole identificate.`,
    data: {
      contractId,
      riskScore: analysis.riskScore,
      clausesCount: analysis.clauses.length,
    },
    read: false,
    created_at: new Date().toISOString(),
  });

  if (error) {
    console.warn(`Errore notifica utente ${userId}: ${error.message}`);
  }
}

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

    // Validazione input
    const parsed = OcrWebhookSchema.safeParse(body);
    if (!parsed.success) {
      const errors = parsed.error.issues.map((i) => ({
        field: i.path.join("."),
        message: i.message,
      }));
      return new Response(
        JSON.stringify({ error: "Payload webhook non valido", details: errors }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const { contractId, rawText, metadata, notifyUser: shouldNotify } = parsed.data;
    const supabase = getSupabaseClient();

    // 1. Salva raw_text sul contratto
    const { error: updateError } = await supabase
      .from("contracts")
      .update({
        raw_text: rawText,
        ocr_metadata: {
          ...metadata,
          processed_at: new Date().toISOString(),
          source: parsed.data.source,
        },
        ocr_status: "completed",
      })
      .eq("id", contractId);

    if (updateError) {
      throw new Error(`Errore aggiornamento contratto: ${updateError.message}`);
    }

    // 2. Recupera user_id del proprietario del contratto
    const { data: contract, error: contractError } = await supabase
      .from("contracts")
      .select("user_id")
      .eq("id", contractId)
      .single();

    if (contractError) {
      throw new Error(`Contratto non trovato: ${contractError.message}`);
    }

    // 3. Chiama AI per analisi clausole vessatorie
    const analysis = await analyzeContractClauses(rawText, contractId);

    // 4. Aggiorna contratto con analisi AI
    const { error: analysisError } = await supabase
      .from("contracts")
      .update({
        ai_analysis: analysis,
        analysis_status: "completed",
        analyzed_at: new Date().toISOString(),
      })
      .eq("id", contractId);

    if (analysisError) {
      throw new Error(`Errore salvataggio analisi: ${analysisError.message}`);
    }

    // 5. Notifica utente
    if (shouldNotify) {
      await notifyUser(supabase, contract.user_id, contractId, analysis);
    }

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          contractId,
          status: "completed",
          clausesFound: analysis.clauses.length,
          riskScore: analysis.riskScore,
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
      JSON.stringify({ error: "Errore nel webhook OCR", details: message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});

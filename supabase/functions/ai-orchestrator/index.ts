import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.48.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const ANTHROPIC_API_KEY = Deno.env.get("ANTHROPIC_API_KEY") ?? "";
const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY") ?? "";
const OLLAMA_BASE_URL =
  Deno.env.get("OLLAMA_BASE_URL") ?? "http://localhost:11434";
const OLLAMA_MODEL = Deno.env.get("OLLAMA_MODEL") ?? "llama3";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SUPABASE_SERVICE_ROLE_KEY =
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const APP_NAME = Deno.env.get("APP_NAME") ?? "CasaGiusta";

const ANTHROPIC_API = "https://api.anthropic.com/v1/messages";
const ANTHROPIC_MODEL = "claude-sonnet-4-20250514";
const OPENAI_API = "https://api.openai.com/v1/chat/completions";
const OPENAI_MODEL = "gpt-4o-mini";

const MAX_RAG_RESULTS = 6;
const RAG_SIMILARITY_THRESHOLD = 0.72;
const MAX_HISTORY_TOKENS = 4000;
const MAX_RESPONSE_TOKENS = 2048;

const LEGAL_DISCLAIMER =
  "⚠️ Le informazioni fornite hanno scopo orientativo " +
  "e non costituiscono consulenza legale professionale. " +
  "Si raccomanda di consultare un avvocato per questioni specifiche.";

const SYSTEM_PROMPT = `Sei Giusta, l'assistente legale AI di ${APP_NAME}. \
Sei specializzata in diritto immobiliare, locazioni, condominio, contratti di affitto, \
e normative italiane (Codice Civile, Legge 392/1978, Legge 431/1998, riforme recenti). \
Rispondi in modo chiaro, preciso e strutturato, citando sempre le fonti normative. \
Usa un tono professionale ma accessibile. \
Se non conosci una risposta o mancano dati sufficienti, ammettilo e suggerisci di consultare un professionista.

${LEGAL_DISCLAIMER}`;

interface ChatRequest {
  messages: { role: "user" | "assistant"; content: string }[];
  context?: {
    userId?: string;
    caseId?: string;
    contractId?: string;
  };
  privacyMode?: boolean;
}

interface Citation {
  source: string;
  sourceReference: string;
  article?: string;
  text: string;
  relevance: number;
}

interface RagDocument {
  id: string;
  content: string;
  metadata: {
    source: string;
    source_reference: string;
    article?: string;
    category?: string;
  };
  similarity: number;
}

type AiProvider = "anthropic" | "openai" | "ollama";

function validateRequest(body: unknown): ChatRequest {
  if (!body || typeof body !== "object") {
    throw new Error("Richiesta non valida: body deve essere un oggetto JSON");
  }
  const req = body as Record<string, unknown>;
  if (!Array.isArray(req.messages) || req.messages.length === 0) {
    throw new Error("Richiesta non valida: 'messages' deve essere un array non vuoto");
  }
  for (const msg of req.messages) {
    if (
      typeof msg !== "object" ||
      !msg ||
      (msg as { role?: string }).role !== "user" &&
        (msg as { role?: string }).role !== "assistant" ||
      typeof (msg as { content?: string }).content !== "string"
    ) {
      throw new Error(
        "Richiesta non valida: ogni messaggio deve avere role ('user'|'assistant') e content (string)",
      );
    }
  }
  if (
    req.context !== undefined &&
    req.context !== null &&
    typeof req.context !== "object"
  ) {
    throw new Error("Richiesta non valida: 'context' deve essere un oggetto");
  }
  return {
    messages: req.messages as ChatRequest["messages"],
    context: req.context as ChatRequest["context"],
    privacyMode: req.privacyMode === true,
  };
}

async function queryRag(
  supabase: ReturnType<typeof createClient>,
  query: string,
  privacyMode: boolean,
): Promise<RagDocument[]> {
  if (privacyMode) return [];

  try {
    const embedding = await generateEmbedding(query);
    if (!embedding) return [];

    const { data, error } = await supabase.rpc("match_documents", {
      query_embedding: embedding,
      match_threshold: RAG_SIMILARITY_THRESHOLD,
      match_count: MAX_RAG_RESULTS,
    });

    if (error) {
      console.error(`[RAG] query error: ${error.message}`);
      return [];
    }

    return (data ?? []) as RagDocument[];
  } catch (err) {
    console.error(`[RAG] unexpected error: ${(err as Error).message}`);
    return [];
  }
}

async function generateEmbedding(text: string): Promise<number[] | null> {
  const resp = await fetch(`${SUPABASE_URL}/functions/v1/embed`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
    },
    body: JSON.stringify({ input: text }),
  });
  if (!resp.ok) {
    console.error(`[embed] status ${resp.status}`);
    return null;
  }
  const data = await resp.json();
  return data?.embedding ?? null;
}

function buildRagContext(docs: RagDocument[]): string {
  if (docs.length === 0) return "";
  const sections = docs.map((d, i) => {
    const meta = d.metadata;
    const src = meta.article
      ? `${meta.source}, art. ${meta.article}`
      : meta.source;
    return `[${i + 1}] Fonte: ${src} (${meta.source_reference})\n${d.content}`;
  });
  return `Documenti rilevanti:\n\n${sections.join("\n\n")}`;
}

function buildContextualInfo(context: ChatRequest["context"]): string {
  if (!context) return "";
  const parts: string[] = [];
  if (context.userId) parts.push(`Utente ID: ${context.userId}`);
  if (context.caseId) parts.push(`Pratica ID: ${context.caseId}`);
  if (context.contractId) parts.push(`Contratto ID: ${context.contractId}`);
  return parts.length > 0 ? `Contesto: ${parts.join(" | ")}` : "";
}

function buildFullPrompt(
  messages: ChatRequest["messages"],
  ragContext: string,
  contextualInfo: string,
): Array<{ role: string; content: string }> {
  const prompt = [
    { role: "system", content: SYSTEM_PROMPT },
  ];

  if (ragContext) {
    prompt.push({ role: "system", content: ragContext });
  }
  if (contextualInfo) {
    prompt.push({ role: "system", content: contextualInfo });
  }

  const lastMessages = messages.slice(-10);
  for (const m of lastMessages) {
    prompt.push({ role: m.role, content: m.content });
  }

  return prompt;
}

function extractCitations(docs: RagDocument[]): Citation[] {
  return docs.map((d) => ({
    source: d.metadata.source,
    sourceReference: d.metadata.source_reference,
    article: d.metadata.article,
    text: d.content.slice(0, 300),
    relevance: Math.round(d.similarity * 100) / 100,
  }));
}

function buildAnthropicTools() {
  return [
    {
      name: "calculate_istat",
      description:
        "Calcola l'aggiornamento ISTAT di un canone di locazione. " +
        "Usa l'indice FOI (indice nazionale dei prezzi al consumo per le famiglie di operai e impiegati).",
      input_schema: {
        type: "object",
        properties: {
          baseAmount: {
            type: "number",
            description: "Importo base del canone in euro",
          },
          fromYear: {
            type: "number",
            description: "Anno di riferimento del canone base",
          },
          fromMonth: {
            type: "number",
            description: "Mese di riferimento del canone base (1-12)",
          },
          toYear: {
            type: "number",
            description: "Anno di destinazione dell'aggiornamento",
          },
          toMonth: {
            type: "number",
            description: "Mese di destinazione dell'aggiornamento (1-12)",
          },
          percentage: {
            type: "number",
            description:
              "Percentuale di applicazione (default 75 per abitazioni, 100 per commerciali)",
            default: 75,
          },
        },
        required: ["baseAmount", "fromYear", "fromMonth", "toYear", "toMonth"],
      },
    },
    {
      name: "generate_template",
      description:
        "Genera un template di documento legale (raccomandata, disdetta, contratto, ecc.)",
      input_schema: {
        type: "object",
        properties: {
          templateType: {
            type: "string",
            description:
              "Tipo di template: disdetta_affitto, raccomandata_messa_in_mora, " +
              "richiesta_mediazione, contratto_locazione, verbale_assemblea, " +
              "diffida_adempimento, preavviso_rilascio",
          },
          parameters: {
            type: "object",
            description: "Parametri da inserire nel template",
            additionalProperties: { type: "string" },
          },
        },
        required: ["templateType", "parameters"],
      },
    },
    {
      name: "search_case_law",
      description:
        "Cerca giurisprudenza pertinente su una questione legale specifica",
      input_schema: {
        type: "object",
        properties: {
          query: {
            type: "string",
            description: "Descrizione della questione legale",
          },
          court: {
            type: "string",
            description:
              "Corte specifica (es. Cassazione, Tribunale Milano, TAR)",
            default: "Cassazione",
          },
          maxResults: {
            type: "number",
            description: "Numero massimo di risultati",
            default: 5,
          },
        },
        required: ["query"],
      },
    },
    {
      name: "find_local_support",
      description:
        "Trova sportelli di supporto legale o patronati vicini a un indirizzo",
      input_schema: {
        type: "object",
        properties: {
          address: {
            type: "string",
            description: "Indirizzo o città di riferimento",
          },
          serviceType: {
            type: "string",
            description:
              "Tipo di servizio: patronato, sindacato_inquilini, " +
              "avvocato_civile, mediazione, consulenza_gratuita",
            default: "patronato",
          },
          maxDistance: {
            type: "number",
            description: "Distanza massima in km",
            default: 20,
          },
        },
        required: ["address"],
      },
    },
  ];
}

async function callAnthropic(
  messages: Array<{ role: string; content: string }>,
  tools: ReturnType<typeof buildAnthropicTools>,
): Promise<{ content: string; toolCalls: any[] }> {
  const systemMessages = messages.filter((m) => m.role === "system");
  const conversationMessages = messages.filter((m) => m.role !== "system");

  const system = systemMessages.map((m) => m.content).join("\n\n");

  const body = {
    model: ANTHROPIC_MODEL,
    system,
    messages: conversationMessages.map((m) => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content: m.content,
    })),
    tools,
    max_tokens: MAX_RESPONSE_TOKENS,
  };

  const resp = await fetch(ANTHROPIC_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify(body),
  });

  if (!resp.ok) {
    const errBody = await resp.text();
    throw new Error(`Anthropic API error ${resp.status}: ${errBody}`);
  }

  const data = await resp.json();

  const inputTokens = data.usage?.input_tokens ?? 0;
  const outputTokens = data.usage?.output_tokens ?? 0;
  console.log(
    `[tokens] anthropic input=${inputTokens} output=${outputTokens} model=${ANTHROPIC_MODEL}`,
  );

  const toolCalls: any[] = [];
  let textContent = "";

  for (const block of data.content ?? []) {
    if (block.type === "text") {
      textContent += (block.text ?? "");
    } else if (block.type === "tool_use") {
      toolCalls.push(block);
    }
  }

  return { content: textContent, toolCalls };
}

async function callOpenAI(
  messages: Array<{ role: string; content: string }>,
  tools: ReturnType<typeof buildAnthropicTools>,
): Promise<{ content: string; toolCalls: any[] }> {
  const openaiTools = tools.map((t) => ({
    type: "function" as const,
    function: {
      name: t.name,
      description: t.description,
      parameters: t.input_schema,
    },
  }));

  const body = {
    model: OPENAI_MODEL,
    messages: messages.map((m) => ({
      role: m.role === "system" ? "system" : (m.role as "user" | "assistant"),
      content: m.content,
    })),
    tools: openaiTools,
    max_tokens: MAX_RESPONSE_TOKENS,
  };

  const resp = await fetch(OPENAI_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify(body),
  });

  if (!resp.ok) {
    const errBody = await resp.text();
    throw new Error(`OpenAI API error ${resp.status}: ${errBody}`);
  }

  const data = await resp.json();

  const usage = data.usage ?? {};
  console.log(
    `[tokens] openai input=${usage.prompt_tokens ?? 0} output=${usage.completion_tokens ?? 0} model=${OPENAI_MODEL}`,
  );

  const choice = data.choices?.[0];
  const toolCalls: any[] = [];
  let textContent = choice?.message?.content ?? "";

  for (const tc of choice?.message?.tool_calls ?? []) {
    toolCalls.push({
      id: tc.id,
      name: tc.function.name,
      input: JSON.parse(tc.function.arguments),
      type: "tool_use",
    });
  }

  return { content: textContent, toolCalls };
}

async function callOllama(
  messages: Array<{ role: string; content: string }>,
): Promise<string> {
  const body = {
    model: OLLAMA_MODEL,
    messages: messages.map((m) => ({
      role: m.role === "system" ? "system" : (m.role as "user" | "assistant"),
      content: m.content,
    })),
    stream: false,
    options: {
      num_predict: MAX_RESPONSE_TOKENS,
    },
  };

  const resp = await fetch(`${OLLAMA_BASE_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!resp.ok) {
    const errBody = await resp.text();
    throw new Error(`Ollama API error ${resp.status}: ${errBody}`);
  }

  const data = await resp.json();

  console.log(
    `[tokens] ollama model=${OLLAMA_MODEL} eval_count=${data.eval_count ?? 0}`,
  );

  return data.message?.content ?? "";
}

function selectProvider(privacyMode: boolean): AiProvider {
  if (privacyMode) return "ollama";
  if (ANTHROPIC_API_KEY) return "anthropic";
  if (OPENAI_API_KEY) return "openai";
  return "ollama";
}

async function executeTool(
  toolCall: any,
): Promise<{ toolCallId: string; output: string }> {
  const name = toolCall.name ?? toolCall.name;
  const input = toolCall.input ?? {};
  const id = toolCall.id ?? `tc_${crypto.randomUUID()}`;
  const startMsg = `[tool] executing ${name} id=${id}`;
  console.log(startMsg);

  try {
    let output: string;

    switch (name) {
      case "calculate_istat": {
        const { baseAmount, fromYear, fromMonth, toYear, toMonth, percentage } =
          input;
        const pct = percentage ?? 75;
        const monthlyRate = ((toYear - fromYear) * 12 + (toMonth - fromMonth)) /
          12;
        const estimatedIstat = 0.016 * monthlyRate;
        const adjustment = baseAmount * estimatedIstat * (pct / 100);
        const newAmount = baseAmount + adjustment;
        output = JSON.stringify({
          baseAmount,
          adjustedAmount: Math.round(newAmount * 100) / 100,
          istatIncrease: Math.round(adjustment * 100) / 100,
          appliedPercentage: pct,
          estimatedAnnualRate: "1.6% (stimato su storico recente)",
          note: "Valore stimato. Verificare l'indice FOI ufficiale ISTAT per il periodo esatto.",
        });
        break;
      }

      case "generate_template": {
        const { templateType, parameters } = input;
        output = JSON.stringify({
          templateType,
          parameters,
          downloadUrl:
            `${SUPABASE_URL}/functions/v1/template-generator?type=${templateType}`,
          previewAvailable: true,
          note:
            "Template generato. Verifica e personalizza prima dell'uso.",
        });
        break;
      }

      case "search_case_law": {
        const { query, court, maxResults } = input;
        output = JSON.stringify({
          query,
          court: court ?? "Cassazione",
          results: [],
          totalFound: 0,
          note:
            "Ricerca giurisprudenza avviata. I risultati dettagliati richiedono " +
            "integrazione con banca dati esterna (es. DeJure, OneLegale, ItalgiureWeb).",
        });
        break;
      }

      case "find_local_support": {
        const { address, serviceType, maxDistance } = input;
        output = JSON.stringify({
          address,
          serviceType: serviceType ?? "patronato",
          maxDistance: maxDistance ?? 20,
          results: [],
          note:
            "Ricerca sportelli avviata. Per risultati precisi è necessaria " +
            "integrazione con database geografico (es. OpenStreetMap, Google Places).",
        });
        break;
      }

      default:
        output = JSON.stringify({
          error: `Strumento sconosciuto: ${name}`,
        });
    }

    console.log(`[tool] completed ${name} id=${id}`);
    return { toolCallId: id, output };
  } catch (err) {
    const errMsg = `Errore durante l'esecuzione di ${name}: ${(err as Error).message}`;
    console.error(`[tool] error ${name} id=${id}: ${errMsg}`);
    return { toolCallId: id, output: JSON.stringify({ error: errMsg }) };
  }
}

async function handleToolCalls(
  toolCalls: any[],
  messages: Array<{ role: string; content: string }>,
): Promise<string> {
  const results = await Promise.all(toolCalls.map(executeTool));

  const toolResultMessages = results.map((r) => ({
    role: "user" as const,
    content: [
      {
        type: "tool_result",
        tool_use_id: r.toolCallId,
        content: r.output,
      },
    ],
  }));

  const provider = selectProvider(false);
  if (provider === "anthropic" && ANTHROPIC_API_KEY) {
    const lastUserMsg = { role: "user" as const, content: "..." };
    const continuationMessages = [
      ...messages.filter((m) => m.role !== "system"),
      lastUserMsg,
      ...toolResultMessages.map((tr) => ({
        role: tr.role as string,
        content: typeof tr.content === "string" ? tr.content : JSON.stringify(tr.content),
      })),
    ];

    const resp = await callAnthropic(
      [
        { role: "system", content: SYSTEM_PROMPT },
        ...continuationMessages.map((m) => ({
          role: "system",
          content: typeof m.content === "string" ? m.content : JSON.stringify(m.content),
        })),
      ],
      [],
    );
    return resp.content;
  }

  return results
    .map((r) => {
      const parsed = JSON.parse(r.output);
      return `**${r.toolCallId}**: ${JSON.stringify(parsed, null, 2)}`;
    })
    .join("\n\n");
}

async function handleRequest(req: Request): Promise<Response> {
  try {
    const body: unknown = await req.json();

    let validated: ChatRequest;
    try {
      validated = validateRequest(body);
    } catch (err) {
      return new Response(
        JSON.stringify({
          error: (err as Error).message,
          disclaimer: LEGAL_DISCLAIMER,
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        },
      );
    }

    const { messages, context, privacyMode } = validated;

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const lastUserMsg = [...messages]
      .reverse()
      .find((m) => m.role === "user");
    const query = lastUserMsg?.content ?? "";

    const ragDocs = await queryRag(supabase, query, privacyMode);
    const ragContext = buildRagContext(ragDocs);
    const contextualInfo = buildContextualInfo(context);
    const fullPrompt = buildFullPrompt(messages, ragContext, contextualInfo);
    const provider = selectProvider(privacyMode);

    console.log(
      `[request] provider=${provider} privacy=${privacyMode} messages=${messages.length} rag_docs=${ragDocs.length}`,
    );

    const tools = buildAnthropicTools();
    let responseText: string;
    let toolCalls: any[] = [];

    if (provider === "anthropic" && ANTHROPIC_API_KEY) {
      const result = await callAnthropic(fullPrompt, tools);
      responseText = result.content;
      toolCalls = result.toolCalls;
    } else if (provider === "openai" && OPENAI_API_KEY) {
      const result = await callOpenAI(fullPrompt, tools);
      responseText = result.content;
      toolCalls = result.toolCalls;
    } else {
      responseText = await callOllama(fullPrompt);
    }

    if (toolCalls.length > 0) {
      const toolResponse = await handleToolCalls(toolCalls, fullPrompt);
      responseText = responseText
        ? `${responseText}\n\n${toolResponse}`
        : toolResponse;
    }

    const citations = extractCitations(ragDocs);

    const responsePayload = {
      content: responseText,
      citations,
      provider,
      disclaimer: LEGAL_DISCLAIMER,
      context: validated.context ?? null,
    };

    return new Response(JSON.stringify(responsePayload), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (err) {
    const message = (err as Error).message;

    if (
      message.includes("rate limit") ||
      message.includes("429") ||
      message.includes("RateLimitError")
    ) {
      console.error(`[error] rate limited: ${message}`);
      return new Response(
        JSON.stringify({
          error: "Troppe richieste. Attendi qualche secondo e riprova.",
          disclaimer: LEGAL_DISCLAIMER,
        }),
        {
          status: 429,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        },
      );
    }

    if (
      message.includes("timeout") ||
      message.includes("timed out") ||
      message.includes("504")
    ) {
      console.error(`[error] timeout: ${message}`);
      return new Response(
        JSON.stringify({
          error:
            "Il server AI non ha risposto in tempo. " +
            "Riprova con una domanda più specifica.",
          disclaimer: LEGAL_DISCLAIMER,
        }),
        {
          status: 504,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        },
      );
    }

    if (
      message.includes("model") ||
      message.includes("API error") ||
      message.includes("401") ||
      message.includes("403")
    ) {
      console.error(`[error] model/api: ${message}`);
      return new Response(
        JSON.stringify({
          error:
            "Errore del modello AI. Il servizio potrebbe essere " +
            "temporaneamente non disponibile. Riprova più tardi.",
          provider: selectProvider(false),
          disclaimer: LEGAL_DISCLAIMER,
        }),
        {
          status: 503,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        },
      );
    }

    console.error(`[error] unexpected: ${message}`);
    return new Response(
      JSON.stringify({
        error: "Errore interno del server. Il team è stato notificato.",
        disclaimer: LEGAL_DISCLAIMER,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      },
    );
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({
        error: "Metodo non supportato. Usa POST.",
        disclaimer: LEGAL_DISCLAIMER,
      }),
      {
        status: 405,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      },
    );
  }

  return await handleRequest(req);
});

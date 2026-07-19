import { serve } from "std/http/server.ts";
import { z } from "zod";

// ───────────────────────────────────────────────
// Tipi di template supportati
// ───────────────────────────────────────────────
type TemplateType =
  | "diffida"
  | "lettera_contestazione"
  | "segnalazione_asl"
  | "ricorso"
  | "checklist";

// ───────────────────────────────────────────────
// Dati comuni per tutti i template
// ───────────────────────────────────────────────
interface CommonData {
  nome_inquilino: string;
  cognome_inquilino: string;
  indirizzo_inquilino: string;
  nome_proprietario: string;
  cognome_proprietario: string;
  indirizzo_proprietario: string;
  indirizzo_immobile: string;
  data_contratto: string;
  data_redazione: string;
  città: string;
}

// ───────────────────────────────────────────────
// Schemi di validazione per tipo di template
// ───────────────────────────────────────────────
const DiffidaSchema = z.object({
  type: z.literal("diffida"),
  data: z.object({
    motivo: z.enum([
      "deposito_non_restituito",
      "manutenzione_mancata",
      "aumento_illegittimo",
      "mancato_rilascio_cedolare",
      "altre_inadempienze",
    ]),
    dettagli: z.string().min(10, "Dettagli troppo brevi"),
    importo_richiesto: z.number().positive().optional(),
    scadenza_adempimento: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/),
    estremi_contratto: z.string().optional(),
    note_legali: z.string().optional(),
    common: z.custom<CommonData>(),
  }),
});

const LetteraContestazioneSchema = z.object({
  type: z.literal("lettera_contestazione"),
  data: z.object({
    oggetto: z.string().min(5, "Oggetto troppo breve"),
    corpo: z.string().min(20, "Corpo della lettera troppo breve"),
    richiesta: z.string().min(10, "Richiesta troppo breve"),
    common: z.custom<CommonData>(),
  }),
});

const SegnalazioneAslSchema = z.object({
  type: z.literal("segnalazione_asl"),
  data: z.object({
    problemi: z.array(z.object({
      tipo: z.string(),
      descrizione: z.string(),
      urgenza: z.enum(["alta", "media", "bassa"]),
    })).min(1, "Almeno un problema da segnalare"),
    tentativi_contatto: z.string().min(10, "Descrivere i tentativi di contatto col proprietario"),
    foto_disponibili: z.boolean().optional().default(false),
    pericolo_immediato: z.boolean().optional().default(false),
    common: z.custom<CommonData>(),
  }),
});

const RicorsoSchema = z.object({
  type: z.literal("ricorso"),
  data: z.object({
    tipo_ricorso: z.enum(["sfratto", "opposizione_sfratto", "riduzione_canone", "risoluzione_contratto", "danni"]),
    autorità: z.string().default("Tribunale Ordinario"),
    fatti: z.string().min(20, "Esposizione dei fatti troppo breve"),
    motivi: z.string().min(20, "Motivi del ricorso troppo brevi"),
    richiesta: z.string().min(10, "Richiesta al giudice troppo breve"),
    avvocato: z.object({
      nome: z.string(),
      cognome: z.string(),
      numero_albo: z.string(),
      foro: z.string(),
    }).optional(),
    common: z.custom<CommonData>(),
  }),
};

const ChecklistSchema = z.object({
  type: z.literal("checklist"),
  data: z.object({
    step_completati: z.array(z.string()).optional().default([]),
    note_aggiuntive: z.string().optional(),
    common: z.custom<CommonData>(),
  }),
});

// ───────────────────────────────────────────────
// Schema unione
// ───────────────────────────────────────────────
const TemplateRequestSchema = z.discriminatedUnion("type", [
  DiffidaSchema,
  LetteraContestazioneSchema,
  SegnalazioneAslSchema,
  RicorsoSchema,
  ChecklistSchema,
]);

type TemplateRequest = z.infer<typeof TemplateRequestSchema>;

// ───────────────────────────────────────────────
// Interfaccia risposta
// ───────────────────────────────────────────────
interface TemplateResponse {
  type: TemplateType;
  markdown: string;
  html: string;
  references: string[];
  metadata: {
    generatedAt: string;
    version: string;
  };
}

// ───────────────────────────────────────────────
// Riferimenti normativi per tipo documento
// ───────────────────────────────────────────────
function getReferences(type: TemplateType): string[] {
  switch (type) {
    case "diffida":
      return [
        "Legge n. 431/1998 (Disciplina delle locazioni urbane)",
        "Art. 1454 c.c. (Diffida ad adempiere)",
        "Art. 1219 c.c. (Costituzione in mora)",
        "Art. 11 L. 392/1978 (Deposito cauzionale)",
        "Art. 1576 c.c. (Manutenzione dell'immobile)",
        "Art. 1609 c.c. (Vizi dell'immobile locato)",
      ];
    case "lettera_contestazione":
      return [
        "Art. 1460 c.c. (Eccezione di inadempimento)",
        "Art. 1455 c.c. (Importanza dell'inadempimento)",
      ];
    case "segnalazione_asl":
      return [
        "Art. 1577 c.c. (Vizi che rendono l'immobile inidoneo all'uso)",
        "Art. 1580 c.c. (Garanzia per vizi dell'immobile)",
        "DPR 303/1956 (Norme igienico-sanitarie)",
        "DM Sanità 5 luglio 1975 (Requisiti igienico-sanitari abitazioni)",
      ];
    case "ricorso":
      return [
        "Art. 447-bis c.p.c. (Procedimento in materia di locazione)",
        "Art. 657 c.p.c. (Procedimento per convalida di sfratto)",
        "Art. 5 L. 392/1978 (Riduzione canone per vizi)",
      ];
    case "checklist":
      return [
        "Legge n. 431/1998 (Tutela inquilini)",
        "Art. 1574-1614 c.c. (Contratto di locazione)",
      ];
  }
}

// ───────────────────────────────────────────────
// Generatori template
// ───────────────────────────────────────────────

function generateDiffida(data: z.infer<typeof DiffidaSchema>["data"]): string {
  const c = data.common;
  const motiviLabel: Record<string, string> = {
    deposito_non_restituito: "mancata restituzione del deposito cauzionale",
    manutenzione_mancata: "mancata esecuzione delle opere di manutenzione straordinaria",
    aumento_illegittimo: "richiesta di aumento del canone non conforme alla normativa ISTAT",
    mancato_rilascio_cedolare: "mancata comunicazione dell'opzione per la cedolare secca",
    altre_inadempienze: "altre inadempienze contrattuali",
  };

  return `
# DIFFIDA AD ADEMPIERE

**Spett.le** ${c.nome_proprietario} ${c.cognome_proprietario}
${c.indirizzo_proprietario}

**Oggetto:** Diffida ad adempiere — Contratto di locazione immobile sito in ${c.indirizzo_immobile}

---

## PREMESSO

Che il/la Sig./Sig.ra **${c.nome_inquilino} ${c.cognome_inquilino}** (di seguito "conduttore") è titolare di un contratto di locazione stipulato in data **${c.data_contratto}** per l'immobile sito in **${c.indirizzo_immobile}** con il/la Sig./Sig.ra **${c.nome_proprietario} ${c.cognome_proprietario}** (di seguito "locatore").

Che il contratto di locazione prevede obblighi precisi a carico del locatore, tra cui:
- Garantire il pacifico godimento dell'immobile (Art. 1575 c.c.)
- Eseguire le manutenzioni straordinarie (Art. 1576 c.c.)
- Restituire il deposito cauzionale alla cessazione del contratto (Art. 11 L. 392/1978)

Che il locatore risulta inadempiente per il seguente motivo: **${motiviLabel[data.motivo] ?? data.motivo}**.

## DETTAGLI DELL'INADEMPIMENTO

${data.dettagli}

${data.importo_richiesto ? `Che l'importo complessivamente dovuto ammonta a **€ ${data.importo_richiesto.toFixed(2)}**.` : ""}

## DIFFIDA

Tutto ciò premesso, il/la conduttore **DIFFIDA** formalmente il/la locatore a:

1. Adempiere puntualmente a quanto previsto dal contratto e dalla legge entro e non oltre il **${data.scadenza_adempimento}**;
2. ${data.importo_richiesto ? `Corrispondere l'importo di € ${data.importo_richiesto.toFixed(2)}` : "Provvedere alla risoluzione dell'inadempienza"} entro il termine sopra indicato;
3. Comunicare per iscritto l'avvenuto adempimento.

## AVVERTIMENTI

La presente diffida è formulata ai sensi dell'art. 1454 c.c. (Diffida ad adempiere).

Decorso inutilmente il termine di **${data.scadenza_adempimento}**, il contratto si intenderà **risolto di diritto** (art. 1454, comma 2, c.c.), fatta salva la richiesta di risarcimento dei danni subiti.

Si avverte, altresì, che in mancanza di riscontro si procederà nelle sedi opportune, con aggravio di spese legali a carico della parte inadempiente.

${data.note_legali ? `\n**Note legali:** ${data.note_legali}\n` : ""}

---

${c.città}, lì ${data.data_redazione ?? new Date().toLocaleDateString("it-IT")}

**Firma del conduttore**
${c.nome_inquilino} ${c.cognome_inquilino}
${c.indirizzo_inquilino}

---

*Documento generato da CasaGiusta — Tutela inquilini*
`;
}

function generateLetteraContestazione(data: z.infer<typeof LetteraContestazioneSchema>["data"]): string {
  const c = data.common;

  return `
# LETTERA DI CONTESTAZIONE

**Spett.le** ${c.nome_proprietario} ${c.cognome_proprietario}
${c.indirizzo_proprietario}

---

**Oggetto:** ${data.oggetto}

---

## CONTESTAZIONE

${c.città}, lì ${data.data_redazione ?? new Date().toLocaleDateString("it-IT")}

Spett.le ${c.nome_proprietario} ${c.cognome_proprietario},

con la presente, il/la sottoscritto/a **${c.nome_inquilino} ${c.cognome_inquilino}**, conduttore dell'immobile sito in **${c.indirizzo_immobile}** in forza del contratto di locazione stipulato in data **${c.data_contratto}**,

**CONTESTA**

quanto segue:

${data.corpo}

## RICHIESTA

${data.richiesta}

Si invita a voler riscontrare la presente entro **15 (quindici) giorni** dal ricevimento, trascorsi i quali si procederà nelle sedi competenti per la tutela dei propri diritti.

---

**Distinti saluti,**

${c.nome_inquilino} ${c.cognome_inquilino}
${c.indirizzo_inquilino}

---

*Documento generato da CasaGiusta — Tutela inquilini*
`;
}

function generateSegnalazioneAsl(data: z.infer<typeof SegnalazioneAslSchema>["data"]): string {
  const c = data.common;

  const problemiHtml = data.problemi.map((p, i) =>
    `### ${i + 1}. ${p.tipo} (Urgenza: ${p.urgenza.toUpperCase()})\n\n${p.descrizione}`
  ).join("\n\n");

  return `
# SEGNALAZIONE ALL'ASL — PROBLEMI IGIENICO-SANITARI

**Azienda Sanitaria Locale di ${c.città}**
Dipartimento di Prevenzione
Servizio di Igiene e Sanità Pubblica (SISP)

**Segnalante:** ${c.nome_inquilino} ${c.cognome_inquilino}
**Indirizzo:** ${c.indirizzo_inquilino}
**Immobile oggetto della segnalazione:** ${c.indirizzo_immobile}

**Proprietario:** ${c.nome_proprietario} ${c.cognome_proprietario}
**Indirizzo proprietario:** ${c.indirizzo_proprietario}

---

## PREMESSO

Il/La sottoscritto/a **${c.nome_inquilino} ${c.cognome_inquilino}**, conduttore dell'immobile sito in **${c.indirizzo_immobile}** con contratto stipulato in data **${c.data_contratto}**,

## ESPONE

Quanto segue relativamente alle condizioni igienico-sanitarie dell'immobile locato:

${problemiHtml}

## TENTATIVI DI RISOLUZIONE

${data.tentativi_contatto}

Nonostante i ripetuti solleciti, il locatore non ha provveduto a risolvere le suddette problematiche.

## RICHIESTA

Tutto ciò premesso, il/la sottoscritto/a **CHIEDE**

- Un sopralluogo urgente da parte del personale ASL competente presso l'immobile sopra indicato;
- La verifica della conformità igienico-sanitaria dell'immobile;
- L'adozione dei provvedimenti previsti dalla legge, ivi compresa l'eventuale diffida al proprietario e/o la dichiarazione di inagibilità.

${data.pericolo_immediato ? "\n**Si segnala la sussistenza di un pericolo immediato per la salute degli occupanti.**\n" : ""}

---

${c.città}, lì ${data.data_redazione ?? new Date().toLocaleDateString("it-IT")}

**Firma del segnalante**
${c.nome_inquilino} ${c.cognome_inquilino}

${data.foto_disponibili ? "\n*Documentazione fotografica disponibile e allegata alla presente.*" : ""}

---

*Documento generato da CasaGiusta — Tutela inquilini*
`;
}

function generateRicorso(data: z.infer<typeof RicorsoSchema>["data"]): string {
  const c = data.common;

  const tipoLabel: Record<string, string> = {
    sfratto: "Ricorso per convalida di sfratto",
    opposizione_sfratto: "Opposizione a intimazione di sfratto",
    riduzione_canone: "Ricorso per riduzione canone di locazione",
    risoluzione_contratto: "Ricorso per risoluzione del contratto di locazione",
    danni: "Ricorso per risarcimento danni",
  };

  return `
# ${tipoLabel[data.tipo_ricorso]?.toUpperCase() ?? data.tipo_ricorso.toUpperCase()}

**${data.autorità} di ${c.città}**

---

## RICORRENTE

**${c.nome_inquilino} ${c.cognome_inquilino}**
Codice Fiscale: \`[DA INSERIRE]\`
${c.indirizzo_inquilino}
${data.avvocato ? `\n**Difeso dall'Avv. ${data.avvocato.nome} ${data.avvocato.cognome}**\nAlbo: ${data.avvocato.foro} - N. ${data.avvocato.numero_albo}\n` : "\n*In proprio ai sensi dell'art. 86 c.p.c.*\n"}

## CONTRO

**${c.nome_proprietario} ${c.cognome_proprietario}**
${c.indirizzo_proprietario}
Codice Fiscale: \`[DA INSERIRE]\`

**Oggetto:** Contratto di locazione immobile sito in ${c.indirizzo_immobile}, stipulato in data ${c.data_contratto}

---

## ESPOSIZIONE DEI FATTI

${data.fatti}

## MOTIVI DEL RICORSO

${data.motivi}

## RICHIESTA

Tutto ciò premesso, il/la ricorrente **CHIEDE** all'Ill.mo Giudice adito:

${data.richiesta}

Con vittoria di spese e competenze del giudizio.

---

${c.città}, lì ${data.data_redazione ?? new Date().toLocaleDateString("it-IT")}

${data.avvocato
    ? `**Avv. ${data.avvocato.nome} ${data.avvocato.cognome}**`
    : `**${c.nome_inquilino} ${c.cognome_inquilino}**`
}

---

*Documento generato da CasaGiusta — Tutela inquilini. Si raccomanda la revisione da parte di un avvocato prima del deposito.*
`;
}

function generateChecklist(data: z.infer<typeof ChecklistSchema>["data"]): string {
  const c = data.common;

  const steps = [
    { id: "contratto", label: "Ho ricevuto una copia del contratto di locazione registrato", ref: "Art. 1 L. 431/1998" },
    { id: "deposito", label: "Ho versato il deposito cauzionale (max 3 mensilità)", ref: "Art. 11 L. 392/1978" },
    { id: "registrazione", label: "Il contratto è stato registrato presso l'Agenzia delle Entrate", ref: "DPR 131/1986" },
    { id: "cedolare", label: "Ho verificato se il proprietario ha optato per la cedolare secca", ref: "DLgs 23/2011" },
    { id: "istat", label: "Ho verificato la clausola di aggiornamento ISTAT (max 75%)", ref: "Art. 4 L. 431/1998" },
    { id: "spese", label: "Ho chiarito la ripartizione delle spese condominiali", ref: "Art. 9 L. 392/1978" },
    { id: "manutenzione", label: "So quali manutenzioni sono a mio carico (ordinaria) e quali del proprietario (straordinaria)", ref: "Art. 1576 c.c." },
    { id: "recesso", label: "Conosco le condizioni di recesso anticipato", ref: "Art. 4 L. 392/1978" },
    { id: "mancanze", label: "Ho documentato eventuali difetti/mancanze con foto all'ingresso", ref: "Art. 1577 c.c." },
    { id: "voltura", label: "Ho richiesto le volture delle utenze a mio nome", ref: "" },
    { id: "certificazione", label: "L'immobile è dotato di certificazioni obbligatorie (APE, impianti)", ref: "DLgs 192/2005" },
    { id: "comodato", label: "Ho ricevuto le chiavi e ho effettuato il verbale di consegna", ref: "" },
  ];

  const formattedSteps = steps.map((step) => {
    const done = data.step_completati.includes(step.id);
    return `${done ? "[x]" : "[ ]"} **${step.label}**${step.ref ? ` — *${step.ref}*` : ""}`;
  }).join("\n");

  const completati = data.step_completati.length;

  return `
# CHECKLIST DIRITTI INQUILINO

**Inquilino:** ${c.nome_inquilino} ${c.cognome_inquilino}
**Immobile:** ${c.indirizzo_immobile}
**Contratto del:** ${c.data_contratto}

---

## STATO DI AVANZAMENTO

**Completati:** ${completati} / ${steps.length} (${Math.round((completati / steps.length) * 100)}%)

---

## VERIFICHE

${formattedSteps}

${data.note_aggiuntive ? `\n## NOTE\n\n${data.note_aggiuntive}\n` : ""}

---

## LEGENDA

- **[x]** = Verifica completata
- **[ ]** = Verifica da fare

---

*Checklist generata da CasaGiusta — Tutela inquilini*
`;
}

// ───────────────────────────────────────────────
// Dispatcher
// ───────────────────────────────────────────────
function generateTemplate(req: TemplateRequest): TemplateResponse {
  const type = req.type;
  let markdown: string;

  switch (type) {
    case "diffida":
      markdown = generateDiffida(req.data);
      break;
    case "lettera_contestazione":
      markdown = generateLetteraContestazione(req.data);
      break;
    case "segnalazione_asl":
      markdown = generateSegnalazioneAsl(req.data);
      break;
    case "ricorso":
      markdown = generateRicorso(req.data);
      break;
    case "checklist":
      markdown = generateChecklist(req.data);
      break;
  }

  // Converti markdown in HTML base (sostituzioni semplici)
  const html = markdownToHtml(markdown);

  return {
    type,
    markdown,
    html,
    references: getReferences(type),
    metadata: {
      generatedAt: new Date().toISOString(),
      version: "1.0.0",
    },
  };
}

// ───────────────────────────────────────────────
// Conversione markdown -> HTML (base)
// ───────────────────────────────────────────────
function markdownToHtml(md: string): string {
  let html = md
    .replace(/^### (.*$)/gm, "<h3>$1</h3>")
    .replace(/^## (.*$)/gm, "<h2>$1</h2>")
    .replace(/^# (.*$)/gm, "<h1>$1</h1>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/^- (.*)/gm, "<li>$1</li>")
    .replace(/\[x\]/g, "&#9745;")
    .replace(/\[ \]/g, "&#9744;")
    .replace(/\n\n/g, "</p><p>")
    .replace(/^`([^`]*)`$/gm, "<code>$1</code>");

  html = "<p>" + html + "</p>";
  html = html.replace(/<li>/g, "<ul><li>").replace(/<\/li>(?!.*<li>)/g, "</li></ul>");
  return html;
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

    const parsed = TemplateRequestSchema.safeParse(body);
    if (!parsed.success) {
      const errors = parsed.error.issues.map((i) => ({
        field: i.path.join("."),
        message: i.message,
        code: i.code,
      }));
      return new Response(
        JSON.stringify({ error: "Dati template non validi", details: errors }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const result = generateTemplate(parsed.data);

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
      JSON.stringify({ error: "Errore nella generazione del template", details: message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});

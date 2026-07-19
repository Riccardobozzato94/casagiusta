export const tools = {
  search_knowledge_base: {
    name: "search_knowledge_base",
    description: "Cerca nella knowledge base giuridica italiana per trovare leggi, articoli, sentenze e normative pertinenti alla domanda dell'utente.",
    input_schema: {
      type: "object",
      properties: {
        query: { type: "string", description: "La query di ricerca (in italiano)" },
        top_k: { type: "number", description: "Numero di risultati da restituire (default: 5)", default: 5 },
        filters: {
          type: "object",
          properties: {
            source: { type: "string", enum: ["legge", "decreto", "sentenza", "contratto-tipo", "prassi"], description: "Filtra per fonte" },
            valid_from: { type: "string", description: "Solo documenti validi da questa data" },
          },
        },
      },
      required: ["query"],
    },
  },
  calculate_istat: {
    name: "calculate_istat",
    description: "Calcola l'aggiornamento ISTAT del canone di affitto secondo L.431/1998 art.4 (max 75% variazione ISTAT).",
    input_schema: {
      type: "object",
      properties: {
        current_rent: { type: "number", description: "Canone attuale in euro" },
        contract_start_date: { type: "string", description: "Data inizio contratto (YYYY-MM-DD)" },
        last_update_year: { type: "number", description: "Anno ultimo aggiornamento", default: 2025 },
        contract_type: { type: "string", enum: ["4+4", "3+2", "transitorio", "studenti"], description: "Tipo contratto" },
      },
      required: ["current_rent", "contract_start_date"],
    },
  },
  generate_legal_template: {
    name: "generate_legal_template",
    description: "Genera un template di documento legale (diffida, lettera, segnalazione, ricorso) in italiano.",
    input_schema: {
      type: "object",
      properties: {
        type: { type: "string", enum: ["diffida", "lettera_contestazione", "segnalazione_asl", "ricorso", "checklist"], description: "Tipo di documento" },
        context: {
          type: "object",
          properties: {
            mittente_nome: { type: "string" },
            mittente_indirizzo: { type: "string" },
            destinatario_nome: { type: "string" },
            destinatario_indirizzo: { type: "string" },
            oggetto_descrizione: { type: "string" },
            fatti: { type: "string", description: "Descrizione dei fatti" },
            richiesta: { type: "string", description: "Cosa si richiede" },
            importo: { type: "number" },
            scadenza_giorni: { type: "number", default: 15 },
            note_aggiuntive: { type: "string" },
          },
        },
      },
      required: ["type", "context"],
    },
  },
  search_case_law: {
    name: "search_case_law",
    description: "Cerca giurisprudenza recente della Cassazione su locazioni.",
    input_schema: {
      type: "object",
      properties: {
        query: { type: "string", description: "Argomento della ricerca" },
        year_from: { type: "number", description: "Da anno (default: 2023)", default: 2023 },
        max_results: { type: "number", default: 3 },
      },
      required: ["query"],
    },
  },
  find_local_support: {
    name: "find_local_support",
    description: "Trova sportelli comunali, fondi morosità, bandi regionali e associazioni di tutela nella città/regione dell'utente.",
    input_schema: {
      type: "object",
      properties: {
        city: { type: "string", description: "Città dell'utente" },
        region: { type: "string", description: "Regione dell'utente" },
        support_type: {
          type: "string",
          enum: ["fondo_morosita", "sportello_casa", "associazione", "avvocato_gratuito"],
          description: "Tipo di supporto cercato",
        },
      },
      required: ["city", "region"],
    },
  },
} as const;

export type ToolName = keyof typeof tools;

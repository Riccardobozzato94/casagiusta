import { serve } from "std/http/server.ts";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";

// ───────────────────────────────────────────────
// Schema di validazione input
// ───────────────────────────────────────────────
const PdfRequestSchema = z.object({
  template: z.string().min(1, "Il template HTML è obbligatorio"),
  data: z.record(z.unknown()),
  options: z.object({
    format: z.enum(["A4", "LETTER", "LEGAL"]).optional().default("A4"),
    margin: z.number().min(0).max(100).optional().default(20),
    fileName: z.string().optional(),
  }).optional().default({}),
  storage: z.object({
    bucket: z.string().optional().default("documents"),
    saveToStorage: z.boolean().optional().default(false),
  }).optional().default({}),
});

type PdfRequest = z.infer<typeof PdfRequestSchema>;

// ───────────────────────────────────────────────
// Interfacce risposta
// ───────────────────────────────────────────────
interface PdfResponse {
  success: boolean;
  pdf: {
    base64?: string;
    url?: string;
    fileName: string;
    pageCount: number;
    sizeBytes: number;
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
// Sostituzione variabili nel template HTML
// ───────────────────────────────────────────────
function compileTemplate(template: string, data: Record<string, unknown>): string {
  let compiled = template;
  for (const [key, value] of Object.entries(data)) {
    const regex = new RegExp(`\\{\\{\\s*${key}\\s*\\}\\}`, "g");
    compiled = compiled.replace(regex, String(value ?? ""));
  }
  return compiled;
}

// ───────────────────────────────────────────────
// Converte HTML in PDF via pdf-lib
// Usa un approccio canvas-based per la resa HTML
// ───────────────────────────────────────────────
async function htmlToPdf(
  html: string,
  format: string,
  margin: number,
): Promise<{ buffer: Uint8Array; pageCount: number }> {
  const { PDFDocument, rgb } = await import("pdf-lib");

  const doc = await PDFDocument.create();

  // Dimensioni pagina in punti (1 pt = 1/72 inch)
  const pageSizes: Record<string, [number, number]> = {
    A4: [595.28, 841.89],
    LETTER: [612, 792],
    LEGAL: [612, 1008],
  };

  const [pageWidth, pageHeight] = pageSizes[format] ?? pageSizes.A4;
  const marginPt = margin * 2.83465; // mm -> pt
  const usableWidth = pageWidth - marginPt * 2;
  const usableHeight = pageHeight - marginPt * 2;

  // Parsing HTML semplificato: estrae testo e lo suddivide in pagine
  // In produzione: usare un renderer HTML headless (Puppeteer/Playwright)
  const textContent = html
    .replace(/<[^>]*>/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  const lines = textContent.split("\n");
  const fontSize = 10;
  const lineHeight = fontSize * 1.4;
  const maxLinesPerPage = Math.floor(usableHeight / lineHeight);
  const charsPerLine = Math.floor(usableWidth / (fontSize * 0.55));

  let currentPage = doc.addPage([pageWidth, pageHeight]);
  let currentY = pageHeight - marginPt;
  let currentLine = 0;

  for (const rawLine of lines) {
    // Wrap lungo righe
    const wrappedLines = wrapText(rawLine, charsPerLine);

    for (const wrappedLine of wrappedLines) {
      if (currentLine >= maxLinesPerPage) {
        currentPage = doc.addPage([pageWidth, pageHeight]);
        currentY = pageHeight - marginPt;
        currentLine = 0;
      }

      currentPage.drawText(wrappedLine, {
        x: marginPt,
        y: currentY - lineHeight,
        size: fontSize,
        color: rgb(0, 0, 0),
      });
      currentY -= lineHeight;
      currentLine++;
    }
  }

  const buffer = await doc.save();
  const pageCount = doc.getPages().length;

  return { buffer, pageCount };
}

// ───────────────────────────────────────────────
// Wrap parole per larghezza massima
// ───────────────────────────────────────────────
function wrapText(text: string, maxChars: number): string[] {
  const lines: string[] = [];
  const words = text.split(" ");

  let currentLine = "";
  for (const word of words) {
    if ((currentLine + " " + word).trim().length <= maxChars) {
      currentLine = (currentLine + " " + word).trim();
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  }
  if (currentLine) lines.push(currentLine);

  // Se una singola parola è più lunga del limite, la tronca
  return lines.map((l) => l.length > maxChars ? l.slice(0, maxChars) : l);
}

// ───────────────────────────────────────────────
// Salva PDF su Supabase Storage
// ───────────────────────────────────────────────
async function saveToStorage(
  buffer: Uint8Array,
  bucket: string,
  fileName: string,
): Promise<string> {
  const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
  const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Credenziali Supabase mancanti");
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const { error } = await supabase.storage
    .from(bucket)
    .upload(fileName, buffer, {
      contentType: "application/pdf",
      upsert: true,
    });

  if (error) throw new Error(`Errore upload: ${error.message}`);

  const { data: urlData } = supabase.storage
    .from(bucket)
    .getPublicUrl(fileName);

  return urlData.publicUrl;
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

    // Validazione input con Zod
    const parsed = PdfRequestSchema.safeParse(body);
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

    const { template, data, options, storage } = parsed.data;

    // Compila il template con i dati
    const compiledHtml = compileTemplate(template, data);

    // Genera PDF
    const { buffer, pageCount } = await htmlToPdf(
      compiledHtml,
      options.format ?? "A4",
      options.margin ?? 20,
    );

    // Genera nome file
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const fileName = options.fileName ?? `documento-${timestamp}.pdf`;

    const responseData: PdfResponse["pdf"] = {
      base64: arrayBufferToBase64(buffer),
      fileName,
      pageCount,
      sizeBytes: buffer.byteLength,
    };

    // Salva su storage se richiesto
    if (storage.saveToStorage) {
      const url = await saveToStorage(buffer, storage.bucket, fileName);
      responseData.url = url;
      delete responseData.base64; // Non serve restituire base64 se salvato
    }

    return new Response(
      JSON.stringify({ success: true, pdf: responseData }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Errore sconosciuto";
    return new Response(
      JSON.stringify({ error: "Errore nella generazione PDF", details: message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});

// ───────────────────────────────────────────────
// Utility: ArrayBuffer -> Base64
// ───────────────────────────────────────────────
function arrayBufferToBase64(buffer: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < buffer.byteLength; i++) {
    binary += String.fromCharCode(buffer[i]);
  }
  return btoa(binary);
}

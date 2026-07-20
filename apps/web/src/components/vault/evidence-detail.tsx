"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { EvidenceItem, getEvidenceDownloadUrl } from "@/lib/supabase";
import {
  Download,
  Printer,
  Shield,
  FileText,
  Copy,
} from "lucide-react";

interface EvidenceDetailProps {
  item: EvidenceItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EvidenceDetail({
  item,
  open,
  onOpenChange,
}: EvidenceDetailProps) {
  if (!item) return null;

  const handleDownload = async () => {
    try {
      const url = await getEvidenceDownloadUrl(item.file_path);
      window.open(url, "_blank");
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  const handlePrint = () => {
    const printContent = `
      <html>
        <head>
          <title>CasaGiusta — Prova: ${item.title}</title>
          <style>
            body { font-family: -apple-system, system-ui, sans-serif; padding: 40px; color: #111; }
            h1 { font-size: 24px; margin-bottom: 8px; }
            .meta { color: #666; font-size: 14px; margin-bottom: 20px; }
            .section { margin-bottom: 24px; }
            .section h2 { font-size: 16px; color: #14b8a6; margin-bottom: 8px; border-bottom: 1px solid #eee; padding-bottom: 4px; }
            .section p { font-size: 14px; line-height: 1.6; }
            .hash { font-family: monospace; background: #f5f5f5; padding: 12px; border-radius: 8px; font-size: 12px; word-break: break-all; }
            .footer { margin-top: 40px; padding-top: 20px; border-top: 2px solid #14b8a6; font-size: 12px; color: #999; }
            .stamp { border: 2px solid #14b8a6; border-radius: 12px; padding: 16px; margin: 20px 0; text-align: center; }
            .stamp h3 { color: #14b8a6; font-size: 18px; margin: 0; }
            .stamp p { font-size: 13px; color: #666; margin: 4px 0 0; }
          </style>
        </head>
        <body>
          <div class="stamp">
            <h3>🔐 CASA GIUSTA — PROVA DIGITALE</h3>
            <p>Documento con valore probatorio &mdash; Hash SHA-256 verificato</p>
          </div>
          <h1>${item.title}</h1>
          <div class="meta">
            Tipo: ${item.type} &middot; Data: ${new Date(item.server_timestamp).toLocaleDateString("it-IT", { day: "2-digit", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
            ${item.file_size_bytes ? `&middot; Dimensione: ${(item.file_size_bytes / 1024).toFixed(1)} KB` : ""}
          </div>

          ${item.description ? `
          <div class="section">
            <h2>Descrizione</h2>
            <p>${item.description}</p>
          </div>
          ` : ""}

          <div class="section">
            <h2>Hash SHA-256</h2>
            <div class="hash">${item.file_hash}</div>
            <p style="font-size: 12px; color: #666; margin-top: 4px;">Questo hash garantisce l&rsquo;integrit&agrave; del file originale.</p>
          </div>

          ${item.blockchain_hash ? `
          <div class="section">
            <h2>Notarizzazione Blockchain</h2>
            <p>Timestamp blockchain: ${item.blockchain_hash}</p>
            <p style="font-size: 12px; color: #666;">Prova notarizzata con timestamp immutabile.</p>
          </div>
          ` : ""}

          <div class="footer">
            <p><strong>CasaGiusta</strong> &mdash; Il tuo scudo digitale. I tuoi diritti, subito.</p>
            <p>Documento generato il ${new Date().toLocaleDateString("it-IT", { day: "2-digit", month: "long", year: "numeric" })}</p>
            <p>ID Prova: ${item.id}</p>
            <p style="margin-top: 8px;">Server timestamp: ${item.server_timestamp}</p>
            ${item.blockchain_hash ? `<p>Blockchain timestamp: ${item.blockchain_hash}</p>` : ""}
          </div>
        </body>
      </html>
    `;

    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => printWindow.print(), 500);
    }
  };

  const copyHash = () => {
    navigator.clipboard.writeText(item.file_hash);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle>{item.title}</DialogTitle>
              <DialogDescription>
                {item.type} &middot;{" "}
                {item.file_size_bytes
                  ? `${(item.file_size_bytes / 1024).toFixed(1)} KB`
                  : "Dimensione sconosciuta"}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {/* Integrity Status */}
          <div className="flex items-center gap-2 rounded-lg bg-primary/5 p-3">
            <Shield className="h-5 w-5 text-success" />
            <div className="text-sm">
              <span className="font-semibold text-success">Integrit&agrave; verificata</span>
              <p className="text-xs text-muted-foreground">
                Hash SHA-256 corrispondente all&rsquo;originale
              </p>
            </div>
            {item.blockchain_hash && (
              <Badge variant="success" className="ml-auto">
                Notarizzato
              </Badge>
            )}
          </div>

          {/* Description */}
          {item.description && (
            <div>
              <h4 className="mb-1 text-sm font-semibold">Descrizione</h4>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          )}

          <Separator />

          {/* Technical Details */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Dettagli tecnici</h4>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">ID Prova</span>
              <span className="font-mono text-xs">{item.id.slice(0, 20)}...</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Data creazione</span>
              <span>
                {new Date(item.created_at).toLocaleDateString("it-IT", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Server timestamp</span>
              <span className="font-mono text-xs">
                {new Date(item.server_timestamp).toLocaleString("it-IT")}
              </span>
            </div>
            {item.blockchain_hash && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Blockchain</span>
                <Badge variant="success">Confermato</Badge>
              </div>
            )}
          </div>

          {/* Hash */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <h4 className="text-sm font-semibold">Hash SHA-256</h4>
              <button
                onClick={copyHash}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                <Copy className="h-3 w-3" /> Copia
              </button>
            </div>
            <div className="rounded-lg bg-secondary p-3 font-mono text-xs break-all">
              {item.file_hash}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <Button variant="default" className="flex-1" onClick={handleDownload}>
            <Download className="h-4 w-4" /> Scarica originale
          </Button>
          <Button variant="accent" onClick={handlePrint}>
            <Printer className="h-4 w-4" /> Stampa
          </Button>
        </div>
        <p className="text-[11px] text-muted-foreground text-center">
          Questo documento include hash SHA-256 e timestamp per valore probatorio.
          Stampalo e consegnalo al tuo avvocato.
        </p>
      </DialogContent>
    </Dialog>
  );
}

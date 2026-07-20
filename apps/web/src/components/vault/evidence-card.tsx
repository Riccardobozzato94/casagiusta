"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EvidenceItem, getEvidenceDownloadUrl } from "@/lib/supabase";
import {
  FileText,
  Image,
  Video,
  Mic,
  MessageSquare,
  Receipt,
  File,
  Download,
  Shield,
  Clock,
  Hash,
} from "lucide-react";

const typeConfig: Record<
  string,
  { icon: React.ReactNode; label: string; color: string }
> = {
  foto: {
    icon: <Image className="h-5 w-5" />,
    label: "Foto",
    color: "text-info",
  },
  video: {
    icon: <Video className="h-5 w-5" />,
    label: "Video",
    color: "text-accent",
  },
  audio: {
    icon: <Mic className="h-5 w-5" />,
    label: "Audio",
    color: "text-warning",
  },
  documento: {
    icon: <FileText className="h-5 w-5" />,
    label: "Documento",
    color: "text-primary",
  },
  comunicazione: {
    icon: <MessageSquare className="h-5 w-5" />,
    label: "Comunicazione",
    color: "text-info",
  },
  ricevuta: {
    icon: <Receipt className="h-5 w-5" />,
    label: "Ricevuta",
    color: "text-success",
  },
  altro: {
    icon: <File className="h-5 w-5" />,
    label: "Altro",
    color: "text-muted-foreground",
  },
};

function formatBytes(bytes: number | null): string {
  if (!bytes) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("it-IT", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

interface EvidenceCardProps {
  item: EvidenceItem;
  onView: (item: EvidenceItem) => void;
}

export function EvidenceCard({ item, onView }: EvidenceCardProps) {
  const config = typeConfig[item.type] ?? typeConfig.altro;

  const handleDownload = async () => {
    try {
      const url = await getEvidenceDownloadUrl(item.file_path);
      window.open(url, "_blank");
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  return (
    <Card className="group cursor-pointer" onClick={() => onView(item)}>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-lg bg-secondary ${config.color}`}
          >
            {config.icon}
          </div>
          <div>
            <CardTitle className="text-sm font-semibold line-clamp-1">
              {item.title}
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              {config.label} &middot; {formatBytes(item.file_size_bytes)}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {item.description && (
          <p className="mb-3 text-xs text-muted-foreground line-clamp-2">
            {item.description}
          </p>
        )}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {formatDate(item.server_timestamp)}
            </span>
            {item.blockchain_hash && (
              <span className="flex items-center gap-1 text-success">
                <Shield className="h-3 w-3" />
                Notarizzato
              </span>
            )}
          </div>
          <div
            className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => e.stopPropagation()}
          >
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleDownload}>
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="mt-2 flex items-center gap-1 text-[10px] text-muted-foreground font-mono">
          <Hash className="h-3 w-3" />
          <span className="truncate max-w-[200px]">{item.file_hash}</span>
        </div>
      </CardContent>
    </Card>
  );
}

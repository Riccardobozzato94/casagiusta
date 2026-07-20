"use client";

import { Card, CardContent } from "@/components/ui/card";
import { EvidenceItem, VaultCase } from "@/lib/supabase";
import { Shield, FileText, FolderOpen, Hash } from "lucide-react";

interface VaultStatsProps {
  evidence: EvidenceItem[];
  cases: VaultCase[];
}

export function VaultStats({ evidence, cases }: VaultStatsProps) {
  const totalSize = evidence.reduce(
    (acc, item) => acc + (item.file_size_bytes ?? 0),
    0
  );
  const notarizedCount = evidence.filter((e) => e.blockchain_hash).length;

  const stats = [
    {
      label: "Prove totali",
      value: evidence.length,
      icon: <FileText className="h-5 w-5" />,
      color: "text-primary",
    },
    {
      label: "Casi attivi",
      value: cases.length,
      icon: <FolderOpen className="h-5 w-5" />,
      color: "text-accent",
    },
    {
      label: "Prove notarizzate",
      value: notarizedCount,
      icon: <Shield className="h-5 w-5" />,
      color: "text-success",
    },
    {
      label: "Archivio totale",
      value:
        totalSize > 1024 * 1024
          ? `${(totalSize / (1024 * 1024)).toFixed(1)} MB`
          : `${(totalSize / 1024).toFixed(1)} KB`,
      icon: <Hash className="h-5 w-5" />,
      color: "text-info",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="flex items-center gap-4 p-5">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-xl bg-secondary ${stat.color}`}
            >
              {stat.icon}
            </div>
            <div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

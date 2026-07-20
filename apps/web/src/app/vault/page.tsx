"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect, useCallback } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { EvidenceCard } from "@/components/vault/evidence-card";
import { EvidenceDetail } from "@/components/vault/evidence-detail";
import { VaultStats } from "@/components/vault/vault-stats";
import {
  EvidenceItem,
  VaultCase,
  fetchEvidenceList,
  fetchUserCases,
} from "@/lib/supabase";
import {
  Shield,
  FileText,
  RefreshCw,
  LogOut,
  AlertCircle,
  Search,
} from "lucide-react";

export default function VaultPage() {
  const [evidence, setEvidence] = useState<EvidenceItem[]>([]);
  const [cases, setCases] = useState<VaultCase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedEvidence, setSelectedEvidence] = useState<EvidenceItem | null>(
    null
  );
  const [detailOpen, setDetailOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [evidenceData, casesData] = await Promise.all([
        fetchEvidenceList(),
        fetchUserCases(),
      ]);
      setEvidence(evidenceData);
      setCases(casesData);
    } catch (err: unknown) {
      console.error("Failed to load vault data:", err);
      if (err instanceof Error && err.message === "CONFIG_ERROR") {
        setError(
          "Configura il progetto Supabase in apps/web/.env.local per abilitare il Vault."
        );
      } else {
        setError(
          "Impossibile caricare i dati del Vault. Verifica la connessione e riprova."
        );
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleViewEvidence = (item: EvidenceItem) => {
    setSelectedEvidence(item);
    setDetailOpen(true);
  };

  const evidenceTypes = [
    { value: "all", label: "Tutte" },
    { value: "documento", label: "Documenti" },
    { value: "foto", label: "Foto" },
    { value: "comunicazione", label: "Comunicazioni" },
    { value: "ricevuta", label: "Ricevute" },
    { value: "audio", label: "Audio" },
    { value: "video", label: "Video" },
  ];

  const filteredEvidence = evidence.filter((item) => {
    const matchesSearch =
      !searchQuery ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "all" || item.type === activeTab;
    return matchesSearch && matchesTab;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
              CG
            </div>
            <div>
              <h1 className="text-sm font-bold">CasaGiusta</h1>
              <p className="text-[11px] text-muted-foreground">
                Forziere Prove Digitali
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={loadData} disabled={loading}>
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            </Button>
            <Button variant="ghost" size="sm">
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Esci</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-6 space-y-6">
        {/* Hero Vault */}
        <div className="rounded-xl border border-border bg-gradient-to-br from-primary/5 via-background to-background p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
              <Shield className="h-7 w-7 text-primary" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold">Il tuo Forziere Prove</h2>
              <p className="mt-1 text-sm text-muted-foreground max-w-xl">
                Ogni file &egrave; hashizzato con SHA-256 e timestampato per
                valore probatorio in tribunale. Scarica, verifica e stampa le
                tue prove per il tuo avvocato.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        {!loading && !error && (
          <VaultStats evidence={evidence} cases={cases} />
        )}

        {/* Error State */}
        {error && (
          <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-6 text-center">
            <AlertCircle className="mx-auto h-8 w-8 text-destructive mb-3" />
            <p className="text-sm text-destructive">{error}</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-3"
              onClick={loadData}
            >
              <RefreshCw className="h-4 w-4 mr-2" /> Riprova
            </Button>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-24 animate-pulse rounded-xl bg-secondary"
                />
              ))}
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="h-40 animate-pulse rounded-xl bg-secondary"
                />
              ))}
            </div>
          </div>
        )}

        {/* Search & Filters */}
        {!loading && !error && (
          <>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full sm:w-auto"
              >
                <TabsList className="h-9 flex-wrap">
                  {evidenceTypes.map((type) => (
                    <TabsTrigger
                      key={type.value}
                      value={type.value}
                      className="text-xs px-3"
                    >
                      {type.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Cerca nelle prove..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-9 w-48 rounded-lg border border-border bg-secondary pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 sm:w-64"
                  />
                </div>
              </div>
            </div>

            {/* Evidence Grid */}
            {filteredEvidence.length === 0 ? (
              <div className="rounded-xl border border-border bg-secondary/30 p-12 text-center">
                <FileText className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
                <h3 className="font-semibold mb-1">Nessuna prova trovata</h3>
                <p className="text-sm text-muted-foreground">
                  {searchQuery
                    ? "Nessuna prova corrisponde alla tua ricerca. Prova con altri termini."
                    : "Il tuo Forziere Prove &egrave; vuoto. Carica la tua prima prova dall'app mobile."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredEvidence.map((item) => (
                  <EvidenceCard
                    key={item.id}
                    item={item}
                    onView={handleViewEvidence}
                  />
                ))}
              </div>
            )}

            {/* Evidence count */}
            <p className="text-center text-xs text-muted-foreground">
              {filteredEvidence.length} di {evidence.length} prove
              {searchQuery && ` (filtrate)`}
            </p>
          </>
        )}
      </div>

      {/* Evidence Detail Dialog */}
      <EvidenceDetail
        item={selectedEvidence}
        open={detailOpen}
        onOpenChange={setDetailOpen}
      />

      {/* Footer */}
      <footer className="border-t border-border mt-8">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-muted-foreground">
              &copy; 2026 CasaGiusta &mdash; I tuoi dati sono crittografati
              end-to-end. Server in UE.
            </p>
            <div className="flex gap-4 text-xs text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Termini
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Supporto
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

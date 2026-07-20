import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);

// ── Evidence (Vault) types ──
export interface EvidenceItem {
  id: string;
  user_id: string;
  case_id: string | null;
  type: "foto" | "video" | "audio" | "documento" | "comunicazione" | "ricevuta" | "altro";
  title: string;
  description: string | null;
  file_path: string;
  file_hash: string;
  file_size_bytes: number | null;
  mime_type: string | null;
  server_timestamp: string;
  blockchain_hash: string | null;
  created_at: string;
}

export interface VaultCase {
  id: string;
  title: string;
  type: string;
  status: string;
  created_at: string;
  evidence_count?: number;
}

// ── Evidence API functions ──
export async function fetchEvidenceList(): Promise<EvidenceItem[]> {
  const { data, error } = await supabase
    .from("evidence")
    .select("*")
    .eq("is_deleted", false)
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) throw error;
  return data ?? [];
}

export async function fetchEvidenceByCase(caseId: string): Promise<EvidenceItem[]> {
  const { data, error } = await supabase
    .from("evidence")
    .select("*")
    .eq("case_id", caseId)
    .eq("is_deleted", false)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function verifyEvidenceIntegrity(
  evidenceId: string,
  fileBase64: string
): Promise<{ integrity_verified: boolean; hash_sha256_stored: string }> {
  const { data, error } = await supabase.functions.invoke("evidence-hash", {
    method: "GET",
    body: { id: evidenceId, fileBase64 },
  });

  if (error) throw error;
  return data;
}

export async function getEvidenceDownloadUrl(filePath: string): Promise<string> {
  const { data } = supabase.storage.from("evidence").getPublicUrl(filePath);
  return data.publicUrl;
}

// ── Cases API functions ──
export async function fetchUserCases(): Promise<VaultCase[]> {
  const { data: cases, error } = await supabase
    .from("cases")
    .select("*")
    .eq("is_archived", false)
    .order("updated_at", { ascending: false })
    .limit(20);

  if (error) throw error;

  // Enrich with evidence count
  const casesWithCount = await Promise.all(
    (cases ?? []).map(async (c) => {
      const { count } = await supabase
        .from("evidence")
        .select("*", { count: "exact", head: true })
        .eq("case_id", c.id)
        .eq("is_deleted", false);

      return { ...c, evidence_count: count ?? 0 };
    })
  );

  return casesWithCount;
}

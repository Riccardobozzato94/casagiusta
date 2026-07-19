import { supabase } from './supabase';
import { API_ENDPOINTS } from './constants';
import type { AiRequest, AiResponse } from '@casagiusta/shared/src/types/ai';

class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function callEdgeFunction<T>(
  endpoint: string,
  body: unknown,
  options?: { signal?: AbortSignal },
): Promise<T> {
  const { data, error } = await supabase.functions.invoke(endpoint, {
    body,
    signal: options?.signal,
  });

  if (error) {
    throw new ApiError(error.message, error.status ?? 500, error.context?.code);
  }

  return data as T;
}

export const api = {
  ai: {
    ask: (request: AiRequest, signal?: AbortSignal) =>
      callEdgeFunction<AiResponse>(API_ENDPOINTS.AI_ORCHESTRATOR, request, { signal }),
  },

  istat: {
    calculate: (params: { currentRent: number; contractStartDate: string; contractType?: string }) =>
      callEdgeFunction<{
        allowedIncreasePercent: number;
        allowedIncreaseAmount: number;
        newRentAmount: number;
        istatVariation: number;
        legalReferences: string[];
      }>(API_ENDPOINTS.ISTAT_CALCULATOR, params),
  },

  templates: {
    generate: (params: { type: string; context: Record<string, unknown> }) =>
      callEdgeFunction<{ content: string; html: string; pdfUrl?: string }>(
        API_ENDPOINTS.GENERATE_TEMPLATE,
        params,
      ),
  },

  evidence: {
    hash: async (fileUri: string) => {
      const formData = new FormData();
      formData.append('file', { uri: fileUri, type: 'application/octet-stream', name: 'evidence' } as any);

      const { data, error } = await supabase.functions.invoke(API_ENDPOINTS.EVIDENCE_HASH, {
        body: formData,
      });

      if (error) throw new ApiError(error.message, error.status ?? 500);
      return data as { hash: string; serverTimestamp: string; evidenceId: string };
    },
    verify: (evidenceId: string) =>
      callEdgeFunction<{ valid: boolean; originalHash: string; currentHash: string; timestamp: string }>(
        `${API_ENDPOINTS.EVIDENCE_HASH}?id=${evidenceId}`,
        {},
      ),
  },

  pdf: {
    generate: (params: { template: string; data: Record<string, unknown> }) =>
      callEdgeFunction<{ url: string; base64?: string }>(API_ENDPOINTS.GENERATE_PDF, params),
  },

  lawyers: {
    search: (params: { city?: string; specialty?: string; ratingMin?: number }) =>
      callEdgeFunction<{ lawyers: any[]; total: number }>(API_ENDPOINTS.SEARCH_LAWYERS, params),
  },
};

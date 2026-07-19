/**
 * @file Tipi per le interazioni AI del sistema CasaGiusta.
 */

import type { ChatMessage, Citation } from './database';

export interface AiRequest {
  messages: ChatMessage[];
  context?: {
    userId?: string;
    caseId?: string;
    contractId?: string;
  };
  privacyMode?: boolean;
}

export interface AiResponse {
  content: string;
  citations: Citation[];
  tokensUsed: number;
  modelUsed: string;
  disclaimer: string;
  suggestedActions?: SuggestedAction[];
}

export interface SuggestedAction {
  type: 'generate_diffida' | 'generate_letter' | 'contact_lawyer' | 'upload_evidence' | 'create_case';
  label: string;
  data?: Record<string, unknown>;
}

export interface ToolResult {
  toolName: string;
  success: boolean;
  data: unknown;
  error?: string;
}

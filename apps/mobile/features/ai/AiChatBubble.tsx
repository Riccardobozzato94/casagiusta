import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import type { Citation } from '@casagiusta/shared/src/types/ai';

interface AiChatBubbleProps {
  message: { role: 'user' | 'assistant'; content: string };
  citations?: Citation[];
  isLoading?: boolean;
}

export function AiChatBubble({ message, citations, isLoading }: AiChatBubbleProps) {
  const [expandedCitations, setExpandedCitations] = useState(false);
  const isUser = message.role === 'user';

  if (isLoading) {
    return (
      <View className="flex-row items-start mb-4 px-4">
        <View className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full items-center justify-center mr-3">
          <Text className="text-primary-700 text-sm">{'\u2696\uFE0F'}</Text>
        </View>
        <View className="bg-surface-secondary dark:bg-surface-dark-secondary rounded-2xl rounded-tl-sm p-4 max-w-[80%]">
          <View className="flex-row space-x-1">
            <View className="w-2 h-2 bg-primary-600 rounded-full animate-pulse" />
            <View className="w-2 h-2 bg-primary-600 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
            <View className="w-2 h-2 bg-primary-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
          </View>
        </View>
      </View>
    );
  }

  return (
    <View className={`flex-row mb-4 px-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <View className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full items-center justify-center mr-3 mt-1">
          <Text className="text-primary-700 text-sm">{'\u2696\uFE0F'}</Text>
        </View>
      )}

      <View className={`max-w-[80%] ${isUser ? 'bg-primary-600' : 'bg-surface-secondary dark:bg-surface-dark-secondary'} rounded-2xl ${isUser ? 'rounded-tr-sm' : 'rounded-tl-sm'} p-4`}>
        <Text className={`text-base ${isUser ? 'text-white' : 'text-text-primary dark:text-white'}`}>
          {message.content}
        </Text>

        {citations && citations.length > 0 && (
          <TouchableOpacity
            onPress={() => setExpandedCitations(!expandedCitations)}
            className="mt-3 pt-3 border-t border-border-light dark:border-border-dark"
            activeOpacity={0.7}
          >
            <Text className={`text-xs font-semibold ${isUser ? 'text-primary-200' : 'text-primary-600 dark:text-primary-400'}`}>
              {expandedCitations ? 'Nascondi' : 'Mostra'} fonti ({citations.length})
            </Text>

            {expandedCitations && citations.map((citation, idx) => (
              <View key={idx} className="mt-2">
                <Text className={`text-xs font-mono ${isUser ? 'text-primary-100' : 'text-primary-600 dark:text-primary-400'}`}>
                  {citation.source} {citation.sourceReference}
                  {citation.article ? ` - ${citation.article}` : ''}
                </Text>
                <Text className={`text-xs mt-0.5 ${isUser ? 'text-primary-200' : 'text-text-secondary dark:text-text-dark-secondary'}`}>
                  "{citation.text.slice(0, 120)}..."
                </Text>
              </View>
            ))}
          </TouchableOpacity>
        )}

        {!isUser && (
          <Text className="text-xs text-text-tertiary dark:text-text-dark-tertiary mt-3 italic">
            {'\u26A0\uFE0F'} Informazione non vincolante. Consulta un avvocato.
          </Text>
        )}
      </View>

      {isUser && (
        <View className="w-8 h-8 bg-primary-600 rounded-full items-center justify-center ml-3 mt-1">
          <Text className="text-white text-sm">{'\u{1F464}'}</Text>
        </View>
      )}
    </View>
  );
}

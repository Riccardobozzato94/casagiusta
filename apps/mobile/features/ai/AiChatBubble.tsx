import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FadeInView } from '@/components/animations/FadeInView';
import { StreamingText } from '@/features/ai/StreamingText';
import type { Citation } from '@casagiusta/shared/src/types/ai';

interface AiChatBubbleProps {
  message: { role: 'user' | 'assistant'; content: string };
  citations?: Citation[];
  isLoading?: boolean;
  stream?: boolean;
  onStreamComplete?: () => void;
}

export function AiChatBubble({ message, citations, isLoading, stream = false, onStreamComplete }: AiChatBubbleProps) {
  const [expandedCitations, setExpandedCitations] = useState(false);
  const isUser = message.role === 'user';

  if (isLoading) {
    return (
      <FadeInView direction="up" distance={12}>
        <View className="flex-row items-start mb-4 px-4">
          <View className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full items-center justify-center mr-3">
            <Text className="text-primary-700 text-sm">{'\u2696\uFE0F'}</Text>
          </View>
          <View className="bg-surface-secondary dark:bg-surface-dark-secondary rounded-2xl rounded-tl-sm p-4 max-w-[80%]">
            <View className="flex-row space-x-1">
              <View className="w-2 h-2 bg-primary-600 rounded-full" style={{ opacity: 0.4 }} />
              <View className="w-2 h-2 bg-primary-600 rounded-full" style={{ opacity: 0.6 }} />
              <View className="w-2 h-2 bg-primary-600 rounded-full" style={{ opacity: 0.8 }} />
            </View>
          </View>
        </View>
      </FadeInView>
    );
  }

  return (
    <FadeInView direction={isUser ? 'down' : 'up'} distance={16} duration={300}>
      <View className={`flex-row mb-4 px-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
        {!isUser && (
          <View className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full items-center justify-center mr-3 mt-1">
            <Text className="text-primary-700 text-sm">{'\u2696\uFE0F'}</Text>
          </View>
        )}

        <View className={`max-w-[80%] ${isUser ? 'bg-primary-600' : 'bg-surface-secondary dark:bg-surface-dark-secondary'} rounded-2xl ${isUser ? 'rounded-tr-sm' : 'rounded-tl-sm'} p-4`}>
          {isUser ? (
            <Text className={`text-base text-white`}>
              {message.content}
            </Text>
          ) : (
            <Text className={`text-base text-text-primary dark:text-white`}>
              {stream ? (
                <StreamingText
                  text={message.content}
                  speed={15}
                  onComplete={onStreamComplete}
                  testID="streaming-text"
                />
              ) : (
                message.content
              )}
            </Text>
          )}

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
                <FadeInView key={idx} delay={idx * 50} direction="up" distance={8}>
                  <View className="mt-2">
                    <Text className={`text-xs font-mono ${isUser ? 'text-primary-100' : 'text-primary-600 dark:text-primary-400'}`}>
                      {citation.source} {citation.sourceReference}
                      {citation.article ? ` - ${citation.article}` : ''}
                    </Text>
                    <Text className={`text-xs mt-0.5 ${isUser ? 'text-primary-200' : 'text-text-secondary dark:text-text-dark-secondary'}`}>
                      "{citation.text.slice(0, 120)}..."
                    </Text>
                  </View>
                </FadeInView>
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
    </FadeInView>
  );
}

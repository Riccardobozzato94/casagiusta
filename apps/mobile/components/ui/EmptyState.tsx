import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  variant?: 'default' | 'calm' | 'encouraging';
}

const bgColors: Record<string, string> = {
  default: 'bg-surface-secondary dark:bg-surface-dark-secondary',
  calm: 'bg-primary-50 dark:bg-primary-900/20',
  encouraging: 'bg-accent-50 dark:bg-accent-900/20',
};

export function EmptyState({ icon, title, description, actionLabel, onAction, variant = 'default' }: EmptyStateProps) {
  return (
    <View className={`${bgColors[variant]} rounded-3xl p-8 items-center mx-4 my-4`}>
      <Text className="text-5xl mb-4">{icon}</Text>
      <Text className="text-lg font-display font-bold text-text-primary dark:text-white text-center mb-2">
        {title}
      </Text>
      <Text className="text-sm text-text-secondary dark:text-text-dark-secondary text-center mb-6 leading-5">
        {description}
      </Text>
      {actionLabel && onAction && (
        <TouchableOpacity
          onPress={onAction}
          className="bg-primary-600 py-3 px-8 rounded-xl active:bg-primary-700"
          activeOpacity={0.8}
        >
          <Text className="text-white font-semibold">{actionLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

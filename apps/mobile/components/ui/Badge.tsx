import React from 'react';
import { View, Text } from 'react-native';

interface BadgeProps {
  label: string;
  variant: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  size?: 'sm' | 'md';
}

const variantStyles: Record<string, { container: string; text: string }> = {
  success: { container: 'bg-success/15', text: 'text-success' },
  warning: { container: 'bg-warning/15', text: 'text-warning' },
  danger: { container: 'bg-danger/15', text: 'text-danger' },
  info: { container: 'bg-info/15', text: 'text-info' },
  neutral: { container: 'bg-surface-tertiary dark:bg-surface-dark-tertiary', text: 'text-text-tertiary dark:text-text-dark-tertiary' },
};

const sizeStyles: Record<string, { container: string; text: string }> = {
  sm: { container: 'px-2 py-0.5', text: 'text-xs' },
  md: { container: 'px-3 py-1', text: 'text-sm' },
};

export function Badge({ label, variant, size = 'md' }: BadgeProps) {
  const v = variantStyles[variant];
  const s = sizeStyles[size];

  return (
    <View className={`rounded-full ${v.container} ${s.container}`}>
      <Text className={`font-semibold ${v.text} ${s.text}`}>
        {label}
      </Text>
    </View>
  );
}

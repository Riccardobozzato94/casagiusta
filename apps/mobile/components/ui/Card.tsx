import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: 'default' | 'elevated' | 'outlined' | 'alert';
  className?: string;
}

const variantStyles: Record<string, string> = {
  default: 'bg-surface-primary dark:bg-surface-dark-primary',
  elevated: 'bg-surface-primary dark:bg-surface-dark-primary shadow-md shadow-black/5',
  outlined: 'bg-surface-primary dark:bg-surface-dark-primary border border-border-light dark:border-border-dark',
  alert: 'bg-danger-50 dark:bg-danger-900/20 border border-danger-200 dark:border-danger-800',
};

export function Card({ children, onPress, variant = 'default', className = '' }: CardProps) {
  const Wrapper = onPress ? TouchableOpacity : View;

  return (
    <Wrapper
      onPress={onPress}
      className={`${variantStyles[variant]} rounded-2xl p-4 ${className}`}
      activeOpacity={onPress ? 0.7 : 1}
    >
      {children}
    </Wrapper>
  );
}

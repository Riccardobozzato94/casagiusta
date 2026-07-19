import React from 'react';
import { View } from 'react-native';
import { ScaleOnPress } from '@/components/animations/ScaleOnPress';
import { FadeInView } from '@/components/animations/FadeInView';

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: 'default' | 'elevated' | 'outlined' | 'alert';
  className?: string;
  animate?: boolean;
  delay?: number;
}

const variantStyles: Record<string, string> = {
  default: 'bg-surface-primary dark:bg-surface-dark-primary',
  elevated: 'bg-surface-primary dark:bg-surface-dark-primary shadow-md shadow-black/5',
  outlined: 'bg-surface-primary dark:bg-surface-dark-primary border border-border-light dark:border-border-dark',
  alert: 'bg-danger-50 dark:bg-danger-900/20 border border-danger-200 dark:border-danger-800',
};

export function Card({ children, onPress, variant = 'default', className = '', animate = true, delay = 0 }: CardProps) {
  const content = (
    <View className={`${variantStyles[variant]} rounded-2xl p-4 ${className}`}>
      {children}
    </View>
  );

  if (onPress) {
    return (
      <ScaleOnPress onPress={onPress}>
        {animate ? (
          <FadeInView delay={delay} distance={16}>
            {content}
          </FadeInView>
        ) : content}
      </ScaleOnPress>
    );
  }

  return animate ? (
    <FadeInView delay={delay} distance={16}>
      {content}
    </FadeInView>
  ) : content;
}

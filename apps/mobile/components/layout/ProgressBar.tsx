import { View } from 'react-native';

interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = (current / total) * 100;
  return (
    <View className="h-1 bg-border-light dark:bg-border-dark rounded-full mx-4 my-2">
      <View
        className="h-full bg-primary-600 rounded-full transition-all"
        style={{ width: `${percentage}%` }}
      />
    </View>
  );
}

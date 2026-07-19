import { useRef, useEffect } from 'react';
import { Animated, View } from 'react-native';

interface SkeletonLoaderProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  className?: string;
}

export function SkeletonLoader({
  width = '100%',
  height = 16,
  borderRadius = 8,
}: SkeletonLoaderProps) {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        {
          width: width as any,
          height,
          borderRadius,
          backgroundColor: '#E2E8F0',
          opacity,
        },
      ]}
    />
  );
}

/** Pre-built skeleton layouts for common patterns */
export function CardSkeleton() {
  return (
    <View className="bg-surface-primary dark:bg-surface-dark-primary rounded-2xl p-4 space-y-3 mb-4 mx-4">
      <SkeletonLoader width="60%" height={20} />
      <SkeletonLoader width="100%" height={14} />
      <SkeletonLoader width="80%" height={14} />
      <View className="flex-row justify-between mt-2">
        <SkeletonLoader width="30%" height={32} borderRadius={16} />
        <SkeletonLoader width="20%" height={32} borderRadius={16} />
      </View>
    </View>
  );
}

export function ListSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <View className="px-4 space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <View key={i} className="flex-row items-center space-x-3">
          <SkeletonLoader width={40} height={40} borderRadius={20} />
          <View className="flex-1 space-y-2">
            <SkeletonLoader width="70%" height={14} />
            <SkeletonLoader width="40%" height={12} />
          </View>
        </View>
      ))}
    </View>
  );
}

export function ChatSkeleton() {
  return (
    <View className="px-4 space-y-4">
      {/* User message */}
      <View className="flex-row justify-end">
        <SkeletonLoader width="70%" height={48} borderRadius={16} />
      </View>
      {/* AI response */}
      <View className="flex-row items-start space-x-3">
        <SkeletonLoader width={32} height={32} borderRadius={16} />
        <View className="flex-1 space-y-2">
          <SkeletonLoader width="90%" height={14} />
          <SkeletonLoader width="75%" height={14} />
          <SkeletonLoader width="50%" height={14} />
        </View>
      </View>
      {/* User message */}
      <View className="flex-row justify-end">
        <SkeletonLoader width="50%" height={40} borderRadius={16} />
      </View>
      {/* AI response */}
      <View className="flex-row items-start space-x-3">
        <SkeletonLoader width={32} height={32} borderRadius={16} />
        <View className="flex-1 space-y-2">
          <SkeletonLoader width="85%" height={14} />
          <SkeletonLoader width="60%" height={14} />
        </View>
      </View>
    </View>
  );
}

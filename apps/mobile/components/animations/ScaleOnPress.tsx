import { useRef } from 'react';
import { Animated, Pressable, type ViewStyle } from 'react-native';

interface ScaleOnPressProps {
  children: React.ReactNode;
  onPress?: () => void;
  scaleTo?: number;
  duration?: number;
  style?: ViewStyle;
  className?: string;
  disabled?: boolean;
}

export function ScaleOnPress({
  children,
  onPress,
  scaleTo = 0.96,
  duration = 100,
  style,
  disabled = false,
}: ScaleOnPressProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.timing(scale, {
      toValue: scaleTo,
      duration,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(scale, {
      toValue: 1,
      duration,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
    >
      <Animated.View style={[{ transform: [{ scale: scale }] }, style]}>
        {children}
      </Animated.View>
    </Pressable>
  );
}

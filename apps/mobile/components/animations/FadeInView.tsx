import { useRef, useEffect } from 'react';
import { Animated, type ViewStyle } from 'react-native';

interface FadeInViewProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  style?: ViewStyle;
  className?: string;
}

export function FadeInView({
  children,
  delay = 0,
  duration = 400,
  direction = 'up',
  distance = 24,
  style,
}: FadeInViewProps) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translate = useRef(new Animated.Value(distance)).current;

  useEffect(() => {
    const animations: Animated.CompositeAnimation[] = [
      Animated.timing(opacity, {
        toValue: 1,
        duration,
        delay,
        useNativeDriver: true,
      }),
    ];

    if (direction !== 'none') {
      animations.push(
        Animated.timing(translate, {
          toValue: 0,
          duration,
          delay,
          useNativeDriver: true,
        })
      );
    }

    Animated.parallel(animations).start();
  }, [opacity, translate, duration, delay, direction, distance]);

  const getTransform = () => {
    switch (direction) {
      case 'up':
        return [{ translateY: translate }];
      case 'down':
        return [{ translateY: Animated.multiply(translate, -1) }];
      case 'left':
        return [{ translateX: translate }];
      case 'right':
        return [{ translateX: Animated.multiply(translate, -1) }];
      case 'none':
        return [];
    }
  };

  return (
    <Animated.View
      style={[{ opacity, transform: getTransform() }, style]}
    >
      {children}
    </Animated.View>
  );
}

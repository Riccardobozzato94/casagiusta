import { useState, useEffect, useRef } from 'react';
import { Text, type TextProps } from 'react-native';

interface StreamingTextProps extends TextProps {
  text: string;
  speed?: number;
  enabled?: boolean;
  onComplete?: () => void;
}

export function StreamingText({
  text,
  speed = 20,
  enabled = true,
  onComplete,
  style,
  ...textProps
}: StreamingTextProps) {
  const [displayedText, setDisplayedText] = useState(enabled ? '' : text);
  const indexRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!enabled) {
      setDisplayedText(text);
      return;
    }

    // Reset when text changes
    indexRef.current = 0;
    setDisplayedText('');
    let currentIndex = 0;

    // Simulate streaming by revealing characters one at a time
    // Batch characters for more natural feel
    const batchSize = Math.max(1, Math.floor(text.length / 80) + 1);

    timerRef.current = setInterval(() => {
      currentIndex += batchSize;
      if (currentIndex >= text.length) {
        setDisplayedText(text);
        if (timerRef.current) clearInterval(timerRef.current);
        onComplete?.();
      } else {
        setDisplayedText(text.slice(0, currentIndex));
      }
    }, speed);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [text, enabled, speed, onComplete]);

  return (
    <Text style={style} {...textProps}>
      {displayedText}
      {displayedText !== text && enabled && (
        <Text className="text-primary-600 dark:text-primary-400 animate-pulse">
          |
        </Text>
      )}
    </Text>
  );
}

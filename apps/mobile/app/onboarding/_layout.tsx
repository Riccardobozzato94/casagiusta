import { useState, createContext, useContext, useCallback } from 'react';
import { View } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { ProgressBar } from '@/components/layout/ProgressBar';

const ONBOARDING_STEPS = ['welcome', 'upload-contract', 'analyzing-contract', 'contract-result', 'completed'];

interface OnboardingContextValue {
  currentStep: number;
  totalSteps: number;
  goNext: () => void;
  goBack: () => void;
}

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

export function useOnboarding() {
  const ctx = useContext(OnboardingContext);
  if (!ctx) throw new Error('useOnboarding must be used within OnboardingLayout');
  return ctx;
}

export default function OnboardingLayout() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);

  const goNext = useCallback(() => {
    const next = currentIndex + 1;
    if (next < ONBOARDING_STEPS.length) {
      setCurrentIndex(next);
      router.push(`/onboarding/${ONBOARDING_STEPS[next]}`);
    }
  }, [currentIndex, router]);

  const goBack = useCallback(() => {
    const prev = currentIndex - 1;
    if (prev >= 0) {
      setCurrentIndex(prev);
      router.back();
    }
  }, [currentIndex, router]);

  const value: OnboardingContextValue = {
    currentStep: currentIndex + 1,
    totalSteps: ONBOARDING_STEPS.length,
    goNext,
    goBack,
  };

  return (
    <OnboardingContext.Provider value={value}>
      <View className="flex-1 bg-surface-dark-primary">
        <ProgressBar current={currentIndex + 1} total={ONBOARDING_STEPS.length} />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="welcome" />
          <Stack.Screen name="upload-contract" />
          <Stack.Screen name="analyzing-contract" />
          <Stack.Screen name="contract-result" />
          <Stack.Screen name="completed" />
        </Stack>
      </View>
    </OnboardingContext.Provider>
  );
}

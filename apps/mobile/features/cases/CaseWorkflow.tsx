import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ProgressBar } from '@/components/layout/ProgressBar';

interface Step {
  id: string;
  title: string;
  component: React.ReactNode;
}

interface CaseWorkflowProps {
  steps: Step[];
  onComplete: (data: Record<string, unknown>) => void;
  onCancel: () => void;
}

export function CaseWorkflow({ steps, onComplete, onCancel }: CaseWorkflowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [collectedData, setCollectedData] = useState<Record<string, unknown>>({});

  const handleNext = useCallback((stepData?: Record<string, unknown>) => {
    const newData = { ...collectedData, ...stepData };
    if (currentStep < steps.length - 1) {
      setCollectedData(newData);
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(newData);
    }
  }, [currentStep, collectedData, steps.length, onComplete]);

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <View className="flex-1 bg-surface-primary dark:bg-surface-dark-primary">
      <ProgressBar current={currentStep + 1} total={steps.length} />

      <Text className="text-text-tertiary dark:text-text-dark-tertiary text-sm text-center mb-2">
        Passo {currentStep + 1} di {steps.length}
      </Text>

      <Text className="text-xl font-display font-bold text-text-primary dark:text-white text-center mb-6">
        {steps[currentStep].title}
      </Text>

      <View className="flex-1 px-4">
        {React.cloneElement(steps[currentStep].component as React.ReactElement, {
          onNext: handleNext,
          data: collectedData,
        })}
      </View>

      <View className="flex-row justify-between px-4 pb-6 pt-4 border-t border-border-light dark:border-border-dark">
        <TouchableOpacity onPress={onCancel} className="py-3 px-6 active:opacity-70">
          <Text className="text-text-secondary dark:text-text-dark-secondary font-medium">Annulla</Text>
        </TouchableOpacity>

        {currentStep < steps.length - 1 ? (
          <TouchableOpacity
            onPress={() => handleNext()}
            className="bg-primary-600 py-3 px-8 rounded-xl active:bg-primary-700"
            activeOpacity={0.8}
          >
            <Text className="text-white font-semibold">Continua</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => onComplete(collectedData)}
            className="bg-primary-600 py-3 px-8 rounded-xl active:bg-primary-700"
            activeOpacity={0.8}
          >
            <Text className="text-white font-semibold">Crea Pratica</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

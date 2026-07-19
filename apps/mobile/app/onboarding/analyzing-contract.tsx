import { useState, useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const scanningMessages = [
  'Stiamo leggendo il contratto...',
  'Cerchiamo clausole importanti...',
  'Tutto a posto! Ecco cosa abbiamo trovato.',
];

const SKELETON_COUNT = 5;
const PHASE_DURATION = 1000;
const TOTAL_DURATION = scanningMessages.length * PHASE_DURATION + SKELETON_COUNT * 400;

export default function AnalyzingContractScreen() {
  const router = useRouter();
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [visibleSkeletons, setVisibleSkeletons] = useState(0);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start(() => {
        setCurrentMessageIndex((prev) => {
          const next = prev + 1;
          if (next >= scanningMessages.length) {
            clearInterval(messageInterval);
            return prev;
          }
          return next;
        });
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }).start();
      });
    }, PHASE_DURATION);

    return () => clearInterval(messageInterval);
  }, [fadeAnim]);

  useEffect(() => {
    const skeletonInterval = setInterval(() => {
      setVisibleSkeletons((prev) => {
        const next = prev + 1;
        if (next >= SKELETON_COUNT) {
          clearInterval(skeletonInterval);
          return prev;
        }
        return next;
      });
    }, 400);

    return () => clearInterval(skeletonInterval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/onboarding/contract-result');
    }, TOTAL_DURATION);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <SafeAreaView className="flex-1 bg-surface-dark-primary">
      <StatusBar style="light" />
      <View className="flex-1 px-6 pt-8">
        <View className="items-center mb-10">
          <View className="w-24 h-24 bg-primary-700/30 rounded-full items-center justify-center mb-6">
            <Text className="text-5xl">🔍</Text>
          </View>
          <Animated.Text
            style={{ opacity: fadeAnim }}
            className="text-xl font-display font-bold text-white text-center"
          >
            {scanningMessages[currentMessageIndex]}
          </Animated.Text>
        </View>

        <View className="space-y-3">
          {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
            <View
              key={index}
              className={`bg-surface-dark-secondary rounded-xl p-4 flex-row items-center transition-opacity ${
                index < visibleSkeletons ? 'opacity-100' : 'opacity-20'
              }`}
            >
              <View className="w-10 h-10 bg-surface-dark-tertiary rounded-lg" />
              <View className="ml-3 flex-1 space-y-2">
                <View className="h-3 bg-surface-dark-tertiary rounded-full w-3/4" />
                <View className="h-2 bg-surface-dark-tertiary rounded-full w-1/2" />
              </View>
              <View className="w-6 h-6 bg-surface-dark-tertiary rounded-full" />
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

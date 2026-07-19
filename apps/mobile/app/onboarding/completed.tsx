import { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { storage } from '@/lib/storage';
import { STORAGE_KEYS } from '@/lib/constants';

export default function OnboardingCompletedScreen() {
  const router = useRouter();
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 1,
        damping: 8,
        stiffness: 100,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, [scaleAnim, fadeAnim]);

  const handleStart = () => {
    storage.set(STORAGE_KEYS.ONBOARDING_COMPLETED, true);
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView className="flex-1 bg-surface-dark-primary">
      <StatusBar style="light" />
      <View className="flex-1 justify-center px-6">
        <View className="items-center mb-10">
          <Animated.View
            style={{ transform: [{ scale: scaleAnim }] }}
            className="w-28 h-28 bg-success/20 rounded-full items-center justify-center mb-8"
          >
            <Text className="text-6xl">✅</Text>
          </Animated.View>

          <Animated.View style={{ opacity: fadeAnim }} className="items-center">
            <Text className="text-3xl font-display font-bold text-white mb-3 text-center">
              Pronto!{'\n'}Ecco la tua Home
            </Text>
            <Text className="text-base font-body text-text-dark-secondary text-center leading-6">
              Ecco cosa trovi nella schermata principale:
            </Text>
          </Animated.View>
        </View>

        <Animated.View
          style={{ opacity: fadeAnim }}
          className="space-y-4 mb-12"
        >
          <View className="flex-row items-center bg-surface-dark-secondary rounded-xl p-4">
            <View className="w-12 h-12 bg-primary-700/30 rounded-xl items-center justify-center mr-4">
              <Text className="text-2xl">🛡️</Text>
            </View>
            <View className="flex-1">
              <Text className="text-white font-semibold text-base">Le tue prove</Text>
              <Text className="text-text-dark-tertiary text-sm">
                Carica e organizza foto, video e documenti
              </Text>
            </View>
          </View>

          <View className="flex-row items-center bg-surface-dark-secondary rounded-xl p-4">
            <View className="w-12 h-12 bg-primary-700/30 rounded-xl items-center justify-center mr-4">
              <Text className="text-2xl">💬</Text>
            </View>
            <View className="flex-1">
              <Text className="text-white font-semibold text-base">Giusta, la tua AI</Text>
              <Text className="text-text-dark-tertiary text-sm">
                Fai domande sui tuoi diritti e sul contratto
              </Text>
            </View>
          </View>

          <View className="flex-row items-center bg-surface-dark-secondary rounded-xl p-4">
            <View className="w-12 h-12 bg-primary-700/30 rounded-xl items-center justify-center mr-4">
              <Text className="text-2xl">📋</Text>
            </View>
            <View className="flex-1">
              <Text className="text-white font-semibold text-base">I tuoi casi</Text>
              <Text className="text-text-dark-tertiary text-sm">
                Tieni traccia dei procedimenti e delle scadenze
              </Text>
            </View>
          </View>
        </Animated.View>

        <Animated.View style={{ opacity: fadeAnim }}>
          <TouchableOpacity
            onPress={handleStart}
            className="bg-primary-600 py-4 px-6 rounded-xl items-center justify-center"
            activeOpacity={0.8}
          >
            <Text className="text-white font-semibold text-base">Inizia</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

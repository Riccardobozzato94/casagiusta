import { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function MagicLinkSentScreen() {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email: string }>();
  const [linkDetected, setLinkDetected] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const handleResend = async () => {
    if (countdown > 0) return;
    setResending(true);
    try {
      const { useAuthStore } = await import('@/providers/AuthProvider');
      const store = useAuthStore.getState?.();
      if (store) {
        await store.signInWithMagicLink(email);
      }
      setCountdown(30);
    } catch {
      // silent handle — user can retry
    } finally {
      setResending(false);
    }
  };

  const handleLinkClicked = useCallback(() => {
    if (!linkDetected) return;
    router.replace('/onboarding/welcome');
  }, [linkDetected, router]);

  const handleDifferentEmail = () => {
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-surface-dark-primary">
      <StatusBar style="light" />
      <View className="flex-1 justify-center px-6">
        <View className="items-center mb-12">
          <View className="w-24 h-24 bg-primary-700/30 rounded-full items-center justify-center mb-8">
            <Text className="text-5xl">✉️</Text>
          </View>
          <Text className="text-2xl font-display font-bold text-white mb-3 text-center">
            Ti abbiamo inviato{'\n'}un link magico
          </Text>
          <Text className="text-base font-body text-text-dark-secondary text-center mb-2">
            Controlla la tua casella di posta
          </Text>
          {email ? (
            <View className="bg-surface-dark-secondary px-5 py-3 rounded-lg mt-2">
              <Text className="text-white font-semibold text-base font-body">{email}</Text>
            </View>
          ) : null}
          <Text className="text-sm font-body text-text-dark-tertiary text-center mt-6">
            Se non trovi l'email, controlla la cartella spam o{'\n'}assicurati di aver inserito l'indirizzo corretto.
          </Text>
        </View>

        <View className="space-y-3">
          <TouchableOpacity
            onPress={handleLinkClicked}
            disabled={!linkDetected}
            className={`py-4 px-6 rounded-xl items-center justify-center ${
              linkDetected ? 'bg-primary-600' : 'bg-surface-dark-secondary'
            }`}
            activeOpacity={0.8}
          >
            <Text
              className={`font-semibold text-base ${
                linkDetected ? 'text-white' : 'text-text-dark-tertiary'
              }`}
            >
              {linkDetected ? '✅  Ho cliccato il link, continua!' : 'Ho cliccato il link'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleResend}
            disabled={countdown > 0 || resending}
            className="py-4 px-6 rounded-xl items-center justify-center border border-border-dark"
            activeOpacity={0.8}
          >
            {resending ? (
              <ActivityIndicator color="#94a3b8" />
            ) : (
              <Text className="text-text-dark-secondary font-semibold text-base">
                {countdown > 0
                  ? `Invia di nuovo (${countdown}s)`
                  : 'Invia di nuovo'}
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={handleDifferentEmail} className="py-3 items-center">
            <Text className="text-primary-400 text-sm font-body">Usa un'altra email</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

import { Stack } from 'expo-router';
import { AppProviders } from '@/providers/AppProviders';
import { useEffect } from 'react';
import { useAuthStore } from '@/providers/AuthProvider';
import { useSubscriptionStore } from '@/providers/SubscriptionProvider';
import { View, ActivityIndicator, Text } from 'react-native';

export default function RootLayout() {
  const { initialize, isLoading, user } = useAuthStore();
  const { loadSubscription } = useSubscriptionStore();

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    if (user) {
      loadSubscription();
    }
  }, [user]);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-surface-primary dark:bg-surface-dark-primary">
        <ActivityIndicator size="large" color="#0F766E" />
        <Text className="mt-4 text-text-secondary dark:text-text-dark-secondary font-body">
          Caricamento...
        </Text>
      </View>
    );
  }

  return (
    <AppProviders>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" options={{ animation: 'fade' }} />
        <Stack.Screen name="onboarding" options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="(tabs)" options={{ animation: 'fade' }} />
        <Stack.Screen name="emergency" options={{
          animation: 'slide_from_bottom',
          presentation: 'modal',
        }} />
      </Stack>
    </AppProviders>
  );
}

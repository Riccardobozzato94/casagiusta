import { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '@/lib/supabase';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        if (session?.user?.is_anonymous) {
          router.replace('/(tabs)');
        } else {
          router.replace('/onboarding/welcome');
        }
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [router]);

  return (
    <View className="flex-1 items-center justify-center bg-surface-dark-primary">
      <ActivityIndicator size="large" color="#0F766E" />
      <Text className="mt-4 text-text-dark-secondary font-body">
        Autenticazione in corso...
      </Text>
    </View>
  );
}

import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/providers/AuthProvider';
import { StatusBar } from 'expo-status-bar';

export default function LoginScreen() {
  const router = useRouter();
  const { signInWithMagicLink, signInWithApple, signInWithGoogle, signInAnonymously } = useAuthStore();
  const [email, setEmail] = useState('');
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleMagicLink = async () => {
    if (!email.trim() || !email.includes('@')) {
      Alert.alert('Email non valida', 'Inserisci un indirizzo email valido.');
      return;
    }
    setIsLoading('email');
    try {
      await signInWithMagicLink(email.trim());
      router.push({ pathname: '/(auth)/magic-link-sent', params: { email: email.trim() } });
    } catch (error: any) {
      Alert.alert('Errore', error.message || 'Impossibile inviare il link. Riprova.');
    } finally {
      setIsLoading(null);
    }
  };

  const handleApple = async () => {
    setIsLoading('apple');
    try {
      await signInWithApple();
    } catch (error: any) {
      Alert.alert('Errore', error.message || 'Accesso con Apple non riuscito.');
    } finally {
      setIsLoading(null);
    }
  };

  const handleGoogle = async () => {
    setIsLoading('google');
    try {
      await signInWithGoogle();
    } catch (error: any) {
      Alert.alert('Errore', error.message || 'Accesso con Google non riuscito.');
    } finally {
      setIsLoading(null);
    }
  };

  const handleAnonymous = async () => {
    setIsLoading('anonymous');
    try {
      await signInAnonymously();
    } catch (error: any) {
      Alert.alert('Errore', error.message || 'Impossibile accedere in modalità anonima.');
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-surface-dark-primary">
      <StatusBar style="light" />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
        <View className="flex-1 justify-center px-6">
          <View className="items-center mb-12">
            <View className="w-20 h-20 bg-primary-700 rounded-2xl items-center justify-center mb-6">
              <Text className="text-4xl">🏠</Text>
            </View>
            <Text className="text-3xl font-display font-bold text-white mb-2">
              CasaGiusta
            </Text>
            <Text className="text-base font-body text-text-dark-secondary text-center">
              Il tuo scudo digitale.{'\n'}I tuoi diritti, subito.
            </Text>
          </View>

          <View className="space-y-3 mb-8">
            {!showEmailInput ? (
              <TouchableOpacity
                onPress={() => setShowEmailInput(true)}
                className="bg-primary-600 py-4 px-6 rounded-xl flex-row items-center justify-center"
                activeOpacity={0.8}
              >
                <Text className="text-white font-semibold text-base">✉️  Continua con Email</Text>
              </TouchableOpacity>
            ) : (
              <View className="space-y-2">
                <TextInput
                  className="bg-surface-dark-secondary text-white py-4 px-6 rounded-xl text-base font-body"
                  placeholder="Inserisci la tua email"
                  placeholderTextColor="#64748b"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoFocus
                />
                <TouchableOpacity
                  onPress={handleMagicLink}
                  disabled={isLoading === 'email'}
                  className="bg-primary-600 py-4 px-6 rounded-xl flex-row items-center justify-center"
                  activeOpacity={0.8}
                >
                  {isLoading === 'email' ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <Text className="text-white font-semibold text-base">Invia Link Magico</Text>
                  )}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setShowEmailInput(false)} className="py-2">
                  <Text className="text-text-dark-tertiary text-center text-sm">Indietro</Text>
                </TouchableOpacity>
              </View>
            )}

            <View className="flex-row items-center my-4">
              <View className="flex-1 h-px bg-border-dark" />
              <Text className="mx-4 text-text-dark-tertiary text-sm">oppure</Text>
              <View className="flex-1 h-px bg-border-dark" />
            </View>

            <TouchableOpacity
              onPress={handleApple}
              disabled={isLoading !== null}
              className="bg-white py-4 px-6 rounded-xl flex-row items-center justify-center"
              activeOpacity={0.8}
            >
              {isLoading === 'apple' ? (
                <ActivityIndicator color="black" />
              ) : (
                <>
                  <Text className="text-lg mr-3"></Text>
                  <Text className="text-black font-semibold text-base">Continua con Apple</Text>
                </>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleGoogle}
              disabled={isLoading !== null}
              className="bg-white py-4 px-6 rounded-xl flex-row items-center justify-center"
              activeOpacity={0.8}
            >
              {isLoading === 'google' ? (
                <ActivityIndicator color="black" />
              ) : (
                <>
                  <Text className="text-lg mr-3">G</Text>
                  <Text className="text-black font-semibold text-base">Continua con Google</Text>
                </>
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={handleAnonymous}
            disabled={isLoading !== null}
            className="items-center py-3"
          >
            {isLoading === 'anonymous' ? (
              <ActivityIndicator color="#94a3b8" />
            ) : (
              <Text className="text-text-dark-tertiary text-sm">
                Continua in modalità anonima →
              </Text>
            )}
          </TouchableOpacity>
        </View>

        <View className="px-6 pb-6">
          <Text className="text-text-dark-tertiary text-xs text-center">
            Accedendo accetti i{' '}
            <Text className="text-primary-400 underline">Termini di Servizio</Text> e la{' '}
            <Text className="text-primary-400 underline">Privacy Policy</Text>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

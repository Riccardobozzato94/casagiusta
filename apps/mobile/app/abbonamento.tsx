import { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTheme } from '@/providers/ThemeProvider';
import { PLANS, LIMITS } from '@/lib/constants';

type BillingPeriod = 'monthly' | 'yearly';

const FEATURES: {
  label: string;
  free: string | boolean;
  pro: string | boolean;
  highlight?: boolean;
}[] = [
  { label: 'Richieste AI al giorno', free: `${LIMITS.FREE.AI_QUERIES_PER_DAY}`, pro: 'Illimitate', highlight: true },
  { label: 'Archiviazione prove', free: `${LIMITS.FREE.STORAGE_MB} MB`, pro: `${LIMITS.PRO.STORAGE_MB / 1000} GB` },
  { label: 'Numero di casi', free: `${LIMITS.FREE.EVIDENCE_COUNT}`, pro: 'Illimitati' },
  { label: 'Template legali/mese', free: `${LIMITS.FREE.TEMPLATES_PER_MONTH}`, pro: 'Illimitati' },
  { label: 'Analisi contratto AI', free: true, pro: true },
  { label: 'Diffide e lettere', free: false, pro: true, highlight: true },
  { label: 'Consulenza personalizzata', free: false, pro: true },
  { label: 'Esportazione PDF', free: false, pro: true },
  { label: 'Commissioni legali', free: false, pro: true },
  { label: 'Supporto prioritario', free: false, pro: true },
  { label: 'Niente pubblicità', free: false, pro: true },
  { label: 'Crittografia end-to-end', free: true, pro: true },
];

export default function AbbonamentoScreen() {
  const { isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [periodo, setPeriodo] = useState<BillingPeriod>('monthly');
  const [caricamento, setCaricamento] = useState(false);

  const prezzoMensile = PLANS.PRO_MONTHLY.price;
  const prezzoAnnuale = PLANS.PRO_YEARLY.price;
  const risparmioAnnuale = Math.round((prezzoMensile * 12 - prezzoAnnuale) * 100) / 100;
  const prezzoMostrato = periodo === 'monthly' ? prezzoMensile : prezzoAnnuale;

  const handleAcquista = async () => {
    setCaricamento(true);
    // Simula pagamento
    await new Promise((r) => setTimeout(r, 1500));
    setCaricamento(false);
    Alert.alert('Abbonamento attivato!', 'Benvenuto in CasaGiusta Pro 🎉');
    router.back();
  };

  const showAlert = (title: string, message: string) => {
    Alert.alert(title, message);
  };

  return (
    <View className={`flex-1 ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
      {/* Header */}
      <View
        style={{ paddingTop: insets.top + 12 }}
        className={`flex-row items-center justify-between px-5 pb-4 border-b ${isDark ? 'border-slate-800' : 'border-slate-200'}`}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          className={`w-10 h-10 rounded-full items-center justify-center ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}
          accessibilityLabel="Chiudi"
          accessibilityRole="button"
        >
          <Text className={`text-lg ${isDark ? 'text-white' : 'text-slate-600'}`}>{'\u{2716}'}</Text>
        </TouchableOpacity>
        <Text className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>
          Passa a Pro
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Hero */}
        <View className="items-center pt-8 pb-6 px-5">
          <View className="w-16 h-16 rounded-2xl bg-teal-600/20 items-center justify-center mb-4">
            <Text className="text-3xl">{'\u{2B50}'}</Text>
          </View>
          <Text className={`text-2xl font-bold text-center mb-2 ${isDark ? 'text-white' : 'text-slate-800'}`}>
            Sblocca tutto il potenziale
          </Text>
          <Text className={`text-base text-center leading-6 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Proteggi i tuoi diritti con strumenti avanzati, assistenza AI illimitata e supporto legale.
          </Text>
        </View>

        {/* Period toggle */}
        <View className="px-5 mb-6">
          <View
            className={`flex-row rounded-xl p-1 ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}
          >
            <TouchableOpacity
              onPress={() => setPeriodo('monthly')}
              className={`flex-1 py-3 rounded-lg items-center ${periodo === 'monthly' ? 'bg-teal-600' : ''}`}
              activeOpacity={0.7}
              accessibilityLabel="Abbonamento mensile"
              accessibilityRole="button"
            >
              <Text
                className={`font-semibold text-sm ${periodo === 'monthly' ? 'text-white' : isDark ? 'text-slate-400' : 'text-slate-600'}`}
              >
                Mensile
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setPeriodo('yearly')}
              className={`flex-1 py-3 rounded-lg items-center ${periodo === 'yearly' ? 'bg-teal-600' : ''}`}
              activeOpacity={0.7}
              accessibilityLabel="Abbonamento annuale"
              accessibilityRole="button"
            >
              <Text
                className={`font-semibold text-sm ${periodo === 'yearly' ? 'text-white' : isDark ? 'text-slate-400' : 'text-slate-600'}`}
              >
                Annuale
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Price card */}
        <View className="px-5 mb-6">
          <View
            className={`rounded-2xl p-6 border-2 border-teal-500 ${isDark ? 'bg-slate-800' : 'bg-white'} shadow-lg`}
          >
            <View className="items-center mb-4">
              <Text className={`text-sm font-medium uppercase tracking-wider mb-1 ${isDark ? 'text-teal-400' : 'text-teal-600'}`}>
                Piano Pro
              </Text>
              <View className="flex-row items-baseline gap-1">
                <Text className={`text-5xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>
                  {'\u20AC'}{prezzoMostrato}
                </Text>
                <Text className={`text-base ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  /{periodo === 'monthly' ? 'mese' : 'anno'}
                </Text>
              </View>
              {periodo === 'yearly' && (
                <View className="mt-2 bg-green-100 rounded-full px-3 py-1">
                  <Text className="text-green-700 text-xs font-semibold">
                    Risparmi {'\u20AC'}{risparmioAnnuale}/anno ({Math.round((risparmioAnnuale / (prezzoMensile * 12)) * 100)}%)
                  </Text>
                </View>
              )}
            </View>

            <TouchableOpacity
              onPress={handleAcquista}
              disabled={caricamento}
              className={`bg-teal-600 py-4 rounded-xl items-center ${caricamento ? 'opacity-70' : ''}`}
              activeOpacity={0.8}
              accessibilityLabel={caricamento ? 'Acquisto in corso' : `Abbonati a ${prezzoMostrato} euro ${periodo === 'monthly' ? 'al mese' : 'all\'anno'}`}
              accessibilityRole="button"
            >
              <Text className="text-white font-bold text-base">
                {caricamento ? 'Attivazione in corso...' : `Abbonati a \u20AC${prezzoMostrato}/${periodo === 'monthly' ? 'mese' : 'anno'}`}
              </Text>
            </TouchableOpacity>

            <Text className={`text-xs text-center mt-3 ${isDark ? 'text-slate-400' : 'text-slate-400'}`}>
              Pagamento sicuro via {Platform.OS === 'ios' ? 'Apple Pay' : 'Google Pay'}. Annulla quando vuoi.
            </Text>
          </View>
        </View>

        {/* Payment methods */}
        <View className="px-5 mb-6">
          <View
            className={`rounded-2xl p-4 ${isDark ? 'bg-slate-800' : 'bg-white'} border ${isDark ? 'border-slate-700' : 'border-slate-200'}`}
          >
            <View className="flex-row items-center justify-between mb-3">
              <Text className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-slate-800'}`}>
                Metodo di pagamento
              </Text>
              <Text className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {'\u{1F512}'} Sicuro
              </Text>
            </View>
            <TouchableOpacity
              className={`flex-row items-center gap-3 p-3 rounded-xl ${isDark ? 'bg-slate-700' : 'bg-slate-100'}`}
              activeOpacity={0.7}
              accessibilityLabel="Aggiungi carta di pagamento"
              accessibilityRole="button"
            >
              <Text className="text-2xl">{'\u{1F4B3}'}</Text>
              <View className="flex-1">
                <Text className={`font-medium ${isDark ? 'text-white' : 'text-slate-800'}`}>
                  {Platform.OS === 'ios' ? 'Apple Pay' : 'Google Pay'}
                </Text>
                <Text className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Pagamento veloce e sicuro
                </Text>
              </View>
              <Text className={`text-lg ${isDark ? 'text-slate-400' : 'text-slate-400'}`}>{'\u{2713}'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="mt-2 items-center py-2"
              onPress={() => showAlert('Ripristino acquisti', 'I tuoi acquisti sono stati ripristinati.')}
              accessibilityLabel="Ripristina acquisti"
              accessibilityRole="button"
            >
              <Text className="text-teal-500 text-sm font-medium">Ripristina acquisti</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Feature comparison */}
        <View className="px-5 mb-8">
          <Text className={`text-sm font-semibold mb-4 ${isDark ? 'text-white' : 'text-slate-800'}`}>
            Confronto piani
          </Text>
          <View
            className={`rounded-2xl overflow-hidden border ${isDark ? 'border-slate-700' : 'border-slate-200'}`}
          >
            {/* Table header */}
            <View
              className={`flex-row px-4 py-3 ${isDark ? 'bg-slate-800' : 'bg-slate-50'}`}
            >
              <View className="flex-[2]">
                <Text className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Funzionalità
                </Text>
              </View>
              <View className="flex-1 items-center">
                <Text className={`text-xs font-semibold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Free
                </Text>
              </View>
              <View className="flex-1 items-center">
                <Text className="text-xs font-semibold uppercase tracking-wider text-teal-500">
                  Pro
                </Text>
              </View>
            </View>

            {/* Feature rows */}
            {FEATURES.map((feature, index) => (
              <View
                key={feature.label}
                className={`flex-row px-4 py-3.5 items-center ${
                  index % 2 === 0
                    ? isDark ? 'bg-slate-800/50' : 'bg-white'
                    : isDark ? 'bg-slate-800' : 'bg-slate-50'
                } ${
                  feature.highlight
                    ? isDark ? 'border-l-2 border-teal-500' : 'border-l-2 border-teal-500'
                    : ''
                }`}
              >
                <View className="flex-[2]">
                  <Text
                    className={`text-sm ${
                      feature.highlight ? 'font-semibold' : ''
                    } ${isDark ? 'text-white' : 'text-slate-800'}`}
                  >
                    {feature.label}
                  </Text>
                </View>
                <View className="flex-1 items-center">
                  {typeof feature.free === 'boolean' ? (
                    <Text className={feature.free ? 'text-teal-500' : isDark ? 'text-slate-500' : 'text-slate-400'}>
                      {feature.free ? '\u{2713}' : '\u{2716}'}
                    </Text>
                  ) : (
                    <Text className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      {feature.free}
                    </Text>
                  )}
                </View>
                <View className="flex-1 items-center">
                  {typeof feature.pro === 'boolean' ? (
                    <Text className="text-teal-500">
                      {'\u{2713}'}
                    </Text>
                  ) : (
                    <Text className="text-xs text-teal-500 font-medium">
                      {feature.pro}
                    </Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Trust section */}
        <View className="px-5">
          <View
            className={`rounded-2xl p-5 ${isDark ? 'bg-slate-800' : 'bg-white'} border ${isDark ? 'border-slate-700' : 'border-slate-200'}`}
          >
            <View className="flex-row items-center gap-3 mb-3">
              <Text className="text-2xl">{'\u{1F6E1}\uFE0F'}</Text>
              <Text className={`font-semibold ${isDark ? 'text-white' : 'text-slate-800'}`}>
                Pagamento sicuro
              </Text>
            </View>
            <Text className={`text-sm leading-5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              I pagamenti sono processati in modo sicuro tramite {Platform.OS === 'ios' ? 'Apple Pay' : 'Google Pay'}. 
              I tuoi dati di pagamento non vengono mai salvati sui nostri server. Puoi cancellare 
              l'abbonamento in qualsiasi momento dalle impostazioni del tuo account.
            </Text>
            <View className="flex-row gap-4 mt-4">
              <TouchableOpacity onPress={() => showAlert('Termini di servizio', 'Termini di servizio completi disponibili nella sezione Privacy.')}>
                <Text className="text-teal-500 text-xs">Termini di servizio</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => showAlert('Privacy Policy', 'La tua privacy è importante. Leggi la nostra policy completa.')}>
                <Text className="text-teal-500 text-xs">Privacy Policy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

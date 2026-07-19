import { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/providers/ThemeProvider';

type StatoCaso = 'aperta' | 'in_esame' | 'risolta';

const STATO_MAP: Record<StatoCaso, { label: string; bg: string; text: string }> = {
  aperta: { label: 'Aperta', bg: 'bg-blue-100', text: 'text-blue-700' },
  in_esame: { label: 'In esame', bg: 'bg-yellow-100', text: 'text-yellow-700' },
  risolta: { label: 'Risolta', bg: 'bg-green-100', text: 'text-green-700' },
};

type Evento = {
  id: string;
  label: string;
  descrizione: string;
  data: string;
  completato: boolean;
};

type ProvaCollegata = {
  id: string;
  icona: string;
  titolo: string;
  tipo: string;
};

function StepperItem({ evento, isLast }: { evento: Evento; isLast: boolean }) {
  const { isDark } = useTheme();
  return (
    <View className="flex-row">
      <View className="items-center mr-3">
        <View
          className={`w-8 h-8 rounded-full items-center justify-center ${evento.completato ? 'bg-teal-600' : isDark ? 'bg-slate-700' : 'bg-slate-200'}`}
        >
          {evento.completato ? (
            <Text className="text-white text-sm">{'\u{2713}'}</Text>
          ) : (
            <View className={`w-3 h-3 rounded-full ${isDark ? 'bg-slate-500' : 'bg-slate-300'}`} />
          )}
        </View>
        {!isLast && (
          <View
            className={`flex-1 w-0.5 ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`}
            style={{ minHeight: 40 }}
          />
        )}
      </View>
      <View className="flex-1 pb-6">
        <Text className={`font-semibold ${isDark ? 'text-white' : 'text-slate-800'}`}>
          {evento.label}
        </Text>
        <Text className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          {evento.descrizione}
        </Text>
        <Text className={`text-xs mt-0.5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
          {evento.data}
        </Text>
      </View>
    </View>
  );
}

function ProvaMiniCard({ prova }: { prova: ProvaCollegata }) {
  const { isDark } = useTheme();
  return (
    <View
      className={`flex-row items-center gap-3 rounded-xl p-3 mb-2 ${isDark ? 'bg-slate-800' : 'bg-white'} border ${isDark ? 'border-slate-700' : 'border-slate-200'}`}
    >
      <View
        className={`w-10 h-10 rounded-lg items-center justify-center ${isDark ? 'bg-slate-700' : 'bg-slate-100'}`}
      >
        <Text className="text-lg">{prova.icona}</Text>
      </View>
      <View className="flex-1">
        <Text className={`font-medium ${isDark ? 'text-white' : 'text-slate-800'}`}>
          {prova.titolo}
        </Text>
        <Text className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          {prova.tipo}
        </Text>
      </View>
    </View>
  );
}

function AzioneButton({
  icon,
  label,
  onPress,
}: {
  icon: string;
  label: string;
  onPress: () => void;
}) {
  const { isDark } = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-row items-center gap-3 rounded-xl p-3.5 mb-2 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border shadow-sm`}
      activeOpacity={0.7}
      accessibilityLabel={label}
      accessibilityRole="button"
    >
      <Text className="text-xl">{icon}</Text>
      <Text className={`font-medium ${isDark ? 'text-white' : 'text-slate-700'}`}>{label}</Text>
    </TouchableOpacity>
  );
}

export default function CasoDettaglioScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [stato] = useState<StatoCaso>('aperta');
  const statoConf = STATO_MAP[stato];

  const eventi: Evento[] = [
    {
      id: '1',
      label: 'Apertura caso',
      descrizione: 'Pratica aperta il',
      data: '15 luglio 2026',
      completato: true,
    },
    {
      id: '2',
      label: 'Raccolta prove',
      descrizione: 'In attesa di caricamento documenti',
      data: 'In corso',
      completato: false,
    },
    {
      id: '3',
      label: 'Invio diffida',
      descrizione: 'Generazione documento in sospeso',
      data: 'Da fare',
      completato: false,
    },
    {
      id: '4',
      label: 'Risoluzione',
      descrizione: 'Accordo o sentenza',
      data: 'Non ancora',
      completato: false,
    },
  ];

  const proveCollegate: ProvaCollegata[] = [
    { id: 'p1', icona: '\u{1F4F8}', titolo: 'Danno bagno', tipo: 'Foto · 2 giorni fa' },
    { id: 'p2', icona: '\u{1F4C4}', titolo: 'Email proprietario', tipo: 'Documento · 5 giorni fa' },
  ];

  return (
    <View className={`flex-1 ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <ScrollView
        contentContainerStyle={{ paddingTop: insets.top + 16, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between px-5 mb-5">
          <TouchableOpacity
            onPress={() => router.back()}
            className={`w-9 h-9 rounded-full items-center justify-center ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`}
            accessibilityLabel="Indietro"
            accessibilityRole="button"
          >
            <Text className={isDark ? 'text-white' : 'text-slate-700'}>{'\u{2190}'}</Text>
          </TouchableOpacity>
          <View className={`px-3 py-1 rounded-full ${statoConf.bg}`}>
            <Text className={`text-xs font-semibold ${statoConf.text}`}>
              {statoConf.label}
            </Text>
          </View>
        </View>

        {/* AI Summary */}
        <View
          className={`mx-5 rounded-2xl p-4 mb-6 ${isDark ? 'bg-slate-800' : 'bg-teal-50'} border ${isDark ? 'border-slate-700' : 'border-teal-100'}`}
        >
          <View className="flex-row items-center gap-2 mb-2">
            <Text className="text-xl">{'\u{1F916}'}</Text>
            <Text
              className={`text-sm font-semibold ${isDark ? 'text-teal-400' : 'text-teal-700'}`}
            >
              Riepilogo AI
            </Text>
          </View>
          <Text className={`text-sm leading-5 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            Caso relativo a problematiche contrattuali con il proprietario. Sono state raccolte 2
            prove. La fase successiva consigliata è l'invio di una diffida formale.
          </Text>
        </View>

        {/* Info */}
        <View className="px-5 mb-6">
          <Text
            className={`text-xs uppercase tracking-wider font-semibold mb-3 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}
          >
            Informazioni
          </Text>
          <View
            className={`rounded-2xl p-4 ${isDark ? 'bg-slate-800' : 'bg-white'} border ${isDark ? 'border-slate-700' : 'border-slate-200'}`}
          >
            {[
              { label: 'Proprietario', value: 'Mario Rossi' },
              { label: 'Indirizzo', value: 'Via Roma 42, Milano' },
              { label: 'Data apertura', value: '15 luglio 2026' },
            ].map((item) => (
              <View key={item.label} className="flex-row justify-between py-2">
                <Text className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {item.label}
                </Text>
                <Text className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-800'}`}>
                  {item.value}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Timeline */}
        <View className="px-5 mb-6">
          <Text
            className={`text-xs uppercase tracking-wider font-semibold mb-3 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}
          >
            Timeline
          </Text>
          <View
            className={`rounded-2xl p-4 ${isDark ? 'bg-slate-800' : 'bg-white'} border ${isDark ? 'border-slate-700' : 'border-slate-200'}`}
          >
            {eventi.map((e, idx) => (
              <StepperItem key={e.id} evento={e} isLast={idx === eventi.length - 1} />
            ))}
          </View>
        </View>

        {/* Prove collegate */}
        <View className="px-5 mb-6">
          <Text
            className={`text-xs uppercase tracking-wider font-semibold mb-3 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}
          >
            Prove collegate
          </Text>
          {proveCollegate.map((p) => (
            <ProvaMiniCard key={p.id} prova={p} />
          ))}
          {proveCollegate.length === 0 && (
            <Text className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Nessuna prova collegata
            </Text>
          )}
        </View>

        {/* Azioni rapide */}
        <View className="px-5">
          <Text
            className={`text-xs uppercase tracking-wider font-semibold mb-3 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}
          >
            Azioni rapide
          </Text>
          <AzioneButton
            icon={'\u{1F4DD}'}
            label="Genera Diffida"
            onPress={() => Alert.alert('Generazione diffida', 'Funzionalità in arrivo.')}
          />
          <AzioneButton
            icon={'\u{1F4E7}'}
            label="Invia PEC"
            onPress={() => Alert.alert('Invio PEC', 'Funzionalità in arrivo.')}
          />
          <AzioneButton
            icon={'\u{1F468}\u200D\u2696\uFE0F'}
            label="Contatta Avvocato"
            onPress={() => Alert.alert('Avvocato', 'Funzionalità in arrivo.')}
          />
          <AzioneButton
            icon={'\u{1F4F8}'}
            label="Aggiungi Prova"
            onPress={() => router.push('/vault/upload')}
          />
        </View>
      </ScrollView>
    </View>
  );
}

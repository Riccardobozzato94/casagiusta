import { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/providers/ThemeProvider';

type StatoCaso = 'aperta' | 'in_esame' | 'risolta';

type Caso = {
  id: string;
  tipo: string;
  icona: string;
  stato: StatoCaso;
  titolo: string;
  descrizione: string;
  dataCreazione: Date;
  ultimaAzione: string;
};

const STATO_MAP: Record<StatoCaso, { label: string; bg: string; text: string }> = {
  aperta: { label: 'Aperta', bg: 'bg-blue-100', text: 'text-blue-700' },
  in_esame: { label: 'In esame', bg: 'bg-yellow-100', text: 'text-yellow-700' },
  risolta: { label: 'Risolta', bg: 'bg-green-100', text: 'text-green-700' },
};

type FiltroStato = 'tutti' | 'aperta' | 'risolta';

const FILTRI: { key: FiltroStato; label: string }[] = [
  { key: 'tutti', label: 'Tutti' },
  { key: 'aperta', label: 'Aperti' },
  { key: 'risolta', label: 'Risolti' },
];

function formatDate(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return 'Oggi';
  if (days === 1) return 'Ieri';
  if (days < 7) return `${days} giorni fa`;
  return date.toLocaleDateString('it-IT');
}

function CasoCard({
  caso,
  onPress,
}: {
  caso: Caso;
  onPress: () => void;
}) {
  const { isDark } = useTheme();
  const statoConf = STATO_MAP[caso.stato];

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`rounded-2xl p-4 mb-3 ${isDark ? 'bg-slate-800' : 'bg-white'} border ${isDark ? 'border-slate-700' : 'border-slate-200'} shadow-sm`}
      activeOpacity={0.7}
      accessibilityLabel={`Caso: ${caso.titolo}`}
      accessibilityRole="button"
    >
      <View className="flex-row items-start gap-3">
        <View
          className={`w-10 h-10 rounded-xl items-center justify-center ${isDark ? 'bg-slate-700' : 'bg-slate-100'}`}
        >
          <Text className="text-xl">{caso.icona}</Text>
        </View>
        <View className="flex-1">
          <View className="flex-row items-center justify-between mb-1">
            <Text
              className={`font-semibold text-base flex-1 ${isDark ? 'text-white' : 'text-slate-800'}`}
              numberOfLines={1}
            >
              {caso.titolo}
            </Text>
            <View className={`px-2.5 py-0.5 rounded-full ${statoConf.bg}`}>
              <Text className={`text-xs font-semibold ${statoConf.text}`}>
                {statoConf.label}
              </Text>
            </View>
          </View>
          <Text
            className={`text-sm mb-1.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}
            numberOfLines={2}
          >
            {caso.descrizione}
          </Text>
          <View className="flex-row items-center justify-between">
            <Text className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
              {caso.tipo} · {formatDate(caso.dataCreazione)}
            </Text>
            <Text className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
              {caso.ultimaAzione}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function EmptyCasi({ onPress }: { onPress: () => void }) {
  const { isDark } = useTheme();
  return (
    <View className="items-center justify-center py-20 px-8">
      <Text className="text-6xl mb-5">{'\u{1F4CB}'}</Text>
      <Text
        className={`text-xl font-bold mb-2 text-center ${isDark ? 'text-white' : 'text-slate-800'}`}
      >
        Nessun caso aperto
      </Text>
      <Text
        className={`text-sm text-center mb-6 leading-5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}
      >
        Non hai ancora creato nessuna pratica.{'\n'}Inizia descrivendo il tuo problema e ti
        guideremo passo passo.
      </Text>
      <TouchableOpacity
        onPress={onPress}
        className="bg-teal-600 rounded-xl py-3.5 px-8"
        activeOpacity={0.8}
        accessibilityLabel="Crea il primo caso"
        accessibilityRole="button"
      >
        <Text className="text-white font-semibold text-base">Crea il primo caso</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function CasiScreen() {
  const { isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [filtro, setFiltro] = useState<FiltroStato>('tutti');
  const [refreshing, setRefreshing] = useState(false);
  const [casi] = useState<Caso[]>([]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  }, []);

  return (
    <View className={`flex-1 ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
      {/* Header */}
      <View
        style={{ paddingTop: insets.top + 16 }}
        className={`px-5 pb-4 ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}
      >
        <View className="flex-row items-center justify-between mb-4">
          <Text className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>
            I tuoi Casi
          </Text>
          <TouchableOpacity
            onPress={() => router.push('/casi/nuovo')}
            className="bg-teal-600 w-9 h-9 rounded-full items-center justify-center"
            accessibilityLabel="Nuovo caso"
            accessibilityRole="button"
          >
            <Text className="text-white text-lg font-bold">+</Text>
          </TouchableOpacity>
        </View>

        {/* Filter chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8 }}
        >
          {FILTRI.map((f) => (
            <TouchableOpacity
              key={f.key}
              onPress={() => setFiltro(f.key)}
              className={`px-4 py-2 rounded-full ${filtro === f.key ? 'bg-teal-600' : isDark ? 'bg-slate-800' : 'bg-slate-200'}`}
              accessibilityLabel={`Filtra: ${f.label}`}
              accessibilityRole="button"
            >
              <Text
                className={`text-sm font-medium ${filtro === f.key ? 'text-white' : isDark ? 'text-slate-300' : 'text-slate-600'}`}
              >
                {f.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* List */}
      <ScrollView
        className={`flex-1 px-5 ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={isDark ? '#94a3b8' : '#0f766e'}
            colors={['#0f766e']}
          />
        }
      >
        {casi.length === 0 ? (
          <EmptyCasi onPress={() => router.push('/casi/nuovo')} />
        ) : (
          casi
            .filter((c) => filtro === 'tutti' || c.stato === filtro)
            .map((c) => (
              <CasoCard
                key={c.id}
                caso={c}
                onPress={() => router.push(`/casi/${c.id}`)}
              />
            ))
        )}
      </ScrollView>
    </View>
  );
}

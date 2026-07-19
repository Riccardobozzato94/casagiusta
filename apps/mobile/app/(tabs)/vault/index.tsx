import { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  RefreshControl,
  Alert,
  ActionSheetIOS,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/providers/ThemeProvider';

type TipoProva = 'foto' | 'video' | 'audio' | 'documento';

type Prova = {
  id: string;
  tipo: TipoProva;
  titolo: string;
  descrizione: string;
  data: Date;
  casoAssociato?: string;
  hash: string;
};

const ICON_MAP: Record<TipoProva, string> = {
  foto: '\u{1F4F8}',
  video: '\u{1F3AC}',
  audio: '\u{1F3A4}',
  documento: '\u{1F4C4}',
};

const FILTERS: { key: TipoProva | 'tutti'; label: string }[] = [
  { key: 'tutti', label: 'Tutti' },
  { key: 'foto', label: 'Foto' },
  { key: 'video', label: 'Video' },
  { key: 'audio', label: 'Audio' },
  { key: 'documento', label: 'Documenti' },
];

function formatRelativeDate(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return 'Oggi';
  if (diffDays === 1) return 'Ieri';
  if (diffDays < 7) return `${diffDays} giorni fa`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} settimane fa`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} mesi fa`;
  return `${Math.floor(diffDays / 365)} anni fa`;
}

function ProvaCard({
  prova,
  onPress,
  onLongPress,
}: {
  prova: Prova;
  onPress: () => void;
  onLongPress: () => void;
}) {
  const { isDark } = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      className={`flex-row items-start gap-4 rounded-2xl p-4 mb-3 ${isDark ? 'bg-slate-800' : 'bg-white'} border ${isDark ? 'border-slate-700' : 'border-slate-200'} shadow-sm`}
      activeOpacity={0.7}
      accessibilityLabel={`Prova: ${prova.titolo}`}
      accessibilityRole="button"
    >
      <View
        className={`w-12 h-12 rounded-xl items-center justify-center ${isDark ? 'bg-slate-700' : 'bg-slate-100'}`}
      >
        <Text className="text-2xl">{ICON_MAP[prova.tipo]}</Text>
      </View>
      <View className="flex-1">
        <View className="flex-row items-center justify-between mb-1">
          <Text
            className={`font-semibold text-base flex-1 ${isDark ? 'text-white' : 'text-slate-800'}`}
            numberOfLines={1}
          >
            {prova.titolo}
          </Text>
          <Text className={`text-xs ml-2 ${isDark ? 'text-slate-400' : 'text-slate-400'}`}>
            {formatRelativeDate(prova.data)}
          </Text>
        </View>
        <Text
          className={`text-sm mb-1.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}
          numberOfLines={2}
        >
          {prova.descrizione}
        </Text>
        {prova.casoAssociato && (
          <View className="bg-teal-100 self-start px-2.5 py-0.5 rounded-full">
            <Text className="text-xs font-medium text-teal-700">{prova.casoAssociato}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

function EmptyVault({ onPress }: { onPress: () => void }) {
  const { isDark } = useTheme();
  return (
    <View className="items-center justify-center py-20 px-8">
      <Text className="text-6xl mb-5">{'\u{1F6E1}\uFE0F'}</Text>
      <Text className={`text-xl font-bold mb-2 text-center ${isDark ? 'text-white' : 'text-slate-800'}`}>
        Nessuna prova ancora
      </Text>
      <Text className={`text-sm text-center mb-6 leading-5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
        Le tue prove fotografiche, documenti e registrazioni vivranno qui.
        {'\n'}Carica la prima per iniziare a costruire il tuo caso.
      </Text>
      <TouchableOpacity
        onPress={onPress}
        className="bg-teal-600 rounded-xl py-3.5 px-8"
        activeOpacity={0.8}
        accessibilityLabel="Carica la prima prova"
        accessibilityRole="button"
      >
        <Text className="text-white font-semibold text-base">Carica la prima prova</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function VaultScreen() {
  const { isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<TipoProva | 'tutti'>('tutti');
  const [refreshing, setRefreshing] = useState(false);
  const [prove] = useState<Prova[]>([]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  }, []);

  const handleLongPress = useCallback(
    (prova: Prova) => {
      if (Platform.OS === 'ios') {
        ActionSheetIOS.showActionSheetWithOptions(
          {
            options: ['Condividi', 'Associa a caso', 'Elimina', 'Annulla'],
            cancelButtonIndex: 3,
            destructiveButtonIndex: 2,
          },
          (index) => {
            if (index === 0) {
              // condividi
            } else if (index === 1) {
              router.push(`/casi/nuovo`);
            } else if (index === 2) {
              Alert.alert('Elimina prova', 'Sei sicuro di voler eliminare questa prova?', [
                { text: 'Annulla', style: 'cancel' },
                { text: 'Elimina', style: 'destructive' },
              ]);
            }
          },
        );
      } else {
        Alert.alert('Opzioni', `Cosa vuoi fare con "${prova.titolo}"?`, [
          { text: 'Condividi' },
          { text: 'Associa a caso' },
          { text: 'Elimina', style: 'destructive' },
          { text: 'Annulla', style: 'cancel' },
        ]);
      }
    },
    [router],
  );

  return (
    <View className={`flex-1 ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
      {/* Header */}
      <View
        style={{ paddingTop: insets.top + 16 }}
        className={`px-5 pb-4 ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}
      >
        <View className="flex-row items-center justify-between mb-4">
          <Text className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>
            Vault Prove
          </Text>
          <TouchableOpacity
            onPress={() => router.push('/vault/upload')}
            className="bg-teal-600 w-9 h-9 rounded-full items-center justify-center"
            accessibilityLabel="Carica nuova prova"
            accessibilityRole="button"
          >
            <Text className="text-white text-lg font-bold">+</Text>
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View
          className={`flex-row items-center rounded-xl px-4 py-2.5 mb-3 ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}
        >
          <Text className={`mr-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{'\u{1F50D}'}</Text>
          <TextInput
            className={`flex-1 text-base ${isDark ? 'text-white' : 'text-slate-800'}`}
            placeholder="Cerca nelle prove..."
            placeholderTextColor={isDark ? '#64748b' : '#94a3b8'}
            value={search}
            onChangeText={setSearch}
            accessibilityLabel="Cerca prove"
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')} accessibilityLabel="Cancella ricerca">
              <Text className={`text-lg ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{'\u{2716}'}</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Filter chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="flex-row"
          contentContainerStyle={{ gap: 8 }}
        >
          {FILTERS.map((f) => (
            <TouchableOpacity
              key={f.key}
              onPress={() => setActiveFilter(f.key)}
              className={`px-4 py-2 rounded-full ${activeFilter === f.key ? 'bg-teal-600' : isDark ? 'bg-slate-800' : 'bg-slate-200'}`}
              accessibilityLabel={`Filtra per ${f.label}`}
              accessibilityRole="button"
            >
              <Text
                className={`text-sm font-medium ${activeFilter === f.key ? 'text-white' : isDark ? 'text-slate-300' : 'text-slate-600'}`}
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
        {prove.length === 0 ? (
          <EmptyVault onPress={() => router.push('/vault/upload')} />
        ) : (
          prove
            .filter(
              (p) =>
                (activeFilter === 'tutti' || p.tipo === activeFilter) &&
                p.titolo.toLowerCase().includes(search.toLowerCase()),
            )
            .map((p) => (
              <ProvaCard
                key={p.id}
                prova={p}
                onPress={() => Alert.alert(p.titolo, `${p.descrizione}\n\nHash: ${p.hash}\nData: ${formatRelativeDate(p.data)}`)}
                onLongPress={() => handleLongPress(p)}
              />
            ))
        )}
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity
        onPress={() => router.push('/vault/upload')}
        className="absolute bottom-8 right-5 w-14 h-14 bg-teal-600 rounded-full items-center justify-center shadow-lg"
        activeOpacity={0.8}
        accessibilityLabel="Carica nuova prova"
        accessibilityRole="button"
      >
        <Text className="text-white text-3xl font-light">+</Text>
      </TouchableOpacity>
    </View>
  );
}

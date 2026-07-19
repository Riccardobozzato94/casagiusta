import { useCallback, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/providers/ThemeProvider';

type Contratto = {
  id: string;
  tipo: string;
  canone: number;
  scadenza: string;
  aNorma: boolean;
} | null;

type Stat = {
  label: string;
  value: string;
  subtitle: string;
  icon: string;
  color: string;
};

function EmptyContrattoCard({ onPress }: { onPress: () => void }) {
  const { isDark } = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`rounded-2xl p-6 mb-5 ${isDark ? 'bg-slate-800' : 'bg-teal-50'} border ${isDark ? 'border-slate-700' : 'border-teal-100'}`}
      activeOpacity={0.7}
      accessibilityLabel="Carica il tuo contratto"
      accessibilityRole="button"
    >
      <Text className="text-3xl mb-3">{'\u{1F4C4}'}</Text>
      <Text className={`text-lg font-semibold mb-1 ${isDark ? 'text-white' : 'text-slate-800'}`}>
        Carica il tuo contratto
      </Text>
      <Text className={`text-sm mb-4 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
        Non hai ancora caricato nessun contratto. Aggiungilo per ricevere analisi, promemoria e
        protezione personalizzata.
      </Text>
      <View className="bg-teal-600 rounded-xl py-3 px-5 self-start">
        <Text className="text-white font-semibold text-sm">Carica contratto</Text>
      </View>
    </TouchableOpacity>
  );
}

function ContrattoCard({ contratto }: { contratto: NonNullable<Contratto> }) {
  const { isDark } = useTheme();
  return (
    <View
      className={`rounded-2xl p-5 mb-5 ${isDark ? 'bg-slate-800' : 'bg-white'} border ${isDark ? 'border-slate-700' : 'border-slate-200'} shadow-sm`}
    >
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center gap-2">
          <Text className="text-xl">{'\u{1F4C4}'}</Text>
          <Text className={`font-semibold text-base ${isDark ? 'text-white' : 'text-slate-800'}`}>
            {contratto.tipo}
          </Text>
        </View>
        <View
          className={`px-3 py-1 rounded-full ${contratto.aNorma ? 'bg-green-100' : 'bg-red-100'}`}
        >
          <Text
            className={`text-xs font-semibold ${contratto.aNorma ? 'text-green-700' : 'text-red-600'}`}
          >
            {contratto.aNorma ? '\u{2705} A norma' : '\u{274C} Da verificare'}
          </Text>
        </View>
      </View>
      <View className="flex-row gap-6">
        <View>
          <Text className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Canone
          </Text>
          <Text className={`font-semibold ${isDark ? 'text-white' : 'text-slate-800'}`}>
            {'\u20AC'} {contratto.canone.toLocaleString()}
          </Text>
        </View>
        <View>
          <Text className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Scadenza
          </Text>
          <Text className={`font-semibold ${isDark ? 'text-white' : 'text-slate-800'}`}>
            {contratto.scadenza}
          </Text>
        </View>
      </View>
    </View>
  );
}

function BentoWidget({ stat }: { stat: Stat }) {
  const { isDark } = useTheme();
  return (
    <TouchableOpacity
      className={`flex-1 rounded-2xl p-4 ${isDark ? 'bg-slate-800' : 'bg-white'} border ${isDark ? 'border-slate-700' : 'border-slate-200'} shadow-sm min-h-[120px]`}
      activeOpacity={0.7}
      accessibilityLabel={stat.label}
      accessibilityRole="button"
    >
      <Text className="text-2xl mb-2">{stat.icon}</Text>
      <Text className={`text-2xl font-bold mb-0.5 ${isDark ? 'text-white' : 'text-slate-800'}`}>
        {stat.value}
      </Text>
      <Text className={`text-xs font-semibold ${stat.color} mb-0.5`}>{stat.label}</Text>
      <Text className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-400'}`}>
        {stat.subtitle}
      </Text>
    </TouchableOpacity>
  );
}

function QuickAction({
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
      className={`flex-row items-center gap-3 rounded-xl p-4 mb-2 ${isDark ? 'bg-slate-800' : 'bg-slate-50'} border ${isDark ? 'border-slate-700' : 'border-slate-200'}`}
      activeOpacity={0.7}
      accessibilityLabel={label}
      accessibilityRole="button"
    >
      <Text className="text-2xl">{icon}</Text>
      <Text className={`font-medium ${isDark ? 'text-white' : 'text-slate-700'}`}>{label}</Text>
    </TouchableOpacity>
  );
}

export default function HomeScreen() {
  const { isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [contratto] = useState<Contratto>(null);

  const stats: Stat[] = [
    {
      label: 'Stato contratti',
      value: 'Nessuno',
      subtitle: 'Carica il primo contratto',
      icon: '\u{1F3E2}',
      color: 'text-slate-400',
    },
    {
      label: 'Casi attivi',
      value: '0',
      subtitle: 'Nessun caso aperto',
      icon: '\u{1F4CB}',
      color: 'text-blue-500',
    },
    {
      label: 'Prove nel vault',
      value: '0',
      subtitle: 'Nessuna prova ancora',
      icon: '\u{1F512}',
      color: 'text-purple-500',
    },
    {
      label: 'AI Giusta',
      value: 'Disponibile',
      subtitle: 'Chiedi un parere',
      icon: '\u{1F4AC}',
      color: 'text-teal-500',
    },
  ];

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  }, []);

  return (
    <View className={`flex-1 ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <ScrollView
        contentContainerStyle={{ paddingTop: insets.top + 16, paddingBottom: 100 }}
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
        {/* Header */}
        <View className="flex-row items-center justify-between px-5 mb-6">
          <View className="flex-row items-center gap-3">
            <View
              className={`w-12 h-12 rounded-full items-center justify-center ${isDark ? 'bg-slate-700' : 'bg-teal-100'}`}
            >
              <Text className="text-2xl">{'\u{1F44B}'}</Text>
            </View>
            <View>
              <Text className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>
                Ciao{'\u{1F44B}'}
              </Text>
              <Text className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Benvenuto in CasaGiusta
              </Text>
            </View>
          </View>
          <TouchableOpacity
            className={`w-10 h-10 rounded-full items-center justify-center ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`}
            onPress={() => router.push('/notifiche')}
            accessibilityLabel="Notifiche"
            accessibilityRole="button"
          >
            <Text className="text-lg">{'\u{1F514}'}</Text>
          </TouchableOpacity>
        </View>

        {/* Contratto section */}
        {contratto ? (
          <View className="px-5">
            <Text
              className={`text-xs uppercase tracking-wider font-semibold mb-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}
            >
              Il tuo contratto
            </Text>
            <ContrattoCard contratto={contratto} />
          </View>
        ) : (
          <View className="px-5">
            <EmptyContrattoCard onPress={() => router.push('/contratto/nuovo')} />
          </View>
        )}

        {/* Bento Grid */}
        <View className="px-5 mb-6">
          <Text
            className={`text-xs uppercase tracking-wider font-semibold mb-3 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}
          >
            Riepilogo
          </Text>
          <View className="flex-row flex-wrap gap-3">
            {stats.map((stat) => (
              <BentoWidget key={stat.label} stat={stat} />
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View className="px-5">
          <Text
            className={`text-xs uppercase tracking-wider font-semibold mb-3 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}
          >
            Azioni rapide
          </Text>
          <QuickAction
            icon={'\u{1F4F8}'}
            label="Nuova prova"
            onPress={() => router.push('/vault/upload')}
          />
          <QuickAction
            icon={'\u{1F4CB}'}
            label="Nuovo caso"
            onPress={() => router.push('/casi/nuovo')}
          />
          <QuickAction
            icon={'\u{1F4AC}'}
            label="Parla con Giusta"
            onPress={() => router.push('/giusta')}
          />
        </View>
      </ScrollView>
    </View>
  );
}

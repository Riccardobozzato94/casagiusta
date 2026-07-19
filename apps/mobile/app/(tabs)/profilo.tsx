import { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/providers/ThemeProvider';

function MenuItem({
  icon,
  label,
  value,
  onPress,
  isLast,
}: {
  icon: string;
  label: string;
  value?: string;
  onPress?: () => void;
  isLast?: boolean;
}) {
  const { isDark } = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-row items-center justify-between py-3.5 px-4 ${!isLast ? 'border-b' : ''} ${isDark ? 'border-slate-700' : 'border-slate-100'}`}
      activeOpacity={onPress ? 0.6 : 1}
      accessibilityLabel={label}
      accessibilityRole={onPress ? 'button' : 'none'}
    >
      <View className="flex-row items-center gap-3">
        <Text className="text-lg">{icon}</Text>
        <Text className={`text-base ${isDark ? 'text-white' : 'text-slate-800'}`}>{label}</Text>
      </View>
      {value && (
        <View className="flex-row items-center gap-1">
          <Text className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{value}</Text>
          {onPress && (
            <Text className={`text-sm ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{'\u{203A}'}</Text>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
}

function SwitchItem({
  icon,
  label,
  value,
  onValueChange,
}: {
  icon: string;
  label: string;
  value: boolean;
  onValueChange: (v: boolean) => void;
}) {
  const { isDark } = useTheme();
  return (
    <View
      className={`flex-row items-center justify-between py-3.5 px-4 border-b ${isDark ? 'border-slate-700' : 'border-slate-100'}`}
    >
      <View className="flex-row items-center gap-3">
        <Text className="text-lg">{icon}</Text>
        <Text className={`text-base ${isDark ? 'text-white' : 'text-slate-800'}`}>{label}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: isDark ? '#475569' : '#cbd5e1', true: '#0f766e' }}
        thumbColor="#ffffff"
        accessibilityLabel={label}
      />
    </View>
  );
}

function SectionHeader({ label }: { label: string }) {
  const { isDark } = useTheme();
  return (
    <Text
      className={`text-xs uppercase tracking-wider font-semibold mt-6 mb-2 px-5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}
    >
      {label}
    </Text>
  );
}

export default function ProfiloScreen() {
  const { isDark, themeMode, setThemeMode } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [lowStimulus, setLowStimulus] = useState(false);
  const [privacyMode, setPrivacyMode] = useState(false);
  const [notifiche, setNotifiche] = useState(true);

  const [piano] = useState<'free' | 'pro'>('free');

  return (
    <View className={`flex-1 ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <ScrollView
        contentContainerStyle={{ paddingTop: insets.top + 16, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar / Header */}
        <View className="items-center pt-4 pb-6 px-5">
          <View
            className={`w-20 h-20 rounded-full items-center justify-center mb-3 ${isDark ? 'bg-slate-700' : 'bg-teal-100'}`}
          >
            <Text className="text-3xl">{'\u{1F464}'}</Text>
          </View>
          <Text className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>
            Anonimo
          </Text>
          <Text className={`text-sm mb-3 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Non hai ancora impostato un profilo
          </Text>

          {/* Piano badge */}
          <View
            className={`flex-row items-center gap-2 rounded-full px-4 py-1.5 ${piano === 'pro' ? 'bg-yellow-100' : isDark ? 'bg-slate-800' : 'bg-slate-200'}`}
          >
            <Text className="text-sm">
              {piano === 'pro' ? '\u{2B50}' : '\u{1F6E1}\uFE0F'}
            </Text>
            <Text
              className={`text-sm font-semibold ${piano === 'pro' ? 'text-yellow-700' : isDark ? 'text-slate-300' : 'text-slate-600'}`}
            >
              {piano === 'pro' ? 'Piano Pro' : 'Piano Free'}
            </Text>
          </View>

          {piano === 'free' && (
            <TouchableOpacity
              className="mt-3 bg-teal-600 rounded-xl py-2.5 px-6"
              onPress={() => router.push('/abbonamento')}
              activeOpacity={0.8}
              accessibilityLabel="Passa a Pro"
              accessibilityRole="button"
            >
              <Text className="text-white font-semibold text-sm">Passa a Pro</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Statistiche */}
        <View
          className={`mx-5 rounded-2xl p-4 ${isDark ? 'bg-slate-800' : 'bg-white'} border ${isDark ? 'border-slate-700' : 'border-slate-200'} shadow-sm`}
        >
          <View className="flex-row justify-around">
            <StatBadge value="0" label="Contratti" isDark={isDark} />
            <StatBadge value="0" label="Casi" isDark={isDark} />
            <StatBadge value="0" label="Prove" isDark={isDark} />
            <StatBadge value="0" label="Query AI" isDark={isDark} />
          </View>
        </View>

        {/* Impostazioni */}
        <SectionHeader label="Impostazioni" />

        <View
          className={`mx-5 rounded-2xl ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border`}
        >
          <MenuItem
            icon={'\u{1F3A8}'}
            label="Tema"
            value={themeMode.charAt(0).toUpperCase() + themeMode.slice(1)}
            onPress={() => {
              const opzioni = ['system', 'light', 'dark'] as const;
              const idx = (opzioni.indexOf(themeMode) + 1) % opzioni.length;
              setThemeMode(opzioni[idx]);
            }}
          />
          <SwitchItem
            icon={'\u{1F4A1}'}
            label="Low-stimulus mode"
            value={lowStimulus}
            onValueChange={setLowStimulus}
          />
          <SwitchItem
            icon={'\u{1F6E1}\uFE0F'}
            label="Privacy mode"
            value={privacyMode}
            onValueChange={setPrivacyMode}
          />
          <SwitchItem
            icon={'\u{1F514}'}
            label="Notifiche"
            value={notifiche}
            onValueChange={setNotifiche}
          />
          <MenuItem
            icon={'\u{1F310}'}
            label="Lingua"
            value="Italiano"
            onPress={() => {}}
            isLast
          />
        </View>

        {/* Privacy */}
        <SectionHeader label="Privacy" />

        <View
          className={`mx-5 rounded-2xl ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border`}
        >
          <MenuItem
            icon={'\u{1F4E5}'}
            label="Esporta i miei dati (GDPR)"
            onPress={() =>
              Alert.alert('Esporta dati', 'Riceverai una mail con tutti i tuoi dati.')
            }
          />
          <MenuItem
            icon={'\u{26D4}\uFE0F'}
            label="Elimina account"
            onPress={() =>
              Alert.alert('Elimina account', 'Questa azione è irreversibile. Sei sicuro?', [
                { text: 'Annulla', style: 'cancel' },
                { text: 'Elimina', style: 'destructive' },
              ])
            }
            isLast
          />
        </View>

        {/* Supporto */}
        <SectionHeader label="Supporto" />

        <View
          className={`mx-5 rounded-2xl ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border`}
        >
          <MenuItem
            icon={'\u{1F4E9}'}
            label="Contatta assistenza"
            onPress={() => {}}
          />
          <MenuItem
            icon={'\u{2753}'}
            label="FAQ"
            onPress={() => {}}
          />
          <MenuItem
            icon={'\u{1F4DC}'}
            label="Termini e Privacy"
            onPress={() => {}}
            isLast
          />
        </View>

        {/* Versione */}
        <Text className={`text-xs text-center mt-8 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
          CasaGiusta v1.0.0
        </Text>
      </ScrollView>
    </View>
  );
}

function StatBadge({
  value,
  label,
  isDark,
}: {
  value: string;
  label: string;
  isDark: boolean;
}) {
  return (
    <View className="items-center">
      <Text className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>
        {value}
      </Text>
      <Text className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{label}</Text>
    </View>
  );
}

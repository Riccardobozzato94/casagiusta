import { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTheme } from '@/providers/ThemeProvider';

type NotificaTipo = 'caso' | 'ai_risposta' | 'community' | 'promemoria' | 'sistema';

type Notifica = {
  id: string;
  tipo: NotificaTipo;
  titolo: string;
  corpo: string;
  timestamp: Date;
  letta: boolean;
  azione?: string;
};

function iconaPerTipo(tipo: NotificaTipo): string {
  switch (tipo) {
    case 'caso': return '\u{1F4CB}';
    case 'ai_risposta': return '\u{1F4AC}';
    case 'community': return '\u{1F91D}';
    case 'promemoria': return '\u{23F0}';
    case 'sistema': return '\u{1F6E1}\uFE0F';
  }
}

function tempoRelativo(data: Date): string {
  const ora = new Date();
  const diffMs = ora.getTime() - data.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffOre = Math.floor(diffMs / 3600000);
  const diffGiorni = Math.floor(diffMs / 86400000);

  if (diffMin < 1) return 'Adesso';
  if (diffMin < 60) return `${diffMin}m fa`;
  if (diffOre < 24) return `${diffOre}h fa`;
  if (diffGiorni < 7) return `${diffGiorni}g fa`;
  return data.toLocaleDateString('it-IT', { day: 'numeric', month: 'short' });
}

function gruppoData(data: Date): string {
  const ora = new Date();
  const diffGiorni = Math.floor((ora.getTime() - data.getTime()) / 86400000);

  if (diffGiorni === 0) return 'Oggi';
  if (diffGiorni === 1) return 'Ieri';
  if (diffGiorni < 7) return 'Questa settimana';
  return data.toLocaleDateString('it-IT', { month: 'long', year: 'numeric' });
}

const MOCK_NOTIFICHE: Notifica[] = [
  { id: 'n1', tipo: 'caso', titolo: 'Aggiornamento caso', corpo: 'Il caso "Deposito cauzionale" ha ricevuto una nuova risposta dal legale.', timestamp: new Date(Date.now() - 5 * 60000), letta: false, azione: '/casi/1' },
  { id: 'n2', tipo: 'ai_risposta', titolo: 'Giusta ha risposto', corpo: 'La tua richiesta sull\'aggiornamento ISTAT è pronta. Leggi il parere legale personalizzato.', timestamp: new Date(Date.now() - 30 * 60000), letta: false, azione: '/giusta' },
  { id: 'n3', tipo: 'community', titolo: 'Nuovo messaggio nel forum', corpo: 'Qualcuno ha risposto al tuo post "Aumento canone ingiustificato".', timestamp: new Date(Date.now() - 2 * 3600000), letta: false, azione: '/' },
  { id: 'n4', tipo: 'promemoria', titolo: 'Promemoria scadenza', corpo: 'Il contratto scade tra 30 giorni. Ti consigliamo di preparare la disdetta.', timestamp: new Date(Date.now() - 5 * 3600000), letta: true },
  { id: 'n5', tipo: 'sistema', titolo: 'Nuova funzionalità disponibile', corpo: 'Ora puoi cercare avvocati specializzati in diritto locatizio nella tua zona.', timestamp: new Date(Date.now() - 24 * 3600000), letta: true, azione: '/avvocati' },
  { id: 'n6', tipo: 'caso', titolo: 'Documento richiesto', corpo: 'Il legale ha richiesto un documento aggiuntivo per il caso Sfratto minacciato.', timestamp: new Date(Date.now() - 2 * 86400000), letta: true },
  { id: 'n7', tipo: 'ai_risposta', titolo: 'Analisi contratto completata', corpo: 'L\'analisi del tuo contratto è pronta. Abbiamo trovato 2 clausole da verificare.', timestamp: new Date(Date.now() - 3 * 86400000), letta: true, azione: '/onboarding/contract-result' },
  { id: 'n8', tipo: 'community', titolo: 'Evento: Webinar diritti inquilini', corpo: 'Partecipa al webinar gratuito del 25 luglio sui tuoi diritti come inquilino.', timestamp: new Date(Date.now() - 5 * 86400000), letta: false },
];

function NotificationCard({
  notifica,
  onPress,
  onMarkRead,
}: {
  notifica: Notifica;
  onPress: () => void;
  onMarkRead: () => void;
}) {
  const { isDark } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onMarkRead}
      className={`flex-row gap-3 px-5 py-4 ${
        !notifica.letta
          ? isDark ? 'bg-slate-800/60' : 'bg-teal-50/60'
          : ''
      } border-b ${isDark ? 'border-slate-800' : 'border-slate-100'}`}
      activeOpacity={0.7}
      accessibilityLabel={`${notifica.titolo}. ${notifica.corpo}`}
      accessibilityRole="button"
    >
      {/* Icon */}
      <View
        className={`w-10 h-10 rounded-full items-center justify-center ${
          !notifica.letta
            ? 'bg-teal-600/20'
            : isDark ? 'bg-slate-700' : 'bg-slate-200'
        }`}
      >
        <Text className="text-lg">{iconaPerTipo(notifica.tipo)}</Text>
      </View>

      {/* Content */}
      <View className="flex-1">
        <View className="flex-row items-center gap-2">
          <Text
            className={`text-sm font-semibold flex-1 ${
              !notifica.letta
                ? isDark ? 'text-white' : 'text-slate-800'
                : isDark ? 'text-slate-300' : 'text-slate-500'
            }`}
          >
            {notifica.titolo}
          </Text>
          {!notifica.letta && (
            <View className="w-2 h-2 rounded-full bg-teal-500" />
          )}
        </View>
        <Text
          className={`text-sm mt-0.5 leading-5 ${
            isDark ? 'text-slate-400' : 'text-slate-500'
          }`}
          numberOfLines={2}
        >
          {notifica.corpo}
        </Text>
        <Text
          className={`text-xs mt-1.5 ${
            isDark ? 'text-slate-500' : 'text-slate-400'
          }`}
        >
          {tempoRelativo(notifica.timestamp)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default function NotificheScreen() {
  const { isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [notifiche, setNotifiche] = useState<Notifica[]>(MOCK_NOTIFICHE);
  const [refreshing, setRefreshing] = useState(false);

  const nonLette = notifiche.filter((n) => !n.letta).length;

  const notificheRaggruppate = notifiche.reduce<Record<string, Notifica[]>>((acc, n) => {
    const gruppo = gruppoData(n.timestamp);
    if (!acc[gruppo]) acc[gruppo] = [];
    acc[gruppo].push(n);
    return acc;
  }, {});

  const handleSegnaTutteLette = () => {
    setNotifiche((prev) => prev.map((n) => ({ ...n, letta: true })));
  };

  const handleSegnaLetta = (id: string) => {
    setNotifiche((prev) =>
      prev.map((n) => (n.id === id ? { ...n, letta: true } : n))
    );
  };

  const handlePress = (notifica: Notifica) => {
    handleSegnaLetta(notifica.id);
    if (notifica.azione) {
      router.push(notifica.azione as any);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  return (
    <View className={`flex-1 ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
      {/* Header */}
      <View
        style={{ paddingTop: insets.top + 12 }}
        className={`flex-row items-center justify-between px-5 pb-4 border-b ${isDark ? 'border-slate-800' : 'border-slate-200'}`}
      >
        <View className="flex-row items-center gap-3">
          <TouchableOpacity
            onPress={() => router.back()}
            className={`w-10 h-10 rounded-full items-center justify-center ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}
            accessibilityLabel="Indietro"
            accessibilityRole="button"
          >
            <Text className={`text-lg ${isDark ? 'text-white' : 'text-slate-600'}`}>{'\u{2190}'}</Text>
          </TouchableOpacity>
          <View>
            <Text className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>
              Notifiche
            </Text>
            {nonLette > 0 && (
              <Text className="text-xs text-teal-500 font-medium">
                {nonLette} non lette
              </Text>
            )}
          </View>
        </View>
        {nonLette > 0 && (
          <TouchableOpacity
            onPress={handleSegnaTutteLette}
            className="px-3 py-1.5 rounded-lg bg-teal-600/20"
            activeOpacity={0.7}
            accessibilityLabel="Segna tutte come lette"
            accessibilityRole="button"
          >
            <Text className="text-teal-500 text-sm font-medium">Leggi tutte</Text>
          </TouchableOpacity>
        )}
      </View>

      {notifiche.length === 0 ? (
        <View className="flex-1 items-center justify-center px-10">
          <View
            className={`w-20 h-20 rounded-full items-center justify-center mb-4 ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}
          >
            <Text className="text-4xl">{'\u{1F514}'}</Text>
          </View>
          <Text className={`text-xl font-semibold text-center mb-2 ${isDark ? 'text-white' : 'text-slate-800'}`}>
            Nessuna notifica
          </Text>
          <Text className={`text-sm text-center leading-5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Non ci sono ancora notifiche. Ti avviseremo quando ci saranno aggiornamenti sui tuoi casi, risposte di Giusta e novità importanti.
          </Text>
        </View>
      ) : (
        <ScrollView
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
          {Object.entries(notificheRaggruppate).map(([gruppo, items]) => (
            <View key={gruppo}>
              <View className={`px-5 pt-5 pb-2 ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
                <Text
                  className={`text-xs font-semibold uppercase tracking-wider ${
                    isDark ? 'text-slate-400' : 'text-slate-500'
                  }`}
                >
                  {gruppo}
                </Text>
              </View>
              {items.map((notifica) => (
                <NotificationCard
                  key={notifica.id}
                  notifica={notifica}
                  onPress={() => handlePress(notifica)}
                  onMarkRead={() => handleSegnaLetta(notifica.id)}
                />
              ))}
            </View>
          ))}
          <View style={{ height: 40 }} />
        </ScrollView>
      )}
    </View>
  );
}

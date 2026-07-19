import { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  RefreshControl,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTheme } from '@/providers/ThemeProvider';

type Specializzazione = 'locatizio' | 'sfratti' | 'condominio' | 'morositÃ ' | 'danni' | 'multa';
type FasciaPrezzo = 'â¬' | 'â¬â¬' | 'â¬â¬â¬';

type Avvocato = {
  id: string;
  nome: string;
  studio: string;
  città: string;
  specializzazioni: Specializzazione[];
  prezzo: FasciaPrezzo;
  valutazione: number;
  recensioni: number;
  disponibile: boolean;
  descrizione: string;
  telefono: string;
  email: string;
};

const SPECIALIZZAZIONI: { id: Specializzazione; label: string }[] = [
  { id: 'locatizio', label: 'Diritto locatizio' },
  { id: 'sfratti', label: 'Sfratti' },
  { id: 'condominio', label: 'Condominio' },
  { id: 'morositÃ ', label: 'MorositÃ ' },
  { id: 'danni', label: 'Danni e risarcimenti' },
  { id: 'multa', label: 'Multe e contravvenzioni' },
];

const MOCK_AVVOCATI: Avvocato[] = [
  { id: 'a1', nome: 'Avv. Maria Rossi', studio: 'Studio Legale Rossi & Associati', città: 'Milano', specializzazioni: ['locatizio', 'sfratti'], prezzo: 'â¬â¬', valutazione: 4.8, recensioni: 124, disponibile: true, descrizione: 'Esperta in diritto locatizio con oltre 15 anni di esperienza. Specializzata in recovery crediti e sfratti per morositÃ .', telefono: '+39 02 1234567', email: 'maria.rossi@studiorossi.it' },
  { id: 'a2', nome: 'Avv. Giovanni Verdi', studio: 'Verdi Legal', città: 'Roma', specializzazioni: ['condominio', 'locatizio'], prezzo: 'â¬â¬â¬', valutazione: 4.9, recensioni: 87, disponibile: true, descrizione: 'Esperto in controversie condominiali e locatizie. Consulente per grandi proprietÃ  immobiliari.', telefono: '+39 06 7654321', email: 'g.verdi@verdilegal.it' },
  { id: 'a3', nome: 'Avv. Luca Bianchi', studio: 'Bianchi Law', città: 'Torino', specializzazioni: ['morositÃ ', 'danni'], prezzo: 'â¬', valutazione: 4.5, recensioni: 56, disponibile: true, descrizione: 'Giovane avvocato con approccio innovativo. Tariffe accessibili e consulenze online.', telefono: '+39 011 9876543', email: 'l.bianchi@bianchilaw.it' },
  { id: 'a4', nome: 'Avv. Elena Conti', studio: 'Studio Legale Conti', città: 'Napoli', specializzazioni: ['locatizio', 'danni', 'condominio'], prezzo: 'â¬â¬', valutazione: 4.7, recensionis: 203, disponibile: false, descrizione: 'Esperta in diritto immobiliare e locatizio. Gestione completa di controversie condominiali.', telefono: '+39 081 3456789', email: 'e.conti@studiolegaleconti.it' },
  { id: 'a5', nome: 'Avv. Marco Neri', studio: 'Neri & Partners', città: 'Bologna', specializzazioni: ['sfratti', 'morositÃ '], prezzo: 'â¬â¬', valutazione: 4.6, recensioni: 91, disponibile: true, descrizione: 'Specializzato in procedure esecutive e sfratti. Assistenza completa in tutte le fasi processuali.', telefono: '+39 051 2345678', email: 'm.neri@neripartners.it' },
  { id: 'a6', nome: 'Avv. Sara Gialli', studio: 'Gialli Legal', città: 'Firenze', specializzazioni: ['locatizio', 'condominio'], prezzo: 'â¬â¬â¬', valutazione: 4.9, recensioni: 67, disponibile: true, descrizione: 'Diritto locatizio e condominiale. Assistenza in mediazioni e controversie stragiudiziali.', telefono: '+39 055 8765432', email: 's.gialli@giallilegal.it' },
  { id: 'a7', nome: 'Avv. Paolo Viola', studio: 'Studio Viola', città: 'Roma', specializzazioni: ['danni', 'multa', 'locatizio'], prezzo: 'â¬', valutazione: 4.3, recensioni: 42, disponibile: true, descrizione: 'Tariffe contenute per assistenza su danni locatizi e contravvenzioni. Primo colloquio gratuito.', telefono: '+39 06 3456789', email: 'p.viola@studioviola.it' },
  { id: 'a8', nome: 'Avv. Francesca Moretti', studio: 'Moretti Law Firm', città: 'Padova', specializzazioni: ['locatizio', 'morositÃ ', 'sfratti'], prezzo: 'â¬â¬', valutazione: 4.7, recensioni: 118, disponibile: false, descrizione: 'Esperta in diritto delle locazioni e recupero crediti. Approccio pragmatico e risolutivo.', telefono: '+39 049 2345678', email: 'f.moretti@morettilaw.it' },
  { id: 'a9', nome: 'Avv. Antonio Russo', studio: 'Russo & Associati', città: 'Palermo', specializzazioni: ['condominio', 'danni'], prezzo: 'â¬', valutazione: 4.4, recensioni: 35, disponibile: true, descrizione: 'Consulenza legale in ambito condominiale e risarcimento danni. Assistenza in tutta la Sicilia.', telefono: '+39 091 9876543', email: 'a.russo@russoassociati.it' },
  { id: 'a10', nome: 'Avv. Chienda Fioravanti', studio: 'Fioravanti Legal', città: 'Bologna', specializzazioni: ['locatizio', 'condominio', 'sfratti'], prezzo: 'â¬â¬', valutazione: 4.8, recensioni: 156, disponibile: true, descrizione: 'Esperta in tutele delle locazioni abitative e commerciali. Consulente di associazioni inquilini.', telefono: '+39 051 8765432', email: 'c.bianchi@fioravantilegal.it' },
];

function Stelle({ valutazione }: { valutazione: number }) {
  const piene = Math.floor(valutazione);
  const mezza = valutazione % 1 >= 0.5;
  return (
    <View className="flex-row items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Text key={i} className="text-sm">
          {i < piene ? '\u{2605}' : i === piene && mezza ? '\u{2B50}' : '\u{2606}'}
        </Text>
      ))}
    </View>
  );
}

export default function AvvocatiScreen() {
  const { isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [ricerca, setRicerca] = useState('');
  const [filtriAttivi, setFiltriAttivi] = useState<Specializzazione[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const toggleFiltro = (spec: Specializzazione) => {
    setFiltriAttivi((prev) =>
      prev.includes(spec) ? prev.filter((s) => s !== spec) : [...prev, spec]
    );
  };

  const avvocatiFiltrati = MOCK_AVVOCATI.filter((avv) => {
    const matchRicerca =
      !ricerca ||
      avv.nome.toLowerCase().includes(ricerca.toLowerCase()) ||
      avv.città.toLowerCase().includes(ricerca.toLowerCase()) ||
      avv.studio.toLowerCase().includes(ricerca.toLowerCase());
    const matchFiltri =
      filtriAttivi.length === 0 ||
      filtriAttivi.some((s) => avv.specializzazioni.includes(s));
    return matchRicerca && matchFiltri;
  });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  return (
    <View className={`flex-1 ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
      {/* Header */}
      <View
        style={{ paddingTop: insets.top + 12 }}
        className={`px-5 pb-4 border-b ${isDark ? 'border-slate-800' : 'border-slate-200'}`}
      >
        <View className="flex-row items-center gap-3 mb-4">
          <TouchableOpacity
            onPress={() => router.back()}
            className={`w-10 h-10 rounded-full items-center justify-center ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}
            accessibilityLabel="Indietro"
            accessibilityRole="button"
          >
            <Text className={`text-lg ${isDark ? 'text-white' : 'text-slate-600'}`}>{'\u{2190}'}</Text>
          </TouchableOpacity>
          <Text className={`text-lg font-bold flex-1 ${isDark ? 'text-white' : 'text-slate-800'}`}>
            Trova un avvocato
          </Text>
          <Text className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            {avvocatiFiltrati.length} risultati
          </Text>
        </View>

        {/* Search */}
        <View
          className={`flex-row items-center rounded-xl px-4 py-2.5 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border`}
        >
          <Text className={`text-base mr-2 ${isDark ? 'text-slate-400' : 'text-slate-400'}`}>{'\u{1F50D}'}</Text>
          <TextInput
            className={`flex-1 text-base ${isDark ? 'text-white' : 'text-slate-800'}`}
            placeholder="Cerca per nome, città o studio..."
            placeholderTextColor={isDark ? '#64748b' : '#94a3b8'}
            value={ricerca}
            onChangeText={setRicerca}
            accessibilityLabel="Cerca avvocato"
          />
          {ricerca ? (
            <TouchableOpacity
              onPress={() => setRicerca('')}
              accessibilityLabel="Cancella ricerca"
              accessibilityRole="button"
            >
              <Text className={`text-base ${isDark ? 'text-slate-400' : 'text-slate-400'}`}>{'\u{2716}'}</Text>
            </TouchableOpacity>
          ) : null}
        </View>

        {/* Filter chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 8, paddingTop: 12 }}
        >
          {SPECIALIZZAZIONI.map((spec) => {
            const attivo = filtriAttivi.includes(spec.id);
            return (
              <TouchableOpacity
                key={spec.id}
                onPress={() => toggleFiltro(spec.id)}
                className={`px-4 py-2 rounded-full border ${
                  attivo
                    ? 'bg-teal-600 border-teal-600'
                    : isDark
                      ? 'bg-slate-800 border-slate-700'
                      : 'bg-white border-slate-200'
                }`}
                activeOpacity={0.7}
                accessibilityLabel={`Filtra per ${spec.label}`}
                accessibilityRole="button"
              >
                <Text
                  className={`text-sm font-medium ${attivo ? 'text-white' : isDark ? 'text-slate-300' : 'text-slate-600'}`}
                >
                  {spec.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Results */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 8, paddingBottom: 40 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={isDark ? '#94a3b8' : '#0f766e'}
            colors={['#0f766e']}
          />
        }
      >
        {avvocatiFiltrati.length === 0 ? (
          <View className="items-center px-10 pt-16">
            <View
              className={`w-20 h-20 rounded-full items-center justify-center mb-4 ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}
            >
              <Text className="text-4xl">{'\u{1F50D}'}</Text>
            </View>
            <Text className={`text-lg font-semibold text-center mb-2 ${isDark ? 'text-white' : 'text-slate-800'}`}>
              Nessun avvocato trovato
            </Text>
            <Text className={`text-sm text-center leading-5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Prova a modificare i filtri o la ricerca per trovare più risultati.
            </Text>
          </View>
        ) : (
          <View className="px-5 gap-3 pt-3">
            {avvocatiFiltrati.map((avv) => (
              <TouchableOpacity
                key={avv.id}
                onPress={() => router.push(`/avvocati/${avv.id}`)}
                className={`rounded-2xl p-4 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border shadow-sm`}
                activeOpacity={0.7}
                accessibilityLabel={`Avvocato ${avv.nome}`}
                accessibilityRole="button"
              >
                <View className="flex-row gap-3">
                  {/* Avatar */}
                  <View
                    className={`w-14 h-14 rounded-full items-center justify-center ${isDark ? 'bg-slate-700' : 'bg-teal-100'}`}
                  >
                    <Text className="text-2xl">{'\u{1F464}'}</Text>
                  </View>

                  {/* Info */}
                  <View className="flex-1">
                    <View className="flex-row items-center gap-2">
                      <Text className={`font-semibold text-base flex-1 ${isDark ? 'text-white' : 'text-slate-800'}`}>
                        {avv.nome}
                      </Text>
                      {avv.disponibile && (
                        <View className="w-2.5 h-2.5 rounded-full bg-green-500" />
                      )}
                    </View>
                    <Text className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      {avv.studio}
                    </Text>
                    <Text className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                      {avv.città}
                    </Text>
                    <View className="flex-row items-center gap-3 mt-1.5">
                      <View className="flex-row items-center gap-1">
                        <Stelle valutazione={avv.valutazione} />
                        <Text className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                          ({avv.recensioni})
                        </Text>
                      </View>
                      <Text className={`text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                        {avv.prezzo}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Specializzazioni */}
                <View className="flex-row flex-wrap gap-1.5 mt-3">
                  {avv.specializzazioni.map((spec) => {
                    const label = SPECIALIZZAZIONI.find((s) => s.id === spec)?.label ?? spec;
                    return (
                      <View
                        key={spec}
                        className={`px-2.5 py-1 rounded-full ${isDark ? 'bg-slate-700' : 'bg-teal-50'}`}
                      >
                        <Text className={`text-xs ${isDark ? 'text-slate-300' : 'text-teal-700'}`}>
                          {label}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

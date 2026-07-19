import { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/providers/ThemeProvider';

type TipoCaso = {
  key: string;
  icona: string;
  label: string;
};

const TIPI_CASO: TipoCaso[] = [
  { key: 'mancata_manutenzione', icona: '\u{1F3E0}', label: 'Mancata manutenzione' },
  { key: 'sfratto', icona: '\u{1F6AB}', label: 'Sfratto' },
  { key: 'aumento_canone', icona: '\u{1F4B0}', label: 'Aumento canone' },
  { key: 'molestie', icona: '\u{26A0}\uFE0F', label: 'Molestie' },
  { key: 'deposito_cauzionale', icona: '\u{1F4B3}', label: 'Deposito cauzionale' },
  { key: 'altro', icona: '\u{1F4AC}', label: 'Altro' },
];

const STEP_TOTALI = 5;

export default function NuovoCasoScreen() {
  const { isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [tipo, setTipo] = useState<string | null>(null);
  const [descrizione, setDescrizione] = useState('');
  const [proveSelezionate] = useState<string[]>([]);
  const [proprietario, setProprietario] = useState({ nome: '', telefono: '', indirizzo: '' });

  const progresso = (step / STEP_TOTALI) * 100;

  const handleAvanti = () => {
    if (step === 1 && !tipo) {
      Alert.alert('Seleziona un tipo', 'Scegli il tipo di caso per continuare.');
      return;
    }
    if (step === 2 && !descrizione.trim()) {
      Alert.alert('Descrivi il problema', 'Inserisci una descrizione per continuare.');
      return;
    }
    if (step === STEP_TOTALI) {
      handleCrea();
      return;
    }
    setStep((prev) => prev + 1);
  };

  const handleCrea = () => {
    Alert.alert('Caso creato!', 'La tua pratica è stata aperta con successo.', [
      { text: 'OK', onPress: () => router.back() },
    ]);
  };

  return (
    <View className={`flex-1 ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <ScrollView
        contentContainerStyle={{ paddingTop: insets.top + 16, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between px-5 mb-4">
          <TouchableOpacity
            onPress={() => {
              if (step > 1) setStep((prev) => prev - 1);
              else router.back();
            }}
            className={`w-9 h-9 rounded-full items-center justify-center ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`}
            accessibilityLabel="Indietro"
            accessibilityRole="button"
          >
            <Text className={isDark ? 'text-white' : 'text-slate-700'}>{'\u{2190}'}</Text>
          </TouchableOpacity>
          <Text className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>
            Nuovo Caso
          </Text>
          <Text className={`text-sm font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            {step}/{STEP_TOTALI}
          </Text>
        </View>

        {/* Progress bar */}
        <View className={`mx-5 h-1.5 rounded-full mb-6 ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`}>
          <View
            className="h-full rounded-full bg-teal-600"
            style={{ width: `${progresso}%` }}
          />
        </View>

        {/* Step content */}
        <View className="px-5">
          {step === 1 && (
            <>
              <Text className={`text-xl font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-800'}`}>
                Che tipo di problema?
              </Text>
              <Text className={`text-sm mb-5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Seleziona la categoria più vicina al tuo caso.
              </Text>
              <View className="flex-row flex-wrap gap-3">
                {TIPI_CASO.map((t) => (
                  <TouchableOpacity
                    key={t.key}
                    onPress={() => setTipo(t.key)}
                    className={`w-[47%] rounded-2xl p-4 items-center border ${
                      tipo === t.key
                        ? 'bg-teal-50 border-teal-400'
                        : isDark
                          ? 'bg-slate-800 border-slate-700'
                          : 'bg-white border-slate-200'
                    }`}
                    activeOpacity={0.7}
                    accessibilityLabel={t.label}
                    accessibilityRole="button"
                  >
                    <Text className="text-3xl mb-2">{t.icona}</Text>
                    <Text
                      className={`text-sm font-medium text-center ${
                        tipo === t.key ? 'text-teal-700' : isDark ? 'text-white' : 'text-slate-700'
                      }`}
                    >
                      {t.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}

          {step === 2 && (
            <>
              <Text className={`text-xl font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-800'}`}>
                Descrivi il problema
              </Text>
              <Text className={`text-sm mb-5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Racconta cosa è successo. Più dettagli ci fornisci, meglio Giusta potrà aiutarti.
              </Text>
              <TextInput
                className={`rounded-xl px-4 py-3 text-base min-h-[200px] ${
                  isDark ? 'bg-slate-800 text-white border-slate-700' : 'bg-white text-slate-800 border-slate-200'
                } border`}
                placeholder="Es. Il proprietario non risponde alle richieste di riparazione del bagno..."
                placeholderTextColor={isDark ? '#64748b' : '#94a3b8'}
                value={descrizione}
                onChangeText={setDescrizione}
                multiline
                textAlignVertical="top"
                accessibilityLabel="Descrizione del problema"
              />
            </>
          )}

          {step === 3 && (
            <>
              <Text className={`text-xl font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-800'}`}>
                Seleziona le prove
              </Text>
              <Text className={`text-sm mb-5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Scegli dal tuo Vault le prove da collegare a questo caso (opzionale).
              </Text>
              <View
                className={`rounded-2xl p-8 items-center border border-dashed ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}
              >
                <Text className="text-4xl mb-3">{'\u{1F512}'}</Text>
                <Text className={`text-sm text-center ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {proveSelezionate.length > 0
                    ? `${proveSelezionate.length} prove selezionate`
                    : 'Nessuna prova selezionata. Puoi sempre aggiungerle in seguito.'}
                </Text>
              </View>
            </>
          )}

          {step === 4 && (
            <>
              <Text className={`text-xl font-bold mb-1 ${isDark ? 'text-white' : 'text-slate-800'}`}>
                Chi è il proprietario?
              </Text>
              <Text className={`text-sm mb-5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Inserisci i dati del proprietario di casa.
              </Text>
              <View className="mb-4">
                <Text className={`text-sm font-medium mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Nome completo
                </Text>
                <TextInput
                  className={`rounded-xl px-4 py-3 text-base ${isDark ? 'bg-slate-800 text-white border-slate-700' : 'bg-white text-slate-800 border-slate-200'} border`}
                  placeholder="Mario Rossi"
                  placeholderTextColor={isDark ? '#64748b' : '#94a3b8'}
                  value={proprietario.nome}
                  onChangeText={(t) => setProprietario((p) => ({ ...p, nome: t }))}
                  accessibilityLabel="Nome del proprietario"
                />
              </View>
              <View className="mb-4">
                <Text className={`text-sm font-medium mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Telefono
                </Text>
                <TextInput
                  className={`rounded-xl px-4 py-3 text-base ${isDark ? 'bg-slate-800 text-white border-slate-700' : 'bg-white text-slate-800 border-slate-200'} border`}
                  placeholder="+39 123 456 7890"
                  placeholderTextColor={isDark ? '#64748b' : '#94a3b8'}
                  value={proprietario.telefono}
                  onChangeText={(t) => setProprietario((p) => ({ ...p, telefono: t }))}
                  keyboardType="phone-pad"
                  accessibilityLabel="Telefono del proprietario"
                />
              </View>
              <View className="mb-4">
                <Text className={`text-sm font-medium mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                  Indirizzo (immobile)
                </Text>
                <TextInput
                  className={`rounded-xl px-4 py-3 text-base ${isDark ? 'bg-slate-800 text-white border-slate-700' : 'bg-white text-slate-800 border-slate-200'} border`}
                  placeholder="Via Roma 42, Milano"
                  placeholderTextColor={isDark ? '#64748b' : '#94a3b8'}
                  value={proprietario.indirizzo}
                  onChangeText={(t) => setProprietario((p) => ({ ...p, indirizzo: t }))}
                  accessibilityLabel="Indirizzo dell'immobile"
                />
              </View>
            </>
          )}

          {step === 5 && (
            <>
              <Text className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-800'}`}>
                Riepilogo
              </Text>
              <View
                className={`rounded-2xl p-4 mb-4 ${isDark ? 'bg-slate-800' : 'bg-white'} border ${isDark ? 'border-slate-700' : 'border-slate-200'}`}
              >
                <RiepilogoRow
                  label="Tipo"
                  value={TIPI_CASO.find((t) => t.key === tipo)?.label ?? ''}
                  isDark={isDark}
                />
                <RiepilogoRow
                  label="Descrizione"
                  value={descrizione}
                  isDark={isDark}
                />
                <RiepilogoRow
                  label="Prove collegate"
                  value={proveSelezionate.length > 0 ? `${proveSelezionate.length} prove` : 'Nessuna'}
                  isDark={isDark}
                />
                <RiepilogoRow
                  label="Proprietario"
                  value={proprietario.nome || 'Non specificato'}
                  isDark={isDark}
                />
              </View>
            </>
          )}
        </View>
      </ScrollView>

      {/* Bottom button */}
      <View
        className={`px-5 pt-3 pb-6 border-t ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}
        style={{ paddingBottom: insets.bottom + 12 }}
      >
        <TouchableOpacity
          onPress={handleAvanti}
          className="bg-teal-600 rounded-xl py-4 items-center"
          activeOpacity={0.8}
          accessibilityLabel={step === STEP_TOTALI ? 'Crea caso' : 'Continua'}
          accessibilityRole="button"
        >
          <Text className="text-white font-semibold text-base">
            {step === STEP_TOTALI ? 'Crea Caso' : 'Continua'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function RiepilogoRow({
  label,
  value,
  isDark,
}: {
  label: string;
  value: string;
  isDark: boolean;
}) {
  return (
    <View className="flex-row justify-between py-2.5 border-b last:border-b-0 border-slate-200 dark:border-slate-700">
      <Text className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{label}</Text>
      <Text
        className={`text-sm font-medium flex-1 text-right ml-4 ${isDark ? 'text-white' : 'text-slate-800'}`}
        numberOfLines={2}
      >
        {value}
      </Text>
    </View>
  );
}

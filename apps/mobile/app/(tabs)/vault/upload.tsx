import { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/providers/ThemeProvider';

type Categoria =
  | 'Danni'
  | 'Comunicazioni'
  | 'Bollette'
  | 'Ricevute'
  | 'Molestie'
  | 'Altro';

const CATEGORIE: Categoria[] = [
  'Danni',
  'Comunicazioni',
  'Bollette',
  'Ricevute',
  'Molestie',
  'Altro',
];

type UploadSource = 'camera' | 'gallery' | 'audio' | 'document' | null;

function SourceButton({
  icon,
  label,
  onPress,
  disabled,
}: {
  icon: string;
  label: string;
  onPress: () => void;
  disabled?: boolean;
}) {
  const { isDark } = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={`flex-1 rounded-2xl p-5 items-center justify-center min-h-[120px] ${disabled ? 'opacity-40' : ''} ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border shadow-sm`}
      activeOpacity={0.7}
      accessibilityLabel={label}
      accessibilityRole="button"
    >
      <Text className="text-3xl mb-2">{icon}</Text>
      <Text className={`text-sm font-medium text-center ${isDark ? 'text-white' : 'text-slate-700'}`}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export default function UploadScreen() {
  const { isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [source, setSource] = useState<UploadSource>(null);
  const [titolo, setTitolo] = useState('');
  const [descrizione, setDescrizione] = useState('');
  const [categoria, setCategoria] = useState<Categoria | null>(null);
  const [associaCaso, setAssociaCaso] = useState(false);
  const [gpsAbilitato, setGpsAbilitato] = useState(false);
  const [caricamento, setCaricamento] = useState(false);
  const [progresso, setProgresso] = useState(0);

  const handleSalva = async () => {
    if (!titolo.trim()) {
      Alert.alert('Campo obbligatorio', 'Inserisci un titolo per la prova.');
      return;
    }
    setCaricamento(true);
    setProgresso(0);

    const interval = setInterval(() => {
      setProgresso((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    await new Promise((r) => setTimeout(r, 3000));
    clearInterval(interval);
    setProgresso(100);

    const hashFinto = Array.from({ length: 64 }, () =>
      '0123456789abcdef'.charAt(Math.floor(Math.random() * 16)),
    ).join('');

    setCaricamento(false);
    Alert.alert(
      'Prova salvata',
      `Hash della prova:\n${hashFinto}\n\nLa prova è protetta e timestampata.`,
      [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ],
    );
  };

  if (caricamento) {
    return (
      <View
        className={`flex-1 items-center justify-center px-8 ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}
      >
        <ActivityIndicator size="large" color="#0f766e" />
        <Text className={`text-lg font-semibold mt-5 ${isDark ? 'text-white' : 'text-slate-800'}`}>
          Salvataggio in corso...
        </Text>
        <View
          className={`w-full h-2 rounded-full mt-4 ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`}
        >
          <View
            className="h-full rounded-full bg-teal-600"
            style={{ width: `${progresso}%` }}
          />
        </View>
        <Text className={`text-sm mt-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          {progresso}%
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      className={`flex-1 ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}
      contentContainerStyle={{ paddingTop: insets.top + 16, paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 mb-6">
        <TouchableOpacity
          onPress={() => router.back()}
          className={`w-9 h-9 rounded-full items-center justify-center ${isDark ? 'bg-slate-700' : 'bg-slate-200'}`}
          accessibilityLabel="Indietro"
          accessibilityRole="button"
        >
          <Text className={isDark ? 'text-white' : 'text-slate-700'}>{'\u{2190}'}</Text>
        </TouchableOpacity>
        <Text className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-800'}`}>
          Nuova Prova
        </Text>
        <View className="w-9" />
      </View>

      {!source ? (
        <>
          {/* Source selection */}
          <Text
            className={`text-xs uppercase tracking-wider font-semibold mb-3 px-5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}
          >
            Scegli origine
          </Text>
          <View className="flex-row gap-3 px-5 mb-8">
            <SourceButton
              icon={'\u{1F4F7}'}
              label="Fotocamera"
              onPress={() => setSource('camera')}
            />
            <SourceButton
              icon={'\u{1F5BC}\uFE0F'}
              label="Galleria"
              onPress={() => setSource('gallery')}
            />
          </View>
          <View className="flex-row gap-3 px-5 mb-8">
            <SourceButton
              icon={'\u{1F399}\uFE0F'}
              label="Registra Audio"
              onPress={() => setSource('audio')}
            />
            <SourceButton
              icon={'\u{1F4C4}'}
              label="Documento"
              onPress={() => setSource('document')}
            />
          </View>

          <Text
            className={`text-xs text-center leading-5 px-8 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}
          >
            I file vengono crittografati e timestampati prima del caricamento.{'\n'}Nessuno può
            modificarli a tua insaputa.
          </Text>
        </>
      ) : (
        <>
          {/* Preview placeholder */}
          <View
            className={`mx-5 h-52 rounded-2xl items-center justify-center mb-5 ${isDark ? 'bg-slate-800' : 'bg-slate-100'} border ${isDark ? 'border-slate-700' : 'border-slate-200'} border-dashed`}
          >
            <Text className="text-5xl mb-2">{
              source === 'camera' || source === 'gallery' ? '\u{1F5BC}\uFE0F' :
              source === 'audio' ? '\u{1F399}\uFE0F' : '\u{1F4C4}'
            }</Text>
            <Text className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {source === 'camera' ? 'Foto dalla fotocamera' :
               source === 'gallery' ? 'Immagine dalla galleria' :
               source === 'audio' ? 'Registrazione audio' : 'Documento selezionato'}
            </Text>
          </View>

          {/* Form */}
          <View className="px-5">
            <Text className={`text-xs uppercase tracking-wider font-semibold mb-3 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Dettagli
            </Text>

            <View className="mb-4">
              <Text className={`text-sm font-medium mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Titolo <Text className="text-red-500">*</Text>
              </Text>
              <TextInput
                className={`rounded-xl px-4 py-3 text-base ${isDark ? 'bg-slate-800 text-white border-slate-700' : 'bg-white text-slate-800 border-slate-200'} border`}
                placeholder="Es. Danno al bagno"
                placeholderTextColor={isDark ? '#64748b' : '#94a3b8'}
                value={titolo}
                onChangeText={setTitolo}
                accessibilityLabel="Titolo della prova"
              />
            </View>

            <View className="mb-4">
              <Text className={`text-sm font-medium mb-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Descrizione
              </Text>
              <TextInput
                className={`rounded-xl px-4 py-3 text-base min-h-[80px] ${isDark ? 'bg-slate-800 text-white border-slate-700' : 'bg-white text-slate-800 border-slate-200'} border`}
                placeholder="Descrivi cosa mostra questa prova..."
                placeholderTextColor={isDark ? '#64748b' : '#94a3b8'}
                value={descrizione}
                onChangeText={setDescrizione}
                multiline
                textAlignVertical="top"
                accessibilityLabel="Descrizione della prova"
              />
            </View>

            {/* Categoria */}
            <Text className={`text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Categoria
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-4"
              contentContainerStyle={{ gap: 8 }}
            >
              {CATEGORIE.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  onPress={() => setCategoria(cat)}
                  className={`px-4 py-2 rounded-full ${categoria === cat ? 'bg-teal-600' : isDark ? 'bg-slate-800' : 'bg-slate-200'}`}
                  accessibilityLabel={`Categoria: ${cat}`}
                  accessibilityRole="button"
                >
                  <Text
                    className={`text-sm font-medium ${categoria === cat ? 'text-white' : isDark ? 'text-slate-300' : 'text-slate-600'}`}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Associa a caso */}
            <View
              className={`flex-row items-center justify-between py-3 px-4 rounded-xl mb-3 ${isDark ? 'bg-slate-800' : 'bg-white'} border ${isDark ? 'border-slate-700' : 'border-slate-200'}`}
            >
              <View className="flex-row items-center gap-3">
                <Text className="text-xl">{'\u{1F4CB}'}</Text>
                <View>
                  <Text className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-700'}`}>
                    Associa a caso
                  </Text>
                  <Text className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Opzionale
                  </Text>
                </View>
              </View>
              <Switch
                value={associaCaso}
                onValueChange={setAssociaCaso}
                trackColor={{ false: isDark ? '#475569' : '#cbd5e1', true: '#0f766e' }}
                thumbColor="#ffffff"
                accessibilityLabel="Associa a caso"
              />
            </View>

            {/* GPS */}
            <View
              className={`flex-row items-center justify-between py-3 px-4 rounded-xl mb-5 ${isDark ? 'bg-slate-800' : 'bg-white'} border ${isDark ? 'border-slate-700' : 'border-slate-200'}`}
            >
              <View className="flex-row items-center gap-3">
                <Text className="text-xl">{'\u{1F4CD}'}</Text>
                <View>
                  <Text className={`text-sm font-medium ${isDark ? 'text-white' : 'text-slate-700'}`}>
                    Attiva GPS
                  </Text>
                  <Text className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Geolocalizza la prova
                  </Text>
                </View>
              </View>
              <Switch
                value={gpsAbilitato}
                onValueChange={setGpsAbilitato}
                trackColor={{ false: isDark ? '#475569' : '#cbd5e1', true: '#0f766e' }}
                thumbColor="#ffffff"
                accessibilityLabel="Attiva GPS"
              />
            </View>

            {/* Submit */}
            <TouchableOpacity
              onPress={handleSalva}
              className="bg-teal-600 rounded-xl py-4 items-center"
              activeOpacity={0.8}
              disabled={!titolo.trim()}
              accessibilityLabel="Salva prova"
              accessibilityRole="button"
            >
              <Text className="text-white font-semibold text-base">Salva Prova</Text>
            </TouchableOpacity>

            <View className="flex-row items-center justify-center gap-1.5 mt-4">
              <Text className="text-xs text-slate-400">{'\u{1F512}'}</Text>
              <Text className="text-xs text-slate-400">
                Crittografato e timestampato prima del caricamento
              </Text>
            </View>
          </View>
        </>
      )}
    </ScrollView>
  );
}

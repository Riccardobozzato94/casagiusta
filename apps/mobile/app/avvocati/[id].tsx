import { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
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

type Recensione = {
  id: string;
  nome: string;
  valutazione: number;
  testo: string;
  data: string;
};

const MOCK_AVVOCATI: Record<string, Avvocato> = {
  a1: { id: 'a1', nome: 'Avv. Maria Rossi', studio: 'Studio Legale Rossi & Associati', città: 'Milano', specializzazioni: ['locatizio', 'sfratti'], prezzo: 'â¬â¬', valutazione: 4.8, recensioni: 124, disponibile: true, descrizione: 'Esperta in diritto locatizio con oltre 15 anni di esperienza. Specializzata in recovery crediti e sfratti per morositÃ .Ha assistito oltre 300 inquilini nella difesa dei propri diritti, con un tasso di successo del 92% nelle controversie. Membro dell\'Unione Nazionale delle Camere Civili e collaboratrice di associazioni inquilini.', telefono: '+39 02 1234567', email: 'maria.rossi@studiorossi.it' },
  a2: { id: 'a2', nome: 'Avv. Giovanni Verdi', studio: 'Verdi Legal', città: 'Roma', specializzazioni: ['condominio', 'locatizio'], prezzo: 'â¬â¬â¬', valutazione: 4.9, recensioni: 87, disponibile: true, descrizione: 'Esperto in controversie condominiali e locatizie. Consulente per grandi proprietÃ  immobiliari e amministratori di condominio.', telefono: '+39 06 7654321', email: 'g.verdi@verdilegal.it' },
  a3: { id: 'a3', nome: 'Avv. Luca Bianchi', studio: 'Bianchi Law', città: 'Torino', specializzazioni: ['morositÃ ', 'danni'], prezzo: 'â¬', valutazione: 4.5, recensioni: 56, disponibile: true, descrizione: 'Giovane avvocato con approccio innovativo. Tariffe accessibili e consulenze online. Specializzato in recupero crediti e danni locatizi.', telefono: '+39 011 9876543', email: 'l.bianchi@bianchilaw.it' },
  a4: { id: 'a4', nome: 'Avv. Elena Conti', studio: 'Studio Legale Conti', città: 'Napoli', specializzazioni: ['locatizio', 'danni', 'condominio'], prezzo: 'â¬â¬', valutazione: 4.7, recensioni: 203, disponibile: false, descrizione: 'Esperta in diritto immobiliare e locatizio. Gestione completa di controversie condominiali e risarcimento danni.', telefono: '+39 081 3456789', email: 'e.conti@studiolegaleconti.it' },
  a5: { id: 'a5', nome: 'Avv. Marco Neri', studio: 'Neri & Partners', città: 'Bologna', specializzazioni: ['sfratti', 'morositÃ '], prezzo: 'â¬â¬', valutazione: 4.6, recensioni: 91, disponibile: true, descrizione: 'Specializzato in procedure esecutive e sfratti. Assistenza completa in tutte le fasi processuali con approccio pragmatico.', telefono: '+39 051 2345678', email: 'm.neri@neripartners.it' },
  a6: { id: 'a6', nome: 'Avv. Sara Gialli', studio: 'Gialli Legal', città: 'Firenze', specializzazioni: ['locatizio', 'condominio'], prezzo: 'â¬â¬â¬', valutazione: 4.9, recensioni: 67, disponibile: true, descrizione: 'Diritto locatizio e condominiale. Assistenza in mediazioni e controversie stragiudiziali con approccio conciliativo.', telefono: '+39 055 8765432', email: 's.gialli@giallilegal.it' },
  a7: { id: 'a7', nome: 'Avv. Paolo Viola', studio: 'Studio Viola', città: 'Roma', specializzazioni: ['danni', 'multa', 'locatizio'], prezzo: 'â¬', valutazione: 4.3, recensioni: 42, disponibile: true, descrizione: 'Tariffe contenute per assistenza su danni locatizi e contravvenzioni. Primo colloquio gratuito sempre disponibile.', telefono: '+39 06 3456789', email: 'p.viola@studioviola.it' },
  a8: { id: 'a8', nome: 'Avv. Francesca Moretti', studio: 'Moretti Law Firm', città: 'Padova', specializzazioni: ['locatizio', 'morositÃ ', 'sfratti'], prezzo: 'â¬â¬', valutazione: 4.7, recensioni: 118, disponibile: false, descrizione: 'Esperta in diritto delle locazioni e recupero crediti. Approccio pragmatico e risolutivo. Collabora con associazioni di categoria.', telefono: '+39 049 2345678', email: 'f.moretti@morettilaw.it' },
  a9: { id: 'a9', nome: 'Avv. Antonio Russo', studio: 'Russo & Associati', città: 'Palermo', specializzazioni: ['condominio', 'danni'], prezzo: 'â¬', valutazione: 4.4, recensioni: 35, disponibile: true, descrizione: 'Consulenza legale in ambito condominiale e risarcimento danni. Assistenza in tutta la Sicilia.', telefono: '+39 091 9876543', email: 'a.russo@russoassociati.it' },
  a10: { id: 'a10', nome: 'Avv. Chienda Fioravanti', studio: 'Fioravanti Legal', città: 'Bologna', specializzazioni: ['locatizio', 'condominio', 'sfratti'], prezzo: 'â¬â¬', valutazione: 4.8, recensioni: 156, disponibile: true, descrizione: 'Esperta in tutele delle locazioni abitative e commerciali. Consulente di associazioni inquilini e difensore dei diritti dei conduttori.', telefono: '+39 051 8765432', email: 'c.bianchi@fioravantilegal.it' },
};

const SPECIALIZZAZIONI_LABEL: Record<Specializzazione, string> = {
  locatizio: 'Diritto locatizio',
  sfratti: 'Sfratti',
  condominio: 'Condominio',
  morositÃ : 'MorositÃ ',
  danni: 'Danni e risarcimenti',
  multa: 'Multe e contravvenzioni',
};

const MOCK_RECENSIONI: Record<string, Recensione[]> = {
  a1: [
    { id: 'r1', nome: 'Marco T.', valutazione: 5, testo: 'Avvocata eccellente, mi ha seguito in una controversia con il proprietario e siamo riusciti a ottenere il rimborso del deposito cauzionale. Molto preparata e disponibile.', data: '2 settimane fa' },
    { id: 'r2', nome: 'Sofia R.', valutazione: 4, testo: 'Professionale e competente. Mi ha aiutato a risolvere una questione di sfratto. Unica pecca: i tempi di attesa per l\'appuntamento.', data: '1 mese fa' },
    { id: 'r3', nome: 'Lorenzo M.', valutazione: 5, testo: 'La ringrazio tantissimo per l\'aiuto. Ha salvato la mia situazione con un proprietario scorretto. La consiglio vivamente!', data: '2 mesi fa' },
  ],
  a2: [
    { id: 'r4', nome: 'Anna P.', valutazione: 5, testo: 'Avvocato preparatissimo in diritto condominiale. Ha risolto una controversia complessa con l\'amministratore.', data: '1 mese fa' },
  ],
};

function Stelle({ valutazione, size = 'sm' }: { valutazione: number; size?: 'sm' | 'lg' }) {
  const fontSize = size === 'lg' ? 20 : 14;
  return (
    <View className="flex-row items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Text key={i} style={{ fontSize }}>
          {i < Math.floor(valutazione) ? '\u{2605}' : '\u{2606}'}
        </Text>
      ))}
    </View>
  );
}

function PrezzoIcone({ prezzo }: { prezzo: FasciaPrezzo }) {
  const euroCount = prezzo.length;
  return (
    <Text className="text-lg text-teal-500">
      {'\u{20AC}'.repeat(euroCount)}
    </Text>
  );
}

export default function AvvocatoDetailScreen() {
  const { isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const avvocato = MOCK_AVVOCATI[id];
  const recensioni = MOCK_RECENSIONI[id] ?? [];

  const handleChiama = async () => {
    if (!avvocato) return;
    try {
      await Linking.openURL(`tel:${avvocato.telefono}`);
    } catch {
      Alert.alert('Errore', 'Impossibile effettuare la chiamata.');
    }
  };

  const handleMail = async () => {
    if (!avvocato) return;
    try {
      await Linking.openURL(`mailto:${avvocato.email}`);
    } catch {
      Alert.alert('Errore', 'Impossibile aprire il client email.');
    }
  };

  const handleRichiediConsulenza = () => {
    Alert.alert(
      'Richiesta inviata',
      `${avvocato?.nome} riceverà la tua richiesta di consulenza. Ti risponderà entro 24 ore.`
    );
  };

  if (!avvocato) {
    return (
      <View className={`flex-1 items-center justify-center ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
        <Text className={`text-lg ${isDark ? 'text-white' : 'text-slate-800'}`}>Avvocato non trovato</Text>
        <TouchableOpacity onPress={() => router.back()} className="mt-4">
          <Text className="text-teal-500">Torna indietro</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className={`flex-1 ${isDark ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Header */}
        <View
          style={{ paddingTop: insets.top + 12 }}
          className="px-5 pb-6"
        >
          <View className="flex-row items-center gap-3 mb-6">
            <TouchableOpacity
              onPress={() => router.back()}
              className={`w-10 h-10 rounded-full items-center justify-center ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`}
              accessibilityLabel="Indietro"
              accessibilityRole="button"
            >
              <Text className={`text-lg ${isDark ? 'text-white' : 'text-slate-600'}`}>{'\u{2190}'}</Text>
            </TouchableOpacity>
          </View>

          {/* Avatar + Nome */}
          <View className="items-center">
            <View
              className={`w-24 h-24 rounded-full items-center justify-center mb-4 ${isDark ? 'bg-slate-700' : 'bg-teal-100'}`}
            >
              <Text className="text-4xl">{'\u{1F464}'}</Text>
            </View>
            <Text className={`text-xl font-bold text-center ${isDark ? 'text-white' : 'text-slate-800'}`}>
              {avvocato.nome}
            </Text>
            <Text className={`text-sm text-center ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {avvocato.studio}
            </Text>
            <Text className={`text-xs text-center mt-1 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
              {'\u{1F4CD}'} {avvocato.città}
            </Text>

            {!avvocato.disponibile && (
              <View className="mt-3 px-3 py-1.5 bg-amber-500/20 rounded-full">
                <Text className="text-amber-500 text-sm font-medium">Non disponibile al momento</Text>
              </View>
            )}
          </View>
        </View>

        {/* Stats bar */}
        <View
          className={`mx-5 rounded-2xl p-4 mb-6 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border`}
        >
          <View className="flex-row justify-around">
            <View className="items-center">
              <Stelle valutazione={avvocato.valutazione} size="lg" />
              <Text className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {avvocato.valutazione} ({avvocato.recensioni} recensioni)
              </Text>
            </View>
            <View className="items-center">
              <PrezzoIcone prezzo={avvocato.prezzo} />
              <Text className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Tariffa indicativa
              </Text>
            </View>
          </View>
        </View>

        {/* Specializzazioni */}
        <View className="px-5 mb-6">
          <Text className={`text-sm font-semibold mb-3 ${isDark ? 'text-white' : 'text-slate-800'}`}>
            Specializzazioni
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {avvocato.specializzazioni.map((spec) => (
              <View
                key={spec}
                className={`px-3 py-1.5 rounded-full ${isDark ? 'bg-teal-900/30' : 'bg-teal-50'}`}
              >
                <Text className={`text-sm ${isDark ? 'text-teal-300' : 'text-teal-700'}`}>
                  {SPECIALIZZAZIONI_LABEL[spec]}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Descrizione */}
        <View className="px-5 mb-6">
          <Text className={`text-sm font-semibold mb-3 ${isDark ? 'text-white' : 'text-slate-800'}`}>
            Chi sono
          </Text>
          <View
            className={`rounded-2xl p-4 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border`}
          >
            <Text className={`text-sm leading-6 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {avvocato.descrizione}
            </Text>
          </View>
        </View>

        {/* Recensioni */}
        {recensioni.length > 0 && (
          <View className="px-5 mb-6">
            <Text className={`text-sm font-semibold mb-3 ${isDark ? 'text-white' : 'text-slate-800'}`}>
              Recensioni recenti
            </Text>
            <View className="gap-3">
              {recensioni.map((rec) => (
                <View
                  key={rec.id}
                  className={`rounded-2xl p-4 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border`}
                >
                  <View className="flex-row items-center justify-between mb-2">
                    <Text className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-slate-800'}`}>
                      {rec.nome}
                    </Text>
                    <Text className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                      {rec.data}
                    </Text>
                  </View>
                  <Stelle valutazione={rec.valutazione} />
                  <Text className={`text-sm mt-2 leading-5 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {rec.testo}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Contact CTAs */}
        <View className="px-5 gap-3">
          <TouchableOpacity
            onPress={handleRichiediConsulenza}
            disabled={!avvocato.disponibile}
            className={`bg-teal-600 py-4 rounded-xl items-center ${!avvocato.disponibile ? 'opacity-50' : ''}`}
            activeOpacity={0.8}
            accessibilityLabel="Richiedi consulenza"
            accessibilityRole="button"
          >
            <Text className="text-white font-semibold text-base">
              Richiedi consulenza
            </Text>
          </TouchableOpacity>

          <View className="flex-row gap-3">
            <TouchableOpacity
              onPress={handleChiama}
              className={`flex-1 py-3.5 rounded-xl items-center flex-row justify-center gap-2 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border`}
              activeOpacity={0.7}
              accessibilityLabel="Chiama"
              accessibilityRole="button"
            >
              <Text className={`text-base ${isDark ? 'text-white' : 'text-slate-700'}`}>{'\u{1F4DE}'}</Text>
              <Text className={`font-medium ${isDark ? 'text-white' : 'text-slate-700'}`}>Chiama</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleMail}
              className={`flex-1 py-3.5 rounded-xl items-center flex-row justify-center gap-2 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'} border`}
              activeOpacity={0.7}
              accessibilityLabel="Invia email"
              accessibilityRole="button"
            >
              <Text className={`text-base ${isDark ? 'text-white' : 'text-slate-700'}`}>{'\u{2709}\uFE0F'}</Text>
              <Text className={`font-medium ${isDark ? 'text-white' : 'text-slate-700'}`}>Email</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

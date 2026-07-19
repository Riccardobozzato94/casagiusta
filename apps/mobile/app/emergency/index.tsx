import { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, Alert, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuthStore } from '@/providers/AuthProvider';
import { supabase } from '@/lib/supabase';
import * as Crypto from 'expo-crypto';

type EmergencyStep = 'selection' | 'evidence' | 'kit';
type EmergencyType = 'molestie' | 'sfratto' | 'sanitaria' | 'violenza' | 'altro';

const EMERGENCY_TYPES: { key: EmergencyType; emoji: string; label: string }[] = [
  { key: 'molestie', emoji: '\u{1F6A8}', label: 'Molestie o abusi' },
  { key: 'sfratto', emoji: '\u26A0\uFE0F', label: 'Sfratto immediato' },
  { key: 'sanitaria', emoji: '\u{1F3E5}', label: 'Emergenza sanitaria' },
  { key: 'violenza', emoji: '\u{1F46E}', label: 'Violenza o minaccia' },
  { key: 'altro', emoji: '\u{1F4AD}', label: 'Altro' },
];

const CONTACTS_BASE = [
  { label: 'Carabinieri', number: '112', emoji: '\u{1F694}', color: 'bg-green-600' },
  { label: 'Pronto Soccorso', number: '118', emoji: '\u{1F3E5}', color: 'bg-red-600' },
];

const CONTACTS_VIOLENCE = [
  { label: 'Telefono Rosa', number: '1522', emoji: '\u{1F6E1}\uFE0F', color: 'bg-pink-600' },
];

interface EvidenceItem {
  id: string;
  type: string;
  title: string;
  thumbnail?: string;
  created_at: string;
}

export default function EmergencyScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { user } = useAuthStore();

  const [step, setStep] = useState<EmergencyStep>('selection');
  const [selectedType, setSelectedType] = useState<EmergencyType | null>(null);
  const [evidenceItems, setEvidenceItems] = useState<EvidenceItem[]>([]);
  const [selectedEvidence, setSelectedEvidence] = useState<Set<string>>(new Set());
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  useEffect(() => {
    if (user && step === 'evidence') {
      loadRecentEvidence();
    }
  }, [user, step]);

  const loadRecentEvidence = async () => {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const { data } = await supabase
      .from('evidence')
      .select('id, type, title, created_at')
      .eq('user_id', user?.id)
      .gte('created_at', twentyFourHoursAgo)
      .order('created_at', { ascending: false })
      .limit(20);
    if (data) {
      setEvidenceItems(data as EvidenceItem[]);
    }
  };

  const toggleEvidence = (id: string) => {
    setSelectedEvidence(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleTypeSelect = (type: EmergencyType) => {
    setSelectedType(type);
    setStep('evidence');
  };

  const generateReport = useCallback(async () => {
    const timestamp = new Date().toISOString();
    const hash = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      `${user?.id}-${timestamp}-emergency`,
    );
    return {
      id: hash.slice(0, 12),
      timestamp,
      type: selectedType,
      evidenceCount: selectedEvidence.size,
    };
  }, [user, selectedType, selectedEvidence]);

  const handleComplete = async () => {
    const report = await generateReport();
    setStep('kit');
  };

  const callNumber = (number: string) => {
    Linking.openURL(`tel:${number}`);
  };

  const getKitContacts = () => {
    const contacts = [...CONTACTS_BASE];
    if (selectedType === 'molestie' || selectedType === 'violenza') {
      contacts.push(...CONTACTS_VIOLENCE);
    }
    return contacts;
  };

  const handleExit = () => {
    setShowExitConfirm(true);
  };

  const confirmExit = () => {
    setShowExitConfirm(false);
    router.back();
  };

  const handleTalkToGiusta = () => {
    router.replace('/(tabs)/giusta');
  };

  return (
    <View className="flex-1 bg-black">
      {/* Dark overlay */}
      <View className="absolute inset-0 bg-black opacity-90" />

      <View className="flex-1" style={{ paddingTop: insets.top + 16 }}>
        {/* Header */}
        <View className="px-6 mb-6">
          <Text className="text-2xl font-display font-bold text-white text-center leading-8">
            Sei al sicuro.{'\n'}Prendiamo tutto ciò che ti serve.
          </Text>
        </View>

        {step === 'selection' && (
          <ScrollView className="flex-1 px-4" contentContainerStyle={{ paddingBottom: 40 }}>
            <Text className="text-white/60 text-base font-body mb-5 text-center">
              Cosa sta succedendo?
            </Text>
            {EMERGENCY_TYPES.map(item => (
              <TouchableOpacity
                key={item.key}
                onPress={() => handleTypeSelect(item.key)}
                className="flex-row items-center bg-white/10 rounded-2xl p-5 mb-3 active:bg-white/20"
                activeOpacity={0.7}
              >
                <Text className="text-3xl mr-4">{item.emoji}</Text>
                <Text className="text-white text-lg font-semibold">{item.label}</Text>
                <Text className="text-white/40 text-xl ml-auto">{'\u203A'}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        {step === 'evidence' && (
          <ScrollView className="flex-1 px-4" contentContainerStyle={{ paddingBottom: 40 }}>
            <Text className="text-white/60 text-base font-body mb-5 text-center">
              Raccogliamo le prove recenti
            </Text>

            {evidenceItems.length > 0 ? (
              <>
                <Text className="text-white/40 text-sm mb-3">
                  Seleziona foto, video o audio delle ultime 24h
                </Text>
                {evidenceItems.map(item => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => toggleEvidence(item.id)}
                    className="flex-row items-center bg-white/10 rounded-xl p-4 mb-2 active:bg-white/20"
                    activeOpacity={0.7}
                  >
                    <View className={`w-6 h-6 rounded-md border-2 mr-3 items-center justify-center ${
                      selectedEvidence.has(item.id)
                        ? 'bg-orange-500 border-orange-500'
                        : 'border-white/30'
                    }`}>
                      {selectedEvidence.has(item.id) && (
                        <Text className="text-white text-xs font-bold">{'\u2713'}</Text>
                      )}
                    </View>
                    <Text className="text-white flex-1">{item.title}</Text>
                    <Text className="text-white/40 text-sm">{item.type}</Text>
                  </TouchableOpacity>
                ))}
              </>
            ) : (
              <View className="bg-white/5 rounded-2xl p-8 items-center mb-6">
                <Text className="text-4xl mb-3">{'\u{1F4F7}'}</Text>
                <Text className="text-white/60 text-center">
                  Nessuna prova trovata nelle ultime 24h
                </Text>
              </View>
            )}

            <TouchableOpacity
              className="flex-row items-center justify-center bg-white/10 rounded-2xl p-5 mb-8 border border-dashed border-white/20 active:bg-white/20"
              activeOpacity={0.7}
            >
              <Text className="text-2xl mr-3">{'\u{1F4F7}'}</Text>
              <Text className="text-white text-lg font-semibold">Carica nuova prova ora</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleComplete}
              className="bg-orange-500 py-4 rounded-2xl items-center active:bg-orange-600"
              activeOpacity={0.8}
            >
              <Text className="text-white font-bold text-lg">Continua</Text>
            </TouchableOpacity>
          </ScrollView>
        )}

        {step === 'kit' && (
          <ScrollView className="flex-1 px-4" contentContainerStyle={{ paddingBottom: 40 }}>
            {/* Report header */}
            <View className="bg-white/10 rounded-2xl p-5 mb-6">
              <Text className="text-white font-display font-bold text-lg mb-1">
                Report di emergenza
              </Text>
              <Text className="text-white/40 text-sm font-mono">
                {new Date().toLocaleString('it-IT')}
              </Text>
              <View className="flex-row mt-3">
                <Text className="text-orange-400 text-sm font-semibold bg-orange-500/20 px-3 py-1 rounded-full">
                  {selectedType ? EMERGENCY_TYPES.find(t => t.key === selectedType)?.label : ''}
                </Text>
                <Text className="text-white/40 text-sm ml-3 self-center">
                  {selectedEvidence.size} prove selezionate
                </Text>
              </View>
            </View>

            {/* Contacts */}
            <Text className="text-white/60 text-base font-body mb-4">
              Contatti diretti
            </Text>
            {getKitContacts().map((contact, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={() => callNumber(contact.number)}
                className={`flex-row items-center ${contact.color}/20 rounded-2xl p-5 mb-3 border border-white/10 active:bg-white/10`}
                activeOpacity={0.7}
              >
                <Text className="text-2xl mr-4">{contact.emoji}</Text>
                <View className="flex-1">
                  <Text className="text-white text-lg font-semibold">{contact.label}</Text>
                  <Text className="text-white/40">{contact.number}</Text>
                </View>
                <View className={`${contact.color} rounded-xl py-2 px-5`}>
                  <Text className="text-white font-bold">CHIAMA</Text>
                </View>
              </TouchableOpacity>
            ))}

            {/* Actions */}
            <TouchableOpacity
              className="bg-primary-600 py-4 rounded-2xl items-center mt-6 active:bg-primary-700"
              activeOpacity={0.8}
            >
              <Text className="text-white font-bold text-lg">
                Invia kit ai contatti selezionati
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleTalkToGiusta}
              className="bg-white/10 py-4 rounded-2xl items-center mt-3 active:bg-white/20"
              activeOpacity={0.8}
            >
              <Text className="text-white font-semibold">
                Parliamone {'\u{1F4AC}'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleExit}
              className="py-4 items-center mt-4"
              activeOpacity={0.7}
            >
              <Text className="text-white/40 text-sm">
                Esci dalla modalità emergenza
              </Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </View>

      {/* Exit confirmation modal */}
      <Modal visible={showExitConfirm} transparent animationType="fade">
        <View className="flex-1 items-center justify-center bg-black/80 px-6">
          <View className="bg-surface-dark-secondary rounded-3xl p-6 w-full max-w-sm">
            <Text className="text-white text-lg font-display font-bold text-center mb-2">
              Uscire dalla modalità emergenza?
            </Text>
            <Text className="text-text-dark-secondary text-center mb-6">
              Il tuo kit di emergenza sarà salvato.
            </Text>
            <TouchableOpacity
              onPress={confirmExit}
              className="bg-white/10 py-3 rounded-xl items-center mb-3 active:bg-white/20"
              activeOpacity={0.8}
            >
              <Text className="text-white font-semibold">Esci</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setShowExitConfirm(false)}
              className="py-3 items-center"
              activeOpacity={0.7}
            >
              <Text className="text-text-dark-tertiary">Resta in emergenza</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

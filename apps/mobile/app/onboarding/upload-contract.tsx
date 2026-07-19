import { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

interface SelectedFile {
  name: string;
  size: number;
  uri: string;
  mimeType: string;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function UploadContractScreen() {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<SelectedFile | null>(null);

  const handlePickFile = async () => {
    try {
      const DocumentPicker = await import('expo-document-picker');
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          'application/pdf',
          'image/jpeg',
          'image/png',
          'image/heic',
          'image/heif',
        ],
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets.length > 0) {
        const asset = result.assets[0];
        setSelectedFile({
          name: asset.name,
          size: asset.size ?? 0,
          uri: asset.uri,
          mimeType: asset.mimeType ?? 'application/octet-stream',
        });
      }
    } catch {
      setSelectedFile({
        name: 'contratto-affitto.pdf',
        size: 1240000,
        uri: 'file:///placeholder',
        mimeType: 'application/pdf',
      });
    }
  };

  const handleAnalyze = () => {
    router.push('/onboarding/analyzing-contract');
  };

  const handleSkip = () => {
    router.push('/onboarding/completed');
  };

  const isImage = selectedFile?.mimeType.startsWith('image/');

  return (
    <SafeAreaView className="flex-1 bg-surface-dark-primary">
      <StatusBar style="light" />
      <View className="flex-1 px-6">
        <View className="pt-4 pb-8">
          <Text className="text-2xl font-display font-bold text-white mb-2">
            Carica il tuo{'\n'}contratto di affitto
          </Text>
          <Text className="text-base font-body text-text-dark-secondary">
            Ti aiutiamo a capirlo e a trovare cosa non va.
          </Text>
        </View>

        {!selectedFile ? (
          <TouchableOpacity
            onPress={handlePickFile}
            className="flex-1 border-2 border-dashed border-border-dark rounded-2xl items-center justify-center mb-6"
            activeOpacity={0.7}
          >
            <View className="w-20 h-20 bg-surface-dark-secondary rounded-full items-center justify-center mb-4">
              <Text className="text-3xl">📄</Text>
            </View>
            <Text className="text-white font-semibold text-lg mb-2">
              Tocca per caricare
            </Text>
            <Text className="text-text-dark-tertiary text-sm text-center px-8">
              PDF, JPEG, PNG, HEIC
            </Text>
          </TouchableOpacity>
        ) : (
          <View className="flex-1 mb-6">
            <View className="bg-surface-dark-secondary rounded-2xl p-5 flex-row items-center">
              {isImage ? (
                <Image
                  source={{ uri: selectedFile.uri }}
                  className="w-16 h-16 rounded-lg"
                  resizeMode="cover"
                />
              ) : (
                <View className="w-16 h-16 bg-primary-700/30 rounded-lg items-center justify-center">
                  <Text className="text-3xl">📄</Text>
                </View>
              )}
              <View className="flex-1 ml-4">
                <Text className="text-white font-semibold text-base font-body" numberOfLines={1}>
                  {selectedFile.name}
                </Text>
                <Text className="text-text-dark-tertiary text-sm font-body mt-1">
                  {formatSize(selectedFile.size)}
                </Text>
              </View>
              <TouchableOpacity onPress={() => setSelectedFile(null)} className="p-2">
                <Text className="text-danger-500 text-lg">✕</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View className="space-y-3 pb-8">
          <TouchableOpacity
            onPress={handleAnalyze}
            disabled={!selectedFile}
            className={`py-4 px-6 rounded-xl items-center justify-center ${
              selectedFile ? 'bg-primary-600' : 'bg-surface-dark-secondary'
            }`}
            activeOpacity={0.8}
          >
            <Text
              className={`font-semibold text-base ${
                selectedFile ? 'text-white' : 'text-text-dark-tertiary'
              }`}
            >
              Analizza contratto
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSkip} className="py-4 items-center">
            <Text className="text-text-dark-tertiary text-sm font-body">Salta per ora</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

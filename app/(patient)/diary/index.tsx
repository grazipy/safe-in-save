import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui/Button';
import { colors } from '@/styles/colors';

interface DiaryEntry {
  id: number;
  title: string;
  content: string;
  mood?: number;
  createdAt: Date;
  isPrivate: boolean;
}

interface DiaryEntryCardProps {
  entry: DiaryEntry;
  onPress: () => void;
}

const DiaryEntryCard: React.FC<DiaryEntryCardProps> = ({ entry, onPress }) => {
  const getMoodEmoji = (mood?: number) => {
    if (!mood) return '';
    switch (mood) {
      case 1: return '😢';
      case 2: return '😔';
      case 3: return '😐';
      case 4: return '😊';
      case 5: return '😄';
      default: return '';
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <TouchableOpacity style={styles.entryCard} onPress={onPress}>
      <View style={styles.entryHeader}>
        <Text style={styles.entryTitle}>{entry.title}</Text>
        <View style={styles.entryMeta}>
          {entry.mood && (
            <Text style={styles.moodEmoji}>{getMoodEmoji(entry.mood)}</Text>
          )}
          {entry.isPrivate && (
            <Ionicons name="lock-closed" size={16} color={colors.textSecondary} />
          )}
        </View>
      </View>
      <Text style={styles.entryPreview} numberOfLines={2}>
        {entry.content}
      </Text>
      <Text style={styles.entryDate}>{formatDate(entry.createdAt)}</Text>
    </TouchableOpacity>
  );
};

export default function DiaryScreen() {
  const [showNewEntry, setShowNewEntry] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [isPrivate, setIsPrivate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const mockEntries: DiaryEntry[] = [
    {
      id: 1,
      title: 'Reflexões sobre o dia',
      content: 'Hoje foi um dia desafiador, mas consegui aplicar algumas técnicas de respiração que aprendi...',
      mood: 3,
      createdAt: new Date(2024, 0, 15, 20, 30),
      isPrivate: false,
    },
    {
      id: 2,
      title: 'Progresso na terapia',
      content: 'Sinto que estou fazendo progressos reais. A sessão de hoje me ajudou a entender melhor meus padrões...',
      mood: 4,
      createdAt: new Date(2024, 0, 14, 18, 15),
      isPrivate: true,
    },
    {
      id: 3,
      title: 'Momento difícil',
      content: 'Tive um episódio de ansiedade hoje. Preciso lembrar de usar as estratégias que aprendi...',
      mood: 2,
      createdAt: new Date(2024, 0, 13, 16, 45),
      isPrivate: false,
    },
  ];

  const handleSaveEntry = async () => {
    if (!title.trim() || !content.trim()) {
      Alert.alert('Erro', 'Por favor, preencha o título e o conteúdo');
      return;
    }

    setIsLoading(true);
    try {
      // Mock save - em produção, fazer chamada para API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      Alert.alert('Sucesso', 'Entrada do diário salva com sucesso!');
      
      // Reset form
      setTitle('');
      setContent('');
      setSelectedMood(null);
      setIsPrivate(false);
      setShowNewEntry(false);
    } catch (error) {
      Alert.alert('Erro', 'Falha ao salvar entrada. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEntryPress = (entry: DiaryEntry) => {
    Alert.alert(
      entry.title,
      entry.content,
      [{ text: 'Fechar', style: 'cancel' }]
    );
  };

  if (showNewEntry) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setShowNewEntry(false)}
          >
            <Ionicons name="arrow-back" size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text style={styles.title}>Nova Entrada</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Título</Text>
            <TextInput
              style={styles.titleInput}
              value={title}
              onChangeText={setTitle}
              placeholder="Como foi seu dia?"
              maxLength={100}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Conteúdo</Text>
            <TextInput
              style={styles.contentInput}
              value={content}
              onChangeText={setContent}
              placeholder="Escreva seus pensamentos, sentimentos e reflexões..."
              multiline
              numberOfLines={8}
              textAlignVertical="top"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Como você se sente? (Opcional)</Text>
            <View style={styles.moodSelector}>
              {[1, 2, 3, 4, 5].map((mood) => (
                <TouchableOpacity
                  key={mood}
                  style={[
                    styles.moodButton,
                    selectedMood === mood && styles.moodButtonSelected,
                  ]}
                  onPress={() => setSelectedMood(mood === selectedMood ? null : mood)}
                >
                  <Text style={styles.moodEmoji}>
                    {mood === 1 ? '😢' : mood === 2 ? '😔' : mood === 3 ? '😐' : mood === 4 ? '😊' : '😄'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputContainer}>
            <TouchableOpacity
              style={styles.privacyToggle}
              onPress={() => setIsPrivate(!isPrivate)}
            >
              <Ionicons
                name={isPrivate ? 'lock-closed' : 'lock-open'}
                size={20}
                color={colors.primary}
              />
              <Text style={styles.privacyText}>
                {isPrivate ? 'Entrada privada' : 'Visível para o terapeuta'}
              </Text>
            </TouchableOpacity>
          </View>

          <Button
            title={isLoading ? 'Salvando...' : 'Salvar Entrada'}
            onPress={handleSaveEntry}
            disabled={isLoading}
            style={styles.saveButton}
          />
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Meu Diário</Text>
        <Text style={styles.subtitle}>
          Registre seus pensamentos e sentimentos
        </Text>
      </View>

      <View style={styles.actionContainer}>
        <Button
          title="Nova Entrada"
          onPress={() => setShowNewEntry(true)}
          style={styles.newEntryButton}
        />
      </View>

      <View style={styles.entriesList}>
        {mockEntries.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="book-outline" size={64} color={colors.textSecondary} />
            <Text style={styles.emptyTitle}>Nenhuma entrada ainda</Text>
            <Text style={styles.emptyMessage}>
              Comece escrevendo sua primeira entrada no diário
            </Text>
          </View>
        ) : (
          mockEntries.map((entry) => (
            <DiaryEntryCard
              key={entry.id}
              entry={entry}
              onPress={() => handleEntryPress(entry)}
            />
          ))
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 24,
    paddingTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textPrimary,
    flex: 1,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
    marginTop: 8,
  },
  actionContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  newEntryButton: {
    alignSelf: 'flex-start',
  },
  entriesList: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  entryCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  entryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    flex: 1,
  },
  entryMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  moodEmoji: {
    fontSize: 20,
  },
  entryPreview: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 8,
  },
  entryDate: {
    fontSize: 12,
    color: colors.textTertiary,
  },
  form: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  titleInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    backgroundColor: colors.surface,
  },
  contentInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    backgroundColor: colors.surface,
    minHeight: 150,
  },
  moodSelector: {
    flexDirection: 'row',
    gap: 12,
  },
  moodButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moodButtonSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  privacyToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  privacyText: {
    fontSize: 16,
    color: colors.textPrimary,
  },
  saveButton: {
    marginTop: 16,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.textPrimary,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
});
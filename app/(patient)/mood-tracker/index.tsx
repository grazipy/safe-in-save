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
import { MOOD_LABELS } from '@/utils/constants';

interface MoodButtonProps {
  mood: number;
  label: string;
  selected: boolean;
  onPress: () => void;
  color: string;
}

const MoodButton: React.FC<MoodButtonProps> = ({
  mood,
  label,
  selected,
  onPress,
  color,
}) => (
  <TouchableOpacity
    style={[
      styles.moodButton,
      selected && { backgroundColor: color, borderColor: color },
    ]}
    onPress={onPress}
  >
    <Text style={styles.moodEmoji}>
      {mood === 1 ? '😢' : mood === 2 ? '😔' : mood === 3 ? '😐' : mood === 4 ? '😊' : '😄'}
    </Text>
    <Text
      style={[
        styles.moodLabel,
        selected && { color: colors.white },
      ]}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

export default function MoodTrackerScreen() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [selectedEnergy, setSelectedEnergy] = useState<number | null>(null);
  const [selectedAnxiety, setSelectedAnxiety] = useState<number | null>(null);
  const [selectedSleep, setSelectedSleep] = useState<number | null>(null);
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const moodColors = {
    1: colors.moodTerrible,
    2: colors.moodBad,
    3: colors.moodNeutral,
    4: colors.moodGood,
    5: colors.moodExcellent,
  };

  const handleSave = async () => {
    if (!selectedMood || !selectedEnergy || !selectedAnxiety || !selectedSleep) {
      Alert.alert('Erro', 'Por favor, avalie todos os aspectos');
      return;
    }

    setIsLoading(true);
    try {
      // Mock save - em produção, fazer chamada para API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      Alert.alert('Sucesso', 'Registro de humor salvo com sucesso!');
      
      // Reset form
      setSelectedMood(null);
      setSelectedEnergy(null);
      setSelectedAnxiety(null);
      setSelectedSleep(null);
      setNotes('');
    } catch (error) {
      Alert.alert('Erro', 'Falha ao salvar registro. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Como você está hoje?</Text>
        <Text style={styles.subtitle}>
          Registre seu estado emocional para acompanhar seu progresso
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          <Ionicons name="happy" size={20} color={colors.primary} /> Humor Geral
        </Text>
        <View style={styles.moodGrid}>
          {Object.entries(MOOD_LABELS).map(([value, label]) => (
            <MoodButton
              key={value}
              mood={parseInt(value)}
              label={label}
              selected={selectedMood === parseInt(value)}
              onPress={() => setSelectedMood(parseInt(value))}
              color={moodColors[parseInt(value) as keyof typeof moodColors]}
            />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          <Ionicons name="flash" size={20} color={colors.warning} /> Nível de Energia
        </Text>
        <View style={styles.moodGrid}>
          {Object.entries(MOOD_LABELS).map(([value, label]) => (
            <MoodButton
              key={value}
              mood={parseInt(value)}
              label={label}
              selected={selectedEnergy === parseInt(value)}
              onPress={() => setSelectedEnergy(parseInt(value))}
              color={colors.warning}
            />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          <Ionicons name="alert-circle" size={20} color={colors.error} /> Ansiedade
        </Text>
        <View style={styles.moodGrid}>
          {Object.entries(MOOD_LABELS).map(([value, label]) => (
            <MoodButton
              key={value}
              mood={parseInt(value)}
              label={label}
              selected={selectedAnxiety === parseInt(value)}
              onPress={() => setSelectedAnxiety(parseInt(value))}
              color={colors.error}
            />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          <Ionicons name="moon" size={20} color={colors.info} /> Qualidade do Sono
        </Text>
        <View style={styles.moodGrid}>
          {Object.entries(MOOD_LABELS).map(([value, label]) => (
            <MoodButton
              key={value}
              mood={parseInt(value)}
              label={label}
              selected={selectedSleep === parseInt(value)}
              onPress={() => setSelectedSleep(parseInt(value))}
              color={colors.info}
            />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          <Ionicons name="chatbubble" size={20} color={colors.secondary} /> Observações (Opcional)
        </Text>
        <TextInput
          style={styles.notesInput}
          value={notes}
          onChangeText={setNotes}
          placeholder="Como foi seu dia? O que você gostaria de registrar?"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
      </View>

      <View style={styles.section}>
        <Button
          title={isLoading ? 'Salvando...' : 'Salvar Registro'}
          onPress={handleSave}
          disabled={isLoading}
          style={styles.saveButton}
        />
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
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  moodButton: {
    flex: 1,
    minWidth: '18%',
    aspectRatio: 1,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  moodEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  moodLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  notesInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: colors.surface,
    minHeight: 100,
  },
  saveButton: {
    marginBottom: 24,
  },
});
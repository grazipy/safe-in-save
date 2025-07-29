import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui/Button';
import { colors } from '@/styles/colors';
import { EXERCISE_CATEGORIES, EXERCISE_DIFFICULTIES } from '@/utils/constants';

interface Exercise {
  id: number;
  title: string;
  description: string;
  category: keyof typeof EXERCISE_CATEGORIES;
  duration: number;
  difficulty: keyof typeof EXERCISE_DIFFICULTIES;
}

interface ExerciseCardProps {
  exercise: Exercise;
  onStart: () => void;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, onStart }) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'breathing': return 'leaf';
      case 'mindfulness': return 'flower';
      case 'cognitive': return 'bulb';
      case 'behavioral': return 'walk';
      default: return 'fitness';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return colors.success;
      case 'medium': return colors.warning;
      case 'hard': return colors.error;
      default: return colors.gray500;
    }
  };

  return (
    <View style={styles.exerciseCard}>
      <View style={styles.exerciseHeader}>
        <View style={styles.exerciseIcon}>
          <Ionicons
            name={getCategoryIcon(exercise.category) as any}
            size={24}
            color={colors.primary}
          />
        </View>
        <View style={styles.exerciseInfo}>
          <Text style={styles.exerciseTitle}>{exercise.title}</Text>
          <Text style={styles.exerciseDescription}>{exercise.description}</Text>
        </View>
      </View>
      
      <View style={styles.exerciseMeta}>
        <View style={styles.metaItem}>
          <Ionicons name="time" size={16} color={colors.textSecondary} />
          <Text style={styles.metaText}>{exercise.duration} min</Text>
        </View>
        <View style={styles.metaItem}>
          <Ionicons name="bar-chart" size={16} color={getDifficultyColor(exercise.difficulty)} />
          <Text style={[styles.metaText, { color: getDifficultyColor(exercise.difficulty) }]}>
            {EXERCISE_DIFFICULTIES[exercise.difficulty]}
          </Text>
        </View>
        <View style={styles.metaItem}>
          <Ionicons name="bookmark" size={16} color={colors.textSecondary} />
          <Text style={styles.metaText}>{EXERCISE_CATEGORIES[exercise.category]}</Text>
        </View>
      </View>

      <Button
        title="Iniciar Exercício"
        onPress={onStart}
        style={styles.startButton}
        size="small"
      />
    </View>
  );
};

export default function ExercisesScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const mockExercises: Exercise[] = [
    {
      id: 1,
      title: 'Respiração 4-7-8',
      description: 'Técnica de respiração para reduzir ansiedade e promover relaxamento',
      category: 'breathing',
      duration: 5,
      difficulty: 'easy',
    },
    {
      id: 2,
      title: 'Mindfulness Corporal',
      description: 'Escaneamento corporal para aumentar a consciência do momento presente',
      category: 'mindfulness',
      duration: 10,
      difficulty: 'medium',
    },
    {
      id: 3,
      title: 'Reestruturação Cognitiva',
      description: 'Identifique e desafie pensamentos negativos automáticos',
      category: 'cognitive',
      duration: 15,
      difficulty: 'hard',
    },
    {
      id: 4,
      title: 'Exposição Gradual',
      description: 'Enfrente seus medos de forma gradual e controlada',
      category: 'behavioral',
      duration: 20,
      difficulty: 'hard',
    },
    {
      id: 5,
      title: 'Meditação Guiada',
      description: 'Meditação simples para iniciantes focada na respiração',
      category: 'mindfulness',
      duration: 8,
      difficulty: 'easy',
    },
  ];

  const filteredExercises = selectedCategory === 'all' 
    ? mockExercises 
    : mockExercises.filter(ex => ex.category === selectedCategory);

  const handleStartExercise = (exercise: Exercise) => {
    Alert.alert(
      'Iniciar Exercício',
      `Você está prestes a iniciar: ${exercise.title}\n\nDuração: ${exercise.duration} minutos\n\nDeseja continuar?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Iniciar', 
          onPress: () => {
            Alert.alert('Exercício Iniciado', 'Funcionalidade em desenvolvimento');
          }
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Exercícios Terapêuticos</Text>
        <Text style={styles.subtitle}>
          Pratique técnicas para melhorar seu bem-estar mental
        </Text>
      </View>

      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedCategory === 'all' && styles.filterButtonActive,
            ]}
            onPress={() => setSelectedCategory('all')}
          >
            <Text
              style={[
                styles.filterText,
                selectedCategory === 'all' && styles.filterTextActive,
              ]}
            >
              Todos
            </Text>
          </TouchableOpacity>
          
          {Object.entries(EXERCISE_CATEGORIES).map(([key, label]) => (
            <TouchableOpacity
              key={key}
              style={[
                styles.filterButton,
                selectedCategory === key && styles.filterButtonActive,
              ]}
              onPress={() => setSelectedCategory(key)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedCategory === key && styles.filterTextActive,
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.exercisesList}>
        {filteredExercises.map((exercise) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            onStart={() => handleStartExercise(exercise)}
          />
        ))}
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
  filterContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 12,
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  filterTextActive: {
    color: colors.white,
  },
  exercisesList: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  exerciseCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  exerciseHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  exerciseIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  exerciseDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  exerciseMeta: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  startButton: {
    alignSelf: 'flex-start',
  },
});
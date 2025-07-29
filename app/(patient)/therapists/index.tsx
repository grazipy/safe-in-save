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

interface Therapist {
  id: number;
  name: string;
  crp: string;
  specializations: string[];
  about: string;
  sessionPrice: number;
  rating: number;
  totalReviews: number;
  isVerified: boolean;
  profileImageUrl?: string;
}

interface TherapistCardProps {
  therapist: Therapist;
  onPress: () => void;
}

const TherapistCard: React.FC<TherapistCardProps> = ({ therapist, onPress }) => {
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i <= rating ? 'star' : 'star-outline'}
          size={16}
          color={colors.warning}
        />
      );
    }
    return stars;
  };

  return (
    <TouchableOpacity style={styles.therapistCard} onPress={onPress}>
      <View style={styles.therapistHeader}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person" size={32} color={colors.primary} />
        </View>
        <View style={styles.therapistInfo}>
          <View style={styles.nameContainer}>
            <Text style={styles.therapistName}>{therapist.name}</Text>
            {therapist.isVerified && (
              <Ionicons name="checkmark-circle" size={16} color={colors.success} />
            )}
          </View>
          <Text style={styles.therapistCrp}>CRP: {therapist.crp}</Text>
          <View style={styles.ratingContainer}>
            <View style={styles.stars}>
              {renderStars(therapist.rating)}
            </View>
            <Text style={styles.ratingText}>
              {therapist.rating.toFixed(1)} ({therapist.totalReviews} avaliações)
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.specializationsContainer}>
        {therapist.specializations.slice(0, 3).map((spec, index) => (
          <View key={index} style={styles.specializationTag}>
            <Text style={styles.specializationText}>{spec}</Text>
          </View>
        ))}
        {therapist.specializations.length > 3 && (
          <Text style={styles.moreSpecs}>+{therapist.specializations.length - 3}</Text>
        )}
      </View>

      <Text style={styles.therapistAbout} numberOfLines={2}>
        {therapist.about}
      </Text>

      <View style={styles.therapistFooter}>
        <Text style={styles.sessionPrice}>
          R$ {therapist.sessionPrice.toFixed(2)}/sessão
        </Text>
        <Button
          title="Ver Perfil"
          size="small"
          variant="outline"
          onPress={onPress}
        />
      </View>
    </TouchableOpacity>
  );
};

export default function TherapistsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>('all');

  const mockTherapists: Therapist[] = [
    {
      id: 1,
      name: 'Dra. Maria Silva',
      crp: '06/123456',
      specializations: ['Terapia Cognitivo-Comportamental', 'Ansiedade', 'Depressão'],
      about: 'Psicóloga clínica com mais de 10 anos de experiência em TCC. Especialista em transtornos de ansiedade e depressão.',
      sessionPrice: 150.00,
      rating: 4.8,
      totalReviews: 127,
      isVerified: true,
    },
    {
      id: 2,
      name: 'Dr. João Santos',
      crp: '06/789012',
      specializations: ['Psicanálise', 'Terapia de Casal', 'Trauma'],
      about: 'Psicanalista com formação em terapia de casal. Atua há 15 anos ajudando pessoas a superar traumas e melhorar relacionamentos.',
      sessionPrice: 180.00,
      rating: 4.6,
      totalReviews: 89,
      isVerified: true,
    },
    {
      id: 3,
      name: 'Dra. Ana Costa',
      crp: '06/345678',
      specializations: ['Terapia Humanística', 'Adolescentes', 'Autoestima'],
      about: 'Especialista em terapia humanística com foco em adolescentes e jovens adultos. Trabalha questões de autoestima e identidade.',
      sessionPrice: 120.00,
      rating: 4.9,
      totalReviews: 203,
      isVerified: true,
    },
  ];

  const specializations = [
    'Terapia Cognitivo-Comportamental',
    'Psicanálise',
    'Terapia Humanística',
    'Ansiedade',
    'Depressão',
    'Trauma',
    'Terapia de Casal',
    'Adolescentes',
  ];

  const filteredTherapists = mockTherapists.filter(therapist => {
    const matchesSearch = therapist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         therapist.specializations.some(spec => 
                           spec.toLowerCase().includes(searchQuery.toLowerCase())
                         );
    
    const matchesSpecialization = selectedSpecialization === 'all' ||
                                 therapist.specializations.includes(selectedSpecialization);
    
    return matchesSearch && matchesSpecialization;
  });

  const handleTherapistPress = (therapist: Therapist) => {
    Alert.alert(
      therapist.name,
      `${therapist.about}\n\nEspecializações: ${therapist.specializations.join(', ')}\n\nPreço: R$ ${therapist.sessionPrice.toFixed(2)}/sessão`,
      [
        { text: 'Fechar', style: 'cancel' },
        { 
          text: 'Agendar Consulta', 
          onPress: () => Alert.alert('Agendamento', 'Funcionalidade em desenvolvimento')
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Encontrar Terapeutas</Text>
        <Text style={styles.subtitle}>
          Conecte-se com profissionais qualificados
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={20} color={colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Buscar por nome ou especialização"
            placeholderTextColor={colors.textSecondary}
          />
        </View>
      </View>

      <View style={styles.filtersContainer}>
        <Text style={styles.filtersTitle}>Especialização:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              selectedSpecialization === 'all' && styles.filterButtonActive,
            ]}
            onPress={() => setSelectedSpecialization('all')}
          >
            <Text
              style={[
                styles.filterText,
                selectedSpecialization === 'all' && styles.filterTextActive,
              ]}
            >
              Todos
            </Text>
          </TouchableOpacity>
          
          {specializations.map((spec) => (
            <TouchableOpacity
              key={spec}
              style={[
                styles.filterButton,
                selectedSpecialization === spec && styles.filterButtonActive,
              ]}
              onPress={() => setSelectedSpecialization(spec)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedSpecialization === spec && styles.filterTextActive,
                ]}
              >
                {spec}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.therapistsList}>
        {filteredTherapists.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="people-outline" size={64} color={colors.textSecondary} />
            <Text style={styles.emptyTitle}>Nenhum terapeuta encontrado</Text>
            <Text style={styles.emptyMessage}>
              Tente ajustar os filtros de busca
            </Text>
          </View>
        ) : (
          filteredTherapists.map((therapist) => (
            <TherapistCard
              key={therapist.id}
              therapist={therapist}
              onPress={() => handleTherapistPress(therapist)}
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
  searchContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.textPrimary,
  },
  filtersContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  filtersTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 12,
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
  therapistsList: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  therapistCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  therapistHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  therapistInfo: {
    flex: 1,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  therapistName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  therapistCrp: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stars: {
    flexDirection: 'row',
    gap: 2,
  },
  ratingText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  specializationsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  specializationTag: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  specializationText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
  },
  moreSpecs: {
    fontSize: 12,
    color: colors.textSecondary,
    alignSelf: 'center',
  },
  therapistAbout: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 16,
  },
  therapistFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sessionPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
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
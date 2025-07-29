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

interface Patient {
  id: number;
  name: string;
  email: string;
  phone: string;
  lastSession: Date;
  nextSession?: Date;
  status: 'active' | 'inactive' | 'pending';
  moodAverage: number;
  sessionsCount: number;
}

interface PatientCardProps {
  patient: Patient;
  onPress: () => void;
}

const PatientCard: React.FC<PatientCardProps> = ({ patient, onPress }) => {
  const getStatusColor = () => {
    switch (patient.status) {
      case 'active': return colors.success;
      case 'inactive': return colors.textSecondary;
      case 'pending': return colors.warning;
      default: return colors.textSecondary;
    }
  };

  const getStatusText = () => {
    switch (patient.status) {
      case 'active': return 'Ativo';
      case 'inactive': return 'Inativo';
      case 'pending': return 'Pendente';
      default: return '';
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  };

  const getMoodColor = (mood: number) => {
    if (mood >= 4) return colors.moodExcellent;
    if (mood >= 3) return colors.moodNeutral;
    return colors.moodBad;
  };

  return (
    <TouchableOpacity style={styles.patientCard} onPress={onPress}>
      <View style={styles.patientHeader}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person" size={24} color={colors.primary} />
        </View>
        <View style={styles.patientInfo}>
          <View style={styles.nameContainer}>
            <Text style={styles.patientName}>{patient.name}</Text>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
              <Text style={styles.statusText}>{getStatusText()}</Text>
            </View>
          </View>
          <Text style={styles.patientContact}>{patient.email}</Text>
          <Text style={styles.patientContact}>{patient.phone}</Text>
        </View>
      </View>

      <View style={styles.patientStats}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Última sessão</Text>
          <Text style={styles.statValue}>{formatDate(patient.lastSession)}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Sessões</Text>
          <Text style={styles.statValue}>{patient.sessionsCount}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Humor médio</Text>
          <Text style={[styles.statValue, { color: getMoodColor(patient.moodAverage) }]}>
            {patient.moodAverage.toFixed(1)}
          </Text>
        </View>
      </View>

      {patient.nextSession && (
        <View style={styles.nextSession}>
          <Ionicons name="calendar" size={16} color={colors.primary} />
          <Text style={styles.nextSessionText}>
            Próxima: {formatDate(patient.nextSession)}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default function PatientsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const mockPatients: Patient[] = [
    {
      id: 1,
      name: 'Ana Silva',
      email: 'ana.silva@email.com',
      phone: '(11) 99999-1111',
      lastSession: new Date(2024, 0, 15),
      nextSession: new Date(2024, 0, 22),
      status: 'active',
      moodAverage: 4.2,
      sessionsCount: 12,
    },
    {
      id: 2,
      name: 'João Santos',
      email: 'joao.santos@email.com',
      phone: '(11) 99999-2222',
      lastSession: new Date(2024, 0, 14),
      nextSession: new Date(2024, 0, 21),
      status: 'active',
      moodAverage: 3.8,
      sessionsCount: 8,
    },
    {
      id: 3,
      name: 'Maria Costa',
      email: 'maria.costa@email.com',
      phone: '(11) 99999-3333',
      lastSession: new Date(2024, 0, 10),
      status: 'pending',
      moodAverage: 2.9,
      sessionsCount: 3,
    },
    {
      id: 4,
      name: 'Pedro Lima',
      email: 'pedro.lima@email.com',
      phone: '(11) 99999-4444',
      lastSession: new Date(2023, 11, 20),
      status: 'inactive',
      moodAverage: 3.5,
      sessionsCount: 15,
    },
  ];

  const statusOptions = [
    { key: 'all', label: 'Todos' },
    { key: 'active', label: 'Ativos' },
    { key: 'pending', label: 'Pendentes' },
    { key: 'inactive', label: 'Inativos' },
  ];

  const filteredPatients = mockPatients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         patient.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || patient.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handlePatientPress = (patient: Patient) => {
    Alert.alert(
      patient.name,
      `Email: ${patient.email}\nTelefone: ${patient.phone}\nStatus: ${patient.status}\nSessões realizadas: ${patient.sessionsCount}\nHumor médio: ${patient.moodAverage.toFixed(1)}`,
      [
        { text: 'Fechar', style: 'cancel' },
        { 
          text: 'Ver Detalhes', 
          onPress: () => Alert.alert('Detalhes', 'Funcionalidade em desenvolvimento')
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Meus Pacientes</Text>
        <Text style={styles.subtitle}>
          Gerencie e acompanhe seus pacientes
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={20} color={colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Buscar por nome ou email"
            placeholderTextColor={colors.textSecondary}
          />
        </View>
      </View>

      <View style={styles.filtersContainer}>
        <Text style={styles.filtersTitle}>Status:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {statusOptions.map((option) => (
            <TouchableOpacity
              key={option.key}
              style={[
                styles.filterButton,
                selectedStatus === option.key && styles.filterButtonActive,
              ]}
              onPress={() => setSelectedStatus(option.key)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedStatus === option.key && styles.filterTextActive,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{mockPatients.filter(p => p.status === 'active').length}</Text>
          <Text style={styles.statLabel}>Ativos</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{mockPatients.filter(p => p.status === 'pending').length}</Text>
          <Text style={styles.statLabel}>Pendentes</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{mockPatients.length}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
      </View>

      <View style={styles.patientsList}>
        {filteredPatients.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="people-outline" size={64} color={colors.textSecondary} />
            <Text style={styles.emptyTitle}>Nenhum paciente encontrado</Text>
            <Text style={styles.emptyMessage}>
              Tente ajustar os filtros de busca
            </Text>
          </View>
        ) : (
          filteredPatients.map((patient) => (
            <PatientCard
              key={patient.id}
              patient={patient}
              onPress={() => handlePatientPress(patient)}
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
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 24,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  patientsList: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  patientCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  patientHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  patientInfo: {
    flex: 1,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  patientName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: colors.white,
    fontWeight: '500',
  },
  patientContact: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 2,
  },
  patientStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  nextSession: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  nextSessionText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
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
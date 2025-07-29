import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { colors } from '@/styles/colors';

interface QuickActionProps {
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  color: string;
}

const QuickAction: React.FC<QuickActionProps> = ({
  title,
  subtitle,
  icon,
  onPress,
  color,
}) => (
  <TouchableOpacity style={styles.quickAction} onPress={onPress}>
    <View style={[styles.quickActionIcon, { backgroundColor: color }]}>
      <Ionicons name={icon} size={24} color={colors.white} />
    </View>
    <View style={styles.quickActionContent}>
      <Text style={styles.quickActionTitle}>{title}</Text>
      <Text style={styles.quickActionSubtitle}>{subtitle}</Text>
    </View>
    <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
  </TouchableOpacity>
);

interface AppointmentCardProps {
  patientName: string;
  time: string;
  type: string;
  status: 'upcoming' | 'in-progress' | 'completed';
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  patientName,
  time,
  type,
  status,
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'upcoming': return colors.info;
      case 'in-progress': return colors.success;
      case 'completed': return colors.textSecondary;
      default: return colors.textSecondary;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'upcoming': return 'Próxima';
      case 'in-progress': return 'Em andamento';
      case 'completed': return 'Concluída';
      default: return '';
    }
  };

  return (
    <View style={styles.appointmentCard}>
      <View style={styles.appointmentInfo}>
        <Text style={styles.patientName}>{patientName}</Text>
        <Text style={styles.appointmentTime}>{time}</Text>
        <Text style={styles.appointmentType}>{type}</Text>
      </View>
      <View style={styles.appointmentStatus}>
        <View style={[styles.statusIndicator, { backgroundColor: getStatusColor() }]} />
        <Text style={[styles.statusText, { color: getStatusColor() }]}>
          {getStatusText()}
        </Text>
      </View>
    </View>
  );
};

export default function TherapistDashboard() {
  const { user, logout } = useAuth();

  const quickActions = [
    {
      title: 'Ver Pacientes',
      subtitle: 'Gerenciar lista de pacientes',
      icon: 'people' as const,
      onPress: () => router.push('/(therapist)/patients'),
      color: colors.primary,
    },
    {
      title: 'Agenda do Dia',
      subtitle: 'Consultas e compromissos',
      icon: 'calendar' as const,
      onPress: () => router.push('/(therapist)/schedule'),
      color: colors.info,
    },
    {
      title: 'Materiais Terapêuticos',
      subtitle: 'Recursos e exercícios',
      icon: 'library' as const,
      onPress: () => router.push('/(therapist)/materials'),
      color: colors.secondary,
    },
    {
      title: 'Relatórios',
      subtitle: 'Análises e progressos',
      icon: 'analytics' as const,
      onPress: () => router.push('/(therapist)/reports'),
      color: colors.success,
    },
  ];

  const todayAppointments = [
    {
      patientName: 'Ana Silva',
      time: '09:00',
      type: 'Terapia Individual',
      status: 'completed' as const,
    },
    {
      patientName: 'João Santos',
      time: '10:30',
      type: 'Primeira Consulta',
      status: 'completed' as const,
    },
    {
      patientName: 'Maria Costa',
      time: '14:00',
      type: 'Terapia Cognitivo-Comportamental',
      status: 'in-progress' as const,
    },
    {
      patientName: 'Pedro Lima',
      time: '15:30',
      type: 'Terapia Individual',
      status: 'upcoming' as const,
    },
    {
      patientName: 'Carla Oliveira',
      time: '17:00',
      type: 'Terapia de Casal',
      status: 'upcoming' as const,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>
          Olá, Dr(a). {user?.firstName}! 👋
        </Text>
        <Text style={styles.subtitle}>
          Como está seu dia hoje?
        </Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>5</Text>
          <Text style={styles.statLabel}>Consultas hoje</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>23</Text>
          <Text style={styles.statLabel}>Pacientes ativos</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>4.8</Text>
          <Text style={styles.statLabel}>Avaliação média</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ações Rápidas</Text>
        {quickActions.map((action, index) => (
          <QuickAction key={index} {...action} />
        ))}
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Agenda de Hoje</Text>
          <TouchableOpacity onPress={() => router.push('/(therapist)/schedule')}>
            <Text style={styles.seeAllText}>Ver tudo</Text>
          </TouchableOpacity>
        </View>
        
        {todayAppointments.map((appointment, index) => (
          <AppointmentCard key={index} {...appointment} />
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Lembretes</Text>
        <View style={styles.reminderCard}>
          <Ionicons name="notifications" size={24} color={colors.warning} />
          <View style={styles.reminderContent}>
            <Text style={styles.reminderTitle}>
              Revisar notas da sessão
            </Text>
            <Text style={styles.reminderText}>
              Finalizar anotações da sessão com Maria Costa
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Button
          title="Sair"
          variant="outline"
          onPress={logout}
          style={styles.logoutButton}
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
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
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
  section: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  seeAllText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  quickAction: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  quickActionContent: {
    flex: 1,
  },
  quickActionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  quickActionSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  appointmentCard: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appointmentInfo: {
    flex: 1,
  },
  patientName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  appointmentTime: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
    marginBottom: 2,
  },
  appointmentType: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  appointmentStatus: {
    alignItems: 'center',
    gap: 4,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  reminderCard: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  reminderContent: {
    flex: 1,
  },
  reminderTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  reminderText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  logoutButton: {
    marginTop: 16,
  },
});
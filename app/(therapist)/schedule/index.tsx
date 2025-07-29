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

interface Appointment {
  id: number;
  patientName: string;
  time: string;
  duration: number;
  type: string;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no_show';
  notes?: string;
}

interface AppointmentCardProps {
  appointment: Appointment;
  onPress: () => void;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment, onPress }) => {
  const getStatusColor = () => {
    switch (appointment.status) {
      case 'scheduled': return colors.info;
      case 'completed': return colors.success;
      case 'cancelled': return colors.error;
      case 'no_show': return colors.warning;
      default: return colors.textSecondary;
    }
  };

  const getStatusText = () => {
    switch (appointment.status) {
      case 'scheduled': return 'Agendado';
      case 'completed': return 'Concluído';
      case 'cancelled': return 'Cancelado';
      case 'no_show': return 'Não compareceu';
      default: return '';
    }
  };

  const getStatusIcon = () => {
    switch (appointment.status) {
      case 'scheduled': return 'time';
      case 'completed': return 'checkmark-circle';
      case 'cancelled': return 'close-circle';
      case 'no_show': return 'alert-circle';
      default: return 'time';
    }
  };

  return (
    <TouchableOpacity style={styles.appointmentCard} onPress={onPress}>
      <View style={styles.appointmentHeader}>
        <View style={styles.timeContainer}>
          <Text style={styles.appointmentTime}>{appointment.time}</Text>
          <Text style={styles.appointmentDuration}>{appointment.duration}min</Text>
        </View>
        <View style={styles.statusContainer}>
          <Ionicons 
            name={getStatusIcon() as any} 
            size={16} 
            color={getStatusColor()} 
          />
          <Text style={[styles.statusText, { color: getStatusColor() }]}>
            {getStatusText()}
          </Text>
        </View>
      </View>
      
      <View style={styles.appointmentInfo}>
        <Text style={styles.patientName}>{appointment.patientName}</Text>
        <Text style={styles.appointmentType}>{appointment.type}</Text>
        {appointment.notes && (
          <Text style={styles.appointmentNotes} numberOfLines={2}>
            {appointment.notes}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default function ScheduleScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const mockAppointments: Appointment[] = [
    {
      id: 1,
      patientName: 'Ana Silva',
      time: '09:00',
      duration: 50,
      type: 'Terapia Individual',
      status: 'completed',
      notes: 'Sessão focada em técnicas de respiração',
    },
    {
      id: 2,
      patientName: 'João Santos',
      time: '10:30',
      duration: 50,
      type: 'Primeira Consulta',
      status: 'completed',
    },
    {
      id: 3,
      patientName: 'Maria Costa',
      time: '14:00',
      duration: 50,
      type: 'Terapia Cognitivo-Comportamental',
      status: 'scheduled',
      notes: 'Continuar trabalho com pensamentos automáticos',
    },
    {
      id: 4,
      patientName: 'Pedro Lima',
      time: '15:30',
      duration: 50,
      type: 'Terapia Individual',
      status: 'scheduled',
    },
    {
      id: 5,
      patientName: 'Carla Oliveira',
      time: '17:00',
      duration: 50,
      type: 'Terapia de Casal',
      status: 'cancelled',
      notes: 'Cancelado pelo paciente - reagendar',
    },
  ];

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(date);
  };

  const getDateNavigation = () => {
    const yesterday = new Date(selectedDate);
    yesterday.setDate(selectedDate.getDate() - 1);
    
    const tomorrow = new Date(selectedDate);
    tomorrow.setDate(selectedDate.getDate() + 1);
    
    return { yesterday, tomorrow };
  };

  const { yesterday, tomorrow } = getDateNavigation();

  const handleAppointmentPress = (appointment: Appointment) => {
    const actions = [];
    
    if (appointment.status === 'scheduled') {
      actions.push(
        { text: 'Iniciar Sessão', onPress: () => Alert.alert('Sessão', 'Funcionalidade em desenvolvimento') },
        { text: 'Cancelar', onPress: () => Alert.alert('Cancelar', 'Funcionalidade em desenvolvimento') }
      );
    } else if (appointment.status === 'completed') {
      actions.push(
        { text: 'Ver Notas', onPress: () => Alert.alert('Notas', appointment.notes || 'Nenhuma nota disponível') }
      );
    }
    
    actions.push({ text: 'Fechar', style: 'cancel' as const });

    Alert.alert(
      `${appointment.patientName} - ${appointment.time}`,
      `Tipo: ${appointment.type}\nDuração: ${appointment.duration} minutos\nStatus: ${appointment.status}`,
      actions
    );
  };

  const getAppointmentStats = () => {
    const total = mockAppointments.length;
    const completed = mockAppointments.filter(a => a.status === 'completed').length;
    const scheduled = mockAppointments.filter(a => a.status === 'scheduled').length;
    const cancelled = mockAppointments.filter(a => a.status === 'cancelled').length;
    
    return { total, completed, scheduled, cancelled };
  };

  const stats = getAppointmentStats();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Agenda</Text>
        <Text style={styles.subtitle}>
          Gerencie suas consultas e compromissos
        </Text>
      </View>

      <View style={styles.dateNavigation}>
        <TouchableOpacity 
          style={styles.dateNavButton}
          onPress={() => setSelectedDate(yesterday)}
        >
          <Ionicons name="chevron-back" size={20} color={colors.primary} />
        </TouchableOpacity>
        
        <View style={styles.currentDate}>
          <Text style={styles.dateText}>{formatDate(selectedDate)}</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.dateNavButton}
          onPress={() => setSelectedDate(tomorrow)}
        >
          <Ionicons name="chevron-forward" size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{stats.total}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statNumber, { color: colors.success }]}>{stats.completed}</Text>
          <Text style={styles.statLabel}>Concluídas</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statNumber, { color: colors.info }]}>{stats.scheduled}</Text>
          <Text style={styles.statLabel}>Agendadas</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={[styles.statNumber, { color: colors.error }]}>{stats.cancelled}</Text>
          <Text style={styles.statLabel}>Canceladas</Text>
        </View>
      </View>

      <View style={styles.appointmentsList}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Consultas do Dia</Text>
          <Button
            title="Nova Consulta"
            size="small"
            variant="outline"
            onPress={() => Alert.alert('Nova Consulta', 'Funcionalidade em desenvolvimento')}
          />
        </View>

        {mockAppointments.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="calendar-outline" size={64} color={colors.textSecondary} />
            <Text style={styles.emptyTitle}>Nenhuma consulta hoje</Text>
            <Text style={styles.emptyMessage}>
              Você não tem consultas agendadas para este dia
            </Text>
          </View>
        ) : (
          mockAppointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              onPress={() => handleAppointmentPress(appointment)}
            />
          ))
        )}
      </View>

      <View style={styles.quickActions}>
        <Button
          title="Ver Calendário Completo"
          variant="outline"
          onPress={() => Alert.alert('Calendário', 'Funcionalidade em desenvolvimento')}
          style={styles.actionButton}
        />
        <Button
          title="Configurar Horários"
          variant="outline"
          onPress={() => Alert.alert('Configurações', 'Funcionalidade em desenvolvimento')}
          style={styles.actionButton}
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
  dateNavigation: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  dateNavButton: {
    padding: 8,
  },
  currentDate: {
    flex: 1,
    alignItems: 'center',
  },
  dateText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    textTransform: 'capitalize',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginBottom: 24,
    gap: 8,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  appointmentsList: {
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
  appointmentCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  timeContainer: {
    alignItems: 'flex-start',
  },
  appointmentTime: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  appointmentDuration: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  appointmentInfo: {
    gap: 4,
  },
  patientName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  appointmentType: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  appointmentNotes: {
    fontSize: 12,
    color: colors.textTertiary,
    fontStyle: 'italic',
    marginTop: 4,
  },
  quickActions: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 12,
  },
  actionButton: {
    width: '100%',
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
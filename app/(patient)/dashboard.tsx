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

export default function PatientDashboard() {
  const { user, logout } = useAuth();

  const quickActions = [
    {
      title: 'Registrar Humor',
      subtitle: 'Como você está se sentindo hoje?',
      icon: 'happy' as const,
      onPress: () => router.push('/(patient)/mood-tracker'),
      color: colors.moodGood,
    },
    {
      title: 'Fazer Exercício',
      subtitle: 'Pratique técnicas terapêuticas',
      icon: 'fitness' as const,
      onPress: () => router.push('/(patient)/exercises'),
      color: colors.primary,
    },
    {
      title: 'Escrever no Diário',
      subtitle: 'Registre seus pensamentos',
      icon: 'book' as const,
      onPress: () => router.push('/(patient)/diary'),
      color: colors.secondary,
    },
    {
      title: 'Buscar Terapeutas',
      subtitle: 'Encontre profissionais qualificados',
      icon: 'people' as const,
      onPress: () => router.push('/(patient)/therapists'),
      color: colors.info,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>
          Olá, {user?.firstName}! 👋
        </Text>
        <Text style={styles.subtitle}>
          Como podemos ajudar você hoje?
        </Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>7</Text>
          <Text style={styles.statLabel}>Dias consecutivos</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Exercícios feitos</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>4.2</Text>
          <Text style={styles.statLabel}>Humor médio</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ações Rápidas</Text>
        {quickActions.map((action, index) => (
          <QuickAction key={index} {...action} />
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Próximas Sessões</Text>
        <View style={styles.appointmentCard}>
          <View style={styles.appointmentInfo}>
            <Text style={styles.appointmentTitle}>
              Dr. Maria Silva
            </Text>
            <Text style={styles.appointmentDate}>
              Hoje, 14:00
            </Text>
            <Text style={styles.appointmentType}>
              Terapia Cognitivo-Comportamental
            </Text>
          </View>
          <Button
            title="Entrar"
            size="small"
            onPress={() => router.push('/(shared)/video-session')}
          />
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 16,
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
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
  },
  appointmentInfo: {
    flex: 1,
  },
  appointmentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  appointmentDate: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
    marginBottom: 2,
  },
  appointmentType: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  logoutButton: {
    marginTop: 16,
  },
});
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { Link, router } from 'expo-router';
import { Button } from '@/components/ui/Button';
import { colors } from '@/styles/colors';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert('Erro', 'Por favor, digite seu email');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Erro', 'Por favor, digite um email válido');
      return;
    }

    setIsLoading(true);
    try {
      // Mock reset password - em produção, fazer chamada para API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setEmailSent(true);
      Alert.alert(
        'Email Enviado',
        'Verifique sua caixa de entrada para instruções de recuperação de senha.'
      );
    } catch (error) {
      Alert.alert('Erro', 'Falha ao enviar email. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  if (emailSent) {
    return (
      <View style={styles.container}>
        <View style={styles.successContainer}>
          <Text style={styles.successTitle}>Email Enviado!</Text>
          <Text style={styles.successMessage}>
            Enviamos instruções para recuperação de senha para {email}
          </Text>
          <Text style={styles.successSubMessage}>
            Verifique sua caixa de entrada e spam.
          </Text>
          
          <Button
            title="Voltar ao Login"
            onPress={() => router.push('/(auth)/login')}
            style={styles.backButton}
          />
          
          <Button
            title="Reenviar Email"
            onPress={() => setEmailSent(false)}
            variant="outline"
            style={styles.resendButton}
          />
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Recuperar Senha</Text>
          <Text style={styles.subtitle}>
            Digite seu email para receber instruções de recuperação
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="seu@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <Button
            title={isLoading ? 'Enviando...' : 'Enviar Instruções'}
            onPress={handleResetPassword}
            disabled={isLoading}
            style={styles.resetButton}
          />

          <View style={styles.backContainer}>
            <Text style={styles.backText}>Lembrou da senha? </Text>
            <Link href="/(auth)/login">
              <Text style={styles.backLink}>Voltar ao login</Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 32,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    backgroundColor: colors.surface,
  },
  resetButton: {
    marginBottom: 24,
  },
  backContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  backLink: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  successTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.success,
    marginBottom: 16,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: 18,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 26,
  },
  successSubMessage: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 48,
    lineHeight: 24,
  },
  backButton: {
    width: '100%',
    marginBottom: 16,
  },
  resendButton: {
    width: '100%',
  },
});
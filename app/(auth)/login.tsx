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
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { colors } from '@/styles/colors';
import { User } from '@/types/user';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    setIsLoading(true);
    try {
      // Mock login - em produção, fazer chamada para API
      const mockUser: User = {
        id: '1',
        email,
        firstName: 'Usuário',
        lastName: 'Teste',
        userType: email.includes('terapeuta') ? 'therapist' : 'patient',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const mockToken = 'mock-jwt-token';
      
      login(mockUser, mockToken);
      
      // Navegação será feita automaticamente pelo index.tsx
      router.replace('/');
    } catch (error) {
      Alert.alert('Erro', 'Falha no login. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Safe in Save</Text>
          <Text style={styles.subtitle}>Bem-vindo de volta</Text>
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

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Senha</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Sua senha"
              secureTextEntry
            />
          </View>

          <Link href="/(auth)/forgot-password" style={styles.forgotLink}>
            <Text style={styles.forgotText}>Esqueceu sua senha?</Text>
          </Link>

          <Button
            title={isLoading ? 'Entrando...' : 'Entrar'}
            onPress={handleLogin}
            disabled={isLoading}
            style={styles.loginButton}
          />

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Não tem uma conta? </Text>
            <Link href="/(auth)/register">
              <Text style={styles.registerLink}>Cadastre-se</Text>
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
    fontSize: 18,
    color: colors.textSecondary,
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 20,
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
  forgotLink: {
    alignSelf: 'flex-end',
    marginBottom: 32,
  },
  forgotText: {
    color: colors.primary,
    fontSize: 14,
  },
  loginButton: {
    marginBottom: 24,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  registerLink: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
  },
});
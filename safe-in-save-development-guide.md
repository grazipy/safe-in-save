# Safe in Save - Guia de Desenvolvimento

## 1. Configuração Inicial do Projeto

### 1.1 Setup do Expo
```bash
# Instalar Expo CLI
npm install -g @expo/cli

# Criar projeto
npx create-expo-app safe-in-save --template tabs

# Navegar para o diretório
cd safe-in-save

# Instalar dependências TypeScript
npm install typescript @types/react @types/react-native

# Configurar TypeScript
npx expo install --fix
```

### 1.2 Estrutura de Pastas Recomendada
```bash
# Criar estrutura de pastas
mkdir -p src/{components,hooks,services,store,types,utils,styles}
mkdir -p src/components/{ui,forms,charts,therapy,navigation}
mkdir -p src/services/{api,auth,storage,notifications,encryption}
mkdir -p server/src/{controllers,services,models,middleware,routes,utils,config}
mkdir -p server/database/{migrations,seeds}
mkdir -p shared/{types,schemas,constants}
mkdir -p assets/{images,icons,fonts,sounds}
mkdir -p docs tests
```

### 1.3 Configuração do Backend
```bash
# Criar diretório do servidor
mkdir server && cd server

# Inicializar projeto Node.js
npm init -y

# Instalar dependências principais
npm install express typescript tsx cors helmet
npm install pg drizzle-orm drizzle-kit
npm install jsonwebtoken bcryptjs express-rate-limit
npm install stripe nodemailer socket.io
npm install zod zod-validation-error

# Instalar dependências de desenvolvimento
npm install -D @types/node @types/express @types/pg
npm install -D @types/jsonwebtoken @types/bcryptjs
```

## 2. Configurações Essenciais

### 2.1 Expo Configuration (app.json)
```json
{
  "expo": {
    "name": "Safe in Save",
    "slug": "safe-in-save",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": ["**/*"],
    "ios": {
      "supportsTablet": true,
      "infoPlist": {
        "NSCameraUsageDescription": "Este app precisa acessar a câmera para videochamadas terapêuticas.",
        "NSMicrophoneUsageDescription": "Este app precisa acessar o microfone para videochamadas terapêuticas.",
        "NSFaceIDUsageDescription": "Use Face ID para acesso rápido e seguro ao app."
      }
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "permissions": [
        "android.permission.CAMERA",
        "android.permission.RECORD_AUDIO",
        "android.permission.USE_FINGERPRINT",
        "android.permission.USE_BIOMETRIC"
      ]
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "plugins": [
      "expo-router",
      "expo-secure-store",
      "expo-local-authentication",
      "expo-notifications",
      "expo-av"
    ]
  }
}
```

### 2.2 TypeScript Configuration (tsconfig.json)
```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/components/*": ["src/components/*"],
      "@/hooks/*": ["src/hooks/*"],
      "@/services/*": ["src/services/*"],
      "@/store/*": ["src/store/*"],
      "@/types/*": ["src/types/*"],
      "@/utils/*": ["src/utils/*"],
      "@shared/*": ["shared/*"]
    }
  },
  "include": [
    "**/*.ts",
    "**/*.tsx",
    ".expo/types/**/*.ts",
    "expo-env.d.ts"
  ]
}
```

### 2.3 Drizzle Configuration (drizzle.config.ts)
```typescript
import type { Config } from "drizzle-kit";

export default {
  schema: "./server/database/schema.ts",
  out: "./server/database/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
} satisfies Config;
```

## 3. Padrões de Desenvolvimento

### 3.1 Estrutura de Componentes
```typescript
// src/components/ui/Button.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  style,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        styles[variant],
        styles[size],
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={[styles.text, styles[`${variant}Text`], textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: '#007AFF',
  },
  secondary: {
    backgroundColor: '#6C757D',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  small: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  medium: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  large: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontWeight: '600',
  },
  primaryText: {
    color: '#FFFFFF',
  },
  secondaryText: {
    color: '#FFFFFF',
  },
  outlineText: {
    color: '#007AFF',
  },
});
```

### 3.2 Custom Hooks Pattern
```typescript
// src/hooks/useMoodTracker.ts
import { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { moodApi } from '@/services/api/moodApi';
import { MoodEntry } from '@/types/mood';

export const useMoodTracker = () => {
  const queryClient = useQueryClient();

  const { data: moodEntries, isLoading } = useQuery({
    queryKey: ['mood-entries'],
    queryFn: moodApi.getMoodEntries,
  });

  const createMoodEntry = useMutation({
    mutationFn: moodApi.createMoodEntry,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mood-entries'] });
    },
  });

  const getTodayMood = () => {
    const today = new Date().toDateString();
    return moodEntries?.find(
      (entry: MoodEntry) => new Date(entry.createdAt).toDateString() === today
    );
  };

  const getWeeklyAverage = () => {
    if (!moodEntries?.length) return 0;
    
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    const weekEntries = moodEntries.filter(
      (entry: MoodEntry) => new Date(entry.createdAt) >= weekAgo
    );
    
    if (!weekEntries.length) return 0;
    
    const sum = weekEntries.reduce((acc: number, entry: MoodEntry) => acc + entry.mood, 0);
    return sum / weekEntries.length;
  };

  return {
    moodEntries,
    isLoading,
    createMoodEntry: createMoodEntry.mutate,
    isCreating: createMoodEntry.isPending,
    getTodayMood,
    getWeeklyAverage,
  };
};
```

### 3.3 Store Pattern (Zustand)
```typescript
// src/store/authStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@/types/user';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: (user, token) => {
        set({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },

      updateUser: (userData) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: { ...currentUser, ...userData },
          });
        }
      },

      setLoading: (loading) => {
        set({ isLoading: loading });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
```

### 3.4 API Service Pattern
```typescript
// src/services/api/baseApi.ts
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/store/authStore';

class BaseApi {
  private client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor para adicionar token
    this.client.interceptors.request.use(
      (config) => {
        const token = useAuthStore.getState().token;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor para tratar erros
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          useAuthStore.getState().logout();
        }
        return Promise.reject(error);
      }
    );
  }

  protected async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get(url, config);
    return response.data;
  }

  protected async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post(url, data, config);
    return response.data;
  }

  protected async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.put(url, data, config);
    return response.data;
  }

  protected async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete(url, config);
    return response.data;
  }
}

export default BaseApi;
```

## 4. Segurança e Boas Práticas

### 4.1 Armazenamento Seguro
```typescript
// src/services/storage/secureStorage.ts
import * as SecureStore from 'expo-secure-store';
import * as Crypto from 'expo-crypto';

class SecureStorageService {
  private async encrypt(data: string): Promise<string> {
    // Implementar criptografia adicional se necessário
    return data;
  }

  private async decrypt(data: string): Promise<string> {
    // Implementar descriptografia adicional se necessário
    return data;
  }

  async setItem(key: string, value: string): Promise<void> {
    try {
      const encryptedValue = await this.encrypt(value);
      await SecureStore.setItemAsync(key, encryptedValue);
    } catch (error) {
      console.error('Error storing secure item:', error);
      throw error;
    }
  }

  async getItem(key: string): Promise<string | null> {
    try {
      const encryptedValue = await SecureStore.getItemAsync(key);
      if (!encryptedValue) return null;
      return await this.decrypt(encryptedValue);
    } catch (error) {
      console.error('Error retrieving secure item:', error);
      return null;
    }
  }

  async removeItem(key: string): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      console.error('Error removing secure item:', error);
      throw error;
    }
  }

  async generateSecureKey(): Promise<string> {
    return await Crypto.randomUUID();
  }
}

export const secureStorage = new SecureStorageService();
```

### 4.2 Validação de Dados
```typescript
// shared/schemas/moodSchema.ts
import { z } from 'zod';

export const moodEntrySchema = z.object({
  mood: z.number().min(1).max(5),
  energy: z.number().min(1).max(5),
  anxiety: z.number().min(1).max(5),
  sleep: z.number().min(1).max(5),
  notes: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export const moodEntryUpdateSchema = moodEntrySchema.partial();

export type MoodEntryInput = z.infer<typeof moodEntrySchema>;
export type MoodEntryUpdate = z.infer<typeof moodEntryUpdateSchema>;
```

## 5. Testes

### 5.1 Configuração de Testes
```bash
# Instalar dependências de teste
npm install -D jest @testing-library/react-native @testing-library/jest-native
npm install -D jest-expo babel-jest
```

### 5.2 Exemplo de Teste de Componente
```typescript
// tests/components/Button.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '@/components/ui/Button';

describe('Button Component', () => {
  it('renders correctly with title', () => {
    const { getByText } = render(
      <Button title="Test Button" onPress={() => {}} />
    );
    
    expect(getByText('Test Button')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <Button title="Test Button" onPress={mockOnPress} />
    );
    
    fireEvent.press(getByText('Test Button'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <Button title="Test Button" onPress={mockOnPress} disabled />
    );
    
    const button = getByText('Test Button').parent;
    expect(button?.props.accessibilityState.disabled).toBe(true);
  });
});
```

## 6. Deploy e CI/CD

### 6.1 EAS Build Configuration
```json
// eas.json
{
  "cli": {
    "version": ">= 3.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "ios": {
        "simulator": true
      }
    },
    "production": {
      "autoIncrement": true
    }
  },
  "submit": {
    "production": {}
  }
}
```

### 6.2 GitHub Actions Workflow
```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Run linting
        run: npm run lint
      
      - name: Type check
        run: npm run type-check

  build:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Setup Expo
        uses: expo/expo-github-action@v8
        with:
          expo-version: latest
          token: ${{ secrets.EXPO_TOKEN }}
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build app
        run: eas build --platform all --non-interactive
```

## 7. Monitoramento e Analytics

### 7.1 Error Tracking (Sentry)
```typescript
// src/services/monitoring/sentry.ts
import * as Sentry from '@sentry/react-native';

export const initSentry = () => {
  Sentry.init({
    dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
    environment: __DEV__ ? 'development' : 'production',
    enableAutoSessionTracking: true,
    sessionTrackingIntervalMillis: 30000,
  });
};

export const logError = (error: Error, context?: Record<string, any>) => {
  Sentry.captureException(error, {
    contexts: context,
  });
};

export const logEvent = (event: string, data?: Record<string, any>) => {
  Sentry.addBreadcrumb({
    message: event,
    data,
    level: 'info',
  });
};
```

### 7.2 Performance Monitoring
```typescript
// src/services/monitoring/performance.ts
import { Performance } from 'react-native-performance';

class PerformanceMonitor {
  private static instance: PerformanceMonitor;

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  startTimer(name: string): void {
    Performance.mark(`${name}-start`);
  }

  endTimer(name: string): number {
    Performance.mark(`${name}-end`);
    Performance.measure(name, `${name}-start`, `${name}-end`);
    
    const measure = Performance.getEntriesByName(name)[0];
    return measure?.duration || 0;
  }

  trackScreenLoad(screenName: string): void {
    this.startTimer(`screen-${screenName}`);
  }

  trackApiCall(endpoint: string): void {
    this.startTimer(`api-${endpoint}`);
  }
}

export const performanceMonitor = PerformanceMonitor.getInstance();
```

## 8. Próximos Passos Recomendados

### 8.1 Ordem de Implementação
1. **Setup inicial** - Configurar Expo, TypeScript, estrutura de pastas
2. **Autenticação** - Sistema de login/registro básico
3. **Navegação** - Configurar Expo Router e fluxos principais
4. **UI Base** - Componentes fundamentais e design system
5. **Backend API** - Endpoints básicos e banco de dados
6. **Funcionalidades Core** - Perfis, busca, agendamento
7. **Funcionalidades Avançadas** - Mood tracker, exercícios, diário
8. **Testes** - Cobertura de testes automatizados
9. **Deploy** - Configuração de CI/CD e deploy

### 8.2 Ferramentas Recomendadas
- **Design**: Figma para protótipos
- **Versionamento**: Git com GitFlow
- **Comunicação**: Slack ou Discord
- **Gerenciamento**: Jira ou Linear
- **Documentação**: Notion ou Confluence
- **Monitoramento**: Sentry + DataDog

### 8.3 Considerações Finais
- Sempre priorizar segurança e privacidade dos dados
- Implementar testes desde o início
- Documentar decisões arquiteturais
- Fazer code reviews rigorosos
- Monitorar performance constantemente
- Coletar feedback dos usuários continuamente

---

Este guia fornece uma base sólida para iniciar o desenvolvimento do Safe in Save seguindo as melhores práticas da indústria.
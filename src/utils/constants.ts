export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api';

export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_DATA: 'user_data',
  MOOD_ENTRIES: 'mood_entries',
  SETTINGS: 'app_settings',
} as const;

export const MOOD_LABELS = {
  1: 'Muito Ruim',
  2: 'Ruim',
  3: 'Neutro',
  4: 'Bom',
  5: 'Excelente',
} as const;

export const EXERCISE_CATEGORIES = {
  breathing: 'Respiração',
  mindfulness: 'Mindfulness',
  cognitive: 'Cognitivo',
  behavioral: 'Comportamental',
} as const;

export const EXERCISE_DIFFICULTIES = {
  easy: 'Fácil',
  medium: 'Médio',
  hard: 'Difícil',
} as const;

export const APPOINTMENT_STATUS = {
  scheduled: 'Agendado',
  completed: 'Concluído',
  cancelled: 'Cancelado',
  no_show: 'Não Compareceu',
} as const;

export const MESSAGE_TYPES = {
  text: 'Texto',
  image: 'Imagem',
  file: 'Arquivo',
  voice: 'Áudio',
} as const;

export const USER_TYPES = {
  patient: 'Paciente',
  therapist: 'Terapeuta',
} as const;

export const NOTIFICATION_TYPES = {
  appointment: 'Consulta',
  exercise: 'Exercício',
  medication: 'Medicação',
  mood_check: 'Check-in de Humor',
  custom: 'Personalizado',
} as const;

export const REGEX_PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\(\d{2}\)\s\d{4,5}-\d{4}$/,
  crp: /^\d{2}\/\d{5}$/,
} as const;

export const VALIDATION_MESSAGES = {
  required: 'Este campo é obrigatório',
  email: 'Email inválido',
  phone: 'Telefone inválido',
  crp: 'CRP inválido',
  minLength: (min: number) => `Mínimo de ${min} caracteres`,
  maxLength: (max: number) => `Máximo de ${max} caracteres`,
} as const;
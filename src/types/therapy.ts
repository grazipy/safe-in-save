export interface TherapyExercise {
  id: number;
  title: string;
  description: string;
  category: 'breathing' | 'mindfulness' | 'cognitive' | 'behavioral';
  duration: number; // em minutos
  difficulty: 'easy' | 'medium' | 'hard';
  instructions: string[];
  audioUrl?: string;
  videoUrl?: string;
  isActive: boolean;
  createdAt: Date;
}

export interface ExerciseCompletion {
  id: number;
  patientId: number;
  exerciseId: number;
  completedAt: Date;
  rating?: 1 | 2 | 3 | 4 | 5;
  notes?: string;
  duration: number; // tempo real gasto
}

export interface DiaryEntry {
  id: number;
  patientId: number;
  title?: string;
  content: string;
  mood?: 1 | 2 | 3 | 4 | 5;
  isPrivate: boolean; // se o terapeuta pode ver
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Appointment {
  id: number;
  patientId: number;
  therapistId: number;
  scheduledAt: Date;
  duration: number;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no_show';
  price: number;
  notes?: string;
  createdAt: Date;
}

export interface ChatMessage {
  id: number;
  conversationId: number;
  senderId: string;
  receiverId: string;
  content: string; // criptografado
  messageType: 'text' | 'image' | 'file' | 'voice';
  isRead: boolean;
  readAt?: Date;
  createdAt: Date;
}

export interface Conversation {
  id: number;
  patientId: number;
  therapistId: number;
  lastMessageAt: Date;
  isActive: boolean;
  createdAt: Date;
}
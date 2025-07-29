export interface MoodEntry {
  id: number;
  patientId: number;
  mood: 1 | 2 | 3 | 4 | 5; // 1=muito ruim, 5=excelente
  energy: 1 | 2 | 3 | 4 | 5;
  anxiety: 1 | 2 | 3 | 4 | 5;
  sleep: 1 | 2 | 3 | 4 | 5;
  notes?: string;
  tags?: string[]; // ['estresse', 'trabalho', 'família']
  createdAt: Date;
}

export interface MoodStats {
  weeklyAverage: number;
  monthlyAverage: number;
  trend: 'improving' | 'declining' | 'stable';
  lastEntry?: MoodEntry;
}

export type MoodScale = 1 | 2 | 3 | 4 | 5;

export interface MoodEntryInput {
  mood: MoodScale;
  energy: MoodScale;
  anxiety: MoodScale;
  sleep: MoodScale;
  notes?: string;
  tags?: string[];
}
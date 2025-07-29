import { create } from 'zustand';
import { MoodEntry, MoodStats } from '@/types/mood';

interface MoodState {
  entries: MoodEntry[];
  stats: MoodStats | null;
  isLoading: boolean;
  error: string | null;
  addEntry: (entry: MoodEntry) => void;
  updateEntry: (id: number, entry: Partial<MoodEntry>) => void;
  deleteEntry: (id: number) => void;
  setEntries: (entries: MoodEntry[]) => void;
  setStats: (stats: MoodStats) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  getTodayEntry: () => MoodEntry | undefined;
  getWeeklyEntries: () => MoodEntry[];
}

export const useMoodStore = create<MoodState>((set, get) => ({
  entries: [],
  stats: null,
  isLoading: false,
  error: null,

  addEntry: (entry) => {
    set((state) => ({
      entries: [entry, ...state.entries],
    }));
  },

  updateEntry: (id, updatedEntry) => {
    set((state) => ({
      entries: state.entries.map((entry) =>
        entry.id === id ? { ...entry, ...updatedEntry } : entry
      ),
    }));
  },

  deleteEntry: (id) => {
    set((state) => ({
      entries: state.entries.filter((entry) => entry.id !== id),
    }));
  },

  setEntries: (entries) => {
    set({ entries });
  },

  setStats: (stats) => {
    set({ stats });
  },

  setLoading: (loading) => {
    set({ isLoading: loading });
  },

  setError: (error) => {
    set({ error });
  },

  getTodayEntry: () => {
    const today = new Date().toDateString();
    return get().entries.find(
      (entry) => new Date(entry.createdAt).toDateString() === today
    );
  },

  getWeeklyEntries: () => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return get().entries.filter(
      (entry) => new Date(entry.createdAt) >= weekAgo
    );
  },
}));
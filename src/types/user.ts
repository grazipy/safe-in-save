export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  profileImageUrl?: string;
  userType: 'patient' | 'therapist';
  createdAt: Date;
  updatedAt: Date;
}

export interface Patient {
  id: number;
  userId: string;
  profession?: string;
  preferences?: string;
  anamnesis?: string;
  coverImageUrl?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  medications?: string[];
  allergies?: string[];
  createdAt: Date;
}

export interface Therapist {
  id: number;
  userId: string;
  crp: string;
  graduationYear: number;
  specializations: string[];
  about?: string;
  sessionPrice: number;
  packagePrice?: number;
  coverImageUrl?: string;
  isVerified: boolean;
  rating: number;
  totalReviews: number;
  createdAt: Date;
}
export const colors = {
  // Primary colors
  primary: '#007AFF',
  primaryDark: '#0056CC',
  primaryLight: '#4DA3FF',

  // Secondary colors
  secondary: '#6C757D',
  secondaryDark: '#495057',
  secondaryLight: '#ADB5BD',

  // Semantic colors
  success: '#28A745',
  warning: '#FFC107',
  error: '#DC3545',
  info: '#17A2B8',

  // Neutral colors
  white: '#FFFFFF',
  black: '#000000',
  gray100: '#F8F9FA',
  gray200: '#E9ECEF',
  gray300: '#DEE2E6',
  gray400: '#CED4DA',
  gray500: '#ADB5BD',
  gray600: '#6C757D',
  gray700: '#495057',
  gray800: '#343A40',
  gray900: '#212529',

  // Background colors
  background: '#FFFFFF',
  backgroundSecondary: '#F8F9FA',
  surface: '#FFFFFF',
  surfaceSecondary: '#F8F9FA',

  // Text colors
  textPrimary: '#212529',
  textSecondary: '#6C757D',
  textTertiary: '#ADB5BD',
  textInverse: '#FFFFFF',

  // Border colors
  border: '#DEE2E6',
  borderLight: '#E9ECEF',
  borderDark: '#CED4DA',

  // Therapy specific colors
  moodExcellent: '#28A745',
  moodGood: '#7CB342',
  moodNeutral: '#FFC107',
  moodBad: '#FF7043',
  moodTerrible: '#DC3545',
} as const;

export type ColorKey = keyof typeof colors;
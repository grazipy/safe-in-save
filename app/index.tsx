import React, { useEffect } from 'react';
import { Redirect } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { LoadingScreen } from '@/components/ui/LoadingScreen';

export default function IndexScreen() {
  const { isAuthenticated, isLoading, user } = useAuth();

  // Show loading while checking authentication
  if (isLoading) {
    return <LoadingScreen message="Verificando autenticação..." />;
  }

  // If not authenticated, redirect to auth flow
  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  // If authenticated, redirect based on user type
  if (user?.userType === 'patient') {
    return <Redirect href="/(patient)/dashboard" />;
  }

  if (user?.userType === 'therapist') {
    return <Redirect href="/(therapist)/dashboard" />;
  }

  // Fallback to auth if user type is not defined
  return <Redirect href="/(auth)/login" />;
}
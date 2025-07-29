import React from 'react';
import { Stack } from 'expo-router';

export default function SharedLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="chat/index" />
      <Stack.Screen name="video-session/index" />
      <Stack.Screen name="profile/index" />
    </Stack>
  );
}
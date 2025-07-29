import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/hooks/useAuth';
import { colors } from '@/styles/colors';

const { width, height } = Dimensions.get('window');

export default function VideoSessionScreen() {
  const { user } = useAuth();
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [sessionDuration, setSessionDuration] = useState(0);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Simular conexão
    const connectTimer = setTimeout(() => {
      setIsConnected(true);
    }, 2000);

    return () => clearTimeout(connectTimer);
  }, []);

  useEffect(() => {
    // Timer da sessão
    let interval: NodeJS.Timeout;
    if (isConnected) {
      interval = setInterval(() => {
        setSessionDuration(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isConnected]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    Alert.alert(
      'Encerrar Sessão',
      'Tem certeza que deseja encerrar a videochamada?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Encerrar', 
          style: 'destructive',
          onPress: () => {
            Alert.alert('Sessão Encerrada', 'A sessão foi finalizada com sucesso.');
            router.back();
          }
        },
      ]
    );
  };

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
  };

  const toggleAudio = () => {
    setIsAudioOn(!isAudioOn);
  };

  const handleChat = () => {
    Alert.alert('Chat', 'Funcionalidade de chat em desenvolvimento');
  };

  const handleScreenShare = () => {
    Alert.alert('Compartilhar Tela', 'Funcionalidade em desenvolvimento');
  };

  if (!isConnected) {
    return (
      <View style={styles.loadingContainer}>
        <View style={styles.loadingContent}>
          <Ionicons name="videocam" size={64} color={colors.primary} />
          <Text style={styles.loadingTitle}>Conectando...</Text>
          <Text style={styles.loadingSubtitle}>
            Aguarde enquanto estabelecemos a conexão
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header com informações da sessão */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
        
        <View style={styles.sessionInfo}>
          <Text style={styles.sessionTitle}>Sessão Terapêutica</Text>
          <Text style={styles.sessionDuration}>{formatDuration(sessionDuration)}</Text>
        </View>

        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="settings" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>

      {/* Área principal do vídeo */}
      <View style={styles.videoContainer}>
        {/* Vídeo do participante remoto */}
        <View style={styles.remoteVideo}>
          <View style={styles.videoPlaceholder}>
            <Ionicons 
              name="person" 
              size={80} 
              color={colors.white} 
            />
            <Text style={styles.participantName}>
              {user?.userType === 'patient' ? 'Dr. Maria Silva' : 'Ana Silva'}
            </Text>
          </View>
        </View>

        {/* Vídeo local (picture-in-picture) */}
        <View style={styles.localVideo}>
          <View style={styles.localVideoContent}>
            {isVideoOn ? (
              <View style={styles.videoPlaceholder}>
                <Ionicons name="person" size={40} color={colors.white} />
              </View>
            ) : (
              <View style={[styles.videoPlaceholder, styles.videoOff]}>
                <Ionicons name="videocam-off" size={40} color={colors.white} />
              </View>
            )}
          </View>
        </View>
      </View>

      {/* Controles da videochamada */}
      <View style={styles.controls}>
        <View style={styles.controlsRow}>
          {/* Toggle Áudio */}
          <TouchableOpacity
            style={[
              styles.controlButton,
              !isAudioOn && styles.controlButtonDisabled,
            ]}
            onPress={toggleAudio}
          >
            <Ionicons
              name={isAudioOn ? 'mic' : 'mic-off'}
              size={24}
              color={colors.white}
            />
          </TouchableOpacity>

          {/* Toggle Vídeo */}
          <TouchableOpacity
            style={[
              styles.controlButton,
              !isVideoOn && styles.controlButtonDisabled,
            ]}
            onPress={toggleVideo}
          >
            <Ionicons
              name={isVideoOn ? 'videocam' : 'videocam-off'}
              size={24}
              color={colors.white}
            />
          </TouchableOpacity>

          {/* Chat */}
          <TouchableOpacity
            style={styles.controlButton}
            onPress={handleChat}
          >
            <Ionicons name="chatbubble" size={24} color={colors.white} />
          </TouchableOpacity>

          {/* Compartilhar Tela */}
          <TouchableOpacity
            style={styles.controlButton}
            onPress={handleScreenShare}
          >
            <Ionicons name="desktop" size={24} color={colors.white} />
          </TouchableOpacity>

          {/* Encerrar Chamada */}
          <TouchableOpacity
            style={styles.endCallButton}
            onPress={handleEndCall}
          >
            <Ionicons name="call" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Indicadores de status */}
      <View style={styles.statusIndicators}>
        <View style={styles.statusItem}>
          <Ionicons 
            name="wifi" 
            size={16} 
            color={colors.success} 
          />
          <Text style={styles.statusText}>Conexão estável</Text>
        </View>
        
        <View style={styles.statusItem}>
          <Ionicons 
            name="lock-closed" 
            size={16} 
            color={colors.success} 
          />
          <Text style={styles.statusText}>Criptografado</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContent: {
    alignItems: 'center',
    padding: 24,
  },
  loadingTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginTop: 16,
    marginBottom: 8,
  },
  loadingSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  backButton: {
    padding: 8,
  },
  sessionInfo: {
    alignItems: 'center',
  },
  sessionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
  sessionDuration: {
    fontSize: 14,
    color: colors.white,
    opacity: 0.8,
  },
  headerButton: {
    padding: 8,
  },
  videoContainer: {
    flex: 1,
    position: 'relative',
  },
  remoteVideo: {
    flex: 1,
    backgroundColor: colors.gray800,
  },
  videoPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.gray700,
  },
  participantName: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white,
    marginTop: 12,
  },
  localVideo: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 120,
    height: 160,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: colors.white,
  },
  localVideoContent: {
    flex: 1,
  },
  videoOff: {
    backgroundColor: colors.gray800,
  },
  controls: {
    paddingHorizontal: 24,
    paddingVertical: 32,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  controlButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlButtonDisabled: {
    backgroundColor: colors.error,
  },
  endCallButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.error,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusIndicators: {
    position: 'absolute',
    bottom: 120,
    left: 16,
    gap: 8,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    color: colors.white,
  },
});
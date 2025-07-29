import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui/Button';
import { colors } from '@/styles/colors';

interface Material {
  id: number;
  title: string;
  description: string;
  category: 'exercise' | 'worksheet' | 'article' | 'video' | 'audio';
  tags: string[];
  createdAt: Date;
  isShared: boolean;
  downloadCount: number;
}

interface MaterialCardProps {
  material: Material;
  onPress: () => void;
}

const MaterialCard: React.FC<MaterialCardProps> = ({ material, onPress }) => {
  const getCategoryIcon = () => {
    switch (material.category) {
      case 'exercise': return 'fitness';
      case 'worksheet': return 'document-text';
      case 'article': return 'newspaper';
      case 'video': return 'videocam';
      case 'audio': return 'musical-notes';
      default: return 'document';
    }
  };

  const getCategoryColor = () => {
    switch (material.category) {
      case 'exercise': return colors.success;
      case 'worksheet': return colors.primary;
      case 'article': return colors.info;
      case 'video': return colors.error;
      case 'audio': return colors.warning;
      default: return colors.textSecondary;
    }
  };

  const getCategoryLabel = () => {
    switch (material.category) {
      case 'exercise': return 'Exercício';
      case 'worksheet': return 'Planilha';
      case 'article': return 'Artigo';
      case 'video': return 'Vídeo';
      case 'audio': return 'Áudio';
      default: return 'Material';
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  };

  return (
    <TouchableOpacity style={styles.materialCard} onPress={onPress}>
      <View style={styles.materialHeader}>
        <View style={[styles.categoryIcon, { backgroundColor: getCategoryColor() }]}>
          <Ionicons name={getCategoryIcon() as any} size={20} color={colors.white} />
        </View>
        <View style={styles.materialInfo}>
          <Text style={styles.materialTitle}>{material.title}</Text>
          <Text style={styles.materialDescription} numberOfLines={2}>
            {material.description}
          </Text>
        </View>
        {material.isShared && (
          <Ionicons name="share" size={16} color={colors.success} />
        )}
      </View>

      <View style={styles.materialTags}>
        {material.tags.slice(0, 3).map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
        {material.tags.length > 3 && (
          <Text style={styles.moreTags}>+{material.tags.length - 3}</Text>
        )}
      </View>

      <View style={styles.materialFooter}>
        <View style={styles.materialMeta}>
          <Text style={styles.categoryLabel}>{getCategoryLabel()}</Text>
          <Text style={styles.materialDate}>{formatDate(material.createdAt)}</Text>
        </View>
        <View style={styles.downloadInfo}>
          <Ionicons name="download" size={14} color={colors.textSecondary} />
          <Text style={styles.downloadCount}>{material.downloadCount}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function MaterialsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const mockMaterials: Material[] = [
    {
      id: 1,
      title: 'Exercício de Respiração 4-7-8',
      description: 'Técnica de respiração para reduzir ansiedade e promover relaxamento profundo',
      category: 'exercise',
      tags: ['ansiedade', 'respiração', 'relaxamento'],
      createdAt: new Date(2024, 0, 15),
      isShared: true,
      downloadCount: 45,
    },
    {
      id: 2,
      title: 'Planilha de Registro de Pensamentos',
      description: 'Ferramenta para identificar e reestruturar pensamentos automáticos negativos',
      category: 'worksheet',
      tags: ['TCC', 'pensamentos', 'reestruturação'],
      createdAt: new Date(2024, 0, 12),
      isShared: false,
      downloadCount: 23,
    },
    {
      id: 3,
      title: 'Artigo: Mindfulness na Prática Clínica',
      description: 'Revisão sobre aplicações de mindfulness em diferentes transtornos mentais',
      category: 'article',
      tags: ['mindfulness', 'evidências', 'prática clínica'],
      createdAt: new Date(2024, 0, 10),
      isShared: true,
      downloadCount: 67,
    },
    {
      id: 4,
      title: 'Meditação Guiada - Body Scan',
      description: 'Áudio de meditação para escaneamento corporal e consciência plena',
      category: 'audio',
      tags: ['meditação', 'body scan', 'mindfulness'],
      createdAt: new Date(2024, 0, 8),
      isShared: true,
      downloadCount: 89,
    },
    {
      id: 5,
      title: 'Vídeo: Técnicas de Grounding',
      description: 'Demonstração prática de técnicas de ancoragem para crises de ansiedade',
      category: 'video',
      tags: ['grounding', 'ansiedade', 'crise'],
      createdAt: new Date(2024, 0, 5),
      isShared: false,
      downloadCount: 34,
    },
  ];

  const categories = [
    { key: 'all', label: 'Todos' },
    { key: 'exercise', label: 'Exercícios' },
    { key: 'worksheet', label: 'Planilhas' },
    { key: 'article', label: 'Artigos' },
    { key: 'video', label: 'Vídeos' },
    { key: 'audio', label: 'Áudios' },
  ];

  const filteredMaterials = mockMaterials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         material.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         material.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || material.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleMaterialPress = (material: Material) => {
    Alert.alert(
      material.title,
      `${material.description}\n\nCategoria: ${material.category}\nTags: ${material.tags.join(', ')}\nDownloads: ${material.downloadCount}`,
      [
        { text: 'Fechar', style: 'cancel' },
        { 
          text: 'Compartilhar', 
          onPress: () => Alert.alert('Compartilhar', 'Funcionalidade em desenvolvimento')
        },
        { 
          text: 'Baixar', 
          onPress: () => Alert.alert('Download', 'Funcionalidade em desenvolvimento')
        },
      ]
    );
  };

  const getCategoryStats = () => {
    const stats = categories.slice(1).map(cat => ({
      category: cat.label,
      count: mockMaterials.filter(m => m.category === cat.key).length,
    }));
    return stats;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Materiais Terapêuticos</Text>
        <Text style={styles.subtitle}>
          Recursos e ferramentas para suas sessões
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={20} color={colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Buscar materiais..."
            placeholderTextColor={colors.textSecondary}
          />
        </View>
      </View>

      <View style={styles.filtersContainer}>
        <Text style={styles.filtersTitle}>Categoria:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.key}
              style={[
                styles.filterButton,
                selectedCategory === category.key && styles.filterButtonActive,
              ]}
              onPress={() => setSelectedCategory(category.key)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedCategory === category.key && styles.filterTextActive,
                ]}
              >
                {category.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.statsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {getCategoryStats().map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <Text style={styles.statNumber}>{stat.count}</Text>
              <Text style={styles.statLabel}>{stat.category}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.materialsList}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Meus Materiais</Text>
          <Button
            title="Novo Material"
            size="small"
            variant="outline"
            onPress={() => Alert.alert('Novo Material', 'Funcionalidade em desenvolvimento')}
          />
        </View>

        {filteredMaterials.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="library-outline" size={64} color={colors.textSecondary} />
            <Text style={styles.emptyTitle}>Nenhum material encontrado</Text>
            <Text style={styles.emptyMessage}>
              Tente ajustar os filtros de busca
            </Text>
          </View>
        ) : (
          filteredMaterials.map((material) => (
            <MaterialCard
              key={material.id}
              material={material}
              onPress={() => handleMaterialPress(material)}
            />
          ))
        )}
      </View>

      <View style={styles.quickActions}>
        <Button
          title="Importar Material"
          variant="outline"
          onPress={() => Alert.alert('Importar', 'Funcionalidade em desenvolvimento')}
          style={styles.actionButton}
        />
        <Button
          title="Biblioteca Compartilhada"
          variant="outline"
          onPress={() => Alert.alert('Biblioteca', 'Funcionalidade em desenvolvimento')}
          style={styles.actionButton}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 24,
    paddingTop: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  searchContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.textPrimary,
  },
  filtersContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  filtersTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 12,
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  filterTextActive: {
    color: colors.white,
  },
  statsContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: 12,
    minWidth: 80,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  materialsList: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  materialCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  materialHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  materialInfo: {
    flex: 1,
  },
  materialTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  materialDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  materialTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  tag: {
    backgroundColor: colors.backgroundSecondary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tagText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  moreTags: {
    fontSize: 12,
    color: colors.textSecondary,
    alignSelf: 'center',
  },
  materialFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  materialMeta: {
    flex: 1,
  },
  categoryLabel: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
    marginBottom: 2,
  },
  materialDate: {
    fontSize: 12,
    color: colors.textTertiary,
  },
  downloadInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  downloadCount: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  quickActions: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 12,
  },
  actionButton: {
    width: '100%',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.textPrimary,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
});
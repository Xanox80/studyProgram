import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

interface ProgressCardProps {
  level: number;
  points: number;
  streak: number;
  progress: number;
}

export default function ProgressCard({ level, points, streak, progress }: ProgressCardProps) {
  const pointsToNextLevel = 100 - (points % 100);
  const progressPercentage = (points % 100) / 100;

  return (
    <LinearGradient
      colors={['#667eea', '#764ba2']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.header}>
        <View style={styles.levelContainer}>
          <Ionicons name="trophy" size={24} color="#FFD700" />
          <Text style={styles.levelText}>Рівень {level}</Text>
        </View>
        <View style={styles.pointsContainer}>
          <Ionicons name="star" size={20} color="#FFD700" />
          <Text style={styles.pointsText}>{points}</Text>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <Text style={styles.progressLabel}>Прогрес до наступного рівня</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progressPercentage * 100}%` }]} />
        </View>
        <Text style={styles.progressText}>
          {pointsToNextLevel} балів до рівня {level + 1}
        </Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Ionicons name="flame" size={20} color="#FF6B6B" />
          <Text style={styles.statText}>{streak} днів</Text>
          <Text style={styles.statLabel}>Серія</Text>
        </View>
        <View style={styles.statItem}>
          <Ionicons name="checkmark-circle" size={20} color="#4ECDC4" />
          <Text style={styles.statText}>{progress}%</Text>
          <Text style={styles.statLabel}>Завершено</Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  levelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  levelText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  pointsText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressLabel: {
    color: 'white',
    fontSize: 14,
    marginBottom: 8,
    opacity: 0.9,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFD700',
    borderRadius: 4,
  },
  progressText: {
    color: 'white',
    fontSize: 12,
    marginTop: 4,
    opacity: 0.8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 4,
  },
  statLabel: {
    color: 'white',
    fontSize: 12,
    opacity: 0.8,
    marginTop: 2,
  },
});


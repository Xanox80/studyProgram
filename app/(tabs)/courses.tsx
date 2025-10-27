import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { useProgress } from "../context/progress-context";
import { useTheme } from "../context/theme-context";
import { useFavorites } from "../context/favorites-context";
import ProgressCard from "../../components/progress-card";
import SearchBar from "../../components/search-bar";
import AnimatedButton from "../../components/animated-button";

const courses = [
  { id: "1", title: "Основи React Native" },
  { id: "2", title: "Вступ до Python" },
];

export default function CoursesScreen() {
  const router = useRouter();
  const { progress, getTotalProgress } = useProgress();
  const { theme } = useTheme();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = useMemo(() => {
    if (!searchQuery) return courses;
    return courses.filter(course => 
      course.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.header, { color: theme.colors.text }]}>📚 Доступні курси</Text>
      
      <SearchBar onSearch={handleSearch} placeholder="Пошук курсів..." />
      
      <ProgressCard
        level={progress.level}
        points={progress.totalPoints}
        streak={progress.streak}
        progress={getTotalProgress()}
      />

      <FlatList
        data={filteredCourses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
            <TouchableOpacity
              style={styles.cardContent}
              onPress={() => router.push(`/course/${item.id}`)}
            >
              <Text style={[styles.cardText, { color: theme.colors.text }]}>{item.title}</Text>
              <View style={styles.progressIndicator}>
                <Text style={[styles.progressText, { color: theme.colors.textSecondary }]}>
                  {progress.completedLessons.filter(id => id.startsWith(item.id)).length}/3 уроків
                </Text>
              </View>
            </TouchableOpacity>
            <AnimatedButton
              icon={isFavorite(item.id) ? "heart" : "heart-outline"}
              color={isFavorite(item.id) ? "#FF6B6B" : theme.colors.textSecondary}
              onPress={() => toggleFavorite(item.id)}
              style={styles.favoriteButton}
            />
          </View>
        )}
        contentContainerStyle={styles.list}
        scrollEnabled={false}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f6fa", paddingTop: 60 },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#4e54c8",
  },
  list: { paddingHorizontal: 20 },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardContent: {
    flex: 1,
  },
  cardText: { fontSize: 18, color: "#333", fontWeight: "500" },
  progressIndicator: {
    marginTop: 8,
    alignItems: 'flex-end',
  },
  progressText: {
    fontSize: 12,
    color: "#666",
    fontStyle: 'italic',
  },
  favoriteButton: {
    marginLeft: 10,
  },
});


import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

const lessonsByCourse: Record<string, { id: string; title: string }[]> = {
  "1": [
    { id: "react-intro", title: "Вступ до React Native" },
    { id: "jsx", title: "JSX та компоненти" },
    { id: "state", title: "useState та логіка стану" },
  ],
  "2": [
    { id: "python-intro", title: "Що таке Python" },
    { id: "variables", title: "Змінні та типи даних" },
    { id: "loops", title: "Цикли та умови" },
  ],
};

export default function CourseLessons() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const lessons = lessonsByCourse[id as string] || [];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📘 Уроки курсу</Text>

      <FlatList
        data={lessons}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/course/lesson/${item.id}`)} // ✅ Передаємо правильний ID
          >
            <Text style={styles.cardText}>{item.title}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f6fa", paddingTop: 60 },
  header: {
    fontSize: 24,
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
  },
  cardText: { fontSize: 18, color: "#333", fontWeight: "500" },
});

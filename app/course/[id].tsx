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
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.header}>📘 Уроки курсу</Text>
        <View style={styles.placeholder} />
      </View>

      <FlatList
        data={lessons}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/course/lesson/${item.id}`)}
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
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#4e54c8",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  backButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#4e54c8",
    flex: 1,
  },
  placeholder: {
    width: 40,
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

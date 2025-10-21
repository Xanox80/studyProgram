import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";

const courses = [
  { id: "1", title: "Основи React Native" },
  { id: "2", title: "Вступ до Python" },
];

export default function CoursesScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📚 Доступні курси</Text>
      <FlatList
        data={courses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/course/${item.id}`)} // ✅ Правильний перехід
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
  },
  cardText: { fontSize: 18, color: "#333", fontWeight: "500" },
});


import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";

const courses = [
  { id: "1", title: "Основи React Native" },
  { id: "2", title: "Вступ до Python" },
  { id: "3", title: "UI/UX Дизайн" },
  { id: "4", title: "Основи штучного інтелекту" },
];

export default function CoursesScreen() {
  const router = useRouter();

  const handlePress = (title: string) => {
    Alert.alert("📘 Курс відкривається", `Ви обрали: ${title}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Доступні курси</Text>

      <FlatList
        data={courses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => handlePress(item.title)}
          >
            <Text style={styles.cardText}>{item.title}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.list}
      />

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>← Назад</Text>
      </TouchableOpacity>
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
  backButton: { alignSelf: "center", marginTop: 20 },
  backText: { fontSize: 16, color: "#4e54c8", fontWeight: "bold" },
});

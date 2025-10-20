import React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function AchievementScreen() {
  const achievements = [
    {
      id: "1",
      title: "Перший крок",
      description: "Зареєструвався в додатку",
      icon: "walk-outline",
    },
    {
      id: "2",
      title: "Активний користувач",
      description: "Пройшов 5 курсів",
      icon: "flame-outline",
    },
    {
      id: "3",
      title: "Майстер знань",
      description: "Пройшов 10 курсів",             
      icon: "school-outline",
    },
    {
      id: "4",
      title: "Експерт",
      description: "Пройшов 20 курсів",
      icon: "trophy-outline",
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerTitle}>🏆 Досягнення</Text>

      {achievements.map((item) => (
        <View key={item.id} style={styles.card}>
          <View style={styles.iconContainer}>
            <Ionicons name={item.icon as any} size={40} color="#4b7bec" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f0f3fa",
    flexGrow: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2f3640",
    textAlign: "center",
    marginBottom: 25,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  iconContainer: {
    backgroundColor: "#dfe6e9",
    borderRadius: 50,
    padding: 10,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2d3436",
  },
  description: {
    fontSize: 14,
    color: "#636e72",
    marginTop: 3,
  },
});

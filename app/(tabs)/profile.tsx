import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/theme";

export default function ProfileScreen() {
  const user = {
    name: "Богдан Серветник",
    email: "bogdan@example.com",
    avatar: "https://i.pravatar.cc/200",
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Аватар та ім'я */}
      <View style={styles.profileHeader}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      {/* Інформація про користувача */}
      <View style={styles.infoContainer}>
        <Text style={styles.sectionTitle}>Мій акаунт</Text>

        <TouchableOpacity style={styles.infoRow}>
          <Ionicons name="person-outline" size={22} color={Colors.light.text} />
          <Text style={styles.infoText}>Редагувати профіль</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.infoRow}>
          <Ionicons
            name="lock-closed-outline"
            size={22}
            color={Colors.light.text}
          />
          <Text style={styles.infoText}>Змінити пароль</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.infoRow}>
          <Ionicons
            name="notifications-outline"
            size={22}
            color={Colors.light.text}
          />
          <Text style={styles.infoText}>Налаштування сповіщень</Text>
        </TouchableOpacity>
      </View>

      {/* Кнопка виходу */}
      <TouchableOpacity style={styles.logoutButton}>
        <Ionicons name="log-out-outline" size={20} color="#fff" />
        <Text style={styles.logoutText}>Вийти</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 40,
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 30,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: "#ddd",
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "#333",
  },
  email: {
    fontSize: 16,
    color: "#777",
  },
  infoContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  infoText: {
    marginLeft: 12,
    fontSize: 16,
    color: "#333",
  },
  logoutButton: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ff4d4d",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 3,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});

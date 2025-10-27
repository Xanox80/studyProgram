import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useTheme } from "../context/theme-context";
import { useProgress } from "../context/progress-context";
import ThemeToggle from "../../components/theme-toggle";

export default function ProfileScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const { progress } = useProgress();
  const user = {
    name: "Богдан Серветник",
    email: "bogdan@example.com",
    avatar: "https://i.pravatar.cc/200",
  };

  const handleLogout = () => {
    Alert.alert(
      "Вийти",
      "Ви впевнені, що хочете вийти з акаунту?",
      [
        {
          text: "Скасувати",
          style: "cancel",
        },
        {
          text: "Вийти",
          style: "destructive",
          onPress: async () => {
            await AsyncStorage.removeItem("token");
            router.replace("/auth/login");
          },
        },
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Аватар та ім'я */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <View style={styles.levelBadge}>
            <Text style={styles.levelText}>{progress.level}</Text>
          </View>
        </View>
        <Text style={[styles.name, { color: theme.colors.text }]}>{user.name}</Text>
        <Text style={[styles.email, { color: theme.colors.textSecondary }]}>{user.email}</Text>
        
        {/* Статистика */}
        <View style={[styles.statsContainer, { backgroundColor: theme.colors.surface }]}>
          <View style={styles.statItem}>
            <Ionicons name="star" size={20} color="#FFD700" />
            <Text style={[styles.statText, { color: theme.colors.text }]}>{progress.totalPoints}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Балів</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="flame" size={20} color="#FF6B6B" />
            <Text style={[styles.statText, { color: theme.colors.text }]}>{progress.streak}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Серія</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="checkmark-circle" size={20} color="#4ECDC4" />
            <Text style={[styles.statText, { color: theme.colors.text }]}>{progress.completedLessons.length}</Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Уроків</Text>
          </View>
        </View>
      </View>

      {/* Інформація про користувача */}
      <View style={[styles.infoContainer, { backgroundColor: theme.colors.surface }]}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Мій акаунт</Text>
          <ThemeToggle />
        </View>

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
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
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
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 30,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 15,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#ddd",
  },
  levelBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#4e54c8",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#fff",
  },
  levelText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
  },
  email: {
    fontSize: 16,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
    padding: 20,
    borderRadius: 15,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statItem: {
    alignItems: "center",
  },
  statText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 4,
  },
  statLabel: {
    fontSize: 12,
    marginTop: 2,
  },
  infoContainer: {
    width: "90%",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
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

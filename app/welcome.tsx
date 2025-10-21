import { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function WelcomeScreen() {
  const router = useRouter();

  useEffect(() => {
    const run = async () => {
      await AsyncStorage.setItem("welcomeSeen", "true");
      setTimeout(() => {
        router.replace("/(tabs)/courses");
      }, 1500);
    };
    run();
  }, []);

  return (
    <LinearGradient colors={["#4e54c8", "#8f94fb"]} style={styles.container}>
      <View style={styles.center}>
        <Text style={styles.title}>Привіт 👋</Text>
        <Text style={styles.subtitle}>Раді бачити тебе знову!</Text>
        <ActivityIndicator size="large" color="#fff" style={{ marginTop: 30 }} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  center: { alignItems: "center" },
  title: { fontSize: 28, color: "#fff", fontWeight: "bold" },
  subtitle: { fontSize: 18, color: "#e0e0e0", marginTop: 10 },
});





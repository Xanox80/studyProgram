// app/login.tsx
import React, { useState } from "react";
import { Button, TextInput, View, StyleSheet, Text, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../app/context/auth-context";
export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = () => {
    const success = login(username, password);
    if (success) {
      router.replace("/(tabs)/CoursesScreen");
    } else {
      Alert.alert("Помилка", "Некоректний логін або пароль");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
  },
});

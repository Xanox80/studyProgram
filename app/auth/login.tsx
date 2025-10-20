import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    if (username === "admin" && password === "1234") {
      await AsyncStorage.setItem("token", "example_token");
      router.replace("/(tabs)/courses");
    } else {
      Alert.alert("Помилка", "Невірний логін або пароль");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Логін"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Пароль"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Увійти" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

import { Slot } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, ActivityIndicator } from "react-native";
import AuthProvider from "./context/auth-context";
import { ProgressProvider } from "./context/progress-context";
import { ThemeProvider } from "./context/theme-context";
import { FavoritesProvider } from "./context/favorites-context";

export default function RootLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("token");
      setIsAuthenticated(!!token);
    };
    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <AuthProvider>
      <ThemeProvider>
        <ProgressProvider>
          <FavoritesProvider>
            <Slot />
          </FavoritesProvider>
        </ProgressProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

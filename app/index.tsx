import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          router.replace("/auth/login");
          return;
        }
        const welcomeSeen = await AsyncStorage.getItem("welcomeSeen");
        if (welcomeSeen === "true") {
          router.replace("/(tabs)/courses");
        } else {
          router.replace("/welcome");
        }
      } finally {
        setLoading(false);
      }
    };
    bootstrap();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return null;
}





import { Tabs } from "expo-router";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { IconSymbol } from "@/components/ui/icon-symbol";

export default function TabLayout() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        router.replace("/auth/login");
      }
    };
    checkAuth();
  }, []);

  return (
    <Tabs>
      <Tabs.Screen
        name="courses"
        options={{
          title: "Курси",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="book.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="achivment"
        options={{
          title: "Досягнення",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="trophy.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Профіль",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="person.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

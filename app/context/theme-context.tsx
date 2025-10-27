import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "react-native";

interface ThemeColors {
  background: string;
  surface: string;
  primary: string;
  secondary: string;
  text: string;
  textSecondary: string;
  border: string;
  shadow: string;
  success: string;
  warning: string;
  error: string;
}

interface Theme {
  colors: ThemeColors;
  isDark: boolean;
}

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
}

const lightTheme: Theme = {
  isDark: false,
  colors: {
    background: "#f5f6fa",
    surface: "#ffffff",
    primary: "#4e54c8",
    secondary: "#667eea",
    text: "#2d3436",
    textSecondary: "#636e72",
    border: "#ddd",
    shadow: "#000",
    success: "#4ECDC4",
    warning: "#FFD93D",
    error: "#FF6B6B",
  },
};

const darkTheme: Theme = {
  isDark: true,
  colors: {
    background: "#1a1a1a",
    surface: "#2d2d2d",
    primary: "#667eea",
    secondary: "#764ba2",
    text: "#ffffff",
    textSecondary: "#b0b0b0",
    border: "#404040",
    shadow: "#000",
    success: "#4ECDC4",
    warning: "#FFD93D",
    error: "#FF6B6B",
  },
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(systemColorScheme === "dark");

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem("theme");
      if (savedTheme) {
        setIsDark(savedTheme === "dark");
      }
    } catch (error) {
      console.error("Error loading theme:", error);
    }
  };

  const toggleTheme = async () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    try {
      await AsyncStorage.setItem("theme", newTheme ? "dark" : "light");
    } catch (error) {
      console.error("Error saving theme:", error);
    }
  };

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}


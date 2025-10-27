import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ProgressData {
  completedLessons: string[];
  completedCourses: string[];
  totalPoints: number;
  level: number;
  streak: number;
  lastActiveDate: string;
}

interface ProgressContextType {
  progress: ProgressData;
  markLessonCompleted: (lessonId: string) => void;
  markCourseCompleted: (courseId: string) => void;
  addPoints: (points: number) => void;
  updateStreak: () => void;
  getCourseProgress: (courseId: string) => number;
  getTotalProgress: () => number;
}

const ProgressContext = createContext<ProgressContextType | undefined>(
  undefined
);

const defaultProgress: ProgressData = {
  completedLessons: [],
  completedCourses: [],
  totalPoints: 0,
  level: 1,
  streak: 0,
  lastActiveDate: new Date().toISOString().split("T")[0],
};

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<ProgressData>(defaultProgress);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      const savedProgress = await AsyncStorage.getItem("userProgress");
      if (savedProgress) {
        setProgress(JSON.parse(savedProgress));
      }
    } catch (error) {
      console.error("Error loading progress:", error);
    }
  };

  const saveProgress = async (newProgress: ProgressData) => {
    try {
      await AsyncStorage.setItem("userProgress", JSON.stringify(newProgress));
    } catch (error) {
      console.error("Error saving progress:", error);
    }
  };

  const markLessonCompleted = (lessonId: string) => {
    setProgress((prev) => {
      if (prev.completedLessons.includes(lessonId)) return prev;

      const newProgress = {
        ...prev,
        completedLessons: [...prev.completedLessons, lessonId],
        totalPoints: prev.totalPoints + 10,
      };

      // Перевіряємо чи потрібно підвищити рівень
      const newLevel = Math.floor(newProgress.totalPoints / 100) + 1;
      if (newLevel > prev.level) {
        newProgress.level = newLevel;
      }

      saveProgress(newProgress);
      return newProgress;
    });
  };

  const markCourseCompleted = (courseId: string) => {
    setProgress((prev) => {
      if (prev.completedCourses.includes(courseId)) return prev;

      const newProgress = {
        ...prev,
        completedCourses: [...prev.completedCourses, courseId],
        totalPoints: prev.totalPoints + 50,
      };

      const newLevel = Math.floor(newProgress.totalPoints / 100) + 1;
      if (newLevel > prev.level) {
        newProgress.level = newLevel;
      }

      saveProgress(newProgress);
      return newProgress;
    });
  };

  const addPoints = (points: number) => {
    setProgress((prev) => {
      const newProgress = {
        ...prev,
        totalPoints: prev.totalPoints + points,
      };

      const newLevel = Math.floor(newProgress.totalPoints / 100) + 1;
      if (newLevel > prev.level) {
        newProgress.level = newLevel;
      }

      saveProgress(newProgress);
      return newProgress;
    });
  };

  const updateStreak = () => {
    const today = new Date().toISOString().split("T")[0];
    setProgress((prev) => {
      const lastActive = new Date(prev.lastActiveDate);
      const todayDate = new Date(today);
      const diffTime = todayDate.getTime() - lastActive.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      let newStreak = prev.streak;
      if (diffDays === 1) {
        newStreak = prev.streak + 1;
      } else if (diffDays > 1) {
        newStreak = 1;
      }

      const newProgress = {
        ...prev,
        streak: newStreak,
        lastActiveDate: today,
      };

      saveProgress(newProgress);
      return newProgress;
    });
  };

  const getCourseProgress = (courseId: string): number => {
    const courseLessons = progress.completedLessons.filter((id) =>
      id.startsWith(courseId)
    );
    return courseLessons.length;
  };

  const getTotalProgress = (): number => {
    const totalLessons = 6;
    return Math.round((progress.completedLessons.length / totalLessons) * 100);
  };

  return (
    <ProgressContext.Provider
      value={{
        progress,
        markLessonCompleted,
        markCourseCompleted,
        addPoints,
        updateStreak,
        getCourseProgress,
        getTotalProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return context;
}


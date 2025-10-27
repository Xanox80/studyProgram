import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { VideoView, useVideoPlayer } from "expo-video";
import WebView from "react-native-webview";
import { useProgress } from "../../context/progress-context";
import { Ionicons } from "@expo/vector-icons";

const lessonContent: Record<
  string,
  {
    title: string;
    text: string;
    video?: string;
    quiz?: { q: string; a: string[]; correct: number };
  }
> = {
  "react-intro": {
    title: "Вступ до React Native",
    text: "React Native дозволяє створювати мобільні застосунки на JavaScript, використовуючи компоненти, схожі на React.",
    video: "https://www.youtube.com/watch?v=mLyWsp2tWsw",
    quiz: {
      q: "Що таке React Native?",
      a: [
        "Фреймворк для веб-сайтів",
        "Мова програмування",
        "Фреймворк для мобільних застосунків",
      ],
      correct: 2,
    },
  },
};

export default function LessonScreen() {
  const { lessonId } = useLocalSearchParams();
  const router = useRouter();
  const { markLessonCompleted, addPoints, updateStreak } = useProgress();
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [lessonCompleted, setLessonCompleted] = useState(false);

  const lesson = lessonContent[lessonId as string];
  const player = useVideoPlayer(lesson?.video || "");

  useEffect(() => {
    updateStreak();
  }, []);

  const isYouTubeUrl = (url?: string) =>
    !!url && /(?:youtube\.com|youtu\.be)\//.test(url);

  const getYouTubeId = (url: string): string | null => {
    try {
      const u = new URL(url);
      if (u.hostname.includes("youtu.be")) {
        return u.pathname.replace("/", "");
      }
      if (u.searchParams.get("v")) {
        return u.searchParams.get("v");
      }
      const match = url.match(/(?:embed|v)\/([a-zA-Z0-9_-]{6,})/);
      return match ? match[1] : null;
    } catch {
      return null;
    }
  };

  const handleCompleteLesson = () => {
    if (!lessonCompleted) {
      markLessonCompleted(lessonId as string);
      addPoints(10);
      setLessonCompleted(true);
      Alert.alert(
        "🎉 Вітаємо!",
        "Ви завершили урок і отримали 10 балів!",
        [{ text: "Круто!", style: "default" }]
      );
    }
  };

  const renderYouTube = () => {
    if (!lesson?.video) return null;
    const id = getYouTubeId(lesson.video);
    const uri = id ? `` : lesson.video;
    return (
      <WebView
        style={styles.video}
        javaScriptEnabled
        allowsFullscreenVideo
        source={{ uri }}
      />
    );
  };

  if (!lesson)
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Урок не знайдено 😢</Text>
      </View>
    );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{lesson.title}</Text>
        <View style={styles.placeholder} />
      </View>
      <Text style={styles.text}>{lesson.text}</Text>

      {lesson.video && isYouTubeUrl(lesson.video) ? (
        renderYouTube()
      ) : lesson.video ? (
        <VideoView
          player={player}
          style={styles.video}
          nativeControls
          contentFit="contain"
          allowsFullscreen
          allowsPictureInPicture
        />
      ) : null}

      {lesson.quiz && (
        <View style={styles.quizContainer}>
          <Text style={styles.quizQuestion}>{lesson.quiz.q}</Text>
          {lesson.quiz.a.map((answer, i) => (
            <TouchableOpacity
              key={i}
              style={[
                styles.answerButton,
                selected === i && { backgroundColor: "#4e54c8" },
              ]}
              onPress={() => setSelected(i)}
            >
              <Text
                style={[
                  styles.answerText,
                  selected === i && { color: "white" },
                ]}
              >
                {answer}
              </Text>
            </TouchableOpacity>
          ))}

          {selected !== null && !answered && (
            <TouchableOpacity
              style={styles.checkButton}
              onPress={() => setAnswered(true)}
            >
              <Text style={styles.checkText}>Перевірити</Text>
            </TouchableOpacity>
          )}

          {answered && (
            <View>
              <Text style={styles.resultText}>
                {selected === lesson.quiz.correct
                  ? "✅ Правильно!"
                  : "❌ Неправильно, спробуй ще."}
              </Text>
              {selected === lesson.quiz.correct && !lessonCompleted && (
                <TouchableOpacity
                  style={styles.completeButton}
                  onPress={handleCompleteLesson}
                >
                  <Ionicons name="checkmark-circle" size={20} color="white" />
                  <Text style={styles.completeButtonText}>Завершити урок</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      )}

      {!lesson.quiz && !lessonCompleted && (
        <TouchableOpacity
          style={styles.completeButton}
          onPress={handleCompleteLesson}
        >
          <Ionicons name="checkmark-circle" size={20} color="white" />
          <Text style={styles.completeButtonText}>Завершити урок</Text>
        </TouchableOpacity>
      )}

      {lessonCompleted && (
        <View style={styles.completedContainer}>
          <Ionicons name="checkmark-circle" size={40} color="#4ECDC4" />
          <Text style={styles.completedText}>Урок завершено! 🎉</Text>
        </View>
      )}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#f5f6fa" },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#4e54c8",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  backButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4e54c8",
    flex: 1,
    textAlign: "center",
  },
  placeholder: {
    width: 40,
  },
  text: { fontSize: 16, marginBottom: 20, color: "#333" },
  video: { width: "100%", height: 200, borderRadius: 10, marginBottom: 20 },
  quizContainer: { marginTop: 20 },
  quizQuestion: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  answerButton: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  answerText: { fontSize: 16, color: "#333" },
  checkButton: {
    backgroundColor: "#4e54c8",
    padding: 12,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 10,
  },
  checkText: { color: "white", fontWeight: "bold" },
  resultText: { fontSize: 18, textAlign: "center", marginTop: 15 },
  completeButton: {
    backgroundColor: "#4ECDC4",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 25,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  completeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  completedContainer: {
    alignItems: "center",
    marginTop: 30,
    padding: 20,
    backgroundColor: "#f0f8ff",
    borderRadius: 15,
  },
  completedText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4ECDC4",
    marginTop: 10,
  },
});

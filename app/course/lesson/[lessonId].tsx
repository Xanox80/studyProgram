import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { VideoView, useVideoPlayer } from "expo-video";
import WebView from "react-native-webview";

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
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);

  const lesson = lessonContent[lessonId as string];
  const player = useVideoPlayer(lesson?.video || "");

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
      <Text style={styles.title}>{lesson.title}</Text>
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
            <Text style={styles.resultText}>
              {selected === lesson.quiz.correct
                ? "✅ Правильно!"
                : "❌ Неправильно, спробуй ще."}
            </Text>
          )}
        </View>
      )}

      <TouchableOpacity style={styles.nextButton} onPress={() => router.back()}>
        <Text style={styles.nextText}>← Назад до уроків</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#f5f6fa" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4e54c8",
    marginBottom: 10,
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
  nextButton: { marginTop: 30, alignSelf: "center" },
  nextText: { fontSize: 16, color: "#4e54c8", fontWeight: "bold" },
});

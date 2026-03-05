import { generateQuizQuestions, QuizQuestion } from "./gemini";
import { useQuizStore } from "../components/Home";

export default async function generateQuiz(
  topic: string,
  numQuestions: number,
): Promise<void | { secondsLeft: number }> {
  const questions: QuizQuestion[] | { secondsLeft: number } =
    await generateQuizQuestions(topic, numQuestions);
  if ("secondsLeft" in questions) {
    return { secondsLeft: questions.secondsLeft };
  }
  useQuizStore.setState({ questions, topic });
  return;
}

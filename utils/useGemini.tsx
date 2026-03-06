import { generateQuizQuestions, QuizQuestion } from "./gemini";
import { useQuizStore } from "../components/Home";
import { supabase } from "../utils/supabase-client";

const template: QuizQuestion[] = [
  {
    question:
      "What is the name of the house-elf who warns Harry about the danger at Hogwarts in the Chamber of Secrets?",
    options: ["Dobby", "Winky", "Kreacher", "Hokey"],
    answer: "Dobby",
  },
  {
    question:
      "What is the primary ingredient in the potion Gilderoy Lockhart uses to erase his memory?",
    options: [
      "Flobberworm mucus",
      "Powdered dragon claw",
      "Boomslang skin",
      "Gillyweed",
    ],
    answer: "Boomslang skin",
  },
  {
    question:
      "Which object does Harry use to defeat the Basilisk in the Chamber of Secrets?",
    options: [
      "The Sword of Gryffindor",
      "A shard of the Basilisk's fang",
      "The Mirror of Erised",
      "Gryffindor's diary",
    ],
    answer: "The Sword of Gryffindor",
  },
  {
    question:
      "What magical creature's tears are capable of healing fatal wounds, as shown when Harry is injured by the Basilisk?",
    options: ["Phoenix", "Hippogriff", "Thestral", "Bowtruckle"],
    answer: "Phoenix",
  },
  {
    question:
      "What is the name of the diary that Tom Riddle uses to lure Ginny Weasley into the Chamber of Secrets?",
    options: [
      "The Diary of secrets",
      "The Book of Monsters",
      "Tom Riddle's Diary",
      "The Chronicle of Slytherin",
    ],
    answer: "Tom Riddle's Diary",
  },
];

export default async function generateQuiz(
  topic: string,
  numQuestions: number,
): Promise<string | { secondsLeft: number }> {
  const questions: QuizQuestion[] | { secondsLeft: number } =
    await generateQuizQuestions(topic, numQuestions);

  if ("secondsLeft" in questions) {
    return { secondsLeft: questions.secondsLeft };
  }
  const quizid = crypto.randomUUID();
  const { error } = await supabase
    .from("quizai")
    .insert({ quizid, topic, questions });
  if (error) throw new Error("Error adding quiz");
  useQuizStore.setState({ questions, topic });
  return quizid;
}

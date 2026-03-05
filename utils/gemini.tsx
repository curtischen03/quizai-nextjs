"use server";
import { GoogleGenerativeAI } from "@google/generative-ai";
const apiKey = process.env.GOOGLE_API_KEY;

if (!apiKey) {
  throw new Error("Missing GOOGLE_API_KEY in environment variables");
}
let lastRequestTime = 0;
const COOLDOWN_MS = 60000 * 5; // 1 minute in milliseconds x 5

const genAI = new GoogleGenerativeAI(apiKey);

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
}
export async function generateQuizQuestions(
  topic: string,
  numQuestions: number,
): Promise<QuizQuestion[] | { secondsLeft: number }> {
  try {
    const now = Date.now();
    const timeSinceLast = now - lastRequestTime;
    if (timeSinceLast < COOLDOWN_MS) {
      const secondsLeft = Math.ceil((COOLDOWN_MS - timeSinceLast) / 1000);
      return { secondsLeft: secondsLeft };
    }
    lastRequestTime = now;
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `Generate ${numQuestions} multiple-choice quiz questions about ${topic}. 
    For each question, provide:
    1. The question text
    2. Four possible answers
    3. The correct answer (must be the exact text of the correct option)
    
    Format the response as a JSON array of objects, where each object has the properties:
    - question: string (the question text)
    - options: array of 4 strings (the possible answers)
    - answer: string (must be EXACTLY the same text as the correct option from the options array)
    
    Example format:
    {
      "question": "What is the capital of France?",
      "options": ["London", "Berlin", "Paris", "Madrid"],
      "answer": "Paris"
    }
    
    Make sure:
    1. The answer string matches EXACTLY with one of the options
    2. Questions are challenging but fair
    3. Incorrect options are plausible
    4. Each question has exactly 4 options`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    try {
      // Clean the response text to ensure it's valid JSON
      const cleanedText = text.replace(/```json\n?|\n?```/g, "").trim();
      const questions = JSON.parse(cleanedText);

      // Validate that each question's answer matches exactly with one of its options
      const validatedQuestions = questions.map((question: QuizQuestion) => {
        if (!question.options.includes(question.answer)) {
          // If answer doesn't match exactly, find the matching option
          const matchingOption = question.options.find(
            (option) =>
              option.toLowerCase().trim() ===
              question.answer.toLowerCase().trim(),
          );
          if (matchingOption) {
            question.answer = matchingOption; // Use the exact option text
          }
        }
        return question;
      });

      return validatedQuestions;
    } catch (parseError) {
      console.error("Error parsing Gemini response:", parseError);
      throw new Error("Failed to parse quiz questions");
    }
  } catch (error) {
    console.error("Error generating quiz questions:", error);
    throw error;
  }
}

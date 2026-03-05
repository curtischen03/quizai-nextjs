"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { create } from "zustand";
import generateQuiz from "../utils/useGemini";
import { QuizQuestion } from "../utils/gemini";
import { Result } from "./QuizPage";

interface QuizState {
  questions: QuizQuestion[];
  topic: string;
  results: Result[];
  score: number;
  total: number;
  setQuizData: (questions: QuizQuestion[], topic: string) => void;
  setQuizDataResults: (results: Result[], score: number, total: number) => void;
}

export const useQuizStore = create<QuizState>((set) => ({
  questions: [],
  topic: "",
  results: [],
  score: 0,
  total: 0,
  setQuizData: (questions: QuizQuestion[], topic: string) =>
    set({ questions, topic }),
  setQuizDataResults: (results: Result[], score: number, total: number) =>
    set({ results, score, total }),
}));

const Home = () => {
  const [topic, setTopic] = useState("");
  const [numQuestions, setNumQuestions] = useState(5);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await generateQuiz(topic, numQuestions);
      if (result && "secondsLeft" in result) {
        alert(
          `Rate limit: Please wait ${result.secondsLeft} seconds before trying again.`,
        );
        return;
      }
      router.push("/quiz");
    } catch (err: any) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Create Your Quiz</h2>
              {isLoading ? (
                <div className="text-center">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="topic" className="form-label">
                      Quiz Topic
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="topic"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      required
                      placeholder="Enter quiz topic"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="numQuestions" className="form-label">
                      Number of Questions
                    </label>
                    <select
                      className="form-select"
                      id="numQuestions"
                      value={numQuestions}
                      onChange={(e) => setNumQuestions(Number(e.target.value))}
                    >
                      {[3, 5, 7, 10].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    Generate Quiz
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

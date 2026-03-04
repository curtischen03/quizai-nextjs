"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQuizStore } from "./Home";
import { QuizQuestion } from "../utils/gemini";

export interface Result {
  question: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
}
const QuizPage = () => {
  const router = useRouter();
  const topic = useQuizStore((state) => state.topic);
  const questions = useQuizStore((state) => state.questions) || [];
  const setQuizDataResults = useQuizStore((state) => state.setQuizDataResults);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(
    Array(questions.length).fill(""),
  );

  if (!questions.length) {
    router.push("/");
    return null;
  }

  const handleAnswerSelect = (answer: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answer;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    const results: Result[] = questions.map(
      (question: QuizQuestion, index: number) => ({
        question: question.question,
        userAnswer: selectedAnswers[index],
        correctAnswer: question.answer,
        isCorrect: selectedAnswers[index] === question.answer,
      }),
    );

    const score = results.filter((result) => result.isCorrect).length;
    router.push("/results");
    setQuizDataResults(results, score, questions.length);
  };

  const question = questions[currentQuestion];

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title mb-4">{topic}</h4>
              <h5 className="card-title mb-4">
                Question {currentQuestion + 1} of {questions.length}
              </h5>
              <p className="lead mb-4">{question.question}</p>

              <div className="list-group mb-4">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    className={`list-group-item list-group-item-action ${
                      selectedAnswers[currentQuestion] === option
                        ? "active"
                        : ""
                    }`}
                    onClick={() => handleAnswerSelect(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>

              <div className="d-flex justify-content-between">
                <button
                  className="btn btn-secondary"
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                >
                  Previous
                </button>

                {currentQuestion === questions.length - 1 ? (
                  <button
                    className="btn btn-primary"
                    onClick={handleSubmit}
                    disabled={selectedAnswers.includes("")}
                  >
                    Submit Quiz
                  </button>
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={handleNext}
                    disabled={!selectedAnswers[currentQuestion]}
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          </div>
          <br></br>
          <br></br>
          <br></br>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;

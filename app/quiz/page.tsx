"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase-client";
import { useRouter } from "next/navigation";

interface Quiz {
  topic: string;
  quizid: string;
}
export default function displayQuizzes() {
  const [quizData, setQuizData] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const fetchQuizzes = async () => {
      const { data, error } = await supabase
        .from("quizai")
        .select("topic,quizid");
      if (error) {
        console.error("Fetch quizzes error:", error);
        return;
      }
      if (data) {
        setQuizData(data);
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, []);
  if (loading)
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title text-center mb-4">
                  Loading Quizzes...
                </h2>

                <div className="text-center">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading Quizzes...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  return (
    <div className="container px-4 pt-5">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">QuizId</th>
            <th scope="col">Topic</th>
            <th scope="col">Take Quiz</th>
          </tr>
        </thead>
        <tbody>
          {quizData.map((quiz) => (
            <tr key={quiz.quizid}>
              <th scope="row">{quiz.quizid.slice(0, 8)}...</th>
              <td>{quiz.topic}</td>
              <td>
                <button
                  className="btn btn-success"
                  onClick={() => {
                    router.push(`/quiz/${quiz.quizid}`);
                  }}
                >
                  Go
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

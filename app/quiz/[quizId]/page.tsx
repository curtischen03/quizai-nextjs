"use client";
import QuizPage from "../../../components/QuizPage";
import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { supabase } from "../../../utils/supabase-client";
import { validate as isValidUUID } from "uuid";
import { useQuizStore } from "../../../components/Home";

export default function Quiz() {
  const params = useParams();
  const router = useRouter();
  const setQuizData = useQuizStore((state) => state.setQuizData);
  const [loading, setLoading] = useState(true);

  const quizId = Array.isArray(params.quizId)
    ? params.quizId[0]
    : (params.quizId ?? "");

  useEffect(() => {
    const checkId = async () => {
      const { count, error } = await supabase
        .from("quizai")
        .select("*", { count: "exact", head: true })
        .eq("quizid", quizId);
      const exists = count ? count > 0 : false;
      if (error) {
        console.error("Database error:", error);
        router.push("/");
      }
    };
    if (!isValidUUID(quizId)) {
      router.push("/");
      return;
    }
    checkId();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!quizId || !isValidUUID(quizId)) {
        router.push("/");
        return;
      }
      const { data, error } = await supabase
        .from("quizai")
        .select("topic,questions")
        .eq("quizid", quizId)
        .single();
      if (error || !data) {
        console.error("Fetch error:", error);
        router.push("/");
        return;
      }
      setQuizData(data.questions, data.topic, quizId);
      setLoading(false);
    };
    fetchData();
  }, []);
  if (loading)
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title text-center mb-4">Loading Quiz...</h2>

                <div className="text-center">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading Quiz...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  return <QuizPage />;
}

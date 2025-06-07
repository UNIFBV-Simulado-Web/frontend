"use client";

import Question from "@/components/question";
import { useEffect, useState } from "react";
import { Fundo, Line } from './styles';


export default function Quiz() {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState<QuestionAPI[]>([]);
  const [count, setCount] = useState(0);

  const getQuestions = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://api.enem.dev/v1/exams/2022/questions?limit=50&language=ingles&offset=51"
      );
      const data = await response.json();
      setQuestions(data.questions);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <div className="relative
      min-h-screen
      w-full
      bg-[#0C222A]
      before:absolute
      before:inset-0
      before:bg-[radial-gradient(circle_500px_at_top_left,_rgba(22,78,99,0.5),_transparent_80%)]
      after:absolute
      after:inset-0
      after:bg-[radial-gradient(circle_500px_at_bottom_right,_rgba(22,78,99,0.5),_transparent_80%)]">
      <header className="w-full max-w-4xl flex justify-between items-center w-full p-4 sm:p-6 lg:p-8 font-sans">
        <h1 className="text-2xl font-bold">Quiz Aprende+</h1>
      </header>
      
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {questions.length === 0 ? (
            <p>No questions found</p>
          ) : (
            <Question
              question={questions[count]}
              onSubmit={() => {
                count !== questions.length ? setCount(count + 1) : setCount(0);
              }}
            />
          )}
        </>
      )}
    </div>
  );
}

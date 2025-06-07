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
    <Fundo>
        <Line>
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
        </Line>
    </Fundo>
  );
}

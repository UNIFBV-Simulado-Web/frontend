"use client";

import Question from "@/components/question";
import { QuestionType, useQuizStore } from "@/store/quizStore";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
type SearchPageProps = {
  searchParams: {
    quantity?: string | undefined;
    discipline?: string;
    language?: string;
    random?: string;
  };
};
const Quiz = ({}: SearchPageProps) => {
  const searchParams = useSearchParams();

  const quantity = searchParams.get("quantity");
  const discipline = searchParams.get("discipline");
  const isRandom = searchParams.get("random");
  const { loadAndStartQuiz, questions, quizStatus, getCurrentQuestion } =
    useQuizStore();

  const getQuestions = async () => {
    loadAndStartQuiz(Number(quantity) || 10, {
      discipline: discipline || undefined,

      random: Boolean(isRandom) || true,
    });
  };

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <div>
      {quizStatus === "loading" ? (
        <p>Loading...</p>
      ) : (
        <>
          {questions?.length === 0 ? (
            <p>No questions found</p>
          ) : (
            <Question question={getCurrentQuestion() as QuestionType} />
          )}
        </>
      )}
    </div>
  );
};
export default Quiz;

"use client"; // Marca este como um Componente de Cliente

import { QuestionType, useQuizStore } from "@/store/quizStore";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Question from "../question";

function QuizLoader() {
  const searchParams = useSearchParams();
  const loadAndStartQuiz = useQuizStore((state) => state.loadAndStartQuiz);

  useEffect(() => {
    const quantityStr = searchParams.get("quantity");
    const discipline = searchParams.get("discipline");
    const randomStr = searchParams.get("random");

    const quantity = quantityStr ? parseInt(quantityStr, 10) : 10;
    const random = randomStr === "true";

    const options: { discipline?: string; random: boolean } = { random };
    if (discipline) {
      options.discipline = discipline;
    }

    loadAndStartQuiz(quantity, options);
  }, [searchParams, loadAndStartQuiz]);

  return null;
}

export default function QuizComponent() {
  const { quizStatus, errorMessage, getCurrentQuestion } = useQuizStore();
  const currentQuestion = getCurrentQuestion();

  if (quizStatus === "loading") {
    return <div>A carregar perguntas...</div>;
  }

  if (quizStatus === "error") {
    return <div>Erro: {errorMessage}</div>;
  }

  if (quizStatus === "active" && currentQuestion) {
    return <Question question={getCurrentQuestion() as QuestionType} />;
  }

  if (quizStatus === "finished") {
    return <div>Quiz finalizado!</div>;
  }

  return <QuizLoader />;
}

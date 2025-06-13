"use client";

import { QuestionType, useQuizStore } from "@/store/quizStore";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Question from "../question";
import { ActionButton, FinishedContainer, Subtitle, Title } from "./styles";

function QuizLoader() {
  return null;
}

export default function QuizComponent() {
  const {
    quizStatus,
    errorMessage,
    getCurrentQuestion,
    score,
    resetQuiz,
    questions,
  } = useQuizStore();
  const currentQuestion = getCurrentQuestion();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { loadAndStartQuiz } = useQuizStore();

  const quantityStr = searchParams.get("quantity");
  const discipline = searchParams.get("discipline");
  const randomStr = searchParams.get("random");

  const quantity = quantityStr ? parseInt(quantityStr, 10) : 10;
  const random = randomStr === "true";

  const options: { discipline?: string; random: boolean } = { random };
  if (discipline) {
    options.discipline = discipline;
  }

  if (quizStatus === "idle") {
    return (
      <FinishedContainer>
        <ActionButton
          onClick={() => {
            loadAndStartQuiz(quantity, options);
          }}
        >
          Iniciar Quiz
        </ActionButton>
      </FinishedContainer>
    );
  }

  if (quizStatus === "loading") {
    return <div>A carregar perguntas...</div>;
  }

  if (quizStatus === "error") {
    return <div>Erro: {errorMessage}</div>;
  }

  if (quizStatus === "active" && currentQuestion) {
    return (
      <>
        <ActionButton
          style={{ marginBottom: 8, alignSelf: "flex-end" }}
          onClick={() => {
            resetQuiz();
            router.replace("/home");
          }}
        >
          Cancelar Quiz
        </ActionButton>
        <Question question={currentQuestion as QuestionType} />
      </>
    );
  }

  if (quizStatus === "finished") {
    return (
      <FinishedContainer>
        <Title>Quiz Finalizado!</Title>

        <Subtitle>
          Sua pontuação final: {score} de {questions.length} acertos.
        </Subtitle>

        <ActionButton
          onClick={() => {
            resetQuiz();
            router.replace("/home");
          }}
        >
          Fazer outro quiz
        </ActionButton>
      </FinishedContainer>
    );
  }
}

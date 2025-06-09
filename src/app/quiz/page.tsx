"use client";

import Question from "@/components/question";
import { QuestionType, useQuizStore } from "@/store/quizStore";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

const Quiz: React.FC = () => {
  const searchParams = useSearchParams();

  const { loadAndStartQuiz, questions, quizStatus, getCurrentQuestion } =
    useQuizStore();

  useEffect(() => {
    const quantity = searchParams.get("quantity");
    const discipline = searchParams.get("discipline");
    const isRandom = searchParams.get("random");
    loadAndStartQuiz(Number(quantity) || 10, {
      discipline: discipline || undefined,

      random: Boolean(isRandom) || true,
    });
  }, []);

  return (
    <Suspense>
      <div
        className="relative
      min-h-screen
      w-full
      bg-[#0C222A]
      before:absolute
      before:inset-0
      before:bg-[radial-gradient(circle_500px_at_top_left,_rgba(22,78,99,0.5),_transparent_80%)]
      after:absolute
      after:inset-0
      after:bg-[radial-gradient(circle_500px_at_bottom_right,_rgba(22,78,99,0.5),_transparent_80%)]
      flex flex-col items-center"
      >
        <header className="w-full p-4 sm:p-6 lg:p-8 font-sans">
          <div className="w-full flex justify-between items-center">
            <h1 className="text-2xl font-bold">Quiz Aprende+</h1>
            <nav>
              <div className="flex items-center gap-x-6">
                <Link
                  href="/"
                  className="font-sans font-medium text-white hover:text-gray-900"
                >
                  Menu
                </Link>
                <Link
                  href="#"
                  className="font-sans font-medium text-white hover:text-gray-900"
                >
                  Login
                </Link>
                <Link
                  href="#"
                  className="rounded-md border transparent px-4 py-2 font-semibold text-white shadow-sm hover:bg-gray-700 transition-colors"
                >
                  Cadastre-se
                </Link>
              </div>
            </nav>
          </div>
        </header>
        <div className="w-11/12 h-px bg-white/50 mb-8"></div>

        <div className="relative w-full z-10 flex-grow">
          {questions.length === 0 ? (
            <p>Nenhuma questão encontrada</p>
          ) : (
            <Question question={getCurrentQuestion() as QuestionType} />
          )}
        </div>

        <footer className="w-full py-6 text-center">
          <p className="text-sm text-gray-400">
            <span>© 2025 Quiz Aprende+</span>
            <span className="mx-2">|</span>
            <span>Projeto acadêmico-extensivo</span>
            <span className="mx-2">|</span>
            <span>Wyden-UniFBV</span>
          </p>
        </footer>
      </div>
    </Suspense>
  );
};
export default Quiz;

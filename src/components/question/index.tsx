import Image from "next/image";
import Button from "../button";
import { Suspense, useState } from "react";

import { Container, ErrorMessage, Options } from "./styles";
import { AlternativeType, QuestionType, useQuizStore } from "@/store/quizStore";

import clsx from "clsx";

const CorrectIcon = () => (
  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-500 mr-3">
    <svg
      className="h-4 w-4 text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={3}
        d="M5 13l4 4L19 7"
      />
    </svg>
  </div>
);
const FalseIcon = () => (
  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-red-500 mr-3">
    <svg
      className="h-4 w-4 text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={3}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  </div>
);
const LetterIcon = ({ letter }: { letter: string }) => (
  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 border-slate-500 mr-3">
    <span className="text-sm font-bold text-gray-400">{letter}</span>
  </div>
);

interface QuestionProps {
  question: QuestionType;
  onSubmit?: () => void;
}

export default function Question({
  question,

  ...props
}: QuestionProps) {
  const [selectedAlternative, setSelectedAlternative] =
    useState<AlternativeType | null>(null);
  const [isSubmited, setIsSubmited] = useState(false);
  const [error, setError] = useState(false);
  const { answerQuestion } = useQuizStore();

  const handleSubmit = () => {
    if (!selectedAlternative) {
      setError(true);
      return;
    }
    setError(false);
    if (isSubmited) {
      answerQuestion(question.id, selectedAlternative);
      setIsSubmited(false);
      setSelectedAlternative(null);
      return;
    }
    setIsSubmited(true);
  };

  return (
    <Suspense fallback={<div>A preparar o seu quiz...</div>}>
      <Container>
        <div className="text-black font-semibold font-sans p-6 mb-6 leading-relaxed bg-white/50">
          <p style={{ wordBreak: "break-word" }}>{question?.context}</p>
          <p style={{ wordBreak: "break-word" }} className="mt-4">
            {question?.introduction}
          </p>
        </div>
        {question?.files?.map((file) => (
          <Image
            key={file.id}
            src={file.link}
            alt="Question"
            width={500}
            height={500}
            className="mb-4"
          />
        ))}
        <div className="flex flex-col space-y-3 w-full max-w-4xl">
          {question?.alternatives.map((alternative) => {
            const isCorrect =
              isSubmited && question.correct_alternative === alternative.letter;
            const isFalse =
              isSubmited &&
              selectedAlternative?.letter === alternative.letter &&
              !isCorrect;
            const isSelected =
              !isSubmited && selectedAlternative?.letter === alternative.letter;

            return (
              <Button
                key={alternative.letter}
                onClick={() =>
                  !isSubmited && setSelectedAlternative(alternative)
                }
                disabled={isSubmited}
                className={clsx(
                  "w-full p-3 text-left flex items-center text-white border",
                  {
                    "border-slate-600 hover:bg-slate-800 hover:border-slate-500":
                      !isSelected && !isCorrect && !isFalse,
                    "bg-slate-900 border-blue-500": isSelected,
                    "bg-green-500/20 border-green-500": isCorrect,
                    "bg-red-500/20 border-red-500": isFalse,
                  }
                )}
              >
                {isCorrect ? (
                  <CorrectIcon />
                ) : isFalse ? (
                  <FalseIcon />
                ) : (
                  <LetterIcon letter={alternative.letter} />
                )}
                <span className="flex-1">
                  {alternative.text}
                  {alternative.image && (
                    <Image
                      src={alternative.image}
                      alt="Question"
                      width={90}
                      height={10}
                    />
                  )}
                </span>
              </Button>
            );
          })}
        </div>

        {error && <ErrorMessage>Selecione uma alternativa</ErrorMessage>}
        <div className="w-full flex justify-end items-center gap-4 mt-4 pr-10">
          <Button
            onClick={handleSubmit}
            className="px-10 py-3 bg-amber-500 text-white hover:bg-amber-400"
          >
            {isSubmited ? "Próxima Questão" : "Enviar"}
          </Button>
          <button
            type="button"
            className="h-16 w-16 rounded-full bg-gray-200 text-black font-semibold flex items-center justify-center shadow-lg"
          >
            ChatBot
          </button>
        </div>
      </Container>
    </Suspense>
  );
}

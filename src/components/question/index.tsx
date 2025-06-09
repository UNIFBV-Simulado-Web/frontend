import Image from "next/image";
import Button from "../button";
import { useState } from "react";
import { Container, ErrorMessage, Options } from "./styles";
import { QuestionType, useQuizStore } from "@/store/quizStore";

interface QuestionProps {
  question: QuestionType;
  onSubmit?: () => void;
}

export default function Question({
  question,

  ...props
}: QuestionProps) {
  const [selectedAlternative, setSelectedAlternative] = useState<string | null>(
    null
  );
  const [isSubmited, setIsSubmited] = useState(false);
  const [error, setError] = useState(false);
  const { answerQuestion, questions, currentQuestionIndex, score } =
    useQuizStore();

  const getbackgroundcolor = (letter: string) => {
    if (isSubmited && question.correct_alternative === letter) {
      return "green";
    } else if (
      isSubmited &&
      selectedAlternative === letter &&
      selectedAlternative !== question.correct_alternative
    ) {
      return "red";
    } else if (selectedAlternative === letter) {
      return "oklch(0.673 0.182 276.935)";
    }
  };

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
    <Container>
      Questão: {currentQuestionIndex + 1}/{questions.length}
      Pontuação: {score}
      {question?.files?.map((file) => (
        <Image
          key={file.id}
          src={file.link}
          alt="Question"
          width={500}
          height={500}
        />
      ))}
      <p>{question?.context}</p>
      <p>{question?.introduction}</p>
      <Options>
        {question?.alternatives.map((alternative) => (
          <Button
            style={{
              backgroundColor: getbackgroundcolor(alternative.letter),
              width: "80%",
              marginBottom: "14px",
              padding: 2,
            }}
            error={error}
            key={alternative.letter}
            onClick={() => {
              !isSubmited && setSelectedAlternative(alternative.letter);
            }}
          >
            {alternative.image && (
              <Image
                src={alternative.image}
                alt="Question"
                width={90}
                height={10}
              />
            )}
            {alternative.text}
          </Button>
        ))}
      </Options>
      {error && <ErrorMessage>Selecione uma alternativa</ErrorMessage>}
      <Button
        onClick={handleSubmit}
        style={{ backgroundColor: "oklch(0.769 0.188 70.08)" }}
      >
        {isSubmited ? "Próxima Questão" : "Enviar"}
      </Button>
    </Container>
  );
}

import Image from "next/image";
import Button from "../button";
import { useState } from "react";

interface QuestionProps {
  question: QuestionAPI;
  onSubmit: () => void;
}

export default function Question({
  question,
  onSubmit,
  ...props
}: QuestionProps) {
  const [selectedAlternative, setSelectedAlternative] = useState<string | null>(
    null
  );
  const [isSubmited, setIsSubmited] = useState(false);
  const [error, setError] = useState(false);

  const getbackgroundcolor = (letter: string) => {
    if (isSubmited && question.correctAlternative === letter) {
      return "green";
    } else if (
      isSubmited &&
      selectedAlternative === letter &&
      selectedAlternative !== question.correctAlternative
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
      setIsSubmited(false);
      setSelectedAlternative(null);
      onSubmit();
      return;
    }
    setIsSubmited(true);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {question?.files.map((file) => (
        <Image key={file} src={file} alt="Question" width={500} height={500} />
      ))}

      <p>{question?.context}</p>
      <p>{question?.alternativesIntroduction}</p>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
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
            {alternative.text}
          </Button>
        ))}
      </div>
      {error && <p style={{ color: "red" }}>Selecione uma alternativa</p>}
      <Button
        onClick={handleSubmit}
        style={{ backgroundColor: "oklch(0.769 0.188 70.08)" }}
      >
        {isSubmited ? "Próxima Questão" : "Enviar"}
      </Button>
    </div>
  );
}

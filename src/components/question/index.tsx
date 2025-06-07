import Image from "next/image";
import Button from "../button";
import { useState } from "react";
import { Container, ErrorMessage, Options } from './styles';

interface QuestionProps {
  question: QuestionAPI;
  onSubmit: () => void;
}
''
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
    <Container>
      {question?.files.map((file) => (
        <Image key={file} src={file} alt="Question" width={500} height={500} />
      ))}
      <div className="text-black text-base font-sans px-30 py-10 font-bold mb-6 leading-relaxed bg-white/60">
        <p>{question?.context}</p>
        <p className="mt-4">{question?.alternativesIntroduction}</p>
      </div>
      <div className="flex flex-col space-y-4">
        {question?.alternatives.map((alternative) => (
          <Button
            style={{
              backgroundColor: getbackgroundcolor(alternative.letter),
              width: "100%",
              marginBottom: "14px",
              padding: 2,
              textAlign: "left",
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

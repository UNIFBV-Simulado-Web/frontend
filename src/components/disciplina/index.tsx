import Link from "next/link";
import {
  Disciplina,
  DisciplinaImage,
  Materia,
  Descricao,
  Button,
} from "./styles";

interface DisciplinasProps {
  materia: string;
  descricao: string;
  image: string;
  onClick?: () => void;
}

const Displina: React.FC<DisciplinasProps> = ({
  descricao,
  image,
  materia,
  onClick,
}) => {
  return (
    <Disciplina>
      <DisciplinaImage src={image} alt={materia} />
      <Materia>{materia}</Materia>
      <Descricao>{descricao}</Descricao>
      <Link href={`/quiz?materia=${materia}`}>
        <Button onClick={onClick}>Iniciar</Button>
      </Link>
    </Disciplina>
  );
};

export default Displina;

import {
  CardButton,
  CardDescription,
  CardIconWrapper,
  CardTitle,
} from "@/app/styles";
import { SubjectCardStyled } from "./styles";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface SubjectCardComponentProps {
  subject: Subject;
}
export interface Subject {
  title: string;
  description: string;
  bgColor: string;
  icon: React.ReactNode;
  quantity: number;
  random: boolean;
  discipline: string | null;
}
const SubjectCard: React.FC<SubjectCardComponentProps> = ({ subject }) => {
  const getBaseColor = (tailwindClass: string): string => {
    const colorMap: Record<string, string> = {
      "bg-pink-600": "#DB2777",
      "bg-yellow-500": "#EAB308",
      "bg-cyan-500": "#06B6D4",
      "bg-purple-600": "#9333EA",
      "bg-emerald-600": "#059669",
      "bg-sky-700": "#0369A1",
    };
    const baseClass = tailwindClass.split(" ")[0];
    return colorMap[baseClass] || "#374151";
  };
  const getParams = () => {
    let params = "";
    if (subject.quantity) {
      params = params + "quantity=" + subject.quantity;
    }
    if (subject.discipline) {
      params = params + "&discipline=" + subject.discipline;
    }
    if (subject.random) {
      params = params + "&random=" + subject.random;
    }
    return params;
  };

  return (
    <SubjectCardStyled $bgColor={getBaseColor(subject.bgColor)}>
      <CardIconWrapper>{subject.icon}</CardIconWrapper>
      <div>
        <CardTitle>{subject.title}</CardTitle>
        <CardDescription>{subject.description}</CardDescription>
      </div>
      {`/quiz?${getParams()}`}
      <Link href={`/quiz?${getParams()}`}>
        <CardButton>
          Iniciar <ChevronRight />
        </CardButton>
      </Link>
    </SubjectCardStyled>
  );
};
export default SubjectCard;

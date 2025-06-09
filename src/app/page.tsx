"use client";

import Image from "next/image";
import {
  CardButton,
  CardDescription,
  CardIconWrapper,
  CardTitle,
  FooterContent,
  FooterStyled,
  GlobalStyle,
  HeaderContent,
  HeroContainer,
  HeroGoodLuck,
  HeroImageContainer,
  HeroSectionStyled,
  HeroSubtitle,
  HeroTextContainer,
  HeroTitle,
  Logo,
  Nav,
  PageContainer,
  SignUpButton,
  StyledHeader,
  SubjectsContainer,
  SubjectsGrid,
  SubjectsSection,
  SubjectsTitle,
} from "./styles";

import {
  ChevronRight,
  BookOpen,
  Brain,
  FlaskConical,
  Users,
  FileText,
  CalendarDays,
} from "lucide-react";
import SubjectCard, { Subject } from "@/components/subjectCard";

const subjectsData: Subject[] = [
  {
    title: "Matemática",
    description: "45 questões de Matemática",
    bgColor: "bg-pink-600",
    icon: <Brain size={32} color="white" />,
    quantity: 45,
    random: true,
    discipline: "matematica",
  },
  {
    title: "Linguagem",
    description:
      "45 Questões de Língua Portuguesa, Inglês/Espanhol, Literatura, Artes e Ed. Física",
    bgColor: "bg-yellow-500",
    icon: <BookOpen size={32} color="white" />,
    quantity: 45,
    random: true,
    discipline: "linguagens",
  },
  {
    title: "Ciências da Natureza",
    description: "45 questões de Biologia, Física e Química",
    bgColor: "bg-cyan-500",
    icon: <FlaskConical size={32} color="white" />,
    quantity: 45,
    random: true,
    discipline: "ciencias-natureza",
  },
  {
    title: "Ciências Humanas",
    description: "45 questões de História, Geografia, Filosofia e Sociologia",
    bgColor: "bg-purple-600",
    icon: <Users size={32} color="white" />,

    quantity: 45,
    random: true,
    discipline: "ciencias-humanas",
  },
  {
    title: "1º Dia do Enem",
    description: "90 questões de Linguagens e Ciências Humanas",
    bgColor: "bg-emerald-600",
    icon: <FileText size={32} color="white" />,
    quantity: 90,
    random: true,
    discipline: null,
  },
  {
    title: "2º Dia do Enem",
    description: "90 questões de Matemática e Ciências da Natureza",
    bgColor: "bg-sky-700",
    icon: <CalendarDays size={32} color="white" />,
    quantity: 90,
    random: true,
    discipline: null,
  },
];
export default function HomePage() {
  return (
    <>
      <GlobalStyle />

      <PageContainer>
        <StyledHeader>
          <HeaderContent>
            <Logo>
              Quiz <span className="text-yellow-400">Aprende+</span>
            </Logo>
            <Nav>
              <a href="#">Menu</a>
              <a href="#">Login</a>
              <SignUpButton href="#">Cadastre-se</SignUpButton>
            </Nav>
          </HeaderContent>
        </StyledHeader>

        <main>
          <HeroSectionStyled>
            <HeroContainer>
              <HeroTextContainer>
                <HeroTitle>
                  Teste seu conhecimento! Faça um simulado com questões reais
                  dos Enem anteriores e veja como anda sua preparação para a
                  prova!
                </HeroTitle>
                <HeroSubtitle>
                  Comece agora e descubra onde você pode melhorar!
                </HeroSubtitle>
                <HeroGoodLuck>Boa sorte!!</HeroGoodLuck>
              </HeroTextContainer>
              <HeroImageContainer>
                <Image
                  src={"/Studying-pana_4.png"}
                  alt="Estudante com livros"
                  height={1800}
                  width={1800}
                />
              </HeroImageContainer>
            </HeroContainer>
          </HeroSectionStyled>

          <SubjectsSection>
            <SubjectsContainer>
              <SubjectsTitle>Escolha uma matéria para começar.</SubjectsTitle>
              <SubjectsGrid>
                {subjectsData.map((subject) => (
                  <SubjectCard key={subject.title} subject={subject} />
                ))}
              </SubjectsGrid>
            </SubjectsContainer>
          </SubjectsSection>
        </main>

        <FooterStyled>
          <FooterContent>
            © {new Date().getFullYear()} Quiz Aprende+ | Projeto académico
            extensivo | Wyden-UniFBV
          </FooterContent>
        </FooterStyled>
      </PageContainer>
    </>
  );
}

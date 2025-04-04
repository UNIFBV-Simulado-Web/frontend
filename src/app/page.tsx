"use client";

import Button from "@/components/button";
import Image from "next/image";
import Link from "next/link";
import fs from "fs";
import path from "path";
import {
  CadastroLink,
  Footer,
  FooterNav,
  FooterTitle,
  Header,
  Main,
  Navbar,
  NavLink,
  SocialMediaIcon,
  Texto,
  Title,
} from "./styles";
import Disciplina from "@/components/disciplina";
import { Disciplinas } from "@/components/disciplina/styles";

export default function Home() {
  const disciplinas = [
    {
      materia: "Ciências da Natureza",
      descricao: "45 questões de Biologia, Física e Química",
      imagem:
        "https://vestibular.brasilescola.uol.com.br/assets/enem/images/simulado/ico_40_40_ciencias_natureza.png",
    },
    {
      materia: "Linguagem",
      descricao:
        "45 Questões de Língua Portuguesa, Literatura, Inglês ou Espanhol, Artes e Educação Física",
      imagem:
        "https://vestibular.brasilescola.uol.com.br/assets/enem/images/simulado/ico_40_40_linguagens_codigos.png",
    },
    {
      materia: "1º Dia do Enem",
      descricao: "90 Questões de Linguagens e Códigos e Ciências Humanas.",
      imagem:
        "https://vestibular.brasilescola.uol.com.br/assets/enem/images/simulado/ico_40_40_1_dia_enem.png",
    },
    {
      materia: "Matemática",
      descricao: "45 questões de Matemática",
      imagem:
        "https://vestibular.brasilescola.uol.com.br/assets/enem/images/simulado/ico_40_40_matematica.png",
    },
    {
      materia: "Ciências Humanas",
      descricao: "45 Questões de História, Geografia, Filosofia e Sociologia",
      imagem:
        "https://vestibular.brasilescola.uol.com.br/assets/enem/images/simulado/ico_40_40_ciencias_humanas.png",
    },
    {
      materia: "2º Dia do Enem",
      descricao: "90 Questões de Matemática e Ciências da Natureza.",
      imagem:
        "https://vestibular.brasilescola.uol.com.br/assets/enem/images/simulado/ico_40_40_2_dia_enem.png",
    },
  ];

  return (
    <div>
      <Header>
        <Title>Quiz aprova+</Title>
        <Navbar>
          <NavLink href="#">Menu</NavLink>
          <NavLink href="#">Recursos</NavLink>
          <NavLink href="#">Ajuda</NavLink>
          <NavLink href="#">Faça seu login</NavLink>
          <CadastroLink href="#">Cadastre-se</CadastroLink>
        </Navbar>
        <Texto>
          Teste o seu conhecimento, <br />
          faça um simulado com questões dos <br />
          enem anteriores. <br />
          Selecione a quantidade de perguntas <br />
          em cada disciplina e clique em Gerar Simulado. <br />
          Ao final, compartilhe o resultado com os amigos <br />
          e os desafie a acertar mais questões. <br />
          <br />
          Boa sorte!
        </Texto>
      </Header>

      <Main>
        <Disciplinas>
          {disciplinas.map((disciplina) => (
            <Disciplina
              descricao={disciplina.descricao}
              image={disciplina.imagem}
              materia={disciplina.materia}
              key={disciplina.materia}
            />
          ))}
        </Disciplinas>
      </Main>

      <Footer>
        <FooterNav>
          <NavLink href="#">Brasil Escola</NavLink>
          <NavLink href="#">Meu artigo</NavLink>
          <NavLink href="#">Monografia</NavLink>
          <NavLink href="#">Educador</NavLink>
          <NavLink href="#">Vídeo</NavLink>
          <NavLink href="#">Tire dúvidas</NavLink>
        </FooterNav>
        <FooterTitle>Siga nossas redes sociais</FooterTitle>
        <SocialMediaIcon src="img/Whatsapp.png" alt="Whatsapp" />
        <SocialMediaIcon src="img/Instagram.png" alt="Instagram" />
        <SocialMediaIcon src="img/X.png" alt="X" />
        <SocialMediaIcon src="img/YouTube.png" alt="YouTube" />
      </Footer>
    </div>
  );
}

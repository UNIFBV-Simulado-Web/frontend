import styled from "styled-components";

export const Disciplinas = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 15px;
  border-radius: 10px;
`;

export const Disciplina = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 46%;
  margin: 4px;
  padding: 6px;
  border-radius: 10px;
  box-shadow: 0px 0px 5px;

  @media (max-width: 800px) {
    width: 90%;
  }
`;

export const DisciplinaImage = styled.img`
  width: 40px;
  height: 40px;
`;

export const Materia = styled.span`
  font-size: 15px;
  font-weight: bold;
`;

export const Descricao = styled.p`
  margin: 10px 0;
  font-size: 14px;
  color: #555;
`;

export const Button = styled.button`
  background-color: aqua;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: aquamarine;
  }
`;

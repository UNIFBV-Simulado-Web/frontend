import styled from "styled-components";

export const SubjectsSection = styled.section`
  padding-top: 4rem;
  padding-bottom: 4rem;
  flex-grow: 1;
`;

export const SubjectsContainer = styled.div`
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
  @media (min-width: 640px) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
  @media (min-width: 1024px) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;

export const SubjectsTitle = styled.h2`
  font-size: 2.25rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 3rem;
`;

export const SubjectsGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

interface SubjectCardProps {
  $bgColor?: string;
}

export const SubjectCardStyled = styled.div<SubjectCardProps>`
  background-color: ${(props) =>
    props.$bgColor
      ? props.$bgColor.split(" ")[0].replace("bg-", "#")
      : "#374151"};
  &:hover {
    filter: brightness(1.1);
  }
  padding: 1.5rem;
  border-radius: 0.5rem;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.2s, filter 0.2s;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
`;

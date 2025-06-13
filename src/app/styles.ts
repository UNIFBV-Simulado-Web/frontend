import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    background-color: #1a202c; 
    color: white;
    line-height: 1.6;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }
`;
export const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const StyledHeader = styled.header`
  padding: 1.5rem 1rem;
  @media (min-width: 640px) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
  @media (min-width: 1024px) {
    padding-left: 2rem;
    padding-right: 2rem;
  }
`;

export const HeaderContent = styled.div`
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Logo = styled.div`
  font-size: 1.875rem;
  font-weight: bold;
  span {
    color: #facc15;
  }
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 1rem;
  @media (min-width: 640px) {
    gap: 1.5rem;
  }
  a {
    font-size: 0.875rem;
    @media (min-width: 640px) {
      font-size: 1rem;
    }
    &:hover {
      color: #facc15;
    }
    transition: color 0.2s;
  }
`;

export const SignUpButton = styled.button`
  background-color: #facc15;
  color: #0f172a;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 600;
  &:hover {
    background-color: #eab308;
    color: #0f172a !important;
  }
  transition: background-color 0.2s;
`;

export const HeroSectionStyled = styled.section`
  padding-top: 4rem;
  @media (min-width: 640px) {
    padding-top: 6rem;
  }
  text-align: center;
`;

export const HeroContainer = styled.div`
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

  display: grid;
  gap: 2rem;
  align-items: center;
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const HeroTextContainer = styled.div`
  @media (min-width: 768px) {
    text-align: left;
  }
`;

export const HeroTitle = styled.h1`
  font-size: 1.875rem;
  @media (min-width: 640px) {
    font-size: 2.25rem;
  }
  @media (min-width: 1024px) {
    font-size: 3rem;
  }
  font-weight: bold;
  margin-bottom: 1.5rem;
  line-height: 1.2;
`;

export const HeroSubtitle = styled.p`
  font-size: 1.125rem;
  @media (min-width: 640px) {
    font-size: 1.25rem;
  }
  color: #cbd5e1;
  margin-bottom: 2rem;
`;

export const HeroGoodLuck = styled.p`
  font-size: 1.875rem;
  font-weight: bold;
  color: #facc15;
  margin-bottom: 2rem;
`;

export const HeroImageContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  img,
  div[role="img"] {
    border-radius: 0.5rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
`;

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

export const CardIconWrapper = styled.div`
  margin-bottom: 1rem;
`;

export const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

export const CardDescription = styled.p`
  font-size: 0.875rem;
  color: #e2e8f0;
  margin-bottom: 1.5rem;
  flex-grow: 1;
`;

export const CardButton = styled.button`
  display: inline-flex;
  align-items: center;
  font-weight: 600;
  color: white;
  margin-top: auto;
  align-self: flex-start;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }

  svg {
    margin-left: 0.5rem;
    width: 1.25rem;
    height: 1.25rem;
  }
`;

export const FooterStyled = styled.footer`
  background-color: #0f172a;
  color: #94a3b8;
  padding: 2rem 1rem;
  text-align: center;
  font-size: 0.875rem;
`;

export const FooterContent = styled.div`
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
`;

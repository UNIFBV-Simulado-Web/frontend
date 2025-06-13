import styled from "styled-components";

export const PageSubtitle = styled.p`
  font-size: 1.125rem; // text-lg
  color: #9ca3af; // text-gray-400
  margin-top: 0.5rem;
`;

export const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
`;

export const Card = styled.div`
  background-color: #1f2937; // bg-gray-800
  border-radius: 0.75rem; // rounded-xl
  padding: 1.5rem;
  border: 1px solid #374151; // border-gray-700
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -2px rgba(0, 0, 0, 0.1);
`;

export const CardTitle = styled.h2`
  font-size: 1.25rem; // text-xl
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: white;
  text-align: center;
`;

export const CenteredMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  font-size: 1.25rem;
  color: #6b7280; // text-gray-500
`;
export const DashboardContainer = styled.div`
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

export const Header = styled.header`
  margin-bottom: 2rem;
`;

export const PageTitle = styled.h1`
  font-size: 2.25rem; // text-4xl
  font-weight: bold;
  color: white;
`;

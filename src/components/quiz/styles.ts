import styled from "styled-components";

export const FinishedContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 3rem;
  background-color: #1f2937;
  border-radius: 0.75rem;
  margin: 2rem auto;
  max-width: 600px;
  border: 1px solid #374151;
`;

export const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  color: #facc15;
  margin-bottom: 1rem;
`;

export const Subtitle = styled.p`
  font-size: 1.125rem;
  color: #d1d5db;
  margin-bottom: 2rem;
`;

export const ActionButton = styled.button`
  padding: 0.75rem 2rem;
  border-radius: 0.375rem;
  border: none;
  background-color: #facc15;
  color: #1a202c;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #eab308;
  }
`;

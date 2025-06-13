import styled from "styled-components";
import { Field } from "formik";

export const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
`;

export const FormWrapper = styled.div`
  background-color: #2d3748;
  padding: 2.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  width: 100%;
  max-width: 450px;
`;

export const FormTitle = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 2rem;
  color: #facc15;
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const StyledField = styled(Field)`
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 0.375rem;
  border: 1px solid #4a5568;
  background-color: #1a202c;
  color: white;
  font-size: 1rem;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #facc15;
  }
`;

export const StyledLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #a0aec0;
`;

export const ErrorText = styled.div`
  color: #f56565;
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 0.75rem;
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

  &:disabled {
    background-color: #4a5568;
    cursor: not-allowed;
  }
`;

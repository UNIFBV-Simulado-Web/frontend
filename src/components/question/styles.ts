import styled from "styled-components";
import Button from '../button/index';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Options = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10%;
`;

export const ErrorMessage = styled.p`
  color: red;
`;
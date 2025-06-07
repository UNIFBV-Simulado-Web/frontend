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

export const QuestionT = styled.div`
background-color: rgb(255 255 255 / 60%);
color: black;
font-weight: bold;
padding: 20px 25px;
margin-top: 50px;
width: 100%;
box-sizing: border-box;
`;
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0%{
    transform:rotate(0deg);
  }
  100%{
  transform:rotate(360deg);
  }
`;

export const Loader = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50px, -50px);
  border: 2px solid rgba(0, 0, 0, 0.1);
  border-top: 2px solid gray;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} 0.5s linear infinite;
`;

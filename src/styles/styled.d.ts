import { createGlobalStyle } from "styled-components";

interface MovieProps {
  bgColor: string;
}

export const GlobalStyle = createGlobalStyle<MovieProps>`
  li {
    background-color: black;
 }
`;

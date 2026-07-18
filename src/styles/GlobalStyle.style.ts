// styles/GlobalStyle.style.ts
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  #root {
    min-height: 100%;
  }

  * {
    box-sizing: border-box;
    font-family: ${({ theme }) => theme.fonts.Poppins};
  }

  html, body {
    height: 100%;
    background-color: ${({ theme }) => theme.colors.background.white};
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  img {
    max-width: 100%;
    display: block;
  }

  button, input, textarea, select {
    font: inherit;
    background: none;
  }

  button {
    cursor: pointer;

    &:disabled {
      cursor: not-allowed;
      opacity: 0.75;
    }
  }

  input {
    &:disabled {
      cursor: not-allowed;
      opacity: 0.75;
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.background.shadow};
    }
  }
`;

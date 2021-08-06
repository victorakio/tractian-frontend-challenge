import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    --blue-50: #2563eb;
    --blue-500: #1e3a8a;

    --green-150: #22c55e;
  }

  html {
    box-sizing: border-box;
    font-size: 62.5%;
  }

  *,
  *:before,
  *:after {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }

  body {
    font-size: 1.6rem;
    background-image: linear-gradient(to left, var(--blue-50), var(--blue-500));
  }
`;

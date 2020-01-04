import { createGlobalStyle } from "styled-components/macro";
import { normalize } from "styled-normalize";

const GlobalStyles = createGlobalStyle`
  ${normalize}

  :root {
    font-size: 62.5%;
  }

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  
`;

export default GlobalStyles;

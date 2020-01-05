import { createGlobalStyle } from "styled-components/macro";
import { normalize } from "styled-normalize";

const GlobalStyles = createGlobalStyle`
  ${normalize}

  :root {
    font-size: 62.5%;
    height: 100%;
  }

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  body {
    height: 100%;
    background: green;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    position: fixed;
    width: 100%;
  }

  #root {
    height: 100%;
    overflow-y: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }

`;

export default GlobalStyles;

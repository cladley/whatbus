import React from "react";
import styled, { ThemeProvider } from "styled-components";
import GlobalStyles from "./style/GlobalStyles";
import theme from "./style/theme";

const Message = styled.h2`
  color: ${props => props.theme.color.primary};
`;

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <Message>Hello</Message>
        </header>
      </ThemeProvider>
    </div>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components/macro";

import HomeView from "./views/HomeView";
import ExplorerView from "./views/ExplorerView";
import GlobalStyles from "./style/GlobalStyles";
import theme from "./style/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <Switch>
          <Route exact path="/" component={HomeView} />
          <Route path="/explorer" component={ExplorerView} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;

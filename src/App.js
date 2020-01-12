import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components/macro";
import { Provider as StateProvider } from "react-redux";

import store from "./store";
import HomeView from "./views/HomeView";
import ExplorerView from "./views/ExplorerView";
import GlobalStyles from "./style/GlobalStyles";
import theme from "./style/theme";

function App() {
  return (
    <StateProvider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Router>
          <Switch>
            <Route exact path="/" component={HomeView} />
            <Route path="/explorer" component={ExplorerView} />
          </Switch>
        </Router>
      </ThemeProvider>
    </StateProvider>
  );
}

export default App;

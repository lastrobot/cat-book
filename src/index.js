import React from "react";
import ReactDOM from "react-dom";
import GlobalStyles from "./components/global-styles/global-styles";
import App from "./App";
import configureStore from "./redux/configure-store";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <Router>
        <App />
      </Router>
    </ReduxProvider>
    <GlobalStyles />
  </React.StrictMode>,
  document.getElementById("root")
);

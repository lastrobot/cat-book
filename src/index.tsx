import React from "react";
import ReactDOM from "react-dom";
import GlobalStyles from "./components/global-styles/global-styles";
import App from "./App";
import store from "./redux/configure-store-dev";
import { Provider  } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
    <GlobalStyles />
  </React.StrictMode>,

  document.getElementById("root")
);

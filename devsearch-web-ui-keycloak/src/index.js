import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import store from "./store";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./services/identity/keycloak";
//import UserService from "./services/identity/keycloakUserService";
let initOptions = {
  onLoad: "check-sso",
  silentCheckSsoRedirectUri: window.location.origin + "/silent-check-sso.html",
  pkceMethod: "S256",
};

ReactDOM.render(
  <ReactKeycloakProvider authClient={keycloak} initOptions={initOptions}>
    <Provider store={store}>
      <App />
    </Provider>
  </ReactKeycloakProvider>,
  document.getElementById("root")
);

//UserService.initService(renderApp);

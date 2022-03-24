import Keycloak from "keycloak-js";
import keycloakConfig from "./keycloakConfig";

var kc = new Keycloak({
  url: keycloakConfig.url,
  realm: keycloakConfig.realm,
  clientId: keycloakConfig.clientId,
});

const initService = (onAuthenticatedCallback) => {
  kc.init({
    onLoad: keycloakConfig.checkSso,
    silentCheckSsoRedirectUri: keycloakConfig.silentCheckSsoRedirectUri,
    pkceMethod: keycloakConfig.pkceMethod,
  })
    .then((authenticated) => {
      if (!authenticated) {
        console.log("user is not authenticated..!");
      } else {
        console.log("user is authenticated..!");
      }

      // renders the app
      onAuthenticatedCallback();
    })
    .catch(console.error);
};

const doLogin = kc.login;

const doLogout = kc.logout;

const getToken = () => kc.token;

const isLoggedIn = () => kc.authenticated;

const updateToken = (successCallback) =>
  kc.updateToken(6).then(successCallback).catch(doLogin);

const getUsername = () => kc.tokenParsed?.preferred_username;

const hasRole = (roles) => roles.some((role) => kc.hasRealmRole(role));

const UserService = {
  initService,
  doLogin,
  doLogout,
  isLoggedIn,
  getToken,
  updateToken,
  getUsername,
  hasRole,
};

export default UserService;

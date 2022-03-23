import Keycloak from "keycloak-js";

var kc = new Keycloak({
  url: "http://localhost:8080",
  realm: "devsearch",
  clientId: "devsearch-cli",
});

const initService = (onAuthenticatedCallback) => {
  kc.init({
    onLoad: "check-sso",
    silentCheckSsoRedirectUri:
      window.location.origin + "/silent-check-sso.html",
    pkceMethod: "S256",
  })
    .then((authenticated) => {
      if (!authenticated) {
        console.log("user is not authenticated..!");
      } else {
        console.log("user is authenticated..!");
      }

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

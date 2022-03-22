import Keycloak from "keycloak-js";

var kc = new Keycloak({
  url: "http://localhost:8080",
  realm: "devsearch",
  clientId: "devsearch-cli",
});

const initService = (onAuthenticatedCallback) => {
  const unprotectedInitOptions = {
    pkceMethod: "S256",
  };

  const protectedInitOptions = {
    onLoad: "login-required",
    pkceMethod: "S256",
  };

  let initOptions = {};
  console.log(window.location);

  kc.init({
    //onLoad: "check-sso",
    //onLoad: "login-required",
    //silentCheckSsoRedirectUri:
    //window.location.origin + "/silent-check-sso.html",
    //silentCheckSsoRedirectUri: "http://localhost:3000",
    pkceMethod: "S256",
  })
    .then((authenticated) => {
      if (!authenticated) {
        console.log("user is not authenticated..!");
      } else {
        console.log("user is authenticated..!");
      }

      console.log("HERE");
      //console.log(onAuthenticatedCallback);
      console.log(kc);
      onAuthenticatedCallback();
      kc.updateToken();
    })
    .catch(console.error);
};

const doLogin = kc.login;

const doLogout = kc.logout;

const getToken = () => kc.token;

const isLoggedIn = () => kc.authenticated;

const updateToken = (successCallback) =>
  kc.updateToken(20).then(successCallback).catch(doLogin);

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

const keycloakConfig = {
  url: "http://localhost:8080",
  realm: "devsearch",
  clientId: "devsearch-cli",
  checkSso: "check-sso",
  loginRequired: "login-required",
  silentCheckSsoRedirectUri: window.location.origin + "/silent-check-sso.html",
  pkceMethod: "S256",
};

export default keycloakConfig;

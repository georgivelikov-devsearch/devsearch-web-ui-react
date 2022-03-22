import Keycloak from "keycloak-js";
const keycloakConfig = {
  url: "http://localhost:8080",
  realm: "devsearch",
  clientId: "devsearch-cli",
};

const keycloak = new Keycloak(keycloakConfig);

export default keycloak;

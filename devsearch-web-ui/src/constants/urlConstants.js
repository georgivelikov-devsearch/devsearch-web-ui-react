const GW_HTTP_PROT = "http";
const GW_HOST = "localhost";
const GW_PORT_HTTP_PORT = "8082";
const service = "users-ws";
let URL = `${GW_HTTP_PROT}://${GW_HOST}:${GW_PORT_HTTP_PORT}`;
let USERS_URL = `${GW_HTTP_PROT}://${GW_HOST}:${GW_PORT_HTTP_PORT}`;
let PROFILES_URL = `${GW_HTTP_PROT}://${GW_HOST}:${GW_PORT_HTTP_PORT}`;
let PROFILES_URL_TEST = "http://localhost:8080";

// User login and registration
export const LOGIN_URL = `${USERS_URL}/users/login`;
export const REGISTER_URL = `${USERS_URL}/users`;

// Profile
export const PRIVATE_PROFILE_URL = (userId) => {
  return `${PROFILES_URL_TEST}/profiles/user/${userId}`;
};
export const EDIT_PRIVATE_PROFILE_URL = `${PROFILES_URL_TEST}/profiles`;
export const PUBLIC_PROFILE_URL = (profilePublicId) => {
  return `${PROFILES_URL_TEST}/profiles/public/${profilePublicId}`;
};
export const PUBLIC_PROFILE_LIST_URL = `${PROFILES_URL_TEST}/profiles/public`;

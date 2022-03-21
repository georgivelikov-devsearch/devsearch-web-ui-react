const GW_HTTP_PROT = "http";
const GW_HOST = "localhost";
const GW_PORT_HTTP_PORT = "8082";
let URL = `${GW_HTTP_PROT}://${GW_HOST}:${GW_PORT_HTTP_PORT}`;

// User login and registration
export const LOGIN_URL = `${URL}/users/login`;
export const REGISTER_URL = `${URL}/users`;

// Profile
export const PRIVATE_PROFILE_URL = (userId) => {
  return `${URL}/profiles/user/${userId}`;
};
export const EDIT_PRIVATE_PROFILE_URL = `${URL}/profiles`;
export const PUBLIC_PROFILE_URL = (profilePublicId) => {
  return `${URL}/profiles/public/${profilePublicId}`;
};
export const PUBLIC_PROFILE_LIST_URL = `${URL}/profiles/public`;

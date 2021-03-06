const GW_HTTP_PROT = "http";
const GW_HOST = "localhost";
const GW_PORT_HTTP_PORT = "8082";
let URL = `${GW_HTTP_PROT}://${GW_HOST}:${GW_PORT_HTTP_PORT}`;

// Profile
export const PROFILE_URL = (username) => {
  return `${URL}/profiles/user/${username}`;
};

export const PUBLIC_PROFILE_URL = (username) => {
  return `${URL}/profiles/public/user/${username}`;
};

export const PROFILE_LIST_URL = `${URL}/profiles/public/all`;

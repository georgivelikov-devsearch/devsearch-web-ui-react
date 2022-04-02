const GW_HTTP_PROT = "http";
const GW_HOST = "localhost";
const GW_PORT_HTTP_PORT = "8082";
let URL = `${GW_HTTP_PROT}://${GW_HOST}:${GW_PORT_HTTP_PORT}`;

// Developer
export const DEVELOPER_URL = (username) => {
  return `${URL}/developers/user/${username}`;
};

export const PUBLIC_DEVELOPER_URL = (username) => {
  return `${URL}/developers/public/user/${username}`;
};

export const DEVELOPER_LIST_URL = `${URL}/developers/public/all`;

export const SKILL_URL = `${URL}/skills`;

export const DELETE_SKILL_URL = (username, skillDescriptionId) => {
  return `${URL}/skills/${username}/${skillDescriptionId}`;
};

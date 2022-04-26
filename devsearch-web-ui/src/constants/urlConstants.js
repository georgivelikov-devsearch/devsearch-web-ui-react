const GW_HTTP_PROT = "http";
const GW_HOST = "localhost";
const GW_PORT_HTTP_PORT = "8082";
let URL = `${GW_HTTP_PROT}://${GW_HOST}:${GW_PORT_HTTP_PORT}`;

// HEADERS
export const HEADERS_CONFIG = {
  "content-type": "application/json",
};

export const AUTH_HEADERS_CONFIG = (token) => {
  return {
    ...HEADERS_CONFIG,
    Authorization: `Bearer ${token}`,
  };
};

// Developer URLs
export const DEVELOPER_URL = (username) => {
  return `${URL}/developers/user/${username}`;
};

export const PUBLIC_DEVELOPER_URL = (username) => {
  return `${URL}/developers/public/user/${username}`;
};

export const DEVELOPER_LIST_URL = `${URL}/developers/public/all`;

// Skill URLs
export const SKILL_URL = `${URL}/skills`;

export const DELETE_SKILL_URL = (username, skillDescriptionId) => {
  return `${URL}/skills/${username}/${skillDescriptionId}`;
};

export const ORDER_SKILLS_URL = (username) => {
  return `${URL}/skills/${username}/order`;
};

// Project URLs
export const PROJECT_URL = `${URL}/projects`;
export const PROJECTS_URL = `${URL}/projects/public/all`;
export const DELETE_PROJECT_URL = (projectId) => {
  return `${PROJECT_URL}/${projectId}`;
};

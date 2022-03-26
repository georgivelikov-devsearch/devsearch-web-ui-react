import axios from "axios";
import UserService from "../../identity/keycloak/keycloakUserService";

const _axios = axios.create();

const configure = () => {
  _axios.interceptors.request.use((config) => {
    if (UserService.isLoggedIn()) {
      const cb = () => {
        config.headers.Authorization = `Bearer ${UserService.getToken()}`;
        return Promise.resolve(config);
      };
      return UserService.updateToken(cb);
    }
  });
};

const doGet = async (url, config) => {
  if (!config) {
    // default config
    config = {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${UserService.getToken()}`,
      },
    };

    return axios.get(url, config);
  }
};

const doPost = (url, body, config) => {};

const doPut = (url, body, config) => {};

const doDelete = (url, body, config) => {};

const HttpService = {
  doGet,
  doPost,
  doPut,
  doDelete,
  configure,
};

export default HttpService;

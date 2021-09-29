import API from "./api";

export default {
  login(userName, password) {
    return API.get(`/login?userName=${userName}&password=${password}`);
  },
};

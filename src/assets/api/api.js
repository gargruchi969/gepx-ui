import axios from "axios";

const API = axios.create({
  baseURL: "http://34.234.85.115:8080/services/gex",
  timeout: 5000,
});

const isHandlerEnabled = (config = {}) => {
  return !(
    config.hasOwnProperty.call("handlerEnabled") && !config.handlerEnabled
  );
};

const requestHandler = (request) => {
  if (isHandlerEnabled(request)) {
    // request.headers.common['Access-Control-Allow-Origin'] = '*'
    // request.headers.client_secret = String(process.env.VUE_APP_client_secret)
    // request.headers.fiu_id = String(process.env.VUE_APP_fiu_id)
    // request.headers.aa_api_key = String(process.env.VUE_APP_aa_api_key)
    // request.headers.client_id = String(process.env.VUE_APP_client_id)
    // request.headers.app_id = String(process.env.VUE_APP_app_id)
  }
  return request;
};

API.interceptors.request.use((request) => requestHandler(request));

export default API;

import axios from "axios";
import { appendErrorMessage } from "../../utils/strings";

export const defaultPaginationSize = 10;

const api = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/api/v2`,
});

// USE THIS FOR DEVELOPMENT: "http://localhost:8081/api/v2"

// Intercept request to server
api.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  } catch (err) {
    console.error(err);
  }
});

// Intercepts response from server
api.interceptors.response.use(
  function (response) {
    if (response.data.paging) {
      return Promise.resolve(response.data);
    }
    return Promise.resolve(response.data.data);
  },

  function (err) {
    if (err.response?.data?.error) {
      return Promise.reject({
        message: appendErrorMessage(err.response.data.error.errors),
        status: err.response.status,
      });
    } else {
      return Promise.reject({
        message:
          "Unknown error. Please contact support@sinarlog.com regarding this issue!",
        status: 503,
      });
    }
  }
);

export default api;

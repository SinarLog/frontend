import api from ".";

/**
 * sends a post request to the login api
 * @param {{username: string, password: string}} payload
 */
export const postLoginCredentials = async (payload) => {
  try {
    const data = await api.post("/credentials/login", payload);
    return data;
  } catch (err) {
    throw err;
  }
};

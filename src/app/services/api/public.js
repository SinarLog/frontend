import api from ".";

export const getRoles = async () => {
  try {
    const data = await api.get("/pub/roles");
    return data;
  } catch (err) {
    throw err;
  }
};

export const getJobs = async () => {
  try {
    const data = await api.get("/pub/jobs");
    return data;
  } catch (err) {
    throw err;
  }
};

export const getConfigurations = async () => {
  try {
    const data = await api.get("/pub/configs");
    return data;
  } catch (e) {
    throw e;
  }
};

export const forgotPassword = async (payload) => {
  try {
    const data = await api.post("/pub/forgot-password", payload);
    return data;
  } catch (e) {
    throw e;
  }
};

import api from ".";

export const getConfig = async () => {
  try {
    const res = await api.get(`/hr/config`);
    return res;
  } catch (e) {
    throw e;
  }
};

export const putConfig = async (config) => {
  try {
    const res = await api.put(`/hr/config`, config);
    return res;
  } catch (e) {
    throw e;
  }
};

export const getChangesLogs = async (query) => {
  try {
    const res = await api.get(`/hr/config/logs`, { params: query });
    return res;
  } catch (e) {
    throw e;
  }
};

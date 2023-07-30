import api from ".";

export const getMyProfile = async () => {
  try {
    const data = await api.get("/profile");
    return data;
  } catch (e) {
    throw e;
  }
};

export const getMyChangeLogs = async (query) => {
  try {
    const data = await api.get("/profile/logs", { params: query });
    return data;
  } catch (e) {
    throw e;
  }
};

export const updatePassword = async (payload) => {
  try {
    const data = await api.patch("/profile/update-password", payload);
    return data;
  } catch (e) {
    throw e;
  }
};

export const updateProfileData = async (payload) => {
  try {
    const data = await api.patch("/profile", payload);
    return data;
  } catch (e) {
    throw e;
  }
};

export const updateAvatar = async (payload) => {
  try {
    const data = await api.patch("/profile/update-avatar", payload);
    return data;
  } catch (e) {
    throw e;
  }
};

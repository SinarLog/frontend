import api from ".";

export const getFriends = async () => {
  try {
    const result = await api.get("/chat/friends");
    return result;
  } catch (e) {
    throw e;
  }
};

export const openChatRoom = async (payload) => {
  try {
    const result = await api.put("/chat/room", payload);
    return result;
  } catch (e) {
    throw e;
  }
};

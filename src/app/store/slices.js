/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { loadCurrentUser, loadTheme } from "./helpers";
import * as T from "./types";

/**
 * userSlice is the redux slice for storing the current
 * user accessing the web app
 */
const userSlice = createSlice({
  name: "user",
  initialState: loadCurrentUser(),
  reducers: {
    /**
     * @param {T.User | undefined} state
     * @param {{ payload: T.User }} action
     */
    setCurrentUser: (state, action) => {
      state = {
        id: action.payload.id,
        fullName: action.payload.fullName,
        email: action.payload.email,
        avatar: action.payload.avatar,
        role: {
          id: action.payload.id,
          name: action.payload.role.name,
          code: action.payload.role.code,
        },
        job: {
          id: action.payload.job.id,
          name: action.payload.job.name,
        },
      };
      return state;
    },
  },
});

export const { setCurrentUser } = userSlice.actions;
export { userSlice };

/**
 * themeSlice is used to set themes.
 */
const themeSlice = createSlice({
  name: "theme",
  initialState: loadTheme() ?? "light",
  reducers: {
    /**
     * @param {string} state
     * @param {{ payload: string }} action
     * @returns
     */
    setTheme: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export { themeSlice };

const authSlice = createSlice({
  name: "auth",
  initialState: {
    unauthorized: false,
  },
  reducers: {
    setUnauthorized: (state, _action) => {
      state.unauthorized = true;
      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setCurrentUser, (state, _action) => {
      state.unauthorized = false;
      return state;
    });
  },
});

export const { setUnauthorized } = authSlice.actions;
export { authSlice };

/**
 * Friends list for chat feature
 */
const friendsSlice = createSlice({
  name: "friends",
  initialState: [],
  reducers: {
    setFriends: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setFriends } = friendsSlice.actions;
export { friendsSlice };

/**
 * @typedef {Object} Chat
 * @property {string} id
 * @property {string} roomId
 * @property {string} sender
 * @property {string} message
 * @property {boolean} read
 * @property {string} sentAt
 * @property {number} timestamp
 */

const chatsSlice = createSlice({
  name: "chats",
  initialState: [],
  reducers: {
    /**
     * @param {Array<{roomId: string, chats: unknown}>} state
     * @param {{type: string, payload: {roomId: string, chats: Chat}}} action
     */
    setRoomChat: (state, action) => {
      const room = state.find((item) => item.roomId === action.payload.roomId);

      if (room) {
        return state;
      }

      const data = {
        roomId: action.payload.roomId,
        chats: action.payload.chats,
      };

      state.push(data);
    },

    /**
     * @param {Array<{roomId: string, chats: unknown}>} state
     * @param {{type: string, payload: Chat}} action
     */
    appendChat: (state, action) => {
      const room = state.find((item) => item.roomId === action.payload.roomId);

      room.chats.push(action.payload.chat);
    },
  },
});

export const { setRoomChat, appendChat } = chatsSlice.actions;
export { chatsSlice };

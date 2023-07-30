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

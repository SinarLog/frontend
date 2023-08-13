import { configureStore } from "@reduxjs/toolkit";
import {
  userSlice,
  themeSlice,
  authSlice,
  friendsSlice,
  chatsSlice,
} from "./slices";
import { saveCurrentUser, saveTheme } from "./helpers";

/**
 * store is the redux store for this web app
 */
const store = configureStore({
  reducer: {
    currentUser: userSlice.reducer,
    theme: themeSlice.reducer,
    auth: authSlice.reducer,
    friends: friendsSlice.reducer,
    chats: chatsSlice.reducer,
  },
});

store.subscribe(() => {
  const state = store.getState();
  saveCurrentUser(state.currentUser);
  saveTheme(state.theme);

  if (state.auth.unauthorized) {
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
  }
});

export default store;

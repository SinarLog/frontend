import { EmptyUser } from "./types";
import * as T from "./types";

/**
 * Loads the user state that was saved to the session storage.
 * @returns {T.User} The loaded current user state
 */
export function loadCurrentUser() {
  try {
    // BUG: This could be dangerous
    const serializedUser = localStorage.getItem("user");
    if (serializedUser == null) {
      return EmptyUser;
    }
    return JSON.parse(serializedUser);
  } catch (e) {
    throw new Error("Unable to fetch user state from session storage!");
  }
}

/**
 * @param {T.User | undefined} user
 */
export function saveCurrentUser(user) {
  try {
    if (!user) user = T.EmptyUser;
    const serializedUser = JSON.stringify(user);
    // BUG: This could be dangerous
    localStorage.setItem("user", serializedUser);
  } catch (err) {
    throw new Error("Unable to save user state to session storage!");
  }
}

/**
 * Loads the user prefered theme from local storage
 * @returns {string} the theme
 */
export function loadTheme() {
  try {
    const theme = localStorage.getItem("theme");
    return theme;
  } catch (e) {
    throw new Error("Unable to load theme from local storage");
  }
}

/**
 * Save the theme preference to local storage.
 * @param {string} theme
 */
export function saveTheme(theme) {
  try {
    localStorage.setItem("theme", theme);
  } catch (e) {
    throw new Error("Unable to save theme to local storage");
  }
}

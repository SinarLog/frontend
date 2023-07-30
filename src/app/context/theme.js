import { createContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../store/slices";

const ACCEPTED_THEMES = ["light", "dark", "aqua"];

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (theme === "dark") {
      document.querySelector("html").classList.add("dark");
    } else {
      document.querySelector("html").classList.remove("dark");
    }
  }, [theme]);

  const changeTheme = (val) => {
    if (val) {
      if (typeof val === "string") {
        if (ACCEPTED_THEMES.includes(val, 0)) {
          dispatch(setTheme(val));
          return;
        }
      }
    }

    dispatch(
      setTheme(
        ACCEPTED_THEMES[Math.ceil(Math.random() * ACCEPTED_THEMES.length)]
      )
    );
  };

  return (
    <ThemeContext.Provider value={{ changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

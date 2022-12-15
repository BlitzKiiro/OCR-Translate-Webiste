import { createContext, useReducer, useEffect } from "react";

export const ThemeContext = createContext();

ThemeContext.displayName = "ThemeContext";

const storeTheme = (mode) => {
  localStorage.setItem("theme", mode);
};

const getStoredTheme = () => {
  return localStorage.getItem("theme");
};

const clearStoredTheme = () => {
  localStorage.removeItem("theme");
};

const getSystemTheme = () => {
  const mql = window.matchMedia("(prefers-color-scheme: dark)");
  return mql.matches ? "dark" : "light";
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LIGHT":
      storeTheme("light");
      return { mode: "light" };
    case "DARK":
      storeTheme("dark");
      return { mode: "dark" };
    case "STORED":
      return { mode: getStoredTheme() };
    default:
      clearStoredTheme();
      return { mode: getSystemTheme() };
  }
};

const ThemeContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, { mode: "" });

  useEffect(() => {
    if (getStoredTheme()) {
      dispatch({ type: "STORED" });
    } else {
      dispatch({ type: "SYSTEM" });
    }
  }, []);

  useEffect(() => {
    if (state.mode === "system") {
      const mql = window.matchMedia("(prefers-color-scheme: dark)");

      mql.addEventListener("change", ({ matches }) => {
        if (matches) {
          dispatch({ type: "DARK" });
        } else {
          dispatch({ type: "LIGHT" });
        }
      });
    }
  }, [state.mode]);

  return (
    <ThemeContext.Provider value={{ theme: state, dispatch }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;

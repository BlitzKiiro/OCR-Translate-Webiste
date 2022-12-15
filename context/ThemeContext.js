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

const addThemeToDOM = (mode) => {
  if (mode === "dark") document.documentElement.classList.add("dark");
  else document.documentElement.classList.remove("dark");
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LIGHT":
      storeTheme("light");
      addThemeToDOM("light");
      return { mode: "light" };
    case "DARK":
      storeTheme("dark");
      addThemeToDOM("dark");
      return { mode: "dark" };
    case "STORED":
      const mode = getStoredTheme();
      addThemeToDOM(mode);
      return { mode };
    default:
      clearStoredTheme();
      addThemeToDOM(getSystemTheme());
      return { mode: "system" };
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

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", ({ matches }) => {
        if (getStoredTheme()) return;
        addThemeToDOM(getSystemTheme());
      });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: state, dispatch }}>
      {props.children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;

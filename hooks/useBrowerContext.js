import { useContext } from "react";
import { BrowserContext } from "../context/BrowserContext";

const useBrowserContext = () => {
  const context = useContext(BrowserContext);

  if (!context) {
    throw Error(
      "Error, BrowserContext must be used inside ThemeContext Provider"
    );
  }

  return context;
};

export default useBrowserContext;

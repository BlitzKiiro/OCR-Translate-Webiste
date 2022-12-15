import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const useThemeContext = () => {
  const conext = useContext(ThemeContext);
  return conext;
};

export default useThemeContext;

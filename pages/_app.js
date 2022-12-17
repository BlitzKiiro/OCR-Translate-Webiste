import "../styles/globals.css";
import ThemeContextProvider from "../context/ThemeContext";
import BrowserContextProvider from "../context/BrowserContext";

function MyApp({ Component, pageProps }) {
  return (
    <BrowserContextProvider>
      <ThemeContextProvider>
        <Component {...pageProps} />
      </ThemeContextProvider>
    </BrowserContextProvider>
  );
}

export default MyApp;

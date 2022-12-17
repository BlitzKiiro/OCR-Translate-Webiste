import { createContext, useReducer, useEffect } from "react";
import { browserName, osName, deviceType } from "react-device-detect";

export const BrowserContext = createContext();

BrowserContext.displayName = "BrowserContext";

const reducer = (state, action) => {
  switch (action.type) {
    case "setGeoData":
      return { deviceInfo: state.deviceInfo, geoInfo: action.payload };
  }
};

const BrowserContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, {
    deviceInfo: { browserName, osName, deviceType },
    geoInfo: {},
  });

  useEffect(() => {
    fetch("https://api.geoiplookup.net/?query=&json=true").then((res) => {
      return res.json().then((data) => {
        dispatch({ type: "setGeoData", payload: data });
      });
    });
  }, []);

  return (
    <BrowserContext.Provider value={{ info: state, dispatch }}>
      {props.children}
    </BrowserContext.Provider>
  );
};

export default BrowserContextProvider;

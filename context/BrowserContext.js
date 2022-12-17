import { createContext, useState, useEffect } from "react";
import {
  browserName,
  osName,
  osVersion,
  deviceType,
  mobileVendor,
  mobileModel,
} from "react-device-detect";

export const BrowserContext = createContext();

BrowserContext.displayName = "BrowserContext";

const BrowserContextProvider = (props) => {
  const [info, setInfo] = useState({
    deviceInfo: {},
    geoInfo: {},
  });

  useEffect(() => {
    const getGeoDataAndDeviceInfo = async () => {
      const data = await (
        await fetch("https://api.geoiplookup.net/?query=&json=true")
      ).json();
      const info = {
        deviceInfo: {
          browserName,
          os: { name: osName, ver: osVersion },
          deviceType,
          mobileVendor,
          mobileModel,
        },
        geoInfo: data,
      };
      setInfo(info);
      return info;
    };

    const addVisit = async (info) => {
      await fetch("https://639dc7653542a261304f8f96.mockapi.io/api/visits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(info),
      });
    };

    getGeoDataAndDeviceInfo().then((info) => {
      addVisit(info);
    });
  }, []);

  return (
    <BrowserContext.Provider value={{ info }}>
      {props.children}
    </BrowserContext.Provider>
  );
};

export default BrowserContextProvider;

/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useContext, useEffect, useState } from "react";
import { getConfigurations } from "../services/api/public";
import { NotifContext } from "./notif";

export const ConfigContext = createContext();

const initConfig = {
  startTime: "",
  endTime: "",
  acceptedAttendanceInterval: "",
  acceptedLeaveInterval: 0,
};

export function ConfigProvider({ children }) {
  const { showAlert } = useContext(NotifContext);
  const [config, setConfig] = useState(initConfig);

  useEffect(() => {
    getConfigurations()
      .then((data) => {
        setConfig(data);
      })
      .catch((err) => {
        showAlert("ERROR", err);
      });
  }, []);

  return (
    <ConfigContext.Provider value={{ config }}>
      {children}
    </ConfigContext.Provider>
  );
}

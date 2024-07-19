import React, { createContext, useState, useEffect } from "react";
import { getLogList } from "../api/api";

export const LogStore = createContext();

export const LogProvider = ({ children }) => {
  const [logList, setLogList] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      const logs = await getLogList();
      setLogList(logs);
    };
    fetchLogs();
  }, []);

  return (
    <LogStore.Provider value={{ logList, setLogList }}>
      {children}
    </LogStore.Provider>
  );
};

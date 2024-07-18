import React, { useState } from "react";

const useLogList = () => {
  const [logList, setLogList] = useState([]);

  const addLog = (item) => {
    setLogList([...todoList, item]);
  };

  return { logList, addLog };
};

export default useLogList;

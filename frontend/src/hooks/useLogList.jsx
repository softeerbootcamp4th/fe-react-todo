import React, { useContext, useState } from "react";

const useLogContext = (context) => {
  const { logList, setLogList } = useContext(context);

  const logTodoAddition = (todoItem) => {
    const newLogList = [
      ...logList,
      {
        id: Date.now(),
        type: "추가",
        before: {},
        after: todoItem,
      },
    ];

    setLogList(newLogList);

    return newLogList;
  };

  const logTodoDeletion = (todoItem) => {
    const newLogList = [
      ...logList,
      { id: Date.now(), type: "삭제", before: todoItem, after: null },
    ];

    setLogList(newLogList);

    return newLogList;
  };

  const logTodoUpdate = (todoItem, newTodoItem) => {
    const newLogList = [
      ...logList,
      { id: Date.now(), type: "수정", before: todoItem, after: newTodoItem },
    ];

    setLogList(newLogList);

    return newLogList;
  };

  const logTodoCompletion = (todoItem, newTodoItem) => {
    let newLogList;
    if (newTodoItem.isDone) {
      newLogList = [
        ...logList,
        {
          id: Date.now(),
          type: "완료",
          before: todoItem,
          after: newTodoItem,
        },
      ];
    } else {
      newLogList = [
        ...logList,
        {
          id: Date.now(),
          type: "완료취소",
          before: todoItem,
          after: newTodoItem,
        },
      ];
    }

    setLogList(newLogList);

    return newLogList;
  };

  return {
    logList,
    logTodoAddition,
    logTodoDeletion,
    logTodoUpdate,
    logTodoCompletion,
  };
};

export default useLogContext;

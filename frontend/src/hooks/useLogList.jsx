import { useContext } from "react";
import { LogStore } from "../Provider/logProvider";

const useLogContext = () => {
  const { logList, setLogList } = useContext(LogStore);

  /**
   * todo가 추가되는 로그를 추가
   * @param {object} todoItem
   * @returns newLogList
   */
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

  /**
   * todo가 삭제되는 로그를 추가
   * @param {object} todoItem
   * @returns newLogList
   */
  const logTodoDeletion = (todoItem) => {
    const newLogList = [
      ...logList,
      { id: Date.now(), type: "삭제", before: todoItem, after: null },
    ];

    setLogList(newLogList);

    return newLogList;
  };

  /**
   * todo가 todoItem 에서 newTodoItem으로 수정되는 로그를 추가
   * @param {object} todoItem
   * @param {object} newTodoItem
   * @returns newLogList
   */
  const logTodoUpdate = (todoItem, newTodoItem) => {
    const newLogList = [
      ...logList,
      { id: Date.now(), type: "수정", before: todoItem, after: newTodoItem },
    ];

    setLogList(newLogList);

    return newLogList;
  };

  /**
   * todo가 todoItem 에서 newTodoItem으로 완료 상태 변경 로그를 추가
   * @param {object} todoItem
   * @param {object} newTodoItem
   * @returns newLogList
   */
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

  /**
   * logList를 초기화
   * @returns newLogList
   */
  const resetLogList = () => {
    const newLogList = [];

    setLogList(newLogList);

    return newLogList;
  };

  return {
    logList,
    logTodoAddition,
    logTodoDeletion,
    logTodoUpdate,
    logTodoCompletion,
    resetLogList,
  };
};

export default useLogContext;

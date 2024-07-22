import { useContext } from "react";
import { TodoStore } from "../Provider/todoProvider";

const useTodoContext = () => {
  const { todoList, setTodoList } = useContext(TodoStore);

  /**
   * todoItem 을 todoList 마지막에 추가
   * @param {object} todoItem
   * @returns newTodoList
   */
  const addTodo = (todoItem) => {
    const newTodoList = [...todoList, todoItem];

    setTodoList(newTodoList);

    return newTodoList;
  };

  /**
   * target index와 동일한 todo를 삭제
   * @param {number} target
   * @returns newTodoList
   */
  const deleteTodo = (target) => {
    const newTodoList = todoList.filter((_, index) => index !== target);

    setTodoList(newTodoList);

    return newTodoList;
  };

  /**
   * target index의 todo title을 newContext로 변경
   * @param {number} target
   * @param {String} newContent
   * @returns newTodoList
   */
  const modifyTodo = (target, newContent) => {
    const newTodoList = [...todoList];

    newTodoList[target] = {
      ...todoList[target],
      title: newContent,
    };

    setTodoList(newTodoList);

    return newTodoList;
  };

  /**
   * target index의 todo의 완료 상태를 변경
   * @param {number} target
   * @returns newTodoList
   */
  const handleCompleteTodo = (target) => {
    const newTodoList = [...todoList];
    newTodoList[target] = {
      ...todoList[target],
      isDone: !todoList[target].isDone,
    };

    setTodoList(newTodoList);

    return newTodoList;
  };

  /**
   * startIndex의 todo와 endIndex의 todo의 내용을 변경
   * @param {number} startIndex
   * @param {number} endIndex
   * @returns newTodoList
   */
  const changeTodoOrder = (startIndex, endIndex) => {
    const newTodoList = [...todoList];

    [newTodoList[startIndex], newTodoList[endIndex]] = [
      newTodoList[endIndex],
      newTodoList[startIndex],
    ];

    setTodoList(newTodoList);

    return newTodoList;
  };

  return {
    todoList,
    addTodo,
    deleteTodo,
    modifyTodo,
    handleCompleteTodo,
    changeTodoOrder,
  };
};

export default useTodoContext;

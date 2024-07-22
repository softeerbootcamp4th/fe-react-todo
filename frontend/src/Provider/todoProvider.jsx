import React, { createContext, useState, useEffect } from "react";
import { getTodoList } from "../api/api";

export const TodoStore = createContext();

export const TodoProvider = ({ children }) => {
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const todos = await getTodoList();
      setTodoList(todos);
    };

    fetchTodos();
  }, []);

  return (
    <TodoStore.Provider value={{ todoList, setTodoList }}>
      {children}
    </TodoStore.Provider>
  );
};

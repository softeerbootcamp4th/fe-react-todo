import React, { useState } from "react";

const useTodoList = () => {
  const [todoList, setTodoList] = useState([]);

  const onSubmit = (item) => {
    setTodoList([...todoList, item]);
  };

  return { todoList, onSubmit };
};

export default useTodoList;

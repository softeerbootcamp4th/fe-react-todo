import React, { useContext, useState } from "react";
import { TodoStore } from "../Provider/todoContext";

const useTodoContext = (context) => {
  const { todoList, setTodoList } = useContext(context);

  const addTodo = (todoItem) => {
    const newTodoList = [...todoList, todoItem];

    setTodoList(newTodoList);

    return newTodoList;
  };

  const deleteTodo = (target) => {
    const newTodoList = todoList.filter((_, index) => index !== target);

    setTodoList(newTodoList);

    return newTodoList;
  };

  const modifyTodo = (target, newContent) => {
    const newTodoList = [...todoList];

    newTodoList[target] = {
      ...todoList[target],
      title: newContent,
    };

    setTodoList(newTodoList);

    return newTodoList;
  };

  return { todoList, addTodo, deleteTodo, modifyTodo };
};

export default useTodoContext;

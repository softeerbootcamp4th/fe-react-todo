import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { TodoStore } from "../Provider/todoContext";
import { postToDoList } from "../api/todo";

const TodoList = () => {
  const { todoList, setTodoList } = useContext(TodoStore);

  return (
    <ListContainer>
      {todoList &&
        todoList.map((todo, index) => {
          return <TodoListItem key={index} index={index} title={todo.title} />;
        })}
    </ListContainer>
  );
};

const TodoListItem = ({ title, index }) => {
  const { todoList, setTodoList } = useContext(TodoStore);

  const onDeleteHandler = async (target) => {
    const newTodoList = await postToDoList(
      todoList.filter((todo, index) => index !== target)
    );
    setTodoList(newTodoList);
  };
  return (
    <ItemContainer>
      <ItemContent>{title}</ItemContent>
      <ItemDeleteButton onClick={() => onDeleteHandler(index)}>
        삭제
      </ItemDeleteButton>
    </ItemContainer>
  );
};

const ListContainer = styled.ul``;

const ItemContainer = styled.div`
  display: flex;
`;

const ItemContent = styled.li``;

const ItemDeleteButton = styled.button``;

export default TodoList;

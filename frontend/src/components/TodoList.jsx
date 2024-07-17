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
          return (
            <TodoListItem
              key={index}
              index={index}
              title={todo.title}
              isLast={index === todoList.length - 1}
            />
          );
        })}
    </ListContainer>
  );
};

const TodoListItem = ({ title, index, isLast }) => {
  const { todoList, setTodoList } = useContext(TodoStore);

  const onDeleteHandler = async (target) => {
    const newTodoList = await postToDoList(
      todoList.filter((todo, index) => index !== target)
    );
    setTodoList(newTodoList);
  };
  return (
    <ItemContainer isLast={isLast}>
      <ItemContent>{title}</ItemContent>
      <ItemDeleteButton onClick={() => onDeleteHandler(index)}>
        삭제
      </ItemDeleteButton>
    </ItemContainer>
  );
};

const ListContainer = styled.ul`
  width: 100%;
  padding: 0 1rem;
`;

const ItemContainer = styled.div`
  height: 2.4rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: ${({ isLast }) => (isLast ? "none" : "1px solid gray")};
`;

const ItemContent = styled.li`
  font-size: 16px;
`;

const ItemDeleteButton = styled.button`
  width: 3rem;
  border: none;
  border-radius: 8px;
  background-color: #53a0e0;
  color: white;
`;

export default TodoList;

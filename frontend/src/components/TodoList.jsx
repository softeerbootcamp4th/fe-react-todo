import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { TodoStore } from "../Provider/todoContext";
import { postToDoList } from "../api/todo";
import { CLICK_THRESHOLD } from "../constants/magicNumber";

const TodoList = () => {
  const { todoList, setTodoList } = useContext(TodoStore);

  return (
    <ListContainer>
      {todoList &&
        todoList.map((todo, index) => (
          <TodoListItem
            key={index}
            index={index}
            title={todo.title}
            isLast={index === todoList.length - 1}
            isDone={todo.isDone}
          />
        ))}
    </ListContainer>
  );
};

const TodoListItem = ({ title, index, isLast, isDone }) => {
  const { todoList, setTodoList } = useContext(TodoStore);
  const [isLongPressed, setIsLongPressed] = useState(false);
  const timerRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    console.log(todoList);
  }, [todoList]);

  const onDeleteHandler = async (target) => {
    const newTodoList = await postToDoList(
      todoList.filter((todo, index) => index !== target)
    );
    setTodoList(newTodoList);
  };

  const onMouseDownHandler = () => {
    startTimeRef.current = Date.now();

    timerRef.current = setTimeout((target) => {
      setIsLongPressed(true);
    }, CLICK_THRESHOLD);
  };

  const onMouseUpHandler = (target) => {
    if (Date.now() - startTimeRef.current < CLICK_THRESHOLD) {
      clearTimeout(timerRef.current);
      let front = todoList.slice(0, target);
      let back = todoList.slice(target + 1);
      let middle = todoList[target];
      console.log(middle);
      console.log("target", target);
      middle.isDone = !middle.isDone;

      setTodoList([...front, middle, ...back]);
    }
  };

  return (
    <ItemContainer
      $isLast={isLast}
      onMouseDown={() => onMouseDownHandler(index)}
      onMouseUp={() => onMouseUpHandler(index)}
    >
      <ItemContent $isDone={isDone}>{title}</ItemContent>
      <ItemDeleteButton onClick={() => onDeleteHandler(index)}>
        삭제
      </ItemDeleteButton>
    </ItemContainer>
  );
};

const ListContainer = styled.ul`
  width: 100%;
  height: 20rem;
  padding: 0 1rem;
  overflow: scroll;
`;

const ItemContainer = styled.div`
  height: 2.4rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: ${(props) => (props.$isLast ? "none" : "1px solid gray")};
`;

const ItemContent = styled.li`
  font-size: 16px;
  text-decoration: ${(props) => (props.$isDone ? "line-through" : "none")};
`;

const ItemDeleteButton = styled.button`
  width: 3rem;
  height: 100%;
  border: none;
  border-radius: 8px;
  background-color: #53a0e0;
  color: white;
`;

export default TodoList;

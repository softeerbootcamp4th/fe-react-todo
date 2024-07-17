import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { TodoStore } from "../Provider/todoContext";
import { postToDoList } from "../api/todo";
import { CLICK_THRESHOLD } from "../constants/magicNumber";
import useInput from "../hooks/useInput";

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
  const { content, onChange, reset, setContent } = useInput();
  const timerRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    console.log(todoList);
  }, [todoList]);

  const onModifyHandler = (newTitle, target) => {
    const newTodoList = [...todoList];
    newTodoList[target] = {
      ...todoList[target],
      title: newTitle,
    };
    setTodoList(newTodoList);
    reset();
    setIsLongPressed(false);
  };

  const onDeleteHandler = async (target) => {
    const newTodoList = await postToDoList(
      todoList.filter((todo, index) => index !== target)
    );
    setTodoList(newTodoList);
  };

  const onMouseDownHandler = (target) => {
    startTimeRef.current = Date.now();

    timerRef.current = setTimeout(() => {
      setIsLongPressed(true);
      console.log(target);
      setContent(todoList[target].title);
    }, CLICK_THRESHOLD);
  };

  const onMouseUpHandler = (target) => {
    if (Date.now() - startTimeRef.current < CLICK_THRESHOLD) {
      clearTimeout(timerRef.current);

      const newTodoList = [...todoList];
      newTodoList[target] = {
        ...todoList[target],
        isDone: !todoList[target].isDone,
      };

      setTodoList(newTodoList);
    }
  };

  return (
    <ItemContainer
      $isLast={isLast}
      onMouseDown={() => onMouseDownHandler(index)}
      onMouseUp={() => onMouseUpHandler(index)}
    >
      {isLongPressed ? (
        <>
          <StyledInput onChange={onChange} value={content}></StyledInput>
          <ItemDeleteButton onClick={() => onModifyHandler(content, index)}>
            수정
          </ItemDeleteButton>
        </>
      ) : (
        <>
          <ItemContent $isDone={isDone}>{title}</ItemContent>
          <ItemDeleteButton onClick={() => onDeleteHandler(index)}>
            삭제
          </ItemDeleteButton>
        </>
      )}
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

const StyledInput = styled.input`
  width: 100%;
  height: 90%;
  padding-left: 1rem;
  font-size: 18px;
`;

export default TodoList;

import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { TodoStore } from "../Provider/todoContext";
import { postLogList, postToDoList } from "../api/todo";
import { CLICK_THRESHOLD } from "../constants/magicNumber";
import useInput from "../hooks/useInput";
import { LogStore } from "../Provider/logContext";
import useLogContext from "../hooks/useLogList";
import useTodoContext from "../hooks/useTodoList";

const TodoList = () => {
  const { todoList, setTodoList } = useContext(TodoStore);
  const dragStartPosition = useRef(null);
  const dragEndPosition = useRef(null);
  const timerRef = useRef(null);

  // drag 이벤트 핸들러
  const onDragStartHandler = (event, target) => {
    dragStartPosition.current = target;
    clearTimeout(timerRef.current);
  };

  const onDragEnterHandler = (event, target) => {
    dragEndPosition.current = target;
  };

  const onDragEndHandler = (event) => {
    const newTodoList = [...todoList];
    const temp = newTodoList[dragStartPosition.current];
    newTodoList[dragStartPosition.current] =
      newTodoList[dragEndPosition.current];
    newTodoList[dragEndPosition.current] = temp;
    dragStartPosition.current = null;
    dragEndPosition.current = null;
    setTodoList(newTodoList);
    postToDoList(newTodoList);
  };

  return (
    <ListContainer>
      {todoList &&
        todoList.map((todo, index) => (
          <TodoListItem
            key={todo.id}
            index={index}
            title={todo.title}
            isLast={index === todoList.length - 1}
            isDone={todo.isDone}
            onDragStartHandler={onDragStartHandler}
            onDragEnterHandler={onDragEnterHandler}
            onDragEndHandler={onDragEndHandler}
            setTimeRef={timerRef}
          />
        ))}
    </ListContainer>
  );
};

const TodoListItem = ({
  title,
  index,
  isLast,
  isDone,
  onDragEndHandler,
  onDragStartHandler,
  onDragEnterHandler,
  setTimeRef,
}) => {
  const { todoList, deleteTodo, modifyTodo } = useTodoContext(TodoStore);
  const { logList, logTodoDeletion, logTodoUpdate } = useLogContext(LogStore);
  const [isLongPressed, setIsLongPressed] = useState(false);
  const { content, onChange, resetContent, setContent } = useInput();
  const startTimeRef = useRef(0);

  const onModifyHandler = (newTitle, target) => {
    const newTodoList = modifyTodo(target, newTitle);
    postToDoList(newTodoList);

    resetContent();
    setIsLongPressed(false);

    const newLogList = logTodoUpdate(todoList[target], newTodoList[target]);
    postLogList(newLogList);
  };

  const onDeleteHandler = async (event, target) => {
    event.stopPropagation(); // 이벤트 버블링 방지

    const newTodoList = deleteTodo(target);
    postToDoList(newTodoList);

    const newLogList = logTodoDeletion(todoList[target]);
    postLogList(newLogList);
  };

  const onMouseDownHandler = (target) => {
    if (!isLongPressed) {
      startTimeRef.current = Date.now();

      setTimeRef.current = setTimeout(() => {
        setIsLongPressed(true);
        setContent(todoList[target].title);
      }, CLICK_THRESHOLD);
    }
  };

  const onMouseUpHandler = async (target) => {
    if (Date.now() - startTimeRef.current < CLICK_THRESHOLD && !isLongPressed) {
      clearTimeout(setTimeRef.current);

      const newTodoList = [...todoList];
      newTodoList[target] = {
        ...todoList[target],
        isDone: !todoList[target].isDone,
      };

      let newLogList;
      if (newTodoList[target].isDone) {
        newLogList = [
          ...logList,
          {
            id: Date.now(),
            type: "완료",
            before: todoList[target],
            after: newTodoList[target],
          },
        ];
      } else {
        newLogList = [
          ...logList,
          {
            id: Date.now(),
            type: "완료취소",
            before: todoList[target],
            after: newTodoList[target],
          },
        ];
      }

      setTodoList(newTodoList);
      setLogList(newLogList);
      postToDoList(newTodoList);
      postLogList(newLogList);
    }
  };

  return (
    <ItemContainer
      draggable={true}
      $isLast={isLast}
      onMouseDown={() => onMouseDownHandler(index)}
      onMouseUp={() => onMouseUpHandler(index)}
      onDragStart={(event) => onDragStartHandler(event, index)}
      onDragEnter={(event) => onDragEnterHandler(event, index)}
      onDragEnd={onDragEndHandler}
      onDragOver={(event) => event.preventDefault()}
    >
      {isLongPressed ? (
        <>
          <StyledInput onChange={onChange} value={content}></StyledInput>
          <ItemDeleteButton
            onClick={() => onModifyHandler(content, index)}
            onMouseDown={(e) => e.stopPropagation()}
            onMouseUp={(e) => e.stopPropagation()}
          >
            수정
          </ItemDeleteButton>
        </>
      ) : (
        <>
          <ItemContent $isDone={isDone}>{title}</ItemContent>
          <ItemDeleteButton
            onClick={(event) => onDeleteHandler(event, index)}
            onMouseDown={(e) => e.stopPropagation()}
            onMouseUp={(e) => e.stopPropagation()}
          >
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

import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { MESSAGE } from "../constants/message";
import useInput from "../hooks/useInput";
import { postLogList, postToDoList } from "../api/todo";
import { TodoStore } from "../Provider/todoContext";
import { LogStore } from "../Provider/logContext";
import useTodoContext from "../hooks/useTodoList";
import useLogContext from "../hooks/useLogList";

const Input = () => {
  const { content, onChange, reset } = useInput();
  const { todoList, addTodo } = useTodoContext(TodoStore);
  const { logList, logTodoAddition } = useLogContext(LogStore);
  const onSubmitHandler = async () => {
    if (content) {
      const newTodo = { title: content, isDone: false, id: Date.now() };
      const newTodoList = addTodo(newTodo);
      const newLogList = logTodoAddition(newTodo);

      postToDoList(newTodoList);
      postLogList(newLogList);
      reset();
    }
  };

  const onEnterDown = ({ key }) => {
    if (key === "Enter") {
      onSubmitHandler();
    }
  };

  return (
    <Container>
      <StyledInput
        placeholder={MESSAGE.placeHolder}
        value={content}
        onChange={onChange}
        onKeyDown={onEnterDown}
      />
      <AddButton onClick={onSubmitHandler}>등록</AddButton>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 2.5rem;
  display: ${(props) => props.theme.layout.alignCenter.display};
  justify-content: ${(props) => props.theme.layout.alignCenter.justifyContent};
  align-items: ${(props) => props.theme.layout.alignCenter.alignItems};
  gap: 1rem;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 90%;
  padding-left: 1rem;
  font-size: 18px;
`;

const AddButton = styled.button`
  width: 4rem;
  height: 100%;
  border: none;
  border-radius: 8px;
  background-color: rgb(35, 143, 35);
  color: white;
  font-size: 18px;
`;

export default Input;

import React, { useContext } from "react";
import styled from "styled-components";
import { MESSAGE } from "../constants/message";
import useInput from "../hooks/useInput";
import { postToDoList } from "../api/todo";
import { TodoStore } from "../Provider/todoContext";

const Input = () => {
  const { content, onChange, reset } = useInput();
  const { todoList, setTodoList } = useContext(TodoStore);

  const onSubmitHandler = async () => {
    if (content) {
      const newTodoList = await postToDoList([
        ...todoList,
        { title: content, isDone: false },
      ]);
      setTodoList(newTodoList);
      reset();
    }
  };

  return (
    <Container>
      <StyledInput
        placeholder={MESSAGE.placeHolder}
        value={content}
        onChange={onChange}
      />
      <AddButton onClick={onSubmitHandler}>등록</AddButton>
    </Container>
  );
};

const Container = styled.div`
  display: ${(props) => props.theme.layout.alignCenter.display};
  justify-content: ${(props) => props.theme.layout.alignCenter.justifyContent};
  align-items: ${(props) => props.theme.layout.alignCenter.alignItems};
  background-color: red;
  height: 100%;
`;

const StyledInput = styled.input``;

const AddButton = styled.button`
  width: 3rem;
  height: 100%;
`;

export default Input;

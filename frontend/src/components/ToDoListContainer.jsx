import React from "react";
import styled from "styled-components";
import Input from "./Input";
import TodoList from "./TodoList";

const ToDoListContainer = () => {
  return (
    <Container>
      <Input />
      <TodoList />
    </Container>
  );
};

const Container = styled.div`
  width: 28rem;
  display: ${(props) => props.theme.layout.alignCenter.display};
  justify-content: ${(props) => props.theme.layout.alignCenter.justifyContent};
  align-items: ${(props) => props.theme.layout.alignCenter.alignItems};
  flex-direction: column;
  gap: 2rem;
`;

export default ToDoListContainer;

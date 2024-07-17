import React from "react";
import styled from "styled-components";

const ToDoListContainer = ({ children }) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  background-color: pink;
  display: ${(props) => props.theme.layout.alignCenter.display};
  justify-content: ${(props) => props.theme.layout.alignCenter.justifyContent};
  align-items: ${(props) => props.theme.layout.alignCenter.alignItems};
  flex-direction: column;
`;

export default ToDoListContainer;

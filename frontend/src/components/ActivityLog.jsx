import React from "react";
import styled from "styled-components";

const ActivityLog = () => {
  return (
    <Container>
      <LogItem></LogItem>
    </Container>
  );
};

const Container = styled.div`
  background-color: tomato;
  position: absolute;
  right: 0;
  top: 0;
  height: 40rem;
  min-width: 20%;
`;

const LogItem = styled.div``;

export default ActivityLog;

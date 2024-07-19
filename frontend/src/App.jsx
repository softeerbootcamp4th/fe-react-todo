import styled from "styled-components";
import ToDoListContainer from "./components/ToDoListContainer";
import ActivityLog from "./components/ActivityLog";
import { TodoProvider } from "./Provider/todoProvider";
import { LogProvider } from "./Provider/logProvider";

function App() {
  return (
    <>
      <Title>to do app</Title>
      <LogProvider>
        <TodoProvider>
          <ToDoListContainer />
        </TodoProvider>
        <ActivityLog />
      </LogProvider>
    </>
  );
}

const Title = styled.h1`
  margin-top: 10rem;
  font-size: 3rem;
  font-weight: 800;
  text-align: center;
  color: #bf4f74;
`;

export default App;

import { useEffect, useState } from "react";
import "./App.css";
import styled from "styled-components";
import ToDoListContainer from "./components/ToDoListContainer";
import ActivityLog from "./components/ActivityLog";
import Input from "./components/Input";
import TodoList from "./components/TodoList";
import { TodoStore } from "./Provider/todoContext";
import { getTodoList } from "./api/todo";
import { LogStore, example } from "./Provider/logContext";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [logList, setLogList] = useState(example);

  useEffect(() => {
    const fetchTodos = async () => {
      const todos = await getTodoList();
      setTodoList(todos);
    };
    fetchTodos();
  }, []);

  return (
    <>
      <Title>to do app</Title>
      <LogStore.Provider value={{ logList, setLogList }}>
        <ToDoListContainer>
          <TodoStore.Provider value={{ todoList, setTodoList }}>
            <Input />
            <TodoList />
          </TodoStore.Provider>
        </ToDoListContainer>
        <ActivityLog></ActivityLog>
      </LogStore.Provider>
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

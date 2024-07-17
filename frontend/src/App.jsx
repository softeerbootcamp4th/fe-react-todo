import { useEffect, useState } from "react";
import "./App.css";
import styled from "styled-components";
import ToDoListContainer from "./components/ToDoListContainer";
import ActivityLog from "./components/ActivityLog";
import Input from "./components/Input";
import TodoList from "./components/TodoList";
import { TodoStore } from "./Provider/todoContext";
import { getTodoList } from "./api/todo";

function App() {
  const [todoList, setTodoList] = useState([]);

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
      <TodoStore.Provider value={{ todoList, setTodoList }}>
        <ToDoListContainer>
          <Input />
          <TodoList />
        </ToDoListContainer>
      </TodoStore.Provider>
      <ActivityLog></ActivityLog>
    </>
  );
}

const Title = styled.h1`
  background-color: orange;
  font-size: 2em;
  text-align: center;
  color: #bf4f74;
`;

export default App;

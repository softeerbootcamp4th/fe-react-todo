import { PropsWithChildren, useCallback, useEffect, useState } from "react";
import { TodosContext } from "../hooks/useTodosContext";
import { Todo } from "../models/Todo";
import { todoRemotes } from "../remotes/todo";

export const TodosProvider = ({ children }: PropsWithChildren) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentEditingId, setCurrentEditingId] = useState<number | null>(null);

  const readTodos = useCallback(async () => {
    const todos = await todoRemotes.getTodos();
    setTodos(todos);
  }, []);
  useEffect(() => {
    readTodos();
  }, []);

  const addTodo = useCallback(async (title: string) => {
    const newTodo = await todoRemotes.createTodo(title);
    setTodos((prev) => [...prev, newTodo]);
  }, []);
  const removeTodo = useCallback(async (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
    await todoRemotes.deleteTodo(id);
  }, []);
  const updateTodoStatus = useCallback(async (todo: Todo) => {
    await todoRemotes.updateTodo(todo);
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === todo.id ? todo : prevTodo)),
    );
  }, []);
  const setEditingTodoId = useCallback((id: number | null) => {
    setCurrentEditingId(id);
  }, []);

  const editTodo = useCallback(async (todo: Todo) => {
    await todoRemotes.updateTodo(todo);
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === todo.id ? todo : prevTodo)),
    );
    setCurrentEditingId(null);
  }, []);

  return (
    <TodosContext.Provider
      value={{
        todos,
        addTodo,
        removeTodo,
        updateTodoStatus,
        setEditingTodoId,
        editTodo,
        currentEditingId,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

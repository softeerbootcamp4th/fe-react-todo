import { PropsWithChildren, useCallback, useState } from "react";
import { TodosContext } from "../hooks/useTodosContext";
import { Todo } from "../models/Todo";

export const TodosProvider = ({ children }: PropsWithChildren) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentEditingId, setCurrentEditingId] = useState<number | null>(null);
  const addTodo = useCallback((title: string) => {
    setTodos((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        title,
        status: "active",
      },
    ]);
  }, []);
  const removeTodo = useCallback((id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);
  const updateTodoStatus = useCallback(
    (id: number, status: "active" | "completed") => {
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id
            ? {
                ...todo,
                status,
              }
            : todo,
        ),
      );
    },
    [],
  );
  const setEditingTodoId = useCallback((id: number | null) => {
    setCurrentEditingId(id);
  }, []);

  const editTodo = useCallback((id: number, title: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              title,
            }
          : todo,
      ),
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

import { PropsWithChildren, useCallback, useState } from "react";
import { TodosContext } from "../hooks/useTodosContext";
import { Todo } from "../models/Todo";

export const TodosProvider = ({ children }: PropsWithChildren) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = useCallback((title: string) => {
    setTodos((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        title,
        status: "active",
        isEditing: false,
      },
    ]);
  }, []);
  const removeTodo = useCallback((id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }, []);
  return (
    <TodosContext.Provider
      value={{
        todos,
        addTodo,
        removeTodo,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

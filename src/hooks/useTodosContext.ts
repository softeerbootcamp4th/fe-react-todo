import { useContext } from "react";
import { createContext } from "react";
import { Todo } from "../models/Todo";

interface TodosContextValue {
  todos: Todo[];
  addTodo: (title: string) => void;
  removeTodo: (id: number) => void;
}

export const TodosContext = createContext<TodosContextValue | null>(null);

export const useTodosContext = () => {
  const context = useContext(TodosContext);
  if (!context) {
    throw new Error("useTodosContext must be used within a TodosProvider");
  }
  return context;
};

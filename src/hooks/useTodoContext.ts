import { useContext } from "react";
import { TodoContext, TodoContextType } from "@/context/TodoContext";

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("todocontext 타입 에러");
  }
  return context as TodoContextType;
};

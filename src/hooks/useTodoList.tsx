import { useContext } from "react";
import { TodoContext, TodoContextType } from "../contexts/todoContext";

export const useTodoList = (): TodoContextType => {
    const context = useContext(TodoContext);
    if (context === null) {
        throw new Error("todoContext must be used within a TodoProvider");
    }
    return context;
};

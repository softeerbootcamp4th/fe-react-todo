import { useContext } from "react";
import { TodoContext } from "../contexts/todoContext";

export const useTodoList = () => {
    const context = useContext(TodoContext);
    if (context === undefined) {
        throw new Error("todoContext must be used within a TodoProvider");
    }
    return context;
};

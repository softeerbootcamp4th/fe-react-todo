import { ReactNode, createContext, useState } from "react";
import { TodoItemType } from "../types/todo";
import { TodoAPI } from "../apis/todoAPI";

export const TodoContext = createContext<any>({} as any);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
    const [todoList, setTodoList] = useState<TodoItemType[]>([]);

    const getTodoList = async () => {
        const data = await TodoAPI.get();
        setTodoList(data);
    };

    return (
        <TodoContext.Provider value={{ todoList, getTodoList }}>{children}</TodoContext.Provider>
    );
};

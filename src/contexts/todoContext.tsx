import { ReactNode, createContext, useState } from "react";
import { TodoItemType } from "../types/todo";
import { TodoAPI } from "../apis/todoAPI";
import { LogAPI } from "../apis/logAPI";
import { Log } from "../types/log";

export const TodoContext = createContext<any>({} as any);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
    const [todoList, setTodoList] = useState<TodoItemType[]>([]);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [logList, setLogList] = useState([]);

    const getTodoList = async () => {
        const data = await TodoAPI.get();
        setTodoList(data);
    };

    const getLogList = async () => {
        const data = await LogAPI.get();
        setLogList(data);
    };

    const setLogListItem = async (log: Log) => {
        await LogAPI.post(log);
    };

    return (
        <TodoContext.Provider
            value={{
                todoList,
                setTodoList,
                getTodoList,
                isEditing,
                setIsEditing,
                logList,
                getLogList,
                setLogListItem,
            }}
        >
            {children}
        </TodoContext.Provider>
    );
};

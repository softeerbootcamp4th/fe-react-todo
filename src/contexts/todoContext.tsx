import { Dispatch, ReactNode, createContext, useState } from "react";
import { TodoItemType } from "../types/todo";
import { TodoAPI } from "../apis/todoAPI";
import { LogAPI } from "../apis/logAPI";
import { LogType } from "../types/log";

export interface TodoContextType {
    todoList: TodoItemType[];
    setTodoList: Dispatch<TodoItemType[]>;
    getTodoList: () => Promise<void>;
    isEditing: boolean;
    setIsEditing: Dispatch<boolean>;
    logList: LogType[];
    getLogList: () => Promise<void>;
    setLogListItem: (log: LogType) => Promise<void>;
    updateTodoList: (newTodoList: TodoItemType[]) => Promise<void>;
}

export const TodoContext = createContext<TodoContextType | null>(null);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
    const [todoList, setTodoList] = useState<TodoItemType[]>([]);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [logList, setLogList] = useState<LogType[]>([]);

    const getTodoList = async () => {
        const data = await TodoAPI.get();
        setTodoList(data);
    };

    const getLogList = async () => {
        const data = await LogAPI.get();
        setLogList(data);
    };

    const setLogListItem = async (log: LogType) => {
        await LogAPI.post(log);
    };

    const updateTodoList = async (newTodoList: TodoItemType[]) => {
        await TodoAPI.deleteAll(newTodoList);
        await TodoAPI.postAll(newTodoList);
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
                updateTodoList,
            }}
        >
            {children}
        </TodoContext.Provider>
    );
};

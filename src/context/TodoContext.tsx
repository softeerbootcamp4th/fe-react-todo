import { createContext, useState, useEffect, ReactNode, Dispatch } from "react";
import { Todo } from "@/types/todoType";
import { LogMsg } from "@/types/LogType";
import { getTodoList, deleteTodo } from "@/apis/todoList";
import { getLogList, postLog } from "@/apis/Log";

export interface TodoContextType {
  todoItemList: Todo[];
  setTodoItemList: Dispatch<Todo[]>;
  isEdit: boolean;
  setIsEdit: Dispatch<boolean>;
  updateTodoList: () => Promise<void>;
  handleDeleteTodoItem: (id: number, text: string) => Promise<void>;
  logList: LogMsg[];
  updateLogList: () => Promise<void>;
  setLogList: Dispatch<LogMsg[]>;
}

export const TodoContext = createContext<TodoContextType | null>(null);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todoItemList, setTodoItemList] = useState<Todo[]>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [logList, setLogList] = useState<LogMsg[]>([]);

  const updateTodoList = async () => {
    try {
      const data = await getTodoList();
      setTodoItemList(data ?? []);
    } catch (error) {
      console.error("Error fetching todo list:", error);
    }
  };

  const updateLogList = async () => {
    try {
      const data = await getLogList();
      setLogList(data ?? []);
    } catch (error) {
      console.error("logList 불러오기 실패");
    }
  };

  const handleDeleteTodoItem = async (id: number, text: string) => {
    //콜백으로 설정?
    try {
      await deleteTodo(id);
      setTodoItemList(todoItemList.filter((todo) => todo.id !== id));
      await postLog({ log: "삭제", todoItem: text });
      updateLogList();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    updateTodoList();
    updateLogList();
  }, []);

  const value: TodoContextType = {
    todoItemList,
    setTodoItemList,
    isEdit,
    setIsEdit,
    updateTodoList,
    handleDeleteTodoItem,
    logList,
    updateLogList,
    setLogList,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

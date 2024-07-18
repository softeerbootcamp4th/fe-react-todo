import { createContext, useState, useEffect, ReactNode, Dispatch } from "react";
import { Todo } from "@/types/todoType";
import { LogMsg } from "@/types/LogType";
import { getTodoList, deleteTodo } from "@/apis/todoList";

export interface TodoContextType {
  todoItemList: Todo[];
  setTodoItemList: Dispatch<Todo[]>;
  isEdit: boolean;
  setIsEdit: Dispatch<boolean>;
  updateTodoList: () => Promise<void>;
  handleDeleteTodoItem: (id: number) => void;
  logList: LogMsg[];
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

  const handleDeleteTodoItem = (id: number) => {
    //콜백으로 설정?
    try {
      deleteTodo(id);
      setTodoItemList(todoItemList.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    updateTodoList();
  }, []);

  const value: TodoContextType = {
    todoItemList,
    setTodoItemList,
    isEdit,
    setIsEdit,
    updateTodoList,
    handleDeleteTodoItem,
    logList,
    setLogList,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

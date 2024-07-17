import { createContext, useState, useEffect, ReactNode, Dispatch } from "react";
import Todo from "@/types/todoType";
import { fetchToDoList, handleDelete } from "@/apis/fetch";

export interface TodoContextType {
  todoItemList: Todo[];
  setTodoItemList: Dispatch<Todo[]>;
  isEdit: boolean;
  setIsEdit: Dispatch<boolean>;
  getTodoList: () => Promise<void>;
  handleDeleteTodoItem: (id: number) => void;
}

export const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todoItemList, setTodoItemList] = useState<Todo[]>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const getTodoList = async () => {
    try {
      const data = await fetchToDoList();
      setTodoItemList(data);
    } catch (error) {
      console.error("Error fetching todo list:", error);
    }
  };

  const handleDeleteTodoItem = (id: number) => {
    //콜백으로 설정?
    try {
      handleDelete(id);
      setTodoItemList(todoItemList.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getTodoList();
  }, []);

  const value: TodoContextType = {
    todoItemList,
    setTodoItemList,
    isEdit,
    setIsEdit,
    getTodoList,
    handleDeleteTodoItem,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

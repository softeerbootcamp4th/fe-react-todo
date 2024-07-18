import { deleteTodo, getTodoList, patchTodo, patchTodoSplice } from "@/apis/todoList";
import { Todo, PatchTodoRequestBody, PatchTodoSpliceRequestBody, TodoMutate } from "@/types/todoType";
import { useState, useEffect, useCallback } from "react";

const useTodo = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);

  const initTodoList = useCallback(async () => {
    const list = await getTodoList();

    setTodoList(list ?? []);
  }, []);

  useEffect(() => {
    initTodoList();
  }, []);

  const mutate: TodoMutate = {
    updateTodoItem: (id: number, data: PatchTodoRequestBody) => {
      patchTodo(id, data)
        .then(() => getTodoList())
        .then((result) => {
          setTodoList(result ?? []);
        });
    },

    spliceTodoItem: (data: PatchTodoSpliceRequestBody) => {
      patchTodoSplice(data).then((result) => {
        setTodoList(result ?? []);
      });
    },

    deleteTodoItem: (id: number) => {
      deleteTodo(id).then((result) => {
        setTodoList(result ?? []);
      });
    },
  };

  return { todoList, mutate };
};

export default useTodo;

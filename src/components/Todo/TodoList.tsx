import { useState, useEffect, useRef } from "react";
import Todo from "@/types/todoType";
import { handleEdit } from "@/apis/fetch";
import { useTodoContext } from "@/hooks/useTodoContext";

function TodoList() {
  const { isEdit, todoItemList, getTodoList, setTodoItemList, setIsEdit, handleDeleteTodoItem } = useTodoContext();
  const timeRef = useRef<NodeJS.Timeout | null>(null);
  const [clickedId, setClickedId] = useState<number>(0);
  //const [currentTodo, setCurrentTodo] = useState<Partial<Todo>>({text: ""});

  const handleCompletedItem = (id: number) => {
    const updatedTodoList = todoItemList.map((todo) => {
      if (todo.id === id) {
        handleEdit(id, { completed: !todo.completed });
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });

    setTodoItemList(updatedTodoList);
  };

  const handleEditItem = (id: number, todo: Partial<Todo>) => {
    setClickedId(id);
    timeRef.current = setTimeout(() => {
      setIsEdit(true);
      console.log(id, todo);
      /*
      setCurrentTodo({
        text: todo.text,
        completed: todo.completed,
      }); */
    }, 2000);
  };

  const handleEditCancel = () => {
    if (timeRef.current) {
      clearTimeout(timeRef.current);
      timeRef.current = null;
      setIsEdit(false);
    }
  };

  useEffect(() => {
    getTodoList();
  }, []);

  return (
    <div className="w-full">
      <ul>
        {todoItemList.map((todo) => (
          <li key={todo.id}>
            <div className="flex items-center justify-center">
              {isEdit && clickedId === todo.id ? (
                <p className={`mr-5 flex-grow`} onClick={() => handleCompletedItem(todo.id)}>
                  <input className="ml-[10px] border-2 border-solid w-[160px]" type="text" name="search input"></input>
                </p>
              ) : (
                <p
                  className={`mr-5 flex-grow ${todo.completed ? "line-through text-gray-400" : ""}`}
                  onClick={() => handleCompletedItem(todo.id)}
                  onMouseDown={() => handleEditItem(todo.id, todo)}
                  onMouseUp={handleEditCancel}
                  onMouseLeave={handleEditCancel}
                >
                  {todo.text}
                </p>
              )}
              <button
                className=" border-blue-300 border-1 border-solid bg-blue-400 text-white"
                onClick={() => handleDeleteTodoItem(todo.id)}
              >
                삭제
              </button>
            </div>
            <div className="h-[0.5px] bg-green-300"></div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;

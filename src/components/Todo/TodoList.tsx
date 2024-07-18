import { useState, useRef } from "react";
import { Todo } from "@/types/todoType";
import { patchTodo } from "@/apis/todoList";
import { useTodoContext } from "@/hooks/useTodoContext";
import { patchTodoSplice, getTodoList } from "@/apis/todoList";

function TodoList() {
  const { isEdit, todoItemList, setTodoItemList, setIsEdit, handleDeleteTodoItem } = useTodoContext();
  const timeRef = useRef<NodeJS.Timeout | null>(null);
  const [clickedId, setClickedId] = useState<number>(0);
  const dragItem = useRef<number | undefined>();
  const dragOverItem = useRef<number | undefined>();
  const isDragging = useRef<boolean>(false);
  //const [currentTodo, setCurrentTodo] = useState<Partial<Todo>>({text: ""});

  const handleCompletedItem = (id: number) => {
    const updatedTodoList = todoItemList.map((todo) => {
      if (todo.id === id) {
        patchTodo(todo.id, { completed: !todo.completed });
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });

    setTodoItemList(updatedTodoList);
  };

  const handleDragStart = (idx: number) => {
    isDragging.current = true;
    setIsEdit(false);
    dragItem.current = idx;
  };

  const handleDragEnter = (idx: number) => {
    if (!isEdit) dragOverItem.current = idx;
  };

  const handleDragEnd = async () => {
    if (dragItem.current === undefined || dragOverItem.current === undefined) return;

    patchTodoSplice({ targetIndex: dragItem.current, destinationIndex: dragOverItem.current })
      .then(() => getTodoList())
      .then((list) => {
        setTodoItemList(list ?? []);
      });

    dragItem.current = undefined;
    dragOverItem.current = undefined;
  };

  const handleEditItem = (id: number, todo: Partial<Todo>) => {
    if (isDragging.current) return;
    setClickedId(id);
    timeRef.current = setTimeout(() => {
      setIsEdit(true);
      console.log(id, todo);
      /*
      setCurrentTodo({
        text: todo.text,
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

  return (
    <div className="w-full">
      <ul>
        {todoItemList.map((todo, index) => (
          <li key={todo.id}>
            <div className="flex items-center justify-center">
              {isEdit && clickedId === todo.id ? (
                <span className={`mr-5 flex-grow`} onClick={() => handleCompletedItem(todo.id)}>
                  <input className="ml-[10px] border-2 border-solid w-[200px]" type="text" name="search input"></input>
                </span>
              ) : (
                <span
                  className={`mr-5 flex-grow ${todo.completed ? "line-through text-gray-400" : ""}`}
                  onClick={() => handleCompletedItem(todo.id)}
                  onMouseDown={() => handleEditItem(todo.id, todo)}
                  onMouseUp={handleEditCancel}
                  onMouseLeave={handleEditCancel}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragEnter={() => handleDragEnter(index)}
                  onDragEnd={handleDragEnd}
                >
                  {todo.text}
                </span>
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

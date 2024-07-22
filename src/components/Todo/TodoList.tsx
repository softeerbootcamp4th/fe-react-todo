import { useState, useRef, ChangeEvent } from "react";
import { Todo } from "@/types/todoType";
import { patchTodo } from "@/apis/todoList";
import { useTodoContext } from "@/hooks/useTodoContext";
import { patchTodoSplice, getTodoList } from "@/apis/todoList";
import { postLog } from "@/apis/Log";

function TodoList() {
  const { isEdit, todoItemList, setTodoItemList, setIsEdit, handleDeleteTodoItem, updateLogList } = useTodoContext();
  const timeRef = useRef<NodeJS.Timeout | null>(null);
  const [clickedId, setClickedId] = useState(0);
  const dragItem = useRef<number | undefined>();
  const dragOverItem = useRef<number | undefined>();
  const isDragging = useRef(false);

  const [editText, setEditText] = useState("");

  const handleEditText = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEditText(e.target.value);
  };

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
    }, 2000);
  };

  const handleEditCancel = () => {
    if (timeRef.current) {
      clearTimeout(timeRef.current);
      timeRef.current = null;
      setIsEdit(false);
    }
  };

  const patchEditText = (id: number) => {
    patchTodo(id, { text: editText });
    postLog({ log: "수정", todoItem: editText });
    updateLogList();
    const updatedTodoList = todoItemList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, text: editText };
      }
      return todo;
    });
    setEditText("");
    setTodoItemList(updatedTodoList);
    setIsEdit(false);
  };
  return (
    <div className="w-full h-[450px]">
      <ul className="overflow-y-scroll h-full flex-col">
        {todoItemList.map((todo, index) => (
          <li key={todo.id} className="mb-4 p-4 border border-gray-200 rounded shadow-sm">
            <div className="flex items-center justify-between">
              {isEdit && clickedId === todo.id ? (
                <>
                  <span className="mr-5 flex-grow" onClick={() => handleCompletedItem(todo.id)}>
                    <input
                      className="ml-2 border-2 border-solid w-48"
                      type="text"
                      name="text edit"
                      onChange={handleEditText}
                    />
                  </span>
                  <button
                    className="border-1 border-solid bg-blue-300 text-white py-1 px-3 rounded"
                    onClick={() => patchEditText(todo.id)}
                  >
                    수정
                  </button>
                </>
              ) : (
                <>
                  <span
                    className={`mr-5 flex-grow ${todo.completed ? "line-through text-gray-400" : ""}`}
                    onClick={() => handleCompletedItem(todo.id)}
                    onMouseDown={() => handleEditItem(todo.id, todo)}
                    onMouseUp={handleEditCancel}
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragEnter={() => handleDragEnter(index)}
                    onDragEnd={handleDragEnd}
                  >
                    {todo.text}
                  </span>
                  <button
                    className="border-1 border-solid bg-blue-300 text-white py-1 px-3 rounded"
                    onClick={() => handleDeleteTodoItem(todo.id, todo.text)}
                  >
                    삭제
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;

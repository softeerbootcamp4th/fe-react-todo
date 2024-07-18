import { Fragment, useEffect, useRef, useState } from "react"
import { getData } from "/utils/db";
import Todo from "/components/todo";
import DropLocation from "../components/dropLocation";
import TodoForm from "../components/todoForm";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [editTodoId, setEditTodoId] = useState("");
  const timerRef = useRef(null);
  const [draggedTodoId, setDraggedTodoId] = useState("");

  useEffect(() => {
    getData().then((data) => {
      setTodoList(data);
    });
  }, [])

  return (
    <div className="h-full min-h-screen flex justify-center bg-green-100">
      <div className="mt-16 max-w-xl w-full h-fit p-7 flex flex-col items-center border border-slate-300 rounded-2xl bg-slate-50">
        <span
          className="font-bold text-3xl mb-5">My Todo App
        </span>

        <TodoForm
          todoList={todoList}
          setTodoList={setTodoList} />

        <div className="w-full flex flex-col">
          <DropLocation
            draggedTodoId={draggedTodoId}
            frontId=""
            todoList={todoList}
            setTodoList={setTodoList} />

          {todoList.map((todo) => (
            <Fragment key={todo.id}>
              <Todo todo={todo}
                todoList={todoList}
                setTodoList={setTodoList}
                timerRef={timerRef}
                editTodoId={editTodoId}
                setEditTodoId={setEditTodoId}
                draggedTodoId={draggedTodoId}
                setDraggedTodoId={setDraggedTodoId} />

              <DropLocation
                draggedTodoId={draggedTodoId}
                frontId={todo.id}
                todoList={todoList}
                setTodoList={setTodoList} />
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App

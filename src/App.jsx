import { Fragment, useEffect, useRef, useState } from "react"
import { getData, getHistory } from "/utils/db";
import Todo from "/components/todo";
import DropLocation from "../components/dropLocation";
import TodoForm from "../components/todoForm";
import History from "../components/history";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [editTodoId, setEditTodoId] = useState("");
  const timerRef = useRef(null);
  const [draggedTodoId, setDraggedTodoId] = useState("");
  const [historyList, setHistoryList] = useState([]);
  const [overLocationIdx, setOverLocationIdx] = useState(null);

  useEffect(() => {
    getData().then((data) => {
      setTodoList(data);
    });
    getHistory().then((data) => {
      setHistoryList(data)
    });
  }, [])

  return (
    <div className="pt-16 h-full gap-5 min-h-screen flex justify-center bg-green-100">
      <div className="max-w-xl w-full h-fit p-7 flex flex-col items-center border border-slate-300 rounded-2xl bg-slate-50">
        <span
          className="font-bold text-3xl mb-5">My Todo App
        </span>

        <TodoForm
          todoList={todoList}
          setTodoList={setTodoList}
          historyList={historyList}
          setHistoryList={setHistoryList} />

        <div className="w-full flex flex-col">
          <DropLocation
            draggedTodoId={draggedTodoId}
            overLocationIdx={overLocationIdx}
            setOverLocationIdx={setOverLocationIdx}
            idx={-1}
            todoList={todoList}
            setTodoList={setTodoList} />

          {todoList.map((todo, index) => (
            <Fragment key={todo.id}>
              <Todo todo={todo}
                todoList={todoList}
                setTodoList={setTodoList}
                timerRef={timerRef}
                editTodoId={editTodoId}
                setEditTodoId={setEditTodoId}
                draggedTodoId={draggedTodoId}
                historyList={historyList}
                setHistoryList={setHistoryList}
                setDraggedTodoId={setDraggedTodoId}
                setOverLocationIdx={setOverLocationIdx}
              />

              <DropLocation
                draggedTodoId={draggedTodoId}
                todoList={todoList}
                idx={index}
                overLocationIdx={overLocationIdx}
                setOverLocationIdx={setOverLocationIdx}
                setTodoList={setTodoList} />
            </Fragment>
          ))}
        </div>
      </div>

      <History
        historyList={historyList}
        setHistoryList={setHistoryList} />
    </div>
  )
}

export default App

import { Fragment, useEffect, useRef, useState } from "react"
import { getData, pushData } from "/utils/db";
import Todo from "/components/todo";
import DropLocation from "../components/dropLocation";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [formString, setFormString] = useState("");
  const [editTodoId, setEditTodoId] = useState("");
  const timerRef = useRef(null);
  const [draggedTodoId, setDraggedTodoId] = useState("");

  useEffect(() => {
    getData().then((data) => {
      setTodoList(data);
    });
  }, [])

  function onChangeForm(e) {
    const string = e.target.value;
    setFormString(string);
  };

  function onClickPush(e) {
    e.preventDefault();
    if (formString) {
      pushData({ title: formString, completed: false }).then((newId) => {
        setTodoList([...todoList, { id: newId, title: formString, completed: false }]);
      });
    }
    setFormString("");
  };

  return (
    <div className="h-screen flex justify-center bg-green-100">
      <div className="mt-16 max-w-xl w-full h-fit p-7 flex flex-col items-center border border-slate-300 rounded-2xl bg-slate-50">
        <span
          className="font-bold text-3xl mb-5">My Todo App
        </span>

        <form
          className="mb-4">
          <input
            value={formString}
            placeholder="할일을 입력하세요"
            onChange={onChangeForm}
            type="text"
            className="border border-slate-400 bg-slate-50 focus:bg-white px-3 py-1 rounded-xl mr-5" />
          <button
            onClick={onClickPush}
            className="bg-green-700 text-white px-3 py-1 rounded-xl hover:bg-green-900 transition">
            등록
          </button>
        </form>

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

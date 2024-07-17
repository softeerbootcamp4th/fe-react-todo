import { Fragment, useEffect, useRef, useState } from "react"
import { getData, pushData } from "/utils/db";
import Todo from "/components/todo";
import DropLocation from "../components/dropLocation";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [formString, setFormString] = useState("");
  const [editTodoId, setEditTodoId] = useState("");
  // const [isLongPress, setIsLongPress] = useState(false);
  const timerRef = useRef(null);
  const dragStartTodo = useRef("");

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
      pushData({ title: formString, completed: false, }).then((newId) => {
        setTodoList([...todoList, { id: newId, title: formString }]);
      });
    }
    setFormString("");
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="relative w-96 p-5 gap-3 flex flex-col items-center border border-gray-500">
        <span>My Todo App</span>

        <form>
          <input
            value={formString}
            placeholder="할일을 입력하세요"
            onChange={onChangeForm}
            type="text"
            className="border border-black" />
          <button
            onClick={onClickPush}
            className="bg-green-700 text-white">
            등록
          </button>
        </form>

        <div className="w-full flex flex-col gap-4">
          <DropLocation dragStartTodo={dragStartTodo} frontId="" todoList={todoList} setTodoList={setTodoList} />

          {todoList.map((todo) => (
            <Fragment key={todo.id}>
              <Todo todo={todo} todoList={todoList} setTodoList={setTodoList} timerRef={timerRef} editTodoId={editTodoId} setEditTodoId={setEditTodoId} dragStartTodo={dragStartTodo} />

              <DropLocation dragStartTodo={dragStartTodo} frontId={todo.id} todoList={todoList} setTodoList={setTodoList} />
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App

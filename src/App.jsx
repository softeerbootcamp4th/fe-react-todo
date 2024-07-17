import { useEffect, useRef, useState } from "react"
import { getData, pushData } from "/utils/db";
import Todo from "/components/todo";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [formString, setFormString] = useState("");
  // const [isLongPress, setIsLongPress] = useState(false);
  const timerRef = useRef(null);

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
      <div className="w-96 p-5 flex flex-col items-center border border-gray-500">
        <span>My Todo App</span>

        <form>
          <input value={formString} placeholder="할일을 입력하세요" onChange={onChangeForm} type="text" className="border border-black" />
          <button onClick={onClickPush} className="bg-green-700 text-white">
            등록
          </button>
        </form>

        {todoList.map((todo) => (
          <Todo key={todo.id} todo={todo} todoList={todoList} setTodoList={setTodoList} timerRef={timerRef} />
        ))}
      </div>
    </div>
  )
}

export default App

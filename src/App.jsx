import { useEffect, useState } from "react"
import { getData, pushData, popData, modifyData } from "/utils/db";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [formString, setFormString] = useState("");

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

  function onClickPop(id, e) {
    e.preventDefault();
    setTodoList(todoList.filter((todo) => todo.id !== id));
    popData(id);
  }

  function onClickCompleted(id) {
    setTodoList(todoList.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
    modifyData(id, { completed: !todoList.find((todo) => todo.id === id).completed });
  }

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
          <div key={todo.id} className="w-full flex justify-between">
            <span className={`${todo.completed ? "line-through" : ""}`} onClick={() => { onClickCompleted(todo.id); }}>
              {todo.title}
            </span>
            <button onClick={(e) => { onClickPop(todo.id, e); }} className="bg-blue-700 text-white">
              삭제
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App

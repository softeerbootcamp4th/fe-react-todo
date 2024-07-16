import { useEffect, useState } from "react"
import { getData, pushData, popData } from "/utils/db";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [formString, setFormString] = useState("");

  useEffect(() => {
    getData().then((data) => {
      setTodoList(data);
    });
  }, [])

  function onFormChange(e) {
    const string = e.target.value;
    setFormString(string);
  };

  function onClickPush(e) {
    e.preventDefault();
    if (formString) {
      pushData({ title: formString }).then((newId) => {
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

  return (
    <div className="flex justify-center">
      <div className="max-w-3xl border border-gray-500">
        <span>My Todo App</span>

        <form>
          <input value={formString} onChange={onFormChange} type="text" className="border border-black" />
          <button onClick={onClickPush} className="bg-green-700 text-white">등록</button>
        </form>

        {todoList.map((todo) => (
          <div key={todo.id}>
            <span>{todo.title}</span>
            <button onClick={(e) => { onClickPop(todo.id, e); }} className="bg-blue-700 text-white">삭제</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App

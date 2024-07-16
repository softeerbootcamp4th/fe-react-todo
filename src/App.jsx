import { useState } from "react"

function App() {
  const [todoList, setTodoList] = useState([]);
  const [formString, setFormString] = useState("");

  function onFormChange(e) {
    const string = e.target.value;
    setFormString(string);
  };

  function onButtonClick(e) {
    e.preventDefault();
    if (formString) {
      setTodoList([...todoList, formString]);
    }
    setFormString("");
  };

  console.log(todoList);

  return (
    <div className="flex justify-center">
      <div className="max-w-3xl border border-gray-500">
        <span>My Todo App</span>

        <form>
          <input value={formString} onChange={onFormChange} type="text" className="border border-black" />
          <button onClick={onButtonClick}>등록</button>
        </form>

        {todoList.map((todo, idx) => (
          <div key={idx}>
            {todo}
          </div>
        ))}
      </div>
    </div>
  )
}

export default App

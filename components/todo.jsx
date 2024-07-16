import { popData, modifyData } from "/utils/db";

export default function Todo({todo, todoList, setTodoList, timerRef}) {
  function onClickPop(id, e) {
    e.preventDefault();
    setTodoList(todoList.filter((todo) => todo.id !== id));
    popData(id);
  }

  function onClickCompleted(id) {
    setTodoList(todoList.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
    modifyData(id, { completed: !todoList.find((todo) => todo.id === id).completed });
  }

  function startPress(id) {
    timerRef.current = setTimeout(() => {
      //setIsLongPress(true);
      console.log("2초", id);
    }, 2000);
  }

  function endPress() {
    clearTimeout(timerRef.current);
  }

  return (
    <div className="w-full flex justify-between">
      <span
        onMouseDown={() => { startPress(todo.id); }}
        onMouseUp={endPress}
        onMouseLeave={endPress}
        onClick={() => { onClickCompleted(todo.id); }}
        className={`cursor-pointer ${todo.completed ? "line-through" : ""}`} >
        {todo.title}
      </span>

      <input
        type="text"
        placeholder="수정하기"
        className="border border-gray-500" />

      <button
        onClick={(e) => { onClickPop(todo.id, e); }}
        className="bg-blue-700 text-white">
        삭제
      </button>
    </div>
  );
}
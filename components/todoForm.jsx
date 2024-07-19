import { useEffect, useState } from "react";
import { pushData, pushHistory } from "../utils/db";
import { getRecentTodo, pushRecentTodo } from "../utils/local";

export default function TodoForm({ todoList, setTodoList, historyList, setHistoryList }) {
  const [formString, setFormString] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [recentTodoList, setRecentTodoList] = useState([]);

  useEffect(() => {
    setRecentTodoList(getRecentTodo());
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
      const newHistory = { date: new Date(), before: "", after: formString };
      pushRecentTodo(formString);
      setRecentTodoList(getRecentTodo());
      pushHistory(newHistory);
      setHistoryList([newHistory, ...historyList]);
      setFormString("");
    }
  };

  return (
    <form
      className="mb-4 flex">
      <div
        className="relative w-full mr-5">
        <input
          value={formString}
          placeholder="할일을 입력하세요"
          onChange={onChangeForm}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          type="text"
          className={`w-full border border-slate-400 bg-slate-50 focus:bg-white px-3 py-1 ${isFocused ? "rounded-t-xl" : "rounded-xl"} mr-5`} />

        <div
          className={`w-full bg-white border border-slate-300 shadow rounded-b-xl py-2 px-2 ${isFocused ? "absolute" : "hidden"}`}>
          <span
            className="text-gray-400 text-sm px-2">
            최근 할일
          </span>

          {recentTodoList.map((todo, index) =>
            <li
              key={index}
              onMouseOver={() => setFormString(todo)}
              className="list-none w-full hover:bg-sky-100 transition duration-300 ease-out rounded px-2">
              {todo}
            </li>
          )}
        </div>
      </div>

      <button
        onClick={onClickPush}
        className="bg-green-700 shrink-0 w-14 text-white px-3 py-1 rounded-xl hover:bg-green-900 transition">
        등록
      </button>
    </form>
  );
}
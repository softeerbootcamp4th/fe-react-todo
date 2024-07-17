import { useState } from "react";
import { popData, modifyData } from "/utils/db";

export default function Todo({ todo, todoList, setTodoList, timerRef, editTodoId, setEditTodoId }) {
  const [editString, setEditString] = useState("");

  function onClickPop(id, e) {
    e.preventDefault();
    setTodoList(todoList.filter((todo) => todo.id !== id));
    popData(id);
  }

  function onClickCompleted() {
    setTodoList(todoList.map((_todo) => _todo.id === todo.id ? { ..._todo, completed: !_todo.completed } : _todo));
    modifyData(todo.id, { completed: !todoList.find((_todo) => _todo.id === todo.id).completed });
  }

  function startPress() {
    timerRef.current = setTimeout(() => {
      //setIsLongPress(true);
      setEditTodoId(todo.id);
      setEditString(todo.title);
    }, 2000);
  }

  function onChangeEdit(e) {
    const string = e.target.value;
    setEditString(string);
  }

  function endPress() {
    clearTimeout(timerRef.current);
  }

  function onClickEditConfirm() {
    if (editString) {
      modifyData(todo.id, { title: editString });
      setEditTodoId("");
      setTodoList(todoList.map((_todo) => _todo.id === todo.id ? { ..._todo, title: editString } : _todo));
    }
  }

  return (
    <div className="w-full p-2 flex justify-between border border-gray-400">
      <span
        onMouseDown={startPress}
        onMouseUp={endPress}
        onMouseLeave={endPress}
        onClick={onClickCompleted}
        className={`cursor-pointer ${todo.completed ? "line-through" : ""} ${editTodoId === todo.id ? "hidden" : ""}`} >
        {todo.title}
      </span>

      <div className={`${editTodoId !== todo.id ? "hidden" : ""}`}>
        <input
          type="text"
          placeholder="수정하기"
          value={editString}
          onChange={onChangeEdit}
          className="border border-gray-500" />

        <button
          onClick={onClickEditConfirm}
        >
          확인
        </button>

        <button
          onClick={() => setEditTodoId("")}
          className="">
          취소
        </button>
      </div>

      <button
        onClick={(e) => { onClickPop(todo.id, e); }}
        className="bg-blue-700 text-white">
        삭제
      </button>
    </div>
  );
}
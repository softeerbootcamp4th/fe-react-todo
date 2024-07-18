import { useState } from "react";
import { popData, modifyData, pushHistory } from "/utils/db";

export default function Todo({ todo, todoList, setTodoList, timerRef, draggedTodoId, setDraggedTodoId, editTodoId, setEditTodoId, setHistoryList, historyList }) {
  const [editString, setEditString] = useState("");
  //const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  function onClickPop() {
    setTodoList(todoList.filter((_todo) => _todo.id !== todo.id));
    popData(todo.id);

    const newHistory = { date: new Date(), before: todo.title, after: "" };
    setHistoryList([newHistory, ...historyList]);
    pushHistory(newHistory);
  }

  function onClickCompleted() {
    setTodoList(todoList.map((_todo) => _todo.id === todo.id ? { ..._todo, completed: !_todo.completed } : _todo));
    modifyData(todo.id, { completed: !todoList.find((_todo) => _todo.id === todo.id).completed });
  }

  function startPress() {
    timerRef.current = setTimeout(() => {
      setEditTodoId(todo.id);
      setEditString(todo.title);
    }, 2000);
  }

  function onChangeEdit(e) {
    const string = e.target.value;
    setEditString(string);
  }

  function endLongPress() {
    clearTimeout(timerRef.current);
  }

  function onClickEditConfirm() {
    if (editString) {
      modifyData(todo.id, { title: editString });
      setEditTodoId("");
      setTodoList(todoList.map((_todo) => _todo.id === todo.id ? { ..._todo, title: editString } : _todo));

      const newHistory = { date: new Date(), before: todo.title, after: editString };
      setHistoryList([newHistory, ...historyList]);
      pushHistory(newHistory);
    }
  }

  function onDragStartTodo() {
    setDraggedTodoId(todo.id);
  }

  function onDragTodo() {
    // setMousePosition({ x: e.clientX, y: e.clienY });
  }

  return (
    <div
      draggable={!editTodoId}
      onDragStart={onDragStartTodo}
      onDrag={onDragTodo}
      onDragEnd={() => setDraggedTodoId("")}
      onDragLeave={endLongPress}
      className={`transition flex items-center justify-between ${draggedTodoId === todo.id ? "" : ""}`}>
      <span
        onMouseDown={startPress}
        onMouseUp={endLongPress}
        onMouseLeave={endLongPress}
        onClick={onClickCompleted}
        className={`cursor-pointer text-xl ${todo.completed ? "line-through" : ""} ${editTodoId === todo.id ? "hidden" : ""}`} >
        {todo.title}
      </span>

      <div className={`flex items-center ${editTodoId !== todo.id ? "hidden" : ""}`}>
        <input
          type="text"
          placeholder="수정하기"
          value={editString}
          onChange={onChangeEdit}
          className="px-2 py-1 text-xl rounded-xl mr-1 border border-gray-300" />

        <button
          onClick={onClickEditConfirm}
          className="px-2 py-1 mr-1 rounded-xl bg-cyan-700 hover:bg-cyan-900 transition text-white">
          확인
        </button>

        <button
          onClick={() => setEditTodoId("")}
          className="px-2 py-1 mr-1 rounded-xl bg-orange-600 hover:bg-red-600 transition text-white">
          취소
        </button>
      </div>

      <button
        onClick={onClickPop}
        className="rounded-lg px-2 py-1 bg-sky-600 text-white hover:bg-sky-800 transition">
        삭제
      </button>
    </div>
  );
}
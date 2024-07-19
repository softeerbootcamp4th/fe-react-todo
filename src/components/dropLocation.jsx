import { replaceAllData } from "../utils/db";

export default function DropLocation({ draggedTodoId, todoList, setTodoList, idx, overLocationIdx, setOverLocationIdx }) {

  function onDropTodo(e) {
    e.preventDefault();

    const draggedTodo = todoList.find((todo) => todo.id === draggedTodoId);
    let tempList = idx >= 0 ? [] : [draggedTodo];

    for (let i = 0; i < todoList.length; i++) {
      if (todoList[i].id !== draggedTodoId) {
        tempList = [...tempList, todoList[i]];
      }
      if (i === idx) {
        tempList = [...tempList, draggedTodo];
      }
    }
    setTodoList(tempList);
    replaceAllData(tempList);
  }

  function onDragOver(e) {
    e.preventDefault();
    setOverLocationIdx(idx);
  }

  return (
    <div
      className="h-10 flex items-center"
      onDragOver={onDragOver}
      onDragLeave={() => setOverLocationIdx(null)}
      onDrop={onDropTodo}>
      <div className={`w-full tranision duration-300 ease-out ${overLocationIdx === idx ? "shadow-sm shadow-cyan-200 bg-cyan-200 h-1" : "h-px  bg-slate-200"}`}>
      </div>
    </div>
  );
}
import { replaceAllData } from "../utils/db";

export default function DropLocation({ draggedTodoId, frontId, todoList, setTodoList, idx, overLocationIdx, setOverLocationIdx }) {

  function onDropTodo(e) {
    e.preventDefault();

    const draggedTodo = todoList.find((todo) => todo.id === draggedTodoId);
    let tempList = frontId ? [] : [draggedTodo];
    todoList.forEach((todo) => {
      if (todo.id !== draggedTodoId) {
        tempList = [...tempList, todo];
      }
      if (todo.id === frontId) {
        tempList = [...tempList, draggedTodo];
      }
    })
    setTodoList(tempList);
    replaceAllData(tempList);
  }

  return (
    <div
      className="h-5 flex items-center"
      onDragOver={(e) => { e.preventDefault() }}
      onDragEnter={() => setOverLocationIdx(idx)}
      onDragLeave={() => setOverLocationIdx(null)}
      onDrop={onDropTodo}>
      <div className={`w-full outline ${overLocationIdx === idx ? "outline-blue-300 outline-2" : "outline-slate-200 outline-1"}`}>
      </div>
    </div>
  );
}
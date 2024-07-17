import { replaceAllData } from "../utils/db";

export default function DropLocation({ draggedTodoId, frontId, todoList, setTodoList }) {

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
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDropTodo}>
      <div className={`w-full outline outline-1 outline-slate-200 ${draggedTodoId ? "outline-blue-300" : ""}`}>
      </div>
    </div>
  );
}
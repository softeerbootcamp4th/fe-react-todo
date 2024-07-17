import { replaceAllData } from "../utils/db";

export default function DropLocation({ draggedTodoId, frontId, todoList, setTodoList, isDragged }) {

  function onDropTodo() {
    const draggedTodo = todoList.find((todo) => todo.id === draggedTodoId.current);
    let tempList = frontId ? [] : [draggedTodo];
    todoList.forEach((todo) => {
      if (todo.id !== draggedTodoId.current) {
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
      className="bg-red-300 h-3"
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDropTodo}>
    </div>
  );
}
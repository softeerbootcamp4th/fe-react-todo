export default function DropLocation({ dragStartTodo, frontId, todoList, setTodoList }) {

  function onDropTodo() {
    console.log(dragStartTodo.current, frontId, todoList);
  }

  return (
    <div
      className="bg-red-300 h-3"
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDropTodo}>
    </div>
  );
}
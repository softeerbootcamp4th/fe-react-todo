import SearchInput from "./SearchInput";
import TodoList from "./TodoList";

function Todo() {
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col items-center p-2 w-[500px]">
        <SearchInput />
        <TodoList />
      </div>
    </div>
  );
}

export default Todo;

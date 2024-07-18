import { useState, ChangeEvent } from "react";
import { postTodo } from "@/apis/todoList";
import { useTodoContext } from "@/hooks/useTodoContext";

function SearchInput() {
  const [newItem, setNewItem] = useState<string>("");
  const { updateTodoList } = useTodoContext();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNewItem(e.target.value);
  };

  const handleNewItem = async () => {
    try {
      await postTodo({ text: newItem, completed: false });
      updateTodoList();
      setNewItem("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="justify-center items-center ml-2 w-[250px] flex-row p-2">
      <input
        className="ml-[10px] border-2 border-solid w-[160px]"
        type="text"
        name="search input"
        value={newItem}
        onChange={handleInputChange}
        placeholder="할일을 입력하세요"
      />
      <button className=" bg-green-600 text-white ml-[10px]" onClick={handleNewItem}>
        등록
      </button>
    </div>
  );
}

export default SearchInput;

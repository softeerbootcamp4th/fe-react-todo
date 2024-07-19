import { useState, ChangeEvent, useEffect } from "react";
import { postTodo } from "@/apis/todoList";
import { postLog } from "@/apis/Log";
import { useTodoContext } from "@/hooks/useTodoContext";

function SearchInput() {
  const [newItem, setNewItem] = useState<string>("");
  const { updateTodoList, updateLogList } = useTodoContext();
  const [searchList, setSearchList] = useState<string[]>();

  useEffect(() => {
    const searchResult = localStorage.getItem("Search");
    if (localStorage.getItem("Search")) {
      setSearchList(JSON.parse(searchResult ?? "") as string[]);
    }
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setNewItem(e.target.value);
  };

  const handleNewItem = async () => {
    try {
      if (newItem.trim() === "") return;
      await postTodo({ text: newItem, completed: false });
      await postLog({ log: "등록", todoItem: newItem });
      updateTodoList();
      updateLogList();
      let updatedSearchResult = [newItem, ...(searchList || [])];
      if (updatedSearchResult.length > 5) {
        updatedSearchResult = updatedSearchResult.slice(5);
      }
      setSearchList(updatedSearchResult);
      localStorage.setItem("Search", JSON.stringify(updatedSearchResult));
      setNewItem("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="justify-center items-center ml-2 w-[300px] flex-row p-2">
      <input
        className="ml-[10px] border-2 border-solid w-[200px] rounded"
        type="text"
        name="search input"
        value={newItem}
        onChange={handleInputChange}
        placeholder="할일을 입력하세요"
      />
      <button className=" bg-green-600 text-white ml-[10px] rounded px-2 py-1" onClick={handleNewItem}>
        등록
      </button>
    </div>
  );
}

export default SearchInput;

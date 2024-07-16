import { useState, useEffect } from "react";
import Todo from "../../types/todoType";
import { fetchToDoList } from "../../apis/fetch";
import { handleDelete } from "../../apis/fetch";

function TodoList() {

  const [todoItemList, setTodoItemList] = useState<Todo[]>([]);

  const handleDeleteTodoItem = (id: number) => {
    //콜백으로 설정?
    handleDelete(id);  
    setTodoItemList(prevTodoList => prevTodoList.filter(todo => todo.id !== id));
  }

  const handleCompletedItem = (id : number) => {
    const updatedTodoList = todoItemList.map(todo => {
      if(todo.id === id){
        return {...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodoItemList(updatedTodoList);
  }

  const getTodoList = async () => {
    const data = await fetchToDoList();
    setTodoItemList(data);
};

  useEffect(() => {
    getTodoList();
  },[]);

  return (
    <div className="w-full">
        <ul>
        {todoItemList.map(todo => (
          <li key={todo.id}>
            <div className="flex items-center justify-center" >
              <p
                className={`mr-5 flex-grow ${todo.completed ? 'line-through text-gray-400' : ''}`}
                onClick={() => handleCompletedItem(todo.id)}>{todo.text}
              </p>
              <button className=" border-blue-300" onClick={() => handleDeleteTodoItem(todo.id)} >
                  삭제
              </button>
            </div>
            <div className="h-[0.5px] bg-green-300"></div>
          </li>
        ))}
        </ul>
    </div>
  )
}

export default TodoList
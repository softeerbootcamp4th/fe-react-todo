import { useState, useEffect } from "react";
import { BASE_URL } from "../../apis/fetch";
import Todo from "../../types/todoType";

function TodoList() {

  const [todoItemList, setTodoItemList] = useState<Todo[]>([]);

  const handleDeleteTodoItem = async (id: number) => {
    try {
      await fetch(`${BASE_URL}/todos/${id}`, {
        method: 'DELETE',
      });
  
      setTodoItemList(prevTodoList => prevTodoList.filter(todo => todo.id !== id));
  
      console.log('삭제 완료');
    } catch (error) {
      console.error('오류 발생', error);
    }
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

  const fetchToDoList = async () => {
    try {
      const response = await fetch(`${BASE_URL}/todos`);
      const data = await response.json();
      setTodoItemList(data);
    } catch (error) {
      console.error('오류 발생', error);
    }
  };

  useEffect(() => {
    fetchToDoList();
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
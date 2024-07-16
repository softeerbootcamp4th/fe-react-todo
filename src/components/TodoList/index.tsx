import { useEffect, useState } from "react";
import { TodoAPI } from "../../apis/todoAPI";
import TodoItem from "../TodoItem";
import { TodoItemType } from "../../types/todo";

function TodoList() {
    const [todoList, setTodoList] = useState<TodoItemType[]>([]);

    useEffect(() => {
        getTodoList();
    }, []);

    const getTodoList = async () => {
        const data = await TodoAPI.get();
        setTodoList(data);
    };

    return (
        <ul className="grow overflow-auto">
            {todoList.map(todo => (
                <TodoItem key={todo.id} todo={todo} />
            ))}
        </ul>
    );
}

export default TodoList;

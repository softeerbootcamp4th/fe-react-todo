import { useEffect } from "react";
import TodoItem from "../TodoItem";
import { useTodoList } from "../../hooks/useTodoList";

function TodoList() {
    const { todoList, getTodoList } = useTodoList();

    useEffect(() => {
        getTodoList();
    }, []);

    return (
        <ul className="grow overflow-auto">
            {todoList.map((todo: any) => (
                <TodoItem key={todo.id} todo={todo} />
            ))}
        </ul>
    );
}

export default TodoList;

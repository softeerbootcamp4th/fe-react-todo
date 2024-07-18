import { useEffect, useRef } from "react";
import TodoItem from "../TodoItem";
import { useTodoList } from "../../hooks/useTodoList";
import { TodoItemType } from "../../types/todo";

function TodoList() {
    const { todoList, getTodoList, isEditing } = useTodoList();

    const scrollRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        getTodoList();
    }, []);

    useEffect(() => {
        if (!isEditing && scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [todoList]);

    return (
        <ul ref={scrollRef} className="w-full grow overflow-auto">
            {todoList.map((todo: TodoItemType) => (
                <TodoItem key={todo.id} todo={todo} />
            ))}
        </ul>
    );
}

export default TodoList;

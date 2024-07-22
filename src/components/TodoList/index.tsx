import { DragEvent, useEffect, useRef, useState } from "react";
import TodoItem from "../TodoItem";
import { useTodoList } from "../../hooks/useTodoList";
import { TodoItemType } from "../../types/todo";

function TodoList() {
    const { todoList, updateTodoList, getTodoList, isSubmitted, setIsSubmitted } = useTodoList();
    const scrollRef = useRef<HTMLUListElement>(null);
    const [draggingItem, setDraggingItem] = useState<string | null>(null);

    useEffect(() => {
        getTodoList();
    }, []);

    useEffect(() => {
        if (isSubmitted && scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
            setIsSubmitted(false);
        }
    }, [isSubmitted]);

    const handleDragStart = (id: string) => {
        setDraggingItem(id);
    };

    const handleDragOver = (e: DragEvent<HTMLLIElement>) => {
        e.preventDefault();
    };

    const handleDrop = async (e: DragEvent<HTMLLIElement>, id: string) => {
        e.preventDefault();

        const draggedItem = todoList.find(todo => todo.id === draggingItem);
        if (!draggedItem) return;

        const remainingItems = todoList.filter(todo => todo.id !== draggingItem);

        const rect = e.currentTarget.getBoundingClientRect();
        const offset = e.clientY - rect.top;

        const offsetIdx = offset >= rect.height / 2 ? 1 : 0;
        const dropIndex = remainingItems.findIndex(todo => todo.id === id) + offsetIdx;

        const updatedItems = [
            ...remainingItems.slice(0, dropIndex),
            draggedItem,
            ...remainingItems.slice(dropIndex),
        ];

        await updateTodoList(updatedItems);
        await getTodoList();
        setDraggingItem(null);
    };

    return (
        <ul ref={scrollRef} className="w-full grow overflow-y-scroll">
            {todoList.map((todo: TodoItemType) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    handleDragStart={handleDragStart}
                    handleDragOver={handleDragOver}
                    handleDrop={handleDrop}
                />
            ))}
        </ul>
    );
}

export default TodoList;

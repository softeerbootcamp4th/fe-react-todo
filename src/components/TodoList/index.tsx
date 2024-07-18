import { DragEvent, useEffect, useRef, useState } from "react";
import TodoItem from "../TodoItem";
import { useTodoList } from "../../hooks/useTodoList";
import { TodoItemType } from "../../types/todo";

function TodoList() {
    const { todoList, updateTodoList, getTodoList, isEditing } = useTodoList();

    const scrollRef = useRef<HTMLUListElement>(null);
    const [draggingItem, setDraggingItem] = useState<string | null>(null); // 드래그 중인 아이템 ID 상태

    useEffect(() => {
        getTodoList();
    }, []);

    useEffect(() => {
        if (!isEditing && scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [todoList]);

    // 드래그 시작 핸들러
    const handleDragStart = (id: string) => {
        setDraggingItem(id); // 드래그 중인 아이템 ID 설정
    };

    // 드래그 오버 핸들러
    const handleDragOver = (e: DragEvent<HTMLLIElement>) => {
        e.preventDefault(); // 기본 동작 방지하여 드롭 가능하게 만듦
    };

    // 드롭 핸들러
    const handleDrop = async (e: DragEvent<HTMLLIElement>, id: string) => {
        e.preventDefault(); // 기본 동작 방지

        // 드래그 중인 아이템 찾기
        const draggedItem = todoList.find(todo => todo.id === draggingItem);

        if (!draggedItem) return; // 드래그 중인 아이템이 없으면 종료

        // 드래그 중인 아이템을 제외한 나머지 아이템들
        const remainingItems = todoList.filter(todo => todo.id !== draggingItem);

        // 드롭할 위치의 인덱스 찾기
        const dropIndex = remainingItems.findIndex(todo => todo.id === id);

        // 새로운 리스트 생성
        const updatedItems = [
            ...remainingItems.slice(0, dropIndex), // 드롭할 위치 앞의 아이템들
            draggedItem, // 드래그 중인 아이템
            ...remainingItems.slice(dropIndex), // 드롭할 위치 뒤의 아이템들
        ];

        // 상태 업데이트
        await updateTodoList(updatedItems);
        await getTodoList();
        setDraggingItem(null); // 드래그 중인 아이템 상태 초기화
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

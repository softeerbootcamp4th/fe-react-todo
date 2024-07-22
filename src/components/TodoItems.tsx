import { css } from "@emotion/react";
import { useTodosContext } from "../hooks/useTodosContext";
import { TodoItem } from "./TodoItem";
import { EditingTodoItem } from "./EditingTodoItem";
import { useState } from "react";

export const TodoItems = () => {
  const { todos, currentEditingId, updateTodoPosition } = useTodosContext();
  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);

  const [overIndex, setOverIndex] = useState<number | null>(null);
  const handleDragStart = (index: number) => {
    setDraggedItemIndex(index);
  };
  const handleDragOver = (index: number) => {
    if (draggedItemIndex === null) return;
    if (draggedItemIndex === index) return;
    setOverIndex(index);
  };

  const handleDragEnd = () => {
    if (draggedItemIndex != null && overIndex != null) {
      updateTodoPosition(todos[draggedItemIndex], overIndex);
    }
    setOverIndex(null);
    setDraggedItemIndex(null);
  };

  return (
    <ul
      css={css`
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 100%;
      `}
    >
      {todos.map((todo, index) => {
        const isEditing = todo.id === currentEditingId;
        if (isEditing) {
          return <EditingTodoItem key={`${todo.id}-edit`} todo={todo} />;
        }
        return (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            index={index}
          />
        );
      })}
    </ul>
  );
};

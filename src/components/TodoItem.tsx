import { css } from "@emotion/react";
import { Todo } from "../models/Todo";
import { useTodosContext } from "../hooks/useTodosContext";
import { useLongPress } from "../hooks/useLongPress";
import { Button } from "./Button";

interface TodoItemProps {
  todo: Todo;
  index: number;
  onDragStart: (index: number) => void;
  onDragOver: (index: number) => void;
  onDragEnd: () => void;
}

export const TodoItem = ({
  todo,
  index,
  onDragStart,
  onDragOver,
  onDragEnd,
}: TodoItemProps) => {
  const isCompleted = todo.status === "completed";

  const { updateTodoStatus, setEditingTodoId, removeTodo } = useTodosContext();
  const longPressRef = useLongPress(() => {
    if (isCompleted) return;
    setEditingTodoId(todo.id);
  }, 2000);
  const handleToggleStatus = () => {
    updateTodoStatus({
      ...todo,
      status: isCompleted ? "active" : "completed",
    });
  };

  const handleRemove = () => {
    removeTodo(todo.id);
  };
  return (
    <div
      css={css`
        width: 100%;
        padding: 1rem;
        border-bottom: 1px solid #ccc;
        display: flex;
        gap: 1rem;
        justify-content: space-between;
        align-items: center;
        text-decoration: ${isCompleted ? "line-through" : "none"};
      `}
      draggable
      onDragStart={() => onDragStart(index)}
      onDragOver={() => onDragOver(index)}
      onDragEnd={onDragEnd}
    >
      <span
        css={css`
          cursor: pointer;
          user-select: none;
          font-size: 1.5rem;
        `}
      >
        =
      </span>
      <input
        onClick={handleToggleStatus}
        type="checkbox"
        checked={isCompleted}
        readOnly
      />
      <h3
        css={css`
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          cursor: pointer;
        `}
        ref={longPressRef}
      >
        {todo.title}
      </h3>
      <span
        css={css`
          flex-shrink: 0;
        `}
      >
        <Button variant="error" onClick={handleRemove}>
          삭제
        </Button>
      </span>
    </div>
  );
};

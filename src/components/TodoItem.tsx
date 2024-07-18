import { css } from "@emotion/react";
import { Todo } from "../models/Todo";
import { useTodosContext } from "../hooks/useTodosContext";
import { useLongPress } from "../hooks/useLongPress";

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem = ({ todo }: TodoItemProps) => {
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
        text-decoration: ${isCompleted ? "line-through" : "none"};
      `}
      ref={longPressRef}
    >
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
        `}
      >
        {todo.title}
      </h3>
      <span>
        <button onClick={handleRemove}>삭제</button>
      </span>
    </div>
  );
};

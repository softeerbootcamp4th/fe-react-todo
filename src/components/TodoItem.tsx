import { css } from "@emotion/react";
import { Todo } from "../models/Todo";
import { useTodosContext } from "../hooks/useTodosContext";
import { useLongPress } from "../hooks/useLongPress";

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem = ({ todo }: TodoItemProps) => {
  const isNotCompleted = todo.status === "active";

  const { updateTodoStatus, setEditingTodoId, removeTodo } = useTodosContext();
  const longPressRef = useLongPress(() => {
    if (!isNotCompleted) return;
    setEditingTodoId(todo.id);
  }, 2000);
  const handleComplete = () => {
    updateTodoStatus({
      ...todo,
      status: "completed",
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
        justify-content: space-between;
        text-decoration: ${isNotCompleted ? "none" : "line-through"};
      `}
      ref={longPressRef}
    >
      <h3>{todo.title}</h3>
      <span>
        {isNotCompleted && <button onClick={handleComplete}>완료</button>}
        <button onClick={handleRemove}>삭제</button>
      </span>
    </div>
  );
};

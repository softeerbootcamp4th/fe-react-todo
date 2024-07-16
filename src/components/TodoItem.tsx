import { css } from "@emotion/react";
import { Todo } from "../models/Todo";

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem = ({ todo }: TodoItemProps) => {
  return (
    <div
      css={css`
        width: 100%;
        padding: 1rem;
        border-bottom: 1px solid #ccc;
        display: flex;
        justify-content: space-between;
      `}
    >
      <h3>{todo.title}</h3>
      <button>삭제</button>
    </div>
  );
};

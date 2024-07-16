import { css } from "@emotion/react";
import { useTodosContext } from "../hooks/useTodosContext";
import { TodoItem } from "./TodoItem";

export const TodoItems = () => {
  const { todos } = useTodosContext();

  return (
    <ul
      css={css`
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 100%;
      `}
    >
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

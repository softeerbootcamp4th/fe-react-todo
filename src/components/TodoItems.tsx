import { css } from "@emotion/react";
import { useTodosContext } from "../hooks/useTodosContext";
import { TodoItem } from "./TodoItem";
import { EditingTodoItem } from "./EditingTodoItem";

export const TodoItems = () => {
  const { todos, currentEditingId } = useTodosContext();

  return (
    <ul
      css={css`
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 100%;
      `}
    >
      {todos.map((todo) => {
        const isEditing = todo.id === currentEditingId;
        if (isEditing) {
          return <EditingTodoItem key={`${todo.id}-edit`} todo={todo} />;
        }
        return <TodoItem key={todo.id} todo={todo} />;
      })}
    </ul>
  );
};

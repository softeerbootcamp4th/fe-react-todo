import { css } from "@emotion/react";
import { Todo } from "../models/Todo";
import { ChangeEvent, useState } from "react";
import { useTodosContext } from "../hooks/useTodosContext";
import { Button } from "./Button";

interface EditingTodoItemProps {
  todo: Todo;
}

export const EditingTodoItem = ({ todo }: EditingTodoItemProps) => {
  const [title, setTitle] = useState(todo.title);
  const { editTodo, setEditingTodoId } = useTodosContext();
  const handleEdit = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleCancel = () => {
    setEditingTodoId(null);
  };

  const handleEditComplete = () => {
    editTodo({
      ...todo,
      title: title,
    });
  };
  return (
    <div
      css={css`
        width: 100%;
        padding: 1rem;
        border-bottom: 1px solid #ccc;
        display: flex;
        justify-content: space-between;
        gap: 1rem;
      `}
    >
      <input
        css={css`
          padding: 0.5rem;
          font-size: 1rem;
          width: 100%;
          border-radius: 0.25rem;
        `}
        value={title}
        onChange={handleEdit}
      />
      <span
        css={css`
          display: flex;
          gap: 0.5rem;
          flex-shrink: 0;
        `}
      >
        <Button variant="success" onClick={handleEditComplete}>
          편집
        </Button>
        <Button variant="warning" onClick={handleCancel}>
          취소
        </Button>
      </span>
    </div>
  );
};

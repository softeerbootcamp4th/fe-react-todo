import { css } from "@emotion/react";
import { Todo } from "../models/Todo";
import { ChangeEvent, useState } from "react";
import { useTodosContext } from "../hooks/useTodosContext";

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
      `}
    >
      <input value={title} onChange={handleEdit} />
      <span>
        <button onClick={handleEditComplete}>편집</button>
        <button onClick={handleCancel}>취소</button>
      </span>
    </div>
  );
};

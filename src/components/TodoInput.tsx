import { css } from "@emotion/react";
import { useTodosContext } from "../hooks/useTodosContext";
import { useRef } from "react";

export const TodoInput = () => {
  const { addTodo } = useTodosContext();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddTodo = () => {
    const value = inputRef.current?.value;
    if (!value) {
      alert("할일을 입력하세요");
      return;
    }

    addTodo(value);
    inputRef.current!.value = "";
  };
  return (
    <div
      css={css`
        display: flex;
        width: 100%;
        gap: 1rem;
      `}
    >
      <input
        type="text"
        placeholder="할일을 입력하세요"
        css={css`
          flex: 1;
        `}
        ref={inputRef}
        name="todo"
        autoComplete="on"
      />
      <button onClick={handleAddTodo}>등록</button>
    </div>
  );
};

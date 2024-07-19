import { css } from "@emotion/react";
import { useTodosContext } from "../hooks/useTodosContext";
import { useCallback, useRef, useState } from "react";
import { AutoComplete } from "./AutoComplete";
import { Button } from "./Button";

export const TodoInput = () => {
  const { addTodo, todos } = useTodosContext();

  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const handleAddTodo = () => {
    const value = inputRef.current?.value;
    if (!value) {
      alert("할일을 입력하세요");
      return;
    }

    addTodo(value);
    inputRef.current!.value = "";
  };

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, []);
  const handleSelect = useCallback(
    (item: string) => {
      if (!inputRef.current) return;
      inputRef.current.value = item;
      handleBlur();
    },
    [handleBlur],
  );

  const rect = inputRef.current?.getBoundingClientRect();
  const recentTitles = todos
    .slice(-5)
    .map((todo) => todo.title)
    .reverse();
  return (
    <div
      css={css`
        display: flex;
        width: 100%;
        gap: 1rem;
        position: relative;
      `}
    >
      <input
        type="text"
        placeholder="할일을 입력하세요"
        css={css`
          flex: 1;
          padding: 0.5rem;
        `}
        ref={inputRef}
        name="todo"
        autoComplete="on"
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <Button onClick={handleAddTodo}>등록</Button>
      {isFocused && (
        <AutoComplete
          rect={rect}
          items={recentTitles}
          onSelect={handleSelect}
        />
      )}
    </div>
  );
};

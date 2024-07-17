import { css } from "@emotion/react";
import { TodoInput } from "./components/TodoInput";
import { TodoItems } from "./components/TodoItems";
import { TodosProvider } from "./providers/TodosProvider";

function App() {
  return (
    <TodosProvider>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 100vh;
          padding: 2rem;
        `}
      >
        <h1
          css={css`
            font-size: 4rem;
            font-weight: bold;
            margin-bottom: 2rem;
            text-align: center;
          `}
        >
          My Todo App
        </h1>
        <TodoInput />
        <TodoItems />
      </div>
    </TodosProvider>
  );
}

export default App;

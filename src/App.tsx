import { css } from "@emotion/react";
import { TodoInput } from "./components/TodoInput";
import { TodoItems } from "./components/TodoItems";
import { TodosProvider } from "./providers/TodosProvider";
import { LogItems } from "./components/LogItems";

function App() {
  return (
    <TodosProvider>
      <div
        css={css`
          display: grid;
          grid-template-columns: 500px 1fr;
          gap: 2rem;
          padding: 2rem;
          width: 100vw;
          height: 100vh;
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: column;
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
        <LogItems />
      </div>
    </TodosProvider>
  );
}

export default App;

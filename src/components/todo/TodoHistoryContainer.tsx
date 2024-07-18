import { Suspense } from 'react';
import TodoHistoryList from 'src/components/todo/TodoHistoryList';

function TodoHistoryContainer() {
  return (
    <div className="w-full flex flex-col items-center">
      <h2 className="container-title min-w-max">◕ ‿‿ ◕ History ◕ ‿‿ ◕</h2>
      <div className="mt-3">
        <Suspense fallback="Loading todo history list...">
          <TodoHistoryList />
        </Suspense>
      </div>
    </div>
  );
}

export default TodoHistoryContainer;

import { Suspense } from 'react';
import TodoHistoryList from 'src/components/todo/TodoHistoryList';

function HistoryContainer() {
  return (

    <div className="w-full flex flex-col">
      <h2 className="container-title">◕ ‿‿ ◕ History ◕ ‿‿ ◕</h2>
      <div className="mt-3">
        <Suspense fallback="Loading todo history list...">
          <TodoHistoryList />
        </Suspense>
      </div>
    </div>

  );
}

export default HistoryContainer;

import React from 'react';
import { TodoItem } from 'src/store/types/todoTypes';

interface HistoryContainerProps {
    todoHistory: TodoItem[]
}
function HistoryContainer({ todoHistory } : HistoryContainerProps) {
  return (

    <div className="w-full flex flex-col">
      <p className="font-bold text-4xl mt-3 text-white">◕ ‿‿ ◕ History ◕ ‿‿ ◕</p>
      <div className="mt-3">
        {todoHistory.map(({ title, registerDate, status }, todoIndex) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={`history-${registerDate}-${todoIndex}`}>
            {title}
            {status}
          </div>
        ))}

      </div>
    </div>

  );
}

export default HistoryContainer;

import { TodoItem } from 'src/store/types/todoTypes';

interface HistoryContainerProps {
    todoHistory: TodoItem[]
}
function HistoryContainer({ todoHistory } : HistoryContainerProps) {
  return (

    <div className="w-full flex flex-col">
      <h2 className="container-title">◕ ‿‿ ◕ History ◕ ‿‿ ◕</h2>
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

import { TodoHistory as TodoHistoryType } from 'src/store/types/todoTypes';

interface TodoHistoryProps {
  history: TodoHistoryType;
}

export default function TodoHistory({ history }: TodoHistoryProps) {
  return (
    <div>
      {history.todo.title}
      {history.status}
    </div>
  );
}

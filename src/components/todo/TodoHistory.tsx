import { TodoHistory as TodoHistoryType } from 'src/types/todo';

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

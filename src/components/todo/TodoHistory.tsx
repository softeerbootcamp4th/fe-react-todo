import { TodoHistory as TodoHistoryType } from 'src/types/todo';

interface TodoHistoryProps {
  history: TodoHistoryType;
}

export default function TodoHistory({ history }: TodoHistoryProps) {
  return (
    <div className="p-2 border border-border-primary rounded-xl">
      {history.title}
      {history.status}
    </div>
  );
}

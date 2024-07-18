import { useMemo } from 'react';
import { TodoHistory as TodoHistoryType } from 'src/types/todo';

interface TodoHistoryProps {
  history: TodoHistoryType;
}

export default function TodoHistory({ history: { title, status } }: TodoHistoryProps) {
  const renderStatus = useMemo(() => {
    switch (status) {
      case 'delete':
        return '삭제';
      case 'update':
        return '수정';
      case 'register':
        return '등록';
      default:
        return null;
    }
  }, [status]);

  return (
    <div className="flex justify-between gap-5 w-[200px]">
      <p className="overflow-hidden whitespace-nowrap text-ellipsis">{title}</p>
      <p className="min-w-max">{renderStatus}</p>
    </div>
  );
}

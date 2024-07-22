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

  const statusColorClass = useMemo(() => {
    switch (status) {
      case 'delete':
        return 'red';
      case 'update':
        return 'green';
      case 'register':
        return 'primary';
      default:
        return 'primary';
    }
  }, [status]);

  return (
    <div className={`flex justify-between gap-5 w-[300px] mb-2 border border-border-${statusColorClass} p-1 rounded-xl`}>
      <p className="overflow-hidden whitespace-nowrap text-ellipsis">{title}</p>
      <p className={`text-${statusColorClass} min-w-max`}>{renderStatus}</p>
    </div>
  );
}

import { useSuspenseQuery } from '@tanstack/react-query';
import { TodoHistory } from 'src/store/types/todoTypes';

const mockHistories: TodoHistory[] = [
  {
    id: 1,
    updatedDate: new Date('2022-02-02'),
    todo: {
      id: 1,
      title: 'string',
      registerDate: new Date('2022-02-02'),
    },
    status: '등록',
  },
  {
    id: 2,
    updatedDate: new Date('2022-02-02'),
    todo: {
      id: 1,
      title: 'string',
      registerDate: new Date('2022-02-02'),
    },
    status: '수정',
  },
];

export default function useGetTodoHistoryList() {
  const { data: histories } = useSuspenseQuery({
    queryKey: ['todos-histories'],
    queryFn: () => Promise.resolve(mockHistories),
  });

  return { histories };
}

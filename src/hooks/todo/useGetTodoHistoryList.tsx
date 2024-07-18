import { useSuspenseQuery } from '@tanstack/react-query';
import API from 'src/constants/api';

export default function useGetTodoHistoryList() {
  const { data: histories } = useSuspenseQuery({
    queryKey: ['todos-histories'],
    queryFn: async () => {
      const response = await fetch(API.TODO_HISTORIES);
      return (await response.json()).data.todoHistories;
    },
  });

  return { histories };
}

import { useSuspenseQuery } from '@tanstack/react-query';
import { API, API_HEADER } from 'src/constants/api';

// const mockTodos: TodoItem[] = [{ id: 1, title: 'string', registerDate: new Date('2022-02-02') }];

export default function useGetTodoList() {
  const { data: todos } = useSuspenseQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const response = await fetch(API.TODOS, API_HEADER);
      return (await response.json()).data.todos;
    },
  });

  return { todos };
}

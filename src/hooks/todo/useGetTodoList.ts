import { useSuspenseQuery } from '@tanstack/react-query';
import { TodoItem } from 'src/store/types/todoTypes';

const mockTodos: TodoItem[] = [{ id: 1, title: 'string', registerDate: new Date('2022-02-02') }];

export default function useGetTodoList() {
  const { data: todos } = useSuspenseQuery({
    queryKey: ['todos'],
    queryFn: () => Promise.resolve(mockTodos),
  });

  return { todos };
}

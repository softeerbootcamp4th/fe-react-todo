import { useMutation, useQueryClient } from '@tanstack/react-query';
import API from 'src/constants/api';
import { RecentTodo } from 'src/types/todo';
import { getLocalStorage, setLocalStorage, StorageKeys } from 'src/utils/localStorage';

export default function useCreateTodo() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (title: string) => {
      await fetch(API.TODOS, {
        method: 'POST',
        body: JSON.stringify({ title }),
      });
    },
    onSuccess: () => {
      const todo = {
        todoId: 5,
        title: '임시 최근 생성된 투두',
        registerDate: new Date('2023-02-13'),
      };
      const todos: RecentTodo[] = getLocalStorage(StorageKeys.recentTodo) ?? [];
      const newTodos: RecentTodo[] = [...todos.slice(-4), todo];
      setLocalStorage(StorageKeys.recentTodo, newTodos);

      queryClient.invalidateQueries({ queryKey: ['todos'] });
      queryClient.invalidateQueries({ queryKey: ['todos-histories'] });
    },
  });

  return mutation;
}

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RecentTodo, TodoItem } from 'src/store/types/todoTypes';
import { getLocalStorage, setLocalStorage, StorageKeys } from 'src/utils/localStorage';

export default function useCreateTodo() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (text: string) => Promise.resolve({ id: 3, title: text, registerDate: new Date() }),
    onSuccess: (todo: TodoItem) => {
      const todos: RecentTodo[] = getLocalStorage(StorageKeys.recentTodo) ?? [];
      const newTodos: RecentTodo[] = [...todos.slice(-4), todo];
      setLocalStorage(StorageKeys.recentTodo, newTodos);

      queryClient.invalidateQueries({ queryKey: [['todos'], ['todos-histories']] });
    },
  });

  return mutation;
}

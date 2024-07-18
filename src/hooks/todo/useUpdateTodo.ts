import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TodoItem } from 'src/types/todo';

export default function useUpdateTodo() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (todo: TodoItem) => Promise.resolve(todo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [['todos'], ['todos-histories']] });
    },
  });

  return mutation;
}

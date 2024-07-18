import { useMutation, useQueryClient } from '@tanstack/react-query';
import { TodoItem } from 'src/store/types/todoTypes';

export default function useUpdateTodo() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (todo: TodoItem) => Promise.resolve(todo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  return mutation;
}

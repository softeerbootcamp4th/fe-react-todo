import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API, API_HEADER } from 'src/constants/api';

export default function useDeleteTodo() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (todoId: number) => {
      await fetch(API.TODOS, {
        ...API_HEADER,
        method: 'DELETE',
        body: JSON.stringify({ todoId }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      queryClient.invalidateQueries({ queryKey: ['todos-histories'] });
    },
  });

  return mutation;
}

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API, API_HEADER } from 'src/constants/api';

export default function useCreateTodo() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (title: string) => {
      await fetch(API.TODOS, {
        ...API_HEADER,
        method: 'POST',
        body: JSON.stringify({ title }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      queryClient.invalidateQueries({ queryKey: ['todos-histories'] });
    },
  });

  return mutation;
}

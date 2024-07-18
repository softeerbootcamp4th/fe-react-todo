import { useMutation, useQueryClient } from '@tanstack/react-query';
import API from 'src/constants/api';
import { TodoItem } from 'src/types/todo';

export default function useUpdateTodo() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (todo: TodoItem) => {
      await fetch(API.TODOS, {
        method: 'PUT',
        body: JSON.stringify({ ...todo }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      queryClient.invalidateQueries({ queryKey: ['todos-histories'] });
    },
  });

  return mutation;
}

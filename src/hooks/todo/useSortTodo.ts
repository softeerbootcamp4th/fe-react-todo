import { useMutation, useQueryClient } from '@tanstack/react-query';
import { API, API_HEADER } from 'src/constants/api';
import { TodoItem } from 'src/types/todo';

export default function useSortTodo() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (todos: TodoItem[]) => {
      await fetch(API.SORT_TODO, {
        ...API_HEADER,
        method: 'POST',
        body: JSON.stringify({ todos }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  return mutation;
}

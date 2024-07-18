import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function useDeleteTodo() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: number) => Promise.resolve(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  return mutation;
}

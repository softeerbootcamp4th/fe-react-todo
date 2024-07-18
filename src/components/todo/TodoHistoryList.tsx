import TodoHistory from 'src/components/todo/TodoHistory';
import useGetTodoHistoryList from 'src/hooks/todo/useGetTodoHistoryList';
import { TodoHistory as TodoHistoryType } from 'src/types/todo';

export default function TodoHistoryList() {
  const { histories } = useGetTodoHistoryList();

  return histories.map((history: TodoHistoryType) => (
    <TodoHistory key={history.id} history={history} />
  ));
}

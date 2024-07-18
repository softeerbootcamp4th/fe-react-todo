import TodoHistory from 'src/components/todo/TodoHistory';
import useGetTodoHistoryList from 'src/hooks/history/useGetTodoHistoryList';
import { TodoHistory as TodoHistoryType } from 'src/store/types/todoTypes';

export default function TodoHistoryList() {
  const { histories } = useGetTodoHistoryList();

  return histories.map((history: TodoHistoryType) => (
    <TodoHistory key={history.id} history={history} />
  ));
}

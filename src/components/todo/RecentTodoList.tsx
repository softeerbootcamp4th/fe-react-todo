import { RecentTodo } from 'src/types/todo';
import { getLocalStorage, StorageKeys } from 'src/utils/localStorage';

export default function RecentTodoList() {
  const recentTodoList: RecentTodo[] = getLocalStorage(StorageKeys.recentTodo) ?? [];

  return recentTodoList.map((recentTodo: RecentTodo) => (
    <div key={recentTodo.id}>{recentTodo.title}</div>
  ));
}

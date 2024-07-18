import { RecentTodo } from 'src/store/types/todoTypes';
import { getLocalStorage, StorageKeys } from 'src/utils/localStorage';

export default function RecentTodoList() {
  const recentTodoList: RecentTodo[] = getLocalStorage(StorageKeys.recentTodo) ?? [];

  return recentTodoList.map((recentTodo: RecentTodo) => (
    <div key={recentTodo.id}>{recentTodo.title}</div>
  ));
}

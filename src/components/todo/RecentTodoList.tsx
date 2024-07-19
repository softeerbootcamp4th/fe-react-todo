import { RecentTodo } from 'src/types/todo';
import { getLocalStorage, StorageKeys } from 'src/utils/localStorage';

export default function RecentTodoList() {
  const recentTodoList: RecentTodo[] = getLocalStorage(StorageKeys.recentTodo) ?? [];

  return recentTodoList.map((recentTodo: RecentTodo, index: number) => (
    // eslint-disable-next-line react/no-array-index-key
    <div key={index}>{recentTodo.title}</div>
  ));
}

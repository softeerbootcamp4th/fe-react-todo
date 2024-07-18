import TodoItem from 'src/components/todo/todoItem';
import useGetTodoList from 'src/hooks/todo/useGetTodoList';
import type { TodoItem as TodoItemType } from 'src/store/types/todoTypes';

export default function TodoList() {
  const { todos } = useGetTodoList();

  return todos.map((todoItem: TodoItemType) => <TodoItem key={todoItem.id} todoItem={todoItem} />);
}

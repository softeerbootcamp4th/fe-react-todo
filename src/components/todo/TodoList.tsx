import TodoItem from 'src/hooks/todo/TodoItem';
import useGetTodoList from 'src/hooks/todo/useGetTodoList';
import type { TodoItem as TodoItemType } from 'src/types/todo';

export default function TodoList() {
  const { todos } = useGetTodoList();

  // eslint-disable-next-line max-len
  return todos.map((todoItem: TodoItemType) => <TodoItem key={todoItem.todoId} todoItem={todoItem} />);
}

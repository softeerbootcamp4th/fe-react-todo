import TodoItem from 'src/hooks/todo/TodoItem';
import useGetTodoList from 'src/hooks/todo/useGetTodoList';
import type { TodoItem as TodoItemType } from 'src/types/todo';
import ReactDragListView from 'react-drag-listview';
import useSortTodo from 'src/hooks/todo/useSortTodo';

export default function TodoList() {
  const { todos } = useGetTodoList();
  const { mutate: sortTodos } = useSortTodo();

  const handleDragEnd = (fromIndex: number, toIndex: number) => {
    const data = [...todos];
    const item = data.splice(fromIndex, 1)[0];
    data.splice(toIndex, 0, item);

    sortTodos(data);
  };
  return (
    <ReactDragListView
      nodeSelector="div.todo-item-container"
      handleSelector="div.todo-item-container"
      onDragEnd={handleDragEnd}
    >
      {todos.map((todoItem: TodoItemType) => (
        <TodoItem key={todoItem.todoId} todoItem={todoItem} />
      ))}
    </ReactDragListView>
  );
}

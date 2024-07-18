import { useEffect, useMemo, useState } from 'react';
import useLongPress from 'src/hooks/useLongPress';
import useDeleteTodo from 'src/hooks/todo/useDeleteTodo';
import useUpdateTodo from 'src/hooks/todo/useUpdateTodo';
import ActionButton from 'src/components/common/ActionButton';
import { TodoItem as TodoItemType } from 'src/types/todo';

interface TodoItemProps {
  todoItem: TodoItemType;
}

function TodoItem({ todoItem }: TodoItemProps) {
  const { mutate: deleteTodo } = useDeleteTodo();
  const { mutate: updateTodo } = useUpdateTodo();

  const { todoId, title, registerDate } = todoItem;

  const [text, setText] = useState<string>(title);
  useEffect(() => setText(todoItem.title), [todoItem]);

  const [isEditable, setIsEditable] = useState<boolean>(false);
  const longPressRef = useLongPress(() => setIsEditable(true));

  const handleDelete = () => deleteTodo(todoId);
  const handleUpdate = () =>
    updateTodo({ ...todoItem, title: text }, { onSuccess: () => setIsEditable(false) });

  const day = useMemo(() => {
    const date = new Date(registerDate);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }, [registerDate]);

  return (
    <div
      className="todo-item-container flex justify-between items-center w-max gap-2 p-1"
      ref={longPressRef}
    >
      <div className="bg-white px-3 py-1 h-10 rounded-xl w-full flex justify-between items-center">
        <input
          disabled={!isEditable}
          value={text}
          onChange={({ target: { value } }) => setText(value)}
          className="bg-transparent"
        />
        <p className="w-max">{day}</p>
      </div>
      {isEditable ? (
        <ActionButton label="수정" onClick={handleUpdate} />
      ) : (
        <ActionButton label="삭제" onClick={handleDelete} />
      )}
    </div>
  );
}

export default TodoItem;

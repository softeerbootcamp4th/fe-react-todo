import { useEffect, useState } from 'react';
import { TodoItem as TodoItemType } from 'src/types/todo';
import useLongPress from 'src/hooks/useLongPress';
import useDeleteTodo from 'src/hooks/todo/useDeleteTodo';
import useUpdateTodo from 'src/hooks/todo/useUpdateTodo';

interface TodoItemProps {
  todoItem: TodoItemType;
}

function TodoItem({ todoItem }: TodoItemProps) {
  const { mutate: deleteTodo } = useDeleteTodo();
  const { mutate: updateTodo } = useUpdateTodo();

  const { id, title, registerDate } = todoItem;

  const [text, setText] = useState<string>(title);
  useEffect(() => setText(todoItem.title), [todoItem]);

  const [isEditable, setIsEditable] = useState<boolean>(false);
  const longPressRef = useLongPress(() => setIsEditable(true));

  const handleDelete = () => deleteTodo(id);
  const handleUpdate = () => updateTodo(todoItem, { onSuccess: () => setIsEditable(true) });

  return (
    <div className="bg-green-200 flex" ref={longPressRef}>
      <input
        disabled={!isEditable}
        value={text}
        onChange={({ target: { value } }) => setText(value)}
      />
      {registerDate.toISOString()}
      {isEditable ? (
        <ActionButton label="수정" onClick={handleUpdate} />
      ) : (
        <ActionButton label="삭제" onClick={handleDelete} />
      )}
    </div>
  );
}

export default TodoItem;

interface ActionButtonProps {
  label: string;
  onClick: () => void;
}

function ActionButton({ label, onClick }: ActionButtonProps) {
  return (
    <button type="button" className="ml-2 bg-black text-white p-1.5" onClick={onClick}>
      {label}
    </button>
  );
}

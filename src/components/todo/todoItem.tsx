import { useEffect, useState } from 'react';
import { TodoItem as TodoItemType } from 'src/types/todo';
import useLongPress from 'src/hooks/useLongPress';
import ActionButton from 'src/components/common/ActionButton';
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
    <div className="flex justify-between items-center w-full gap-2" ref={longPressRef}>
      <div className="bg-white px-3 py-1 h-10 rounded-xl w-full flex justify-between">
        <input
          disabled={!isEditable}
          value={text}
          onChange={({ target: { value } }) => setText(value)}
          className="bg-transparent"
        />
        {registerDate.toISOString()}

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

import { useEffect, useState } from 'react';
import { TodoItem as TodoItemType } from 'src/store/types/todoTypes';
import useLongPress from 'src/hooks/useLongPress';
import useTodo from 'src/viewModel/useTodo';

interface TodoItemProps {
  todoItem: TodoItemType;
  todoItemIndex: number;
}

function TodoItem({ todoItem, todoItemIndex }: TodoItemProps) {
  const { title, registerDate } = todoItem;

  const [text, setText] = useState<string>(title);
  useEffect(() => setText(todoItem.title), [todoItem]);

  const [isEditable, setIsEditable] = useState<boolean>(false);
  const longPressRef = useLongPress(() => setIsEditable(true));

  const { removeTodo, updateTodo } = useTodo();

  const handleRemove = () => removeTodo(todoItemIndex);
  const handleUpdate = () => {
    // TODO: index로 처리 시 error. 로직 수정 필요
    updateTodo({ index: todoItemIndex, title: text });
    setIsEditable(true);
  };

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
        <ActionButton label="삭제" onClick={handleRemove} />
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

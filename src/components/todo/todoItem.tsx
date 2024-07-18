import { useEffect, useState } from 'react';
import { TodoItem as TodoItemType } from 'src/store/types/todoTypes';
import useLongPress from 'src/hooks/useLongPress';
import useTodo from 'src/viewModel/useTodo';
import ActionButton from 'src/components/common/ActionButton';

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
    setIsEditable(false);
  };

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
        <ActionButton label="삭제" onClick={handleRemove} />
      )}
    </div>
  );
}

export default TodoItem;

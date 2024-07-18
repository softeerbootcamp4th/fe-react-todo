import { useState } from 'react';
import Dropdown from 'src/components/common/Dropdown';
import TodoItem from 'src/components/todo/todoItem';
import useTodo from 'src/viewModel/useTodo';

export default function Todo() {
  const { todo, addTodo } = useTodo();
  const { todoList, recentTodoList, todoHistory } = todo;

  const [text, setText] = useState<string>('');

  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const handleSubmit = (value: string) => {
    setText('');
    addTodo(value);
  };

  return (
    <div className="bg-pink-400 w-full h-full flex flex-row justify-center items-center">
      <div className="w-[500px] h-[600px] border-gray-900 border-[1px] border-solid flex-col bg-red-800">
        <div className="w-full">◕ ‿‿ ◕</div>

        <div className="relative">
          <div className="w-full flex flex-row">
            <input
              value={text}
              onKeyPress={({ code }) => {
                if (code === 'Enter') {
                  handleSubmit(text);
                }
              }}
              onFocus={() => setDropdownOpen(true)}
              onBlur={() => setDropdownOpen(false)}
              onChange={({ target: { value } }) => setText(value)}
              placeholder="할일을 입력하세요"
            />
            <button type="button" onClick={() => handleSubmit(text)}>
              등록
            </button>
          </div>

          <Dropdown isOpen={dropdownOpen}>
            {recentTodoList.map(({ title, registerDate }, todoIndex) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={`recent-${registerDate}-${todoIndex}`}>{title}</div>
            ))}
          </Dropdown>
        </div>

        <div className="w-full flex flex-col gap-2 h-full overflow-hidden">
          투두
          {todoList.map((todoItem, todoIndex) => (
            <TodoItem
              // eslint-disable-next-line react/no-array-index-key
              key={`todo-${todoItem.registerDate}-${todoIndex}`}
              todoItemIndex={todoIndex}
              todoItem={todoItem}
            />
          ))}
        </div>

        <div className="border-4 border-black" />

        <div className="w-full flex flex-col">
          히스토리
          {todoHistory.map(({ title, registerDate, status }, todoIndex) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={`history-${registerDate}-${todoIndex}`}>
              {title}
              {status}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

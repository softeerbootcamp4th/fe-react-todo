import React, { useState } from 'react';
import { Button } from 'src/components/ui/button';
import Dropdown from 'src/components/common/Dropdown';
import TodoItem from 'src/components/todo/TodoItem';
import { Input } from 'src/components/ui/input';
import { TodoItem as TodoItemType } from 'src/store/types/todoTypes';

interface TodoContainerProps {
  addTodo: (value : string) => void;
  todoList: TodoItemType[];
  recentTodoList: TodoItemType[];

}

function TodoContainer({ addTodo, todoList, recentTodoList } : TodoContainerProps) {
  const [text, setText] = useState<string>('');

  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const handleSubmit = (value: string) => {
    setText('');
    addTodo(value);
  };

  return (
    <div className="w-full">
      <h2 className="container-title">◕ ‿‿ ◕ Todo List ◕ ‿‿ ◕ </h2>
      <div className="flex flex-col w-full mt-3">
        <div className="relative">
          <div className="w-full flex flex-row gap-2">
            <Input
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
            <Button type="button" onClick={() => handleSubmit(text)}>
              등록
            </Button>
          </div>

          <Dropdown isOpen={dropdownOpen}>
            {recentTodoList.map(({ title, registerDate }, todoIndex) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={`recent-${registerDate}-${todoIndex}`}>{title}</div>
            ))}
          </Dropdown>
        </div>
        <div className="w-full flex flex-col gap-2 h-full overflow-hidden mt-5">
          {todoList.map((todoItem, todoIndex) => (
            <TodoItem
          // eslint-disable-next-line react/no-array-index-key
              key={`todo-${todoItem.registerDate}-${todoIndex}`}
              todoItemIndex={todoIndex}
              todoItem={todoItem}
            />
          ))}
        </div>

      </div>

    </div>
  );
}

export default TodoContainer;

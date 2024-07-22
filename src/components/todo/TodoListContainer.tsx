import { Suspense, useState } from 'react';

import useCreateTodo from 'src/hooks/todo/useCreateTodo';

import { Button } from 'src/components/ui/button';
import { Input } from 'src/components/ui/input';

import Dropdown from 'src/components/common/Dropdown';
import TodoList from 'src/components/todo/TodoList';
import RecentTodoList from 'src/components/todo/RecentTodoList';
import { RecentTodo } from 'src/types/todo';
import { getLocalStorage, StorageKeys, setLocalStorage } from 'src/utils/localStorage';

export default function TodoListContainer() {
  const [text, setText] = useState<string>('');
  const resetText = () => setText('');
  const { mutate: createTodo } = useCreateTodo();

  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const handleSubmit = (value: string) =>
    createTodo(value, {
      onSuccess: () => {
        const todo = { title: text };
        const todos: RecentTodo[] = getLocalStorage(StorageKeys.recentTodo) ?? [];
        const newTodos: RecentTodo[] = [todo, ...todos.slice(0, 4)];

        setLocalStorage(StorageKeys.recentTodo, newTodos);

        resetText();
      },
    });

  return (
    <div className="w-full">
      <h2 className="container-title min-w-max">◕ ‿‿ ◕ Todo List ◕ ‿‿ ◕ </h2>
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
            <RecentTodoList />
          </Dropdown>
        </div>
        <div className="w-full flex flex-col gap-5 h-full overflow-hidden mt-5">
          <Suspense fallback="Loading todo List...">
            <TodoList />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

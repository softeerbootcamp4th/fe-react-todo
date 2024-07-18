import HistoryContainer from 'src/components/todo/HistoryContainer';
import TodoContainer from 'src/components/todo/TodoContainer';
import useTodo from 'src/viewModel/useTodo';

export default function Todo() {
 
  const { todo, addTodo } = useTodo();
  const { todoList, recentTodoList, todoHistory } = todo;

  return (
    <div className="bg-DEFALUT max-w-[1080px] w-full h-screen mx-auto justify-center items-center">
      <div className="w-full h-full bg-primary px-3 flex flex-1 gap-5">
        <TodoContainer addTodo={addTodo} todoList={todoList} recentTodoList={recentTodoList} />
        <HistoryContainer todoHistory={todoHistory} />

          {/* <Dropdown isOpen={dropdownOpen}>
            <RecentTodoList />
          </Dropdown> */}

        {/* <div className="w-full flex flex-col gap-2 h-full overflow-hidden">
          투두
          <Suspense fallback="Loading todo list...">
            <TodoList />
          </Suspense>
        </div> */}

          {/* <Suspense fallback="Loading todo history list...">
            <TodoHistoryList />
          </Suspense>
        </div> */}
      </div>
    </div>
  );
}

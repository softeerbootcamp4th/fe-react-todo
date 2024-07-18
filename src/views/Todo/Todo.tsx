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

      </div>
    </div>
  );
}

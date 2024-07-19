import TodoHistoryContainer from 'src/components/todo/TodoHistoryContainer';
import TodoListContainer from 'src/components/todo/TodoListContainer';

export default function Todo() {
  return (
    <div className="bg-DEFALUT w-full max-h-screen  mx-auto justify-center items-center min-w-max">
      <div className="max-w-[1080px] w-full overflow-hidden bg-primary px-3 flex flex-1 gap-20 m-auto">
        <TodoListContainer />
        <TodoHistoryContainer />
      </div>
    </div>
  );
}

import TodoHistoryContainer from 'src/components/todo/TodoHistoryContainer';
import TodoListContainer from 'src/components/todo/TodoListContainer';

export default function Todo() {
  return (
    <div className="bg-DEFALUT max-w-[1080px] w-full h-screen mx-auto justify-center items-center">
      <div className="w-full h-full bg-primary px-3 flex flex-1 gap-5">
        <TodoListContainer />
        <TodoHistoryContainer />
      </div>
    </div>
  );
}

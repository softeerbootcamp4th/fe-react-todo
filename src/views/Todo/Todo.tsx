import HistoryContainer from 'src/components/todo/HistoryContainer';
import TodoListContainer from 'src/components/todo/TodoListContainer';

export default function Todo() {
  return (
    <div className="bg-DEFALUT w-full h-screen mx-auto justify-center items-center min-w-max">
      <div className="w-full h-full bg-primary px-3 flex flex-1 gap-20">
        <TodoListContainer />
        <HistoryContainer />
      </div>
    </div>
  );
}

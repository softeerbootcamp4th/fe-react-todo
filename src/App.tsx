import Header from "@/components/Header/Header";
import Todo from "@/components/Todo/Todo";
import LogHeader from "@/components/LogList/LogHeader";
import LogItem from "@/components/LogList/Logitem";

function App() {
  return (
    <div className="flex w-[1000px] h-[500px] overflow-hidden">
      <div className="flex flex-col items-center flex-grow shadow-md">
        <Header />
        <Todo />
      </div>
      <div className="w-[400px] flex-shrink-0 flex flex-col shadow-md px-4">
        <LogHeader />
        <LogItem />
      </div>
    </div>
  );
}

export default App;

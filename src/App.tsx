import Header from "@/components/Header/Header";
import Todo from "@/components/Todo/Todo";
import LogHeader from "./components/Logs/LogHeader";
import LogItem from "./components/Logs/Logitem";

function App() {
  return (
    <div className="flex w-[1000px] h-[500px] overflow-hidden">
      <div className="flex flex-col items-center flex-grow">
        <Header />
        <Todo />
      </div>
      <div className="w-[400px] flex-shrink-0 flex flex-col">
        <LogHeader />
        <LogItem />
      </div>
    </div>
  );
}

export default App;

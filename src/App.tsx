import Header from "./components/Header";
import Input from "./components/Input";
import TodoList from "./components/TodoList";

function App() {
    return (
        <div className="flex w-screen h-screen justify-center items-center">
            <div className="w-[500px] h-[600px] flex flex-col gap-10">
                <Header />
                <Input />
                <TodoList />
            </div>
        </div>
    );
}

export default App;

import Header from "./components/Header";
import Input from "./components/Input";
import Log from "./components/Log";
import TodoList from "./components/TodoList";

function App() {
    return (
        <div className="flex w-screen h-screen justify-center items-center">
            <div className="w-[500px] h-[600px] flex flex-col items-center gap-10 px-8 py-12 rounded-3xl shadow-lg">
                <Header />
                <Input />
                <TodoList />
            </div>
            <Log />
        </div>
    );
}

export default App;

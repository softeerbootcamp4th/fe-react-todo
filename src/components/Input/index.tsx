import { ChangeEvent, FormEvent, useState } from "react";
import { TodoAPI } from "../../apis/todoAPI";
import { useTodoList } from "../../hooks/useTodoList";

function Input() {
    const [inputValue, setInputValue] = useState("");
    const { getTodoList } = useTodoList();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await TodoAPI.post({ description: inputValue });
            getTodoList();
            setInputValue("");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form className="relative" onSubmit={handleSubmit}>
            <input
                className="block w-full p-4 pr-20 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:border-indigo-400 text-xl"
                placeholder="할 일을 입력하세요"
                value={inputValue}
                onChange={handleInputChange}
                required
            />
            <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-indigo-400 hover:bg-indigo-500 focus:ring-2 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg px-4 py-2 text-xl"
            >
                등록
            </button>
        </form>
    );
}

export default Input;

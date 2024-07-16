import { ChangeEvent, FormEvent, useState } from "react";
import { TodoAPI } from "../../apis/todoAPI";

function Input() {
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        TodoAPI.post({ description: inputValue });
        console.log("Success!");
    };

    return (
        <form className="relative" onSubmit={handleSubmit}>
            <input
                className="block w-full p-4 pr-20 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 text-xl"
                placeholder="할 일을 입력하세요"
                value={inputValue}
                onChange={handleInputChange}
                required
            />
            <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-4 py-2 text-xl"
            >
                등록
            </button>
        </form>
    );
}

export default Input;

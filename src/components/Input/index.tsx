import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { TodoAPI } from "../../apis/todoAPI";
import { useTodoList } from "../../hooks/useTodoList";

function Input() {
    const [inputValue, setInputValue] = useState("");
    const [recentSearches, setRecentSearches] = useState<string[]>([]);
    const [showRecentSearches, setShowRecentSearches] = useState<boolean>(false);
    const { getTodoList } = useTodoList();

    useEffect(() => {
        const storedSearches = localStorage.getItem("recentSearches");
        if (storedSearches) {
            setRecentSearches(JSON.parse(storedSearches));
        }
    }, []);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await TodoAPI.post({ description: inputValue, isChecked: false });
            getTodoList();
            const updatedSearches = [inputValue, ...recentSearches];
            const limitedSearches = updatedSearches.slice(0, 5);
            localStorage.setItem("recentSearches", JSON.stringify(limitedSearches));
            setRecentSearches(limitedSearches);
            setInputValue("");
        } catch (error) {
            console.error(error);
        }
    };

    const handleInputFocus = () => {
        setShowRecentSearches(true);
    };

    const handleRecentSearchClick = (search: string) => {
        setInputValue(search);
        setShowRecentSearches(false);
    };

    const handleBlur = () => {
        setShowRecentSearches(false);
    };

    const handleRecentSearchItemClick = (search: string) => {
        handleRecentSearchClick(search);
        setInputValue(search);
    };

    return (
        <form className="relative w-full" onSubmit={handleSubmit}>
            <input
                className="block w-full p-4 pr-20 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:border-indigo-400 text-xl"
                placeholder="할 일을 입력하세요"
                value={inputValue}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onBlur={handleBlur}
                required
            />
            {showRecentSearches && (
                <ul className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-b-lg shadow-lg">
                    {recentSearches.map((search, index) => (
                        <li
                            key={index}
                            className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-xl"
                            onMouseDown={() => handleRecentSearchItemClick(search)}
                        >
                            {search}
                        </li>
                    ))}
                </ul>
            )}
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

import { ChangeEvent, useState } from "react";
import { TodoItemProps } from "../../types/todo";
import { TodoAPI } from "../../apis/todoAPI";
import { useTodoList } from "../../hooks/useTodoList";

function TodoItem({ todo }: TodoItemProps) {
    const { getTodoList } = useTodoList();

    const [isChecked, setIsChecked] = useState(todo.isChecked);
    const [inputValue, setInputValue] = useState(todo.description);

    const handleCheckChange = async (e: ChangeEvent<HTMLInputElement>) => {
        setIsChecked(e.target.checked);
        await TodoAPI.patch({ ...todo, isChecked: e.target.checked });
    };

    const handleDelete = async () => {
        try {
            await TodoAPI.delete(todo.id);
            getTodoList();
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleDescriptionClick = () => {
        // TODO: 시간 재서 수정 input으로 변경
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    return (
        <li className="border-b border-gray-300 py-4 px-6 text-xl flex items-center gap-3">
            <input
                id={`${todo.id}-checkbox`}
                type="checkbox"
                value=""
                className="w-4 h-4 bg-gray-100 border-gray-200 rounded"
                checked={isChecked}
                onChange={handleCheckChange}
            />

            <div className="grow flex justify-between items-center">
                <label
                    htmlFor={`${todo.id}-checkbox`}
                    className={`${isChecked ? "line-through text-gray-400" : ""}`}
                    onClick={handleDescriptionClick}
                >
                    {todo.description}
                </label>
                {/* <input
                    className="block w-80 text-gray-900 border-b focus:border-indigo-400 text-xl"
                    placeholder="할 일을 입력하세요"
                    value={inputValue}
                    onChange={handleInputChange}
                    required
                /> */}
                <button
                    type="submit"
                    className="text-white bg-rose-400 hover:bg-rose-500 focus:ring-2 focus:outline-none focus:ring-rose-300 font-medium rounded-lg px-4 py-2 text-xl"
                    onClick={handleDelete}
                >
                    삭제
                </button>
            </div>
        </li>
    );
}

export default TodoItem;

import { TodoItemProps } from "../../types/todo";

function TodoItem({ todo }: TodoItemProps) {
    return (
        <li className="border-b border-gray-300 py-4 px-6 text-xl flex items-center gap-3">
            <input
                type="checkbox"
                value=""
                className="w-4 h-4 bg-gray-100 border-gray-200 rounded"
            />

            <div className="grow flex justify-between items-center">
                <p>{todo.description}</p>
                <button
                    type="submit"
                    className="text-white bg-rose-400 hover:bg-rose-500 focus:ring-2 focus:outline-none focus:ring-rose-300 font-medium rounded-lg px-4 py-2 text-xl"
                >
                    삭제
                </button>
            </div>
        </li>
    );
}

export default TodoItem;

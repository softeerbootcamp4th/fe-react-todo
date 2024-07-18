import { ChangeEvent, useEffect, useRef, useState } from "react";
import { TodoItemProps } from "../../types/todo";
import { TodoAPI } from "../../apis/todoAPI";
import { useTodoList } from "../../hooks/useTodoList";
import { LOG_STATUS } from "../../constants/log";
import { DeleteLog, EditLog } from "../../types/log";

function TodoItem({ todo }: TodoItemProps) {
    const { getTodoList, setLogListItem, getLogList } = useTodoList();

    const [isChecked, setIsChecked] = useState<boolean>(todo.isChecked);
    const [inputValue, setInputValue] = useState<string>(todo.description);

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const timeoutRef = useRef<number | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    const handleCheckChange = async (e: ChangeEvent<HTMLInputElement>) => {
        try {
            const changedCheck = e.target.checked;
            await TodoAPI.patch({ ...todo, isChecked: changedCheck });
            setIsChecked(changedCheck);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleDelete = async () => {
        try {
            await TodoAPI.delete({ id: todo.id });
            await getTodoList();
            await setLogListItem({
                status: LOG_STATUS.delete,
                description: inputValue,
            } as DeleteLog);
            await getLogList();
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleEdit = async () => {
        try {
            await setLogListItem({
                status: LOG_STATUS.edit,
                prevDescription: todo.description,
                description: inputValue,
            } as EditLog);
            await getLogList();
            await TodoAPI.patch({ ...todo, description: inputValue });
            setIsEditing(false);
            await getTodoList();
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleMouseDown = () => {
        timeoutRef.current = setTimeout(() => {
            setIsEditing(true);
        }, 2000);
    };

    const handleMouseUp = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    };

    return (
        <li className="w-full border-b border-gray-300 py-4 text-xl flex items-center gap-3">
            <input
                id={`${todo.id}-checkbox`}
                type="checkbox"
                value=""
                className="w-4 h-4 bg-gray-100 border-gray-200 rounded cursor-pointer"
                checked={isChecked}
                onChange={handleCheckChange}
            />

            <div className="grow flex justify-between items-center">
                {isEditing ? (
                    <>
                        <input
                            ref={inputRef}
                            className="block w-72 text-gray-900 border-b focus:border-indigo-400 text-xl"
                            placeholder="할 일을 입력하세요"
                            value={inputValue}
                            onChange={handleInputChange}
                            required
                        />
                        <button
                            type="button"
                            className="text-white bg-indigo-400 hover:bg-indigo-500 focus:ring-2 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg px-4 py-2 text-xl"
                            onClick={handleEdit}
                        >
                            수정
                        </button>
                    </>
                ) : (
                    <>
                        <label
                            htmlFor={`${todo.id}-checkbox`}
                            className={`truncate w-72 cursor-pointer ${isChecked && "line-through text-gray-400"}`}
                            onMouseDown={handleMouseDown}
                            onMouseUp={handleMouseUp}
                        >
                            {todo.description}
                        </label>
                        <button
                            type="button"
                            className="text-white bg-rose-400 hover:bg-rose-500 focus:ring-2 focus:outline-none focus:ring-rose-300 font-medium rounded-lg px-4 py-2 text-xl"
                            onClick={handleDelete}
                        >
                            삭제
                        </button>
                    </>
                )}
            </div>
        </li>
    );
}

export default TodoItem;

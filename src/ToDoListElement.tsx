import React, { memo, useState, useRef, useEffect } from "react";
import Button from "./Button";

interface ToDoListElement {
    todo: string;
    deleteToDo: (todo: string) => void;
    updateToDo: (oldTodo: string, newTodo: string) => void;
}

const ToDoListElement: React.FC<ToDoListElement> = memo(({ todo, deleteToDo, updateToDo }: ToDoListElement) => {
    const [isEditingMode, setIsEditingMode] = useState<boolean>(false)
    const [toDo, setToDo] = useState<string>(todo)
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    useEffect(() => {
        setToDo(todo);
    }, [todo]);

    useEffect(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
    }, []);

    const startClick = () => {
        if (!isEditingMode) {
            timerRef.current = setTimeout(() => {
                timerRef.current = null
                setIsEditingMode(true)
            }, 2000)
        }
    }

    const endClick = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current!)
        }
    }

    const toggleEditingMode = () => {
        if (isEditingMode) {
            updateToDo(todo, toDo);
        }
        setIsEditingMode(!isEditingMode)
    }

    const textEditing = (event: React.ChangeEvent<HTMLInputElement>) => {
        setToDo(event.target.value)
    }

    const handleDelete = () => {
        deleteToDo(todo);
    };

    let content = (
        <>
            <p>{toDo}</p>
            <Button width={60} height={40} backgroundColor="6c90bb" title={"삭제"} cb={handleDelete} value={todo} />
        </>
    )
    if (isEditingMode) {
        content = (
            <>
                <input
                    type="text"
                    value={toDo}
                    onChange={textEditing}
                    placeholder={toDo}
                    className="w-full mr-10"
                />
                <Button width={100} height={40} backgroundColor="6c90bb" title={"수정완료"} cb={toggleEditingMode} value="" />
            </>
        )
    }

    return (
        <>
            <li style={{ borderBottom: "olive 1px solid" }} className="flex justify-between mx-4 py-4 w-1/3" onMouseUp={endClick} onMouseDown={startClick}>
                {content}
            </li>
        </>
    )
})

export default ToDoListElement

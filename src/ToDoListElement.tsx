import React, { memo, useState, useRef, useEffect } from "react";
import Button from "./Button";
import ToDo from "./Todo";

interface ToDoListElement {
    todo: ToDo;
    deleteToDo: (todo: ToDo) => void;
    updateToDo: (oldTodo: ToDo, newTodo: ToDo) => void;
}

const ToDoListElement: React.FC<ToDoListElement> = memo(({ todo, deleteToDo, updateToDo }: ToDoListElement) => {
    const [isEditingMode, setIsEditingMode] = useState<boolean>(false)
    const [toDo, setToDo] = useState<ToDo>(todo)
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
            updateToDo(todo, toDo)
        }
        setIsEditingMode(!isEditingMode)
    }

    const textEditing = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newTodo: ToDo = { id: todo.id, todo: event.target.value }
        setToDo(newTodo)
    }

    const handleDelete = () => {
        deleteToDo(todo);
    };

    let content = (
        <>
            <p>{toDo.todo}</p>
            <Button width={60} height={40} backgroundColor="6c90bb" title={"삭제"} cb={handleDelete} value={todo.todo} />
        </>
    )
    if (isEditingMode) {
        content = (
            <>
                <input
                    type="text"
                    value={toDo.todo}
                    onChange={textEditing}
                    placeholder={toDo.todo}
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

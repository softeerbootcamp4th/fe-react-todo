import React from "react";
import ToDoListElement from "./ToDoListElement";

interface ToDoListProps {
    toDos: string[];
}


const ToDoList: React.FC<ToDoListProps> = ({ toDos }: ToDoListProps) => {
    const content = (
        <div className="flex flex-col items-center w-full overflow-y-scroll h-1/3 mt-6">
            {toDos.map((todo, index) => (<ToDoListElement key={index} todo={todo} />))}
        </div>
    )

    return (
        <>
            {content}
        </>
    )
}

export default ToDoList

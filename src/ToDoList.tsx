import React from "react";
import ToDoListElement from "./ToDoListElement";

interface ToDoListProps {
    toDos: string[];
    deleteToDo: (todo: string) => void;
}

const ToDoList: React.FC<ToDoListProps> = ({ toDos, deleteToDo }: ToDoListProps) => {
    return (
        <>
            <ul className="flex flex-col items-center w-full overflow-y-scroll h-1/3 mt-6">
                {toDos.map((todo, index) => (
                    <ToDoListElement key={index} todo={todo} deleteToDo={deleteToDo} />))}
            </ul>
        </>
    )
}

export default ToDoList

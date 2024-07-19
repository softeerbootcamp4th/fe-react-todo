import React from "react";
import ToDoListElement from "./ToDoListElement";
import ToDo from "./Todo";

interface ToDoListProps {
    toDos: ToDo[];
    deleteToDo: (todo: ToDo) => void;
    updateToDo: (oldTodo: ToDo, newTodo: ToDo) => void;
}

const ToDoList: React.FC<ToDoListProps> = ({ toDos, deleteToDo, updateToDo }: ToDoListProps) => {
    return (
        <>
            <ul className="flex flex-col items-center w-full overflow-y-scroll h-1/3 mt-6">
                {toDos.map((todo, index) => (
                    <ToDoListElement key={index} todo={todo} deleteToDo={deleteToDo} updateToDo={updateToDo} />))}
            </ul>
        </>
    )
}

export default ToDoList

import React, { useEffect, useState } from "react";
import ToDoListElement from "./ToDoListElement";


const ToDoList: React.FC = () => {
    const [toDos, setToDos] = useState(["a", "b", "c", "d", "e", "a", "b", "c", "d", "e"])

    useEffect(() => {
        // const reponse = fetch().....
        // setToDos(response)
    }, [])

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

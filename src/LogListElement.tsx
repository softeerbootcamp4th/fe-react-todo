import React from "react";

interface LogElementProps {
    todo: string,
    status: string
}

const LogListElement: React.FC<LogElementProps> = ({ todo, status }: LogElementProps) => {
    console.log(todo, status)
    return (
        <div className="flex justify-between mx-4 py-4 w-full px-8">
            <p>{todo}</p>
            <p>{status}</p>
        </div>
    )
}

export default LogElementProps
export { LogListElement }

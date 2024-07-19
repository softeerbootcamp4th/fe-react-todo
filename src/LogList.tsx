import React from "react"
import LogElementProps, { LogListElement } from "./LogListElement"

interface LogListProps {
    logList: LogElementProps[]
}

const LogList: React.FC<LogListProps> = ({ logList }: LogListProps) => {

    const content = logList.map((log) => (
        <LogListElement todo={log.todo} status={log.status} />
    ))

    return (
        <div className="bg-slate-200 rounded-xl w-80 flex flex-col items-center w-full overflow-y-scroll">
            {content}
        </div>
    )
}

export { LogList }
export default LogListProps

import { useEffect } from "react";
import { useTodoList } from "../../hooks/useTodoList";
import { LOG_STATUS } from "../../constants/log";
import { LogType } from "../../types/log";

function Log() {
    const { logList, getLogList } = useTodoList();

    const badgeColor = (log: LogType) => {
        const textColors = {
            등록: "text-blue-800",
            수정: "text-purple-800",
            삭제: "text-pink-800",
        };
        const backgroundColors = {
            등록: "bg-blue-100",
            수정: "bg-purple-100",
            삭제: "bg-pink-100",
        };

        return `${textColors[log.status]} ${backgroundColors[log.status]}`;
    };

    useEffect(() => {
        getLogList();
    }, []);

    return (
        <div className="w-[500px] h-[600px] py-12 px-10 rounded-3xl shadow-lg flex flex-col items-center gap-10">
            <header className="text-5xl font-bold font-Cafe24Meongi">Log</header>
            <ul className="w-96 flex flex-col gap-4 overflow-auto">
                {logList
                    .slice(logList.length - 100, logList.length)
                    .reverse()
                    .map((log: LogType) => (
                        <li key={log.id} className="flex gap-2 items-center">
                            <span
                                className={`w-10 ${badgeColor(log)} text-xs font-medium px-2.5 py-1 rounded-full flex items-center justify-center`}
                            >
                                {log.status}
                            </span>
                            <span className="w-80 flex gap-2">
                                {log.status === LOG_STATUS.edit ? (
                                    <>
                                        <p className="w-40 truncate line-through">
                                            {log.prevDescription}
                                        </p>
                                        <p> → </p>
                                        <p className="w-40 truncate">{log.description}</p>
                                    </>
                                ) : (
                                    <p className="truncate">{log.description}</p>
                                )}
                            </span>
                        </li>
                    ))}
            </ul>
        </div>
    );
}

export default Log;

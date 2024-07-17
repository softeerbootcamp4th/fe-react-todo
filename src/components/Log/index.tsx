import { useEffect } from "react";
import { useTodoList } from "../../hooks/useTodoList";

function Log() {
    const { logList, getLogList } = useTodoList();

    const STATUS_TO_COLOR: any = {
        등록: "blue",
        수정: "purple",
        삭제: "pink",
    };

    useEffect(() => {
        getLogList();
    }, []);

    return (
        <div className="w-[350px] h-[600px] py-12 px-10 rounded-3xl shadow-lg flex flex-col items-center gap-10">
            <header className="text-5xl font-bold font-Cafe24Meongi">Log</header>
            <ul className="w-64 flex flex-col gap-4 overflow-auto">
                {logList
                    .slice()
                    .reverse()
                    .map((log: any) => (
                        <li key={log.id} className="flex gap-2 items-center">
                            <span
                                className={`w-10 bg-${STATUS_TO_COLOR[log.status]}-100 text-${STATUS_TO_COLOR[log.status]}-800 text-xs font-medium px-2.5 py-1 rounded-full flex items-center justify-center`}
                            >
                                {log.status}
                            </span>
                            <p className="max-w-52 truncate">{log.description}</p>
                        </li>
                    ))}
            </ul>
        </div>
    );
}

export default Log;

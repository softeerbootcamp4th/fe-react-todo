import { useTodoContext } from "@/hooks/useTodoContext";

import { LogMsg } from "@/types/LogType";
const LogItem = () => {
  const { logList } = useTodoContext();

  return (
    <div className="flex items-center">
      <ul className="overflow-y-scroll h-[450px] w-full">
        {logList.map((log: LogMsg, index: number) => (
          <li className="flex-row items-start flex py-[5px] border-b border-blue-300 border" key={index}>
            <div className=" bg-blue-300 text-white rounded px-2 py-1 text-center flex-row flex mr-2">{log.log}</div>
            <p className="text-gray-500 mr-2">-</p>
            <div className="text-gray-500 flex flex-row mr-2">{log.todoItem}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LogItem;

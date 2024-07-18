import { useEffect, useState } from "react";
import { Log } from "../models/Log";
import { useTodosContext } from "../hooks/useTodosContext";
import { logRemotes } from "../remotes/log";
import { LogItem } from "./LogItem";

export const LogItems = () => {
  const [logs, setLogs] = useState<Log[]>([]);
  const { todos } = useTodosContext();
  useEffect(() => {
    logRemotes.getLogs().then((logs) => setLogs(logs));
  }, [todos]);

  return (
    <div>
      {logs.map((log) => (
        <LogItem key={log.id} log={log} />
      ))}
    </div>
  );
};

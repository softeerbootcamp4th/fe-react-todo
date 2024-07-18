import { useEffect, useState } from "react";
import { Log } from "../models/Log";
import { useTodosContext } from "../hooks/useTodosContext";
import { logRemotes } from "../remotes/log";
import { LogItem } from "./LogItem";
import { css } from "@emotion/react";

export const LogItems = () => {
  const [logs, setLogs] = useState<Log[]>([]);
  const { todos } = useTodosContext();
  useEffect(() => {
    logRemotes.getLogs().then((logs) => setLogs(logs.reverse()));
  }, [todos]);

  return (
    <div
      css={css`
        overflow-y: auto;
        border: 1px solid #000000;
      `}
    >
      {logs.map((log) => (
        <LogItem key={log.id} log={log} />
      ))}
    </div>
  );
};

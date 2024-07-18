import { Log } from "../models/Log";
import { formatDate } from "../utils/formatDate";

export const LogItem = ({ log }: { log: Log }) => {
  return (
    <div>
      <div>{log.type}</div>
      <div>{log.message}</div>
      <div>{formatDate(log.createdAt)}</div>
    </div>
  );
};

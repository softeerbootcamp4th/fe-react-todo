import { Log } from "../models/Log";
import { formatDate } from "../utils/formatDate";
import { Badge } from "./Badge";

export const LogItem = ({ log }: { log: Log }) => {
  const logTypeToBadgeType = () => {
    switch (log.type) {
      case "CREATE":
        return "SUCCESS";
      case "UPDATE":
        return "INFO";
      case "DELETE":
        return "ERROR";
      default:
        return "SUCCESS";
    }
  };
  return (
    <div>
      <Badge type={logTypeToBadgeType()}>{log.type}</Badge>
      <div>{log.message}</div>
      <div>{formatDate(log.createdAt)}</div>
    </div>
  );
};

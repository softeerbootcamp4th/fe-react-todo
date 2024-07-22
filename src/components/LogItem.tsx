import { css } from "@emotion/react";
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
    <div
      css={css`
        display: flex;
        gap: 1rem;
        padding: 1rem;
        border-bottom: 1px solid #000000;
      `}
    >
      <Badge type={logTypeToBadgeType()}>{log.type}</Badge>
      <div>{log.message}</div>
      <div>{formatDate(log.createdAt)}</div>
    </div>
  );
};

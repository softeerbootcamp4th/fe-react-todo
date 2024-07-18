import { http } from "./http";
import { LogMsg, PostLogRequestBody } from "@/types/LogType";

export const getLogList = () => {
  return http.get<LogMsg[]>(`/logs`);
};

export const postLogList = (data: PostLogRequestBody) => {
  return http.post(`/logs`, JSON.stringify(data));
};

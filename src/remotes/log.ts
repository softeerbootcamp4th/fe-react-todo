import { Log } from "../models/Log";

const LOG_API = "/api/logs";
export const logRemotes = {
  getLogs: async (): Promise<Log[]> => {
    return fetch(LOG_API).then((res) => res.json());
  },
};

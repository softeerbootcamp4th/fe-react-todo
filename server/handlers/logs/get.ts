import { HttpResponse } from "msw";
import { db } from "../../db";

export const readLogs = async () => {
  const logs = await db.readLogs();
  return HttpResponse.json(logs);
};

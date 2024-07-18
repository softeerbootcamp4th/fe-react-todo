import { db } from "../../db";

export const getTodos = async () => {
  return Response.json(await db.readTodos());
};

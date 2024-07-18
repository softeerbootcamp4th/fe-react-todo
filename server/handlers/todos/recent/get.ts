import { HttpResponse } from "msw";
import { db } from "../../../db";

export const getRecentTodos = async () => {
  const todos = await db.readTodos();
  return HttpResponse.json(todos.slice(-5));
};

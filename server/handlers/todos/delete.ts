import { HttpResponse, PathParams } from "msw";
import { db } from "../../db";

export const deleteTodo = async ({ params }: { params: PathParams<"id"> }) => {
  const { id } = params;
  const todoId = parseInt((id ?? "") as string);
  db.deleteTodo(todoId);
  return HttpResponse.json({ id });
};

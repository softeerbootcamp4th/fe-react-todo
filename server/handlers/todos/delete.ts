import { HttpResponse, PathParams } from "msw";
import { db } from "../../db";

export const deleteTodo = async ({ params }: { params: PathParams<"id"> }) => {
  const { id } = params;
  const todoId = parseInt((id ?? "") as string);
  db.deleteTodo(todoId);
  db.insertLog({
    id: Date.now(),
    createdAt: new Date().toISOString(),
    type: "DELETE",
    message: `Deleted todo with id ${todoId}`,
  });
  return HttpResponse.json({ id });
};

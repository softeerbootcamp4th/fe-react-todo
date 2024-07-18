import { HttpResponse, PathParams, StrictRequest } from "msw";
import { db } from "../../db";
import { Todo } from "../../../src/models/Todo";

export const patchTodo = async ({
  request,
}: {
  request: StrictRequest<Todo>;
  params: PathParams<"id">;
}) => {
  const { id, title, status } = await request.json();

  const todo = db.updateTodo({
    id,
    title,
    status,
  });

  if (!todo) {
    return HttpResponse.json({ message: "Todo not found" }, { status: 404 });
  }

  return HttpResponse.json(todo);
};

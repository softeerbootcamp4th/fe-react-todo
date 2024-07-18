import { HttpResponse, StrictRequest } from "msw";
import { Todo } from "../../../src/models/Todo";
import { db } from "../../db";

export const changeTodoPosition = async (
  request: StrictRequest<{ todo: Todo; index: number }>,
) => {
  const { todo, index } = await request.json();

  const todos = db.updateTodoPosition({
    id: todo.id,
    position: index,
  });

  db.insertLog({
    id: Date.now(),
    createdAt: new Date().toISOString(),
    type: "UPDATE",
    message: `Changed position of todo with id ${todo.id}`,
  });

  if (!todos) {
    return HttpResponse.json({ message: "Todo not found" }, { status: 404 });
  }

  return HttpResponse.json(todos);
};

import { Todo, PatchTodoRequestBody, PatchTodoSpliceRequestBody } from "@/types/todoType";
import { http, HttpResponse } from "msw";

const BASE_URL = "http://localhost:5173";

interface PostTodo {
  text: string;
  completed: boolean;
}

export const handlers = [
  http.get(`${BASE_URL}/todos`, async () => {
    const item = localStorage.getItem("todos");

    const todoList = item ? JSON.parse(item) : [];

    return HttpResponse.json(todoList);
  }),

  http.post(`${BASE_URL}/todos`, async ({ request }) => {
    const item = localStorage.getItem("todos");

    const todoList: Todo[] = item ? JSON.parse(item) : [];

    const data = (await request.json()) as PostTodo;

    todoList.push({
      id: Number(Date.now()),
      ...data,
    });

    localStorage.setItem("todos", JSON.stringify(todoList));

    return new HttpResponse(null, { status: 201 });
  }),

  http.delete(`${BASE_URL}/todos/:id`, async ({ params }) => {
    const { id } = params;

    const item = localStorage.getItem("todos");

    const todoList: Todo[] = item ? JSON.parse(item) : [];

    if (!id || todoList.length < 1) return;

    const updatedList = todoList.filter((todo) => todo.id !== Number(id));

    localStorage.setItem("todos", JSON.stringify(updatedList));

    return new HttpResponse(null, { status: 200 });
  }),

  http.patch(`${BASE_URL}/todos/:id`, async ({ request, params }) => {
    const { id } = params;

    const item = localStorage.getItem("todos");
    const todo = (await request.json()) as PatchTodoRequestBody;

    const todoList: Todo[] = item ? JSON.parse(item) : [];

    if (!id || todoList.length < 1) return;

    const updatedList = todoList.map((todoItem) => {
      if (todoItem.id === Number(id))
        return {
          ...todoItem,
          ...todo,
        };

      return todoItem;
    });

    localStorage.setItem("todos", JSON.stringify(updatedList));

    return new HttpResponse(null, { status: 200 });
  }),

  http.patch(`${BASE_URL}/todos`, async ({ request }) => {
    const itemList = localStorage.getItem("todos");
    const { targetIndex, destinationIndex } = (await request.json()) as PatchTodoSpliceRequestBody;

    const todoList: Todo[] = itemList ? JSON.parse(itemList) : [];

    const changedTodoList = [...todoList];
    const item = changedTodoList[targetIndex];

    changedTodoList.splice(targetIndex, 1);
    changedTodoList.splice(destinationIndex, 0, item);

    localStorage.setItem("todos", JSON.stringify(changedTodoList));

    return new HttpResponse(null, { status: 200 });
  }),

  http.get(`${BASE_URL}/logs`, async () => {
    const items = localStorage.getItem("logs");

    const logList = items ? JSON.parse(items) : [];

    return HttpResponse.json(logList);
  }),

  http.post(`${BASE_URL}/logs`, async ({ request }) => {
    const items = localStorage.getItem("logs");

    const logList = items ? JSON.parse(items) : [];

    const data = (await request.json()) as PostTodo;

    logList.push(data);

    localStorage.setItem("logs", JSON.stringify(logList));

    return new HttpResponse(null, { status: 201 });
  }),
];

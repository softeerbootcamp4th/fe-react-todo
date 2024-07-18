import { http } from "msw";
import { postTodo } from "./todos/post";
import { getTodos } from "./todos/get";
import { deleteTodo } from "./todos/delete";
import { patchTodo } from "./todos/patch";

const API_BASE_URL = "/api" as const;
export const handlers = [
  http.post(`${API_BASE_URL}/todos`, postTodo),
  http.get(`${API_BASE_URL}/todos`, getTodos),
  http.delete(`${API_BASE_URL}/todos/:id`, deleteTodo),
  http.patch(`${API_BASE_URL}/todos/:id`, patchTodo),
];

import { http } from "msw";
import { postTodo } from "./todos/post";
import { getTodos } from "./todos/get";
import { deleteTodo } from "./todos/:id/delete";
import { patchTodo } from "./todos/:id/patch";
import { readLogs } from "./logs/get";
import { getRecentTodos } from "./todos/recent/get";

const API_BASE_URL = "/api" as const;
export const handlers = [
  http.post(`${API_BASE_URL}/todos`, postTodo),
  http.get(`${API_BASE_URL}/todos`, getTodos),
  http.delete(`${API_BASE_URL}/todos/:id`, deleteTodo),
  http.patch(`${API_BASE_URL}/todos/:id`, patchTodo),
  http.get(`${API_BASE_URL}/todos/recent`, getRecentTodos),
  http.get(`${API_BASE_URL}/logs`, readLogs),
];

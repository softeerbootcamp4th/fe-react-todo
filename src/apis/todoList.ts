import { Todo, PostTodoRequestBody, PatchTodoSpliceRequestBody, PatchTodoRequestBody } from "../types/todoType";
import { http } from "./http";

export const getTodoList = () => {
  return http.get<Todo[]>(`/todos`);
};

export const postTodo = (data: PostTodoRequestBody) => {
  return http.post(`/todos`, JSON.stringify(data));
};

export const deleteTodo = (id: number) => {
  return http.delete(`/todos/${id}`);
};

export const patchTodo = (id: number, data: PatchTodoRequestBody) => {
  return http.patch(`/todos/${id}`, JSON.stringify(data));
};

export const patchTodoSplice = (data: PatchTodoSpliceRequestBody) => {
  return http.patch(`/todos`, JSON.stringify(data));
};

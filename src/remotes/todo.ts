import { Todo } from "../models/Todo";

const TODO_API = "/api/todos";
export const todoRemotes = {
  getTodos: async () => {
    return fetch(TODO_API).then((res) => res.json());
  },
  createTodo: async (title: string) => {
    return fetch(TODO_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
      }),
    }).then((res) => res.json());
  },
  updateTodo: async (todo: Todo) => {
    return fetch(`${TODO_API}/${todo.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    }).then((res) => res.json());
  },
  deleteTodo: async (id: number) => {
    return fetch(`${TODO_API}/${id}`, {
      method: "DELETE",
    }).then((res) => res.json());
  },
  updateTodoPosition: async (todo: Todo, index: number) => {
    return fetch(`${TODO_API}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ index: index, todo: todo }),
    }).then((res) => res.json());
  },
};

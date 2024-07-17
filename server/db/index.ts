import { Todo } from "../../src/models/Todo";

export const insertTodo = async (todo: Todo) => {
  const currentTodos = await readTodos();
  localStorage.setItem("todos", JSON.stringify([...currentTodos, todo]));
};

export const readTodos = async (): Promise<Array<Todo>> => {
  return JSON.parse(localStorage.getItem("todos") || "[]");
};

export const updateTodo = async (todo: Todo) => {
  const currentTodos = await readTodos();
  const updatedTodos = currentTodos.map((t) => (t.id === todo.id ? todo : t));
  localStorage.setItem("todos", JSON.stringify(updatedTodos));
};

export const removeTodo = async (id: number) => {
  const currentTodos = await readTodos();
  const updatedTodos = currentTodos.filter((t) => t.id !== id);
  localStorage.setItem("todos", JSON.stringify(updatedTodos));
};

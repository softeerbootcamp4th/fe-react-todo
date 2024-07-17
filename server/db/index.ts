import { Todo } from "../../src/models/Todo";

export const db = {
  insertTodo: async (todo: Todo) => {
    const currentTodos = await db.readTodos();
    localStorage.setItem("todos", JSON.stringify([...currentTodos, todo]));
  },

  readTodos: async (): Promise<Array<Todo>> => {
    return JSON.parse(localStorage.getItem("todos") || "[]");
  },

  updateTodo: async (todo: Todo) => {
    const currentTodos = await db.readTodos();
    const updatedTodos = currentTodos.map((t) => (t.id === todo.id ? todo : t));
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  },

  deleteTodo: async (id: number) => {
    const currentTodos = await db.readTodos();
    const updatedTodos = currentTodos.filter((t) => t.id !== id);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  },
};

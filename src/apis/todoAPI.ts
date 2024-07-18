import { BaseTodoId, BaseTodoItem, TodoItemType } from "../types/todo";

export class TodoAPI {
    private static baseURL = "http://localhost:3000/todo";
    private static headers = {
        "Content-Type": "application/json",
    };

    // GET 요청
    public static get() {
        return fetch(`${this.baseURL}`, {
            method: "GET",
            headers: this.headers,
        })
            .then(response => response.json())
            .catch(error => {
                console.error("Error:", error);
                throw error;
            });
    }
    // POST 요청
    public static post(data: BaseTodoItem) {
        return fetch(`${this.baseURL}`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .catch(error => {
                console.error("Error:", error);
                throw error;
            });
    }
    // DELETE 요청
    public static delete(data: BaseTodoId) {
        return fetch(`${this.baseURL}/${data.id}`, {
            method: "DELETE",
            headers: this.headers,
        })
            .then(response => response.json())
            .catch(error => {
                console.error("Error:", error);
                throw error;
            });
    }
    // PATCH 요청
    public static patch(data: TodoItemType) {
        return fetch(`${this.baseURL}/${data.id}`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .catch(error => {
                console.error("Error:", error);
                throw error;
            });
    }
}

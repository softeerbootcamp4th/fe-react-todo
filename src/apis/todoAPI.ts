import { BaseTodoId, BaseTodoItem, TodoItemType } from "../types/todo";

export class TodoAPI {
    private static baseURL = "http://localhost:3000/todo";
    private static headers = {
        "Content-Type": "application/json",
    };

    // GET 요청
    public static async get() {
        try {
            const response = await fetch(`${this.baseURL}`, {
                method: "GET",
                headers: this.headers,
            });
            return response.json();
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    }
    // POST 요청
    public static async post(data: BaseTodoItem) {
        try {
            const response = await fetch(`${this.baseURL}`, {
                method: "POST",
                headers: this.headers,
                body: JSON.stringify(data),
            });
            return response.json();
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    }
    // DELETE 요청
    public static async delete(data: BaseTodoId) {
        try {
            const response = await fetch(`${this.baseURL}/${data.id}`, {
                method: "DELETE",
                headers: this.headers,
            });
            return response.json();
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    }
    // PATCH 요청
    public static async patch(data: TodoItemType) {
        try {
            const response = await fetch(`${this.baseURL}/${data.id}`, {
                method: "PATCH",
                headers: this.headers,
                body: JSON.stringify(data),
            });
            return response.json();
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    }
    // DELETE ALL 요청
    public static async deleteAll(data: TodoItemType[]) {
        const promises = data.map(item => {
            return fetch(`${this.baseURL}/${item.id}`, {
                method: "DELETE",
                headers: this.headers,
            });
        });
        try {
            const responses = await Promise.all(promises);
            const results = await Promise.all(responses.map(response => response.json()));
            return results;
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    }
    // POST ALL 요청
    public static async postAll(data: TodoItemType[]) {
        const promises = data.map(item => {
            return fetch(`${this.baseURL}`, {
                method: "POST",
                headers: this.headers,
                body: JSON.stringify(item),
            });
        });
        try {
            const responses = await Promise.all(promises);
            const results = await Promise.all(responses.map(response => response.json()));
            return results;
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    }
}

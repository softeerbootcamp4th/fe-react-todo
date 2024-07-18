import { BaseTodoId, BaseTodoItem, TodoItemType } from "../types/todo";

const baseURL = "http://localhost:3000/todo";
const headers = {
    "Content-Type": "application/json",
};

export const TodoAPI = {
    // GET 요청
    async get() {
        try {
            const response = await fetch(`${baseURL}`, {
                method: "GET",
                headers: headers,
            });
            return response.json();
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    },
    // POST 요청
    async post(data: BaseTodoItem) {
        try {
            const response = await fetch(`${baseURL}`, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(data),
            });
            return response.json();
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    },
    // DELETE 요청
    async delete(data: BaseTodoId) {
        try {
            const response = await fetch(`${baseURL}/${data.id}`, {
                method: "DELETE",
                headers: headers,
            });
            return response.json();
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    },
    // PATCH 요청
    async patch(data: TodoItemType) {
        try {
            const response = await fetch(`${baseURL}/${data.id}`, {
                method: "PATCH",
                headers: headers,
                body: JSON.stringify(data),
            });
            return response.json();
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }
    },
    // DELETE ALL 요청
    async deleteAll(data: TodoItemType[]) {
        const promises = data.map(item => {
            return fetch(`${baseURL}/${item.id}`, {
                method: "DELETE",
                headers: headers,
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
    },
    // POST ALL 요청
    async postAll(data: TodoItemType[]) {
        const results = [];
        try {
            for (const item of data) {
                const response = await fetch(`${baseURL}`, {
                    method: "POST",
                    headers: headers,
                    body: JSON.stringify(item),
                });
                const result = await response.json();
                results.push(result);
            }
        } catch (error) {
            console.error("Error:", error);
            throw error;
        }

        return results;
    },
};

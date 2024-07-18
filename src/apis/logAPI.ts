import { LogType } from "../types/log";

export class LogAPI {
    private static baseURL = "http://localhost:3000/log";
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
    public static async post(data: LogType) {
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
}

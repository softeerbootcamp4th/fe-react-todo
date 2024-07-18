import { LogType } from "../types/log";

export class LogAPI {
    private static baseURL = "http://localhost:3000/log";
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
    public static post(data: LogType) {
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
}

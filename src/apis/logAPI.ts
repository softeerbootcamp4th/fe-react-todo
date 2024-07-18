import { LogType } from "../types/log";

const baseURL = "http://localhost:3000/log";
const headers = {
    "Content-Type": "application/json",
};

export const LogAPI = {
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
    async post(data: LogType) {
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
};

export class TodoAPI {
    private static baseURL = "http://localhost:3000";
    private static headers = {
        "Content-Type": "application/json",
    };

    // GET 요청
    public static get() {
        return fetch(`${this.baseURL}/todo`, {
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
    public static post(data: any) {
        return fetch(`${this.baseURL}/todo`, {
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
    public static delete() {
        return fetch(`${this.baseURL}/todo`, {
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
    public static patch(data: any) {
        return fetch(`${this.baseURL}/todo`, {
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

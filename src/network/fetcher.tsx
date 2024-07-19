class Fetcher {

    baseURL: string = ""

    constructor(baseURL: string) {
        this.baseURL = baseURL
    }

    async post(data: object) {
        const jsonData = JSON.stringify(data);
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        const response = await fetch(`${this.baseURL}`, {
            method: "POST",
            headers: headers,
            body: jsonData,
            redirect: "follow"
        })
        if (!response.ok) {
            throw new Error("request failed.")
        }

        try {
            const data = await response.json()
            return data
        }
        catch {
            throw new Error("parsing failed.")
        }
    }

    async get(endpoint: string) {
        const response = await fetch(`${this.baseURL}/${endpoint}`)

        if (!response.ok) {
            throw new Error("request failed.")
        }

        try {
            const data = await response.json()
            return data
        }
        catch {
            throw new Error("parsing failed.")
        }
    }

    async delete(id: string) {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        const response = await fetch(`${this.baseURL}/${id}`, {
            method: "DELETE"
        })
        console.log(response)
    }

    async patch(data: object, endpoint: string) {
        const jsonData = JSON.stringify(data);
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        const response = await fetch(`${this.baseURL}/${endpoint}`, {
            method: "PATCH",
            headers: headers,
            body: jsonData,
            redirect: "follow"
        })
        if (!response.ok) {
            throw new Error("request failed.")
        }

        try {
            const data = await response.json()
            return data
        }
        catch {
            throw new Error("parsing failed.")
        }
    }
}


export default Fetcher

import Fetcher from "./fetcher.tsx";

class ToDosFetcher extends Fetcher {
    constructor() {
        super("http://localhost:3001/todos");
    }

    addTodo = async (data: object) => await super.post(data)
    getAllTodo = async () => await super.get("")
    patchTodo = async (id: string, todo: string) => await super.patch({ "todo": todo }, id)
    deleteTodo = async (id: string) => await super.delete(id)
}

const toDosFetcher = new ToDosFetcher()

export default toDosFetcher

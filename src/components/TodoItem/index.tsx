import { TodoItemProps } from "../../types/todo";

function TodoItem({ todo }: TodoItemProps) {
    return <li className="border-b border-gray-300 py-4 px-6 text-xl">{todo.description}</li>;
}

export default TodoItem;

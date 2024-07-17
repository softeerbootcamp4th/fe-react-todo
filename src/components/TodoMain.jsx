import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/todoMain.module.css';
import TodoInput from './TodoInput';
import TodoList from './TodoList';

function TodoMain() {
    const [todoListArr, setTodoListArr] = useState([]);

    useEffect(() => {
        const getTodos = async () => {
            try {
                const response = await axios.get('http://localhost:5000/todos');
                setTodoListArr(response.data);
            } catch (error) {
                console.log("데이터가 제대로 안받아짐", error);
            }
        };

        getTodos();
    }, []);

    const addTodo = async (text) => {
        try {
            const response = await axios.post('http://localhost:5000/todos', { text });
            setTodoListArr([...todoListArr, response.data]);
        } catch (error) {
            console.log("잘못됨", error);
        }
    };

    const removeTodo = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/todos/${id}`);
            setTodoListArr(todoListArr.filter(todo => todo.id !== id));
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    return (
        <main>
            <TodoInput addTodo={addTodo} />
            <TodoList todoArr={todoListArr} removeTodo={removeTodo} />
        </main>
    );
}

export default TodoMain;

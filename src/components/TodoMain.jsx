import { useEffect, useState } from 'react';
import axios from 'axios';
// import styles from '../styles/todoMain.module.css';
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
            const response = await axios.post('http://localhost:5000/todos', { "text": text, "isDone": false });
            setTodoListArr([...todoListArr, response.data]);
        } catch (error) {
            console.log("추가 실패");
        }
    };
    const removeTodo = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/todos/${id}`);
            setTodoListArr(todoListArr.filter(todo => todo.id !== id));
        } catch (error) {
            console.error("제거 싪패");
        }
    };
    const detailLiClick = async (index) => {
        try {
            const updatedTodo = todoListArr[index];
            const response = await axios.patch(`http://localhost:5000/todos/${updatedTodo.id}`, {
                isDone: !updatedTodo.isDone
            });
            setTodoListArr(prev => prev.map(todo =>
                todo.id === response.data.id ? response.data : todo
            ));
        } catch (error) {
            console.error("업데이트 실패");
        }
    }


    const updateTodo = async (id, updateText) => {
        try {
            const response = await axios.patch(`http://localhost:5000/todos/${id}`, {
                text: updateText
            });
            setTodoListArr(prev => prev.map(todo =>
                todo.id === response.data.id ? response.data : todo
            ));
        }
        catch {
            console.log("텍스트 업데이트 실패")
        }
    }


    const [dragStartIndex, setDragStartIndex] = useState(null);

    const handleDragStart = (index) => {
        setDragStartIndex(index);
    };

    const handleDragEnd = async (index) => {
        if (dragStartIndex !== null && dragStartIndex !== index) {
            const updatedTodoArr = [...todoListArr];
            const [movedItem] = updatedTodoArr.splice(dragStartIndex, 1);
            updatedTodoArr.splice(index, 0, movedItem);

            try {
                const updatePromises = todoListArr.map((todo, idx) =>
                    axios.patch(`http://localhost:5000/todos/${todo.id}`, updatedTodoArr[idx])
                );
                const responses = await Promise.all(updatePromises);
                const updatedTodos = responses.map(response => response.data);
                setTodoListArr(updatedTodos);
            } catch (error) {
                console.error("전체 업데이트 실패", error);
            }
        }
        setDragStartIndex(null);
    };




    return (
        <main>
            <TodoInput addTodo={addTodo} />
            <TodoList todoArr={todoListArr} removeTodo={removeTodo} detailLiClick={detailLiClick} updateTodo={updateTodo} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />
        </main>
    );
}
export default TodoMain;
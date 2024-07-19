import React, { useContext, useState } from 'react';
import TodoListElement from './TodoListElement';
import axios from 'axios';
import { todoListContext } from '../context/root';
import styles from '../styles/todoList.module.css'

function TodoList() {
    const [todoListArr, setTodoListArr] = useContext(todoListContext);


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
        <ul className={styles.container}>
            {todoListArr.map((todo, index) => (
                <li key={todo.id} className={styles.todoListLi}>
                    <TodoListElement
                        todo={todo}
                        index={index}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                    />
                </li>
            ))}
        </ul>
    );
}

export default TodoList;

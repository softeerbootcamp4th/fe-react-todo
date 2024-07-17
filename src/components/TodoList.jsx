import React from 'react';
import TodoButton from './TodoButton';
import styles from '../styles/todoList.module.css';

function TodoList({ todoArr, removeTodo }) {
    return (
        <div>
            <ul>
                {todoArr.map((todo) => (
                    <li key={todo.id} className={styles.todoItem}>
                        {todo.text}
                        <TodoButton text="삭제" onClick={() => removeTodo(todo.id)} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoList;

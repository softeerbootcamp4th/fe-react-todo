import { useState } from 'react';
import TodoButton from './TodoButton';
import styles from '../styles/todoInput.module.css';

function TodoInput({ addTodo }) {
    const [inputText, setInputText] = useState('');

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

    const registerClick = async (e) => {
        e.preventDefault();
        if (inputText.trim() === '') return;
        await addTodo(inputText);
        setInputText('');
    };

    return (
        <form className={styles.container} onSubmit={registerClick}>
            <input
                id="todoInput"
                type="text"
                placeholder="할일을 입력하세요"
                value={inputText}
                className={styles.todoInput}
                onChange={handleInputChange}
            />
            <TodoButton text="등록" />
        </form>
    );
}

export default TodoInput;

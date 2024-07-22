import React from 'react';
import styles from '../styles/todoButton.module.css';

function TodoButton({ text, onClick }) {

    return (
        <button className={text === '등록' ? styles.registerButton : text === '삭제' ? styles.removeButton : styles.updateButton} onClick={onClick}>
            {text}
        </button>
    );
}

export default TodoButton;

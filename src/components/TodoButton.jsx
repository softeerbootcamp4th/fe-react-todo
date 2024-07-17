import React from 'react';
import styles from '../styles/todoButton.module.css';

function TodoButton({ text, onClick }) {
    return (
        <button className={styles.button} onClick={onClick}>
            {text}
        </button>
    );
}

export default TodoButton;

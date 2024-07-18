import { useState, useRef } from "react";
import styles from '../styles/todoListElement.module.css';
import TodoButton from './TodoButton';

function TodoListElement({ todo, index, removeTodo, detailLiClick, updateTodo, onDragStart, onDragEnd }) {
    const [updateText, setUpdateText] = useState(todo.text);
    const [mouseDownTime, setMouseDownTime] = useState(null);
    const timeRef = useRef(null);
    const [updateMouseDown, setUpdateMouseDown] = useState(false);
    const [isMouseDown, setIsMouseDown] = useState(false);

    const handleMouseDown = () => {
        setMouseDownTime(new Date().getTime());
        setIsMouseDown(true);
        onDragStart(index); // 드래그 시작 인덱스 전달
        timeRef.current = setTimeout(() => {
            setUpdateMouseDown(true);
        }, 2000);
    };

    const handleMouseUp = () => {
        const currentTime = new Date().getTime();
        setIsMouseDown(false);
        onDragEnd(index); // 드래그 종료 인덱스 전달

        if (currentTime - mouseDownTime < 2000) {
            clearTimeout(timeRef.current);
            timeRef.current = null;
            detailLiClick(index);
            setMouseDownTime(null);
        }
    };

    const handleUpdateText = (e) => {
        setUpdateText(e.target.value);
    };

    const handleMouseMove = () => {
        if (isMouseDown) {
            setIsMouseDown(false);
            clearTimeout(timeRef.current);
        }
    };

    return (
        <>
            {updateMouseDown ? (
                <>
                    <input type="text" value={updateText} onChange={handleUpdateText} />
                    <TodoButton text="수정" onClick={() => {
                        updateTodo(todo.id, updateText);
                        setUpdateMouseDown(false);
                    }} />
                </>
            ) : (
                <>
                    <div
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                        onMouseMove={handleMouseMove}
                        className={todo.isDone ? styles.completed : styles.noncompleted}
                    >
                        {todo.text}
                    </div>
                    <TodoButton text="삭제" onClick={() => removeTodo(todo.id)} />
                </>
            )}
        </>
    );
}

export default TodoListElement;

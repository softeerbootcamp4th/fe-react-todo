import { useState, useRef, useContext } from "react";
import styles from '../styles/todoListElement.module.css';
import TodoButton from './TodoButton';
import axios from "axios";
import { todoListContext } from "../context/root";


function TodoListElement({ todo, index, onDragStart, onDragEnd }) {
    const [updateText, setUpdateText] = useState(todo.text);
    const [mouseDownTime, setMouseDownTime] = useState(null);
    const timeRef = useRef(null);
    const [updateMouseDown, setUpdateMouseDown] = useState(false);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [todoListArr, setTodoListArr] = useContext(todoListContext);



    const removeTodo = async (id, text) => {
        try {
            await axios.post('http://localhost:5000/logs', { "title": "삭제", "body": `${text}이(가) 삭제되었습니다` });
            await axios.delete(`http://localhost:5000/todos/${id}`);
            setTodoListArr(todoListArr.filter(todo => todo.id !== id));
        } catch (error) {
            console.error("제거 싪패");
        }
    };
    const detailLiClick = async (index) => {
        try {
            const updatedTodo = todoListArr[index];
            await axios.post('http://localhost:5000/logs', { "title": "완료", "body": `${updatedTodo.text}이(가) 완료되었습니다` });
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
            await axios.post('http://localhost:5000/logs', { "title": "수정", "body": `${updateText}로 수정이 완료되었습니다` });
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
                    <input type="text" value={updateText} onChange={handleUpdateText} className={styles.updateInput} />
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
                    <TodoButton text="삭제" onClick={() => removeTodo(todo.id, todo.text)} />
                </>
            )}
        </>
    );
}

export default TodoListElement;

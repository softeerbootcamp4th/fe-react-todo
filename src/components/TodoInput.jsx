import { useState, useContext } from 'react';
import TodoButton from './TodoButton';
import styles from '../styles/todoInput.module.css';
import { todoListContext } from '../context/root';
import axios from 'axios';

function TodoInput() {

    const [todoListArr, setTodoListArr] = useContext(todoListContext);
    const [inputText, setInputText] = useState('');
    const [recentSearchArr, setRecentSearchArr] = useState([]);
    const [showRecentSearch, setshowRecentSearch] = useState(false);
    const [enterkeyDown, setEnterkeyDown] = useState(false);



    const addTodo = async (text) => {
        try {
            const response = await axios.post('http://localhost:5000/todos', { "text": text, "isDone": false });
            await axios.post('http://localhost:5000/logs', { "title": "등록", "body": `${text}이(가) 등록되었습니다` });
            setTodoListArr([...todoListArr, response.data]);
        } catch (error) {
            console.log("추가 실패");
        }
    };


    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };


    const registerClick = async (e) => {
        e.preventDefault();
        if (inputText.trim() === '') return;
        if (inputText.length > 20) {
            alert("20자 이하로 작성해주세요!!");
            return;
        }
        await addTodo(inputText);
        setRecentSearchArr([inputText, ...recentSearchArr]);
        setInputText('');
        if (enterkeyDown) {
            setshowRecentSearch(true);
            setEnterkeyDown(false);
        }
        else {
            setshowRecentSearch(false);
        }

    };


    const handleInputClick = () => {
        if (recentSearchArr.length > 0) {
            setshowRecentSearch(true);
        }

    }


    const notShowResearchArr = () => {
        setshowRecentSearch(false);
    }


    const handleEnterKeyDown = (e) => {
        if (e.key === "Enter") {
            setEnterkeyDown(true);
        }
    }



    return (
        <>
            {showRecentSearch ?
                <div className={styles.recentSearchBox}>
                    {recentSearchArr.slice(0, 5).map((recentSearch, index) => <div key={index} className={styles.recentSearchEach}>{recentSearch}</div>)}
                </div>
                : null}
            <form className={styles.container} onSubmit={registerClick}


            >
                <input
                    id="todoInput"
                    type="text"
                    placeholder="할 일을 입력하세요"
                    value={inputText}
                    className={styles.todoInput}
                    onChange={handleInputChange}
                    onFocus={handleInputClick}
                    onBlur={notShowResearchArr}
                    onKeyDown={handleEnterKeyDown}
                    autoComplete='off'
                />
                <TodoButton text="등록" />

            </form>


        </>
    );
}

export default TodoInput;

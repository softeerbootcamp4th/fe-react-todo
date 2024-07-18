import { useState, useContext } from 'react';
import TodoButton from './TodoButton';
import styles from '../styles/todoInput.module.css';
import todoListContext from '../context/root';
import axios from 'axios';

function TodoInput() {

    const [todoListArr, setTodoListArr] = useContext(todoListContext);
    const [inputText, setInputText] = useState('');
    const [recentSearchArr, setRecentSearchArr] = useState([]);
    const [showRecentSearch, setshowRecentSearch] = useState(false);



    const addTodo = async (text) => {
        try {
            const response = await axios.post('http://localhost:5000/todos', { "text": text, "isDone": false });
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
        await addTodo(inputText);
        setRecentSearchArr([inputText, ...recentSearchArr]);
        setInputText('');
        setshowRecentSearch(false);
    };


    const handleInputClick = () => {
        setshowRecentSearch(true);
    }


    const notShowResearchArr = () => {
        setshowRecentSearch(false);
    }


    return (
        <>
            <form className={styles.container} onSubmit={registerClick}
                onFocus={handleInputClick}
                onBlur={notShowResearchArr}>
                <input
                    id="todoInput"
                    type="text"
                    placeholder="할일을 입력하세요"
                    value={inputText}
                    className={styles.todoInput}
                    onChange={handleInputChange}
                    autoComplete='off'
                />
                <TodoButton text="등록" />
            </form>
            {showRecentSearch ? recentSearchArr.slice(0, 5).map((recentSearch, index) => <div key={index}>{recentSearch}</div>) : null}
        </>
    );
}

export default TodoInput;

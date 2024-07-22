import styles from '../styles/todoMain.module.css';
import TodoInput from './TodoInput';
import TodoList from './TodoList';


function TodoMain() {
    return (
        <main className={styles.container}>
            <TodoInput />
            <TodoList />
        </main>
    );
}
export default TodoMain;
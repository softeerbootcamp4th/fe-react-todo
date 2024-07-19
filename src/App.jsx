import styles from './styles/App.module.css'
import Header from './components/Header'
import TodoMain from './components/TodoMain';
import { todoListContext, logContext } from './context/root';
import { useState, useEffect } from 'react';
import axios from 'axios';
import LogList from './components/LogList';

function App() {
  const [todoListArr, setTodoListArr] = useState([]);
  const [logArr, setLogArr] = useState([]);
  useEffect(() => {
    const getTodos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/todos');
        setTodoListArr(response.data);
      } catch (error) {
        console.log("데이터가 제대로 안받아짐", error);
      }
    };

    getTodos();
  }, []);


  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <Header />
        <todoListContext.Provider value={[todoListArr, setTodoListArr]}>
          <TodoMain />
        </todoListContext.Provider>
        <logContext.Provider value={[logArr, setLogArr]}>
          <LogList />
        </logContext.Provider>
      </div>
    </div>
  );
}

export default App;

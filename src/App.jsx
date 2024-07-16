import styles from './styles/App.module.css'
import Header from './components/Header'
import TodoMain from './components/TodoMain';

function App() {
  return (
    <div className={styles.App}>
      <Header />
      <TodoMain />
    </div>
  );
}

export default App;

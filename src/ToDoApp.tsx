import { useState } from 'react';
import './App.css';
import Header from './Header.tsx'
import Input from './Input.tsx'
import List from './List.tsx'

const ToDoApp: React.FC = () => {
    const [toDo, setToDo] = useState<string>("");
    const [toDos, setToDos] = useState<string[]>([]);

    const addToDo = (newToDo: string) => {
        setToDos(currentArray => [newToDo, ...currentArray]);
    };
    return (
        <div>
            <Header />
            <Input toDo={toDo} setToDo={setToDo} addToDo={addToDo}/>
            <List toDos={toDos}/>
        </div>
    )
}

export default ToDoApp;
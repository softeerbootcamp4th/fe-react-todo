import React, { useState } from 'react';
import Header from './Header.tsx'
import LogList from './LogList.tsx'
import TextField from './TextField.tsx'
import ToDoList from './ToDoList.tsx';
import "./index.css"

const App: React.FC = () => {
    const [toDo, setToDo] = useState<string>("");
    const [toDos, setToDos] = useState<string[]>([]);

    const addToDo = (todo: string): undefined => {
        setToDos(currentArray => [todo, ...currentArray]);
        setToDo("");
    };

    const deleteToDo = (todo: string): undefined => {
        setToDos(currentArray => currentArray.filter(item => item !== todo));
    }

    const updateToDo = (oldTodo: string, newTodo: string): void => {
        setToDos(currentArray => currentArray.map(item => item === oldTodo ? newTodo : item));
    };

    const changeCurrentToDo = (event: React.ChangeEvent<HTMLInputElement>) => {
        setToDo(event.target.value)
    }
    return (
        <>
            <div className="min-h-screen flex">
                <div className="flex flex-col items-center w-full">
                    <Header />
                    <TextField toDo={toDo} setToDo={changeCurrentToDo} addToDo={addToDo} />
                    <ToDoList toDos={toDos} deleteToDo={deleteToDo} updateToDo={updateToDo}/>
                </div>
                <div className="absolute right-10 top-10 z-10">
                    <div className=''>
                        <LogList />
                    </div>
                </div>
            </div>
        </>
    )
}

export default App

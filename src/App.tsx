import React, { useState } from 'react';
import Header from './Header.tsx'
import LogList from './LogList.tsx'
import TextField from './TextField.tsx'
import ToDoList from './ToDoList.tsx';
import "./index.css"

const App: React.FC = () => {
    const [toDo, setToDo] = useState<string>("a");
    const [toDos, setToDos] = useState<string[]>([]);

    const addToDo = (todo: string): undefined => {

        setToDos(currentArray => [todo, ...currentArray]);
    };

    const changCurrentToDo = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("app " + event.target.value)
        setToDo(event.target.value)
    }

    return (
        <>
            <div className="min-h-screen flex">
                <div className="flex flex-col items-center w-full">
                    <Header />
                    <TextField toDo={toDo} setToDo={changCurrentToDo} addToDo={addToDo} />
                    <ToDoList toDos={toDos} />
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

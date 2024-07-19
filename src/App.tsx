import React, { useState } from 'react';
import Header from './Header.tsx'
import { LogList } from './LogList.tsx'
import LogElementProps from './LogListElement.tsx';
import TextField from './TextField.tsx'
import ToDoList from './ToDoList.tsx';
import "./index.css"

const App: React.FC = () => {
    const [toDo, setToDo] = useState<string>("");
    const [toDos, setToDos] = useState<string[]>([]);
    const [logList, setLogList] = useState<LogElementProps[]>([]);

    const addToDo = (todo: string): undefined => {
        setToDos(currentArray => [todo, ...currentArray]);
        const newLog: LogElementProps = { todo: todo, status: "추가" }
        setLogList(before => [newLog, ...before])
        setToDo("");
    };

    const deleteToDo = (todo: string): undefined => {
        setToDos(currentArray => currentArray.filter(item => item !== todo));
        const newLog: LogElementProps = { todo: todo, status: "삭제" }
        setLogList(before => [newLog, ...before])
    }

    const updateToDo = (oldTodo: string, newTodo: string): void => {
        setToDos(currentArray => currentArray.map(item => item === oldTodo ? newTodo : item));
        const newLog: LogElementProps = { todo: newTodo, status: "수정" }
        setLogList(before => [newLog, ...before])
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
                    <ToDoList toDos={toDos} deleteToDo={deleteToDo} updateToDo={updateToDo} />
                </div>
                <div className="absolute right-10 top-10 z-10 w-80">
                    <h3>LogList</h3>
                    <LogList logList={logList} />
                </div>
            </div>
        </>
    )
}

export default App

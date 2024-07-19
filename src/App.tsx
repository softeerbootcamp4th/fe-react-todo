import React, { useEffect, useState } from 'react';
import Header from './Header.tsx'
import { LogList } from './LogList.tsx'
import LogElementProps from './LogListElement.tsx';
import TextField from './TextField.tsx'
import ToDoList from './ToDoList.tsx';
import "./index.css"
import toDosFetcher from './network/toDosFetcher.tsx';
import ToDo from './Todo.tsx';

const App: React.FC = () => {
    const [toDo, setToDo] = useState<string>("");
    const [toDos, setToDos] = useState<ToDo[]>([]);
    const [logList, setLogList] = useState<LogElementProps[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const todos = await toDosFetcher.getAllTodo() as ToDo[]
            setToDos(todos.reverse())
        };

        fetchData();
    }, []);

    const addToDo = (todo: string): undefined => {
        const newTodo: ToDo = { id: `${toDos.length}`, todo: todo }
        toDosFetcher.addTodo(newTodo)
        setToDos(currentArray => [newTodo, ...currentArray]);
        const newLog: LogElementProps = { todo: todo, status: "추가" }
        setLogList(before => [newLog, ...before])
        setToDo("");
    };

    const deleteToDo = (data: ToDo): undefined => {
        toDosFetcher.deleteTodo(data.id)
        setToDos(currentArray => currentArray.filter(item => item.id !== data.id));
        const newLog: LogElementProps = { todo: data.todo, status: "삭제" }
        setLogList(before => [newLog, ...before])
    }

    const updateToDo = (oldTodo: ToDo, newTodo: ToDo): void => {
        toDosFetcher.patchTodo(newTodo.id, newTodo.todo)
        setToDos(currentArray => currentArray.map(item => item.id === oldTodo.id ? newTodo : item));
        const newLog: LogElementProps = { todo: newTodo.todo, status: "수정" }
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

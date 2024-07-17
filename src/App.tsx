import React from 'react';
import Header from './Header.tsx'
import LogList from './LogList.tsx'
import TextField from "./TextField.tsx"
import ToDoList from './ToDoList.tsx';

const App: React.FC = () => {
    return (
        <>
            <div className="min-h-screen flex">
                <div className="flex flex-col items-center w-full">
                    <Header />
                    <TextField />
                    <ToDoList />
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

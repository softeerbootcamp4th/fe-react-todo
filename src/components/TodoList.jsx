import React from 'react';
import TodoListElement from './TodoListElement';

function TodoList({ todoArr, removeTodo, detailLiClick, updateTodo, handleDragStart, handleDragEnd }) {


    return (
        <ul>
            {todoArr.map((todo, index) => (
                <li key={todo.id}>
                    <TodoListElement
                        todo={todo}
                        index={index}
                        removeTodo={removeTodo}
                        detailLiClick={detailLiClick}
                        updateTodo={updateTodo}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                    />
                </li>
            ))}
        </ul>
    );
}

export default TodoList;

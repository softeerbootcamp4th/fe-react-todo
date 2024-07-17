import './App.css';

interface ToDoListProps {
    toDos: string[];
}

const List: React.FC<ToDoListProps> = ({ toDos }) => {
    return (
        <ul>
            {toDos.map((item, index) => (
                <li className='list-item' key={index}>
                    <span>{item}</span>
                    <button className='bg-blue-500'>삭제</button>
                </li>
            ))}
        </ul>
    );
}

export default List;
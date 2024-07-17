import './App.css';

interface ToDoFormProps {
    toDo: string;
    setToDo: React.Dispatch<React.SetStateAction<string>>;
    addToDo: (newToDo: string) => void;
}

const Input: React.FC<ToDoFormProps> = ({ toDo, setToDo, addToDo }) => {
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => setToDo(event.target.value);
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (toDo === "") {
            return;
        }
        addToDo(toDo);
        setToDo("");
    };
    return (
        <form onSubmit={onSubmit} className='my-10 flex'>
            <input 
                className='flex-grow-9 mr-3 p-3 ' 
                placeholder='할일을 입력하세요'
                type='text'
                value={toDo}
                onChange={onChange}
            >    
            </input>
            <button className='flex-grow ml-3 bg-green-500 font-bold'>등록</button>
        </form>
    )
}

export default Input;
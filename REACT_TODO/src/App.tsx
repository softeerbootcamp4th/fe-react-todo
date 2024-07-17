import styled, { css } from "styled-components";
import "./App.css";
import { MouseEventHandler, ReactNode, useState } from "react";

// 제목
// input 상자 + 버튼
// 리스트! (useState 사용)
// 리스트 항목

interface StyledButtonProps {
  variant?: "register" | "delete";
}

const StyledButton = styled.button<StyledButtonProps>`
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  color: white;
  transition:
    background-color 0.3s,
    color 0.3s;

  ${({variant}) => 
    variant == "register" &&
    css`
      background-color: green;

      &:hover {
        background-color: darkgreen;
      }
    `}

  ${({variant}) =>
    variant == "delete" &&
    css`
      background-color: blue;

      &:hover {
        background-color: darkblue;
      }
    `}
`;

interface ButtonProps extends StyledButtonProps {
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}


function Button({ children, onClick, variant }: ButtonProps) {
  return <StyledButton variant={variant} onClick={onClick} >{children}</StyledButton>;
}


const StyledInput = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 2px solid black;
  margin-right: 10px;
  transition: border-color 0.3s;

  &:focus {
    border-color: #666;
    outline: none;
  }

  &::placeholder {
    color: gray;
  }
`;

interface InputProps {
  placeholder: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({placeholder, value, onChange}: InputProps) {
  return <StyledInput 
          type="text" 
          value={value} 
          placeholder={placeholder} 
          onChange={onChange} 
        />
}


const FlexDiv = styled.div`
  display: flex;
  justify-content: space-between;

  ${({borderBottom}) =>
    borderBottom &&
    css`
      border-bottom: 1px solid grey;
    `}
`

interface ToDoItemProps extends ButtonProps {
  id: number;
  title: string;
  children?: ReactNode;
  onDragStart: (id: number) => void;
  onDragOver: (id: number) => void;
  onDrop: () => void;
}

function ToDoItem({id, title, children, onClick, onDragStart, onDragOver, onDrop}: ToDoItemProps) {
  return (
    <FlexDiv
      draggable
      onDragStart={() => onDragStart(id)}
      onDragOver={(e) => { e.preventDefault(); onDragOver(id); }}
      onDrop={onDrop}
      borderBottom
    >
      <p>{title}</p>
      <Button variant="delete" onClick={onClick}>삭제</Button>
    </FlexDiv>
  ) 
}

interface TodoData {
  id: number;
  title: string;
}


function App() {
  const initialTodoDatas: TodoData[] = [
    {
      id: 0,
      title: "자바스크립트 공부하기",
    },
    {
      id: 1,
      title: "버튼 컴포넌트 개발",
    },
    {
      id: 2,
      title: "도서 정리하기",
    }
  ]

  const [value, setValue] = useState("");

  const [todoDatas, setTodoData] = useState<TodoData[]>(initialTodoDatas);

  function onChangeValue(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  function onClickRegister() {
    setTodoData((datas) => [...datas, {
      id: todoDatas.length,
      title: value
    }])
    setValue("");
  }

  function onClickDelete(id: number) {
    setTodoData((data) => data.filter((item) => item.id !== id));
  }

  function handleDragStart(id: number) {
    setDraggedId(id);
  }

  function handleDrop() {
    if (draggedId !== droppedId) {
      // set이 바로 반영되지 않아서 useEffect로 변화 감지 후 서버에 전송
      setTodoData((data) => {
        const newData = [...data]
        const draggedIndex = newData.findIndex((item) => item.id === draggedId);
        const droppedIndex = newData.findIndex((item) => item.id === droppedId);
        [newData[draggedIndex], newData[droppedIndex]] = [newData[droppedIndex], newData[draggedIndex]]
        return newData;
      });
      setDraggedId(null);
      setDroppedId(null);
    }
  }

  function handleDragOver(id: number) {
    setDroppedId(id);
  }
  
  const [draggedId, setDraggedId] = useState<number | null>(null);
  const [droppedId, setDroppedId] = useState<number | null>(null);

  return (
    <>
      <div>
        <h1>My Todo App</h1>
        <Input placeholder="할 일을 입력하세요" onChange={onChangeValue} value={value}/>
        <Button variant="register" onClick={onClickRegister}>등록</Button>
        <div>
          {
            todoDatas.map((item: TodoData) => (
              <ToDoItem
                key={item.id}
                id={item.id}
                title={item.title}
                onClick={() => onClickDelete(item.id)} 
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              />
            ))
          }
        </div>
      </div>
    </>
  );
}

export default App;

import FlexDiv from "./FlexDiv";
import { ButtonProps } from "./Button";
import Button from "./Button";

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

export default ToDoItem
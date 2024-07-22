import FlexDiv from "../../atoms/styles/FlexDiv";
import { ButtonProps } from "../../atoms/styles/Button";
import Button from "../../atoms/styles/Button";
import { ReactNode, useState, useRef, useEffect } from "react";
import ToDoTitle from "./ToDoTitle";

interface ToDoItemProps extends ButtonProps {
    id: number;
    title: string;
    children?: ReactNode;
    onDragStart: (id: number) => void;
    onDragOver: (id: number) => void;
    onDrop: () => void;
    onTitleChange: ({ id, body }: { id: number, body: object }) => void;
    onModified: ({ id, title }: { id: number, title: string }) => void
}

function ToDoItem({ id, title, onClick, onDragStart, onDragOver, onDrop, onTitleChange }: ToDoItemProps) {
    const [isModified, setIsModified] = useState(false);
    const [isPressing, setIsPressing] = useState(false);
    const timeoutRef = useRef<number | null>(null);

    useEffect(() => {
        if (isPressing) {
            timeoutRef.current = window.setTimeout(() => {
                setIsModified(true);
            }, 2000);
        } else {
            if (timeoutRef.current !== null) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
        }

        return () => {
            if (timeoutRef.current !== null) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [isPressing]);

    function handleMouseDown(event: React.MouseEvent) {
        event.stopPropagation();
        setIsPressing(true);
    }

    function handleMouseUp(event: React.MouseEvent) {
        event.stopPropagation();
        setIsPressing(false);
        if (timeoutRef.current !== null) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    }

    function handleDragStart() {
        clearTimeout(timeoutRef.current!);
        onDragStart(id);
    }

    function handleDragOver(e) {
        e.preventDefault();
        onDragOver(id);
    }

    function handleStopModify() {
        setIsModified(false);
        setIsPressing(false);
    }

    return (
        <FlexDiv
            draggable
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={onDrop}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            borderBottom
        >
            {isModified ? (
                <ToDoTitle value={title} onStopModify={handleStopModify} onModified={onTitleChange} id={id} />
            ) : (
                <p>{title}</p>
            )}
            <Button variant="delete" onClick={onClick}>삭제</Button>
        </FlexDiv>
    );
}

export default ToDoItem;
import { useState, useRef } from "react";

interface ToDoState {
  value: string;
  draggedId: number | null;
  droppedId: number | null;
  addedTitles: string[];
  isHidden: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
}

interface ToDoStateSetter {
  setValue: React.Dispatch<React.SetStateAction<string>>;
  setDraggedId: React.Dispatch<React.SetStateAction<number | null>>;
  setDroppedId: React.Dispatch<React.SetStateAction<number | null>>;
  setAddedTitles: React.Dispatch<React.SetStateAction<string[]>>;
  setIsHidden: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useToDoState = (): [ToDoState, ToDoStateSetter] => {
  const [value, setValue] = useState("");
  const [draggedId, setDraggedId] = useState<number | null>(null);
  const [droppedId, setDroppedId] = useState<number | null>(null);
  const [addedTitles, setAddedTitles] = useState<string[]>([]);
  const [isHidden, setIsHidden] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const toDoState: ToDoState = {
    value,
    draggedId,
    droppedId,
    addedTitles,
    isHidden,
    inputRef
  };

  const setToDoState: ToDoStateSetter = {
    setValue,
    setDraggedId,
    setDroppedId,
    setAddedTitles,
    setIsHidden,
  };

  return [toDoState, setToDoState];
};

export const useToDoHandlers = (
  toDoState: ToDoState,
  setToDoState: ToDoStateSetter,
  addToDo: Function,
  deleteToDo: Function,
  changeOrderToDo: Function,
  changeTitleToDo: Function
) => {
  const { value, draggedId, droppedId, inputRef } = toDoState;
  const { setValue, setDraggedId, setDroppedId, setAddedTitles, setIsHidden } = setToDoState;

  const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onClickRegister = () => {
    if (value === "") return;
    setAddedTitles((pre) => [value, ...pre.slice(0, 4)]);
    addToDo({ body: { title: value } });
    setValue("");
  };

  const onClickDelete = (id: number) => {
    deleteToDo({ param: String(id) });
  };

  const handleDragStart = (id: number) => {
    setDraggedId(id);
  };

  const handleDrop = () => {
    if (draggedId !== droppedId) {
      changeOrderToDo({ body: { id1: droppedId, id2: draggedId } });
      setDraggedId(null);
      setDroppedId(null);
    }
  };

  const handleDragOver = (id: number) => {
    setDroppedId(id);
  };

  const handleTitleChange = ({ id, title }: { id: number; title: string }) => {
    changeTitleToDo({ param: String(id), body: { title: title } });
  };

  const handleFocus = () => {
    setIsHidden(false);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsHidden(true);
    }, 100);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onClickRegister();
      setIsHidden(true);
      inputRef.current?.blur();
    }
  };

  return {
    onChangeValue,
    onClickRegister,
    onClickDelete,
    handleDragStart,
    handleDrop,
    handleDragOver,
    handleTitleChange,
    handleFocus,
    handleBlur,
    handleKeyPress,
  };
};

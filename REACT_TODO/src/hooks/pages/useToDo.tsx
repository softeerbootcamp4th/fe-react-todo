import { useState, useRef, useEffect } from "react";
import { useFetch } from "../common/useFetch";

interface ToDoClientState {
  value: string;
  draggedId: number | null;
  droppedId: number | null;
  addedTitles: string[];
  isHidden: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
}

interface ToDoClientStateSetter {
  setValue: React.Dispatch<React.SetStateAction<string>>;
  setDraggedId: React.Dispatch<React.SetStateAction<number | null>>;
  setDroppedId: React.Dispatch<React.SetStateAction<number | null>>;
  setAddedTitles: React.Dispatch<React.SetStateAction<string[]>>;
  setIsHidden: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ToDoDataType {
  id: number;
  title: string;
}

const todo = {
  get: { method: "get", path: "/todo" },
  delete: { method: "delete", path: "/todo" },
  add: { method: "post", path: "/todo" },
  changeTitle: { method: "put", path: "/todo" },
  changeOrder: { method: "post", path: "/todo/change" },
  getLog: { method: "get", path: "/todo/log" }
};

export const useToDoClientState = () => {
  const [value, setValue] = useState("");
  const [draggedId, setDraggedId] = useState<number | null>(null);
  const [droppedId, setDroppedId] = useState<number | null>(null);
  const [addedTitles, setAddedTitles] = useState<string[]>([]);
  const [isHidden, setIsHidden] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const toDoClientState: ToDoClientState = {
    value,
    draggedId,
    droppedId,
    addedTitles,
    isHidden,
    inputRef
  };

  const setToDoClientState: ToDoClientStateSetter = {
    setValue,
    setDraggedId,
    setDroppedId,
    setAddedTitles,
    setIsHidden,
  };

  return { toDoClientState, setToDoClientState };
};

export const useToDoServerState = () => {
  const { fetchData: getToDo, data: todoDatas } = useFetch<ToDoDataType[]>(todo.get);
  const { fetchData: changeTitleToDo, loading: changeTitleLoading } = useFetch(todo.changeTitle);
  const { fetchData: addToDo, loading: addLoading } = useFetch(todo.add);
  const { fetchData: deleteToDo, loading: deleteToDoLoading } = useFetch(todo.delete);
  const { fetchData: changeOrderToDo, loading: changeOrderLoading } = useFetch(todo.changeOrder);
  const { fetchData: getLog, data: todoLogs } = useFetch(todo.getLog);

  useEffect(() => {
    if (!changeTitleLoading || !addLoading || !deleteToDoLoading || !changeOrderLoading) {
      getToDo({});
      getLog({});
    }
  }, [changeTitleLoading, addLoading, deleteToDoLoading, changeOrderLoading]);

  const toDoFetch = { getToDo, changeTitleToDo, addToDo, deleteToDo, changeOrderToDo, getLog }
  
  const toDoLoading = { changeTitleLoading, addLoading, deleteToDoLoading, changeOrderLoading }

  const toDoData = { todoDatas, todoLogs }

  return {
    toDoFetch,
    toDoLoading,
    toDoData,
  };
};

export const useToDo = () => {
  const { toDoClientState, setToDoClientState } = useToDoClientState();
  const { toDoFetch, toDoData } = useToDoServerState();

  const { value, draggedId, droppedId, inputRef } = toDoClientState;
  const { setValue, setDraggedId, setDroppedId, setAddedTitles, setIsHidden } = setToDoClientState;
  
  const { addToDo, deleteToDo, changeOrderToDo, changeTitleToDo } = toDoFetch

  const toDoHandle = {
    onChangeValue: (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    },
    onClickRegister: () => {
      if (value === "") return;
      setAddedTitles((pre) => [value, ...pre.slice(0, 4)]);
      addToDo({ body: { title: value } });
      setValue("");
    },
    onClickDelete: (id: number) => {
      deleteToDo({ param: String(id) });
    },
    handleDragStart: (id: number) => {
      setDraggedId(id);
    },
    handleDrop: () => {
      if (draggedId !== droppedId) {
        changeOrderToDo({ body: { id1: droppedId, id2: draggedId } });
        setDraggedId(null);
        setDroppedId(null);
      }
    },
    handleDragOver: (id: number) => {
      setDroppedId(id);
    },
    handleTitleChange: ({ id, title }: { id: number; title: string }) => {
      changeTitleToDo({ param: String(id), body: { title: title } });
    },
    handleFocus: () => {
      setIsHidden(false);
    },
    handleBlur: () => {
      setTimeout(() => {
        setIsHidden(true);
      }, 100);
    },
    handleKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        toDoHandle.onClickRegister();
        setIsHidden(true);
        inputRef.current?.blur();
      }
    }
  };

  return {
    toDoClientState,
    toDoData,
    toDoHandle
  };
};

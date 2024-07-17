import "./App.css";
import { useEffect, useState } from "react";
import { useFetch } from "./hooks/useFetch";
import Button from "./components/Button";
import Input from "./components/Input";
import ToDoItem from "./components/ToDoItem";

// 제목
// input 상자 + 버튼
// 리스트! (useState 사용)
// 리스트 항목

interface TodoData {
  id: number;
  title: string;
}

const todo = {
  "get": {method: "get", path: "/todo"},
  "delete": {method: "delete", path: "/todo"},
}

function App() {
  // const { fetchData: changeToDo } = useFetch<any>({ method: "delete", path: "/todo" });
  const [id, setId] = useState<number|null>(null);
  const [param, setParam] = useState<string|null>(null);
  const { fetchData: getToDo, data: todoDatas, loading: todoLoading } = useFetch<any>(todo.get);
  const { fetchData: addToDo, loading: addLoading } = useFetch<any>({ method: "post", path: "/todo" });
  const { fetchData: deleteToDo, loading: deleteLoading } = useFetch<any>({ method: "delete", path: `/todo` });
  const { fetchData: changeOrderToDo, loading: changeLoading } = useFetch<any>({ method: "post", path: `/todo/change` });

  useEffect(() => {
    getToDo({});
  }, [])
  
  const [value, setValue] = useState("");
  
  function onChangeValue(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }
  
  function onClickRegister() {
    addToDo({ body: { title: value } });
    getToDo({});
    setValue("");
  }
  
  function onClickDelete(id: number) {
    deleteToDo({ param: String(id) });
    getToDo({});
  }
  
  function handleDragStart(id: number) {
    setDraggedId(id);
  }
  
  function handleDrop() {
    if (draggedId !== droppedId) {
      changeOrderToDo({ body: { id1: droppedId, id2: draggedId } });
      getToDo({});
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
            todoDatas?.map((item: TodoData) => (
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

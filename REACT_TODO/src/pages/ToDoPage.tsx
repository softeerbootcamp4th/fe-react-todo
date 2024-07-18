import { useEffect } from "react";

import { useFetch } from "../hooks/common/useFetch";
import { useToDoState, useToDoHandlers } from "../hooks/pages/useToDo";

import { Button, Input } from "../atoms/styles";
import { ToDoItem, Moniter, AddedList } from "../components/toDoPage";

import styled from "styled-components";

interface ToDoDataType {
  id: number;
  title: string;
}

const todo = {
  "get": { method: "get", path: "/todo" },
  "delete": { method: "delete", path: "/todo" },
  "add": { method: "post", path: "/todo" },
  "changeTitle": { method: "put", path: "/todo" },
  "changeOrder": { method: "post", path: "/todo/change" },
  "getLog": { method: "get", path: "/todo/log" }
}

function ToDoPage() {
  // 서버 상태 및 reftch
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

  // 클라이언트 상태 및 핸들러 함수
  const [toDoState, setToDoState] = useToDoState();

  const handlers = useToDoHandlers(
    toDoState,
    setToDoState,
    addToDo,
    deleteToDo,
    changeOrderToDo,
    changeTitleToDo
  );

  const { value, addedTitles, isHidden, inputRef } = toDoState;

  return (
    <>
      <Wrapper>
        <h1>My Todo App</h1>
        
        {todoLogs?.length > 0 && <Moniter logs={todoLogs} />}
        
        <Input
          placeholder="할 일을 입력하세요"
          ref={inputRef}
          onChange={handlers.onChangeValue}
          value={value}
          onFocus={handlers.handleFocus}
          onBlur={handlers.handleBlur}
          onKeyPress={handlers.handleKeyPress}
        />
        
        <Button variant="register" onClick={handlers.onClickRegister}>등록</Button>
        
        {!isHidden && <AddedList data={addedTitles} />}
        
        <div>
          {
            todoDatas?.map((item: ToDoDataType) => (
              <ToDoItem
                key={item.id}
                id={item.id}
                title={item.title}
                onClick={() => handlers.onClickDelete(item.id)}
                onDragStart={() => handlers.handleDragStart(item.id)}
                onDragOver={() => handlers.handleDragOver(item.id)}
                onDrop={handlers.handleDrop}
                onTitleChange={(title) => handlers.handleTitleChange({ id: item.id, title })}
              />
            ))
          }
        </div>
      </Wrapper>
    </>
  );
}

export default ToDoPage;

const Wrapper = styled.div`
  display: relative;
`;

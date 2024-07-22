import { useToDo } from "../hooks/pages/useToDo";

import { Button, Input } from "../atoms/styles";
import { ToDoItem, Moniter, AddedList } from "../components/toDoPage";

import styled from "styled-components";

interface ToDoDataType {
  id: number;
  title: string;
}

function ToDoPage() {
  const { toDoClientState, toDoData, toDoHandle } = useToDo();

  const { value, addedTitles, isHidden, inputRef } = toDoClientState;
  const { todoDatas, todoLogs } = toDoData;
  const {
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
  } = toDoHandle;

  return (
    <Wrapper>
      <h1>My Todo App</h1>
      
      {todoLogs?.length > 0 && <Moniter logs={todoLogs} />}
      
      <Input
        placeholder="할 일을 입력하세요"
        ref={inputRef}
        onChange={onChangeValue}
        value={value}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyPress={handleKeyPress}
      />
      
      <Button variant="register" onClick={onClickRegister}>등록</Button>
      
      {!isHidden && <AddedList data={addedTitles} />}
      
      <div>
        {
          todoDatas?.map((item: ToDoDataType) => (
            <ToDoItem
              key={item.id}
              id={item.id}
              title={item.title}
              onClick={() => onClickDelete(item.id)}
              onDragStart={() => handleDragStart(item.id)}
              onDragOver={() => handleDragOver(item.id)}
              onDrop={handleDrop}
              onTitleChange={(title) => handleTitleChange({ id: item.id, title })}
            />
          ))
        }
      </div>
    </Wrapper>
  );
}

export default ToDoPage;

const Wrapper = styled.div`
  display: relative;
`;

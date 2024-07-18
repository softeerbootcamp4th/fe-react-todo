import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const ToDoInput = styled.input`
  width: 75%;
  height: 57px;
  box-sizing: border-box;
  margin: 0;
  padding: 10px;
  font-size: 16px;
  border: 2px solid black;
  transition: border-color 0.3s;

  &:focus {
    border-color: #666;
    outline: none;
  }

  &:disabled {
    background-color: #f0f0f0;
    border-color: #ccc;
  }
`;

interface ToDoTitleProps {
  value?: string;
  id?: number;
  onModified: ({ id, title } : {id: number, title: string}) => void;
  onStopModify: () => void;
}

const ToDoTitle: React.FC<ToDoTitleProps> = ({ value, onModified, onStopModify, id }) => {

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [changedValue, setChangedValue] = useState(value);

  useEffect(() => {
    inputRef.current?.focus();
  }, [])

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onStopModify();
      if (value === changedValue) { return; }
      onModified({ id: id, title: changedValue});
    }
};

const handleBlur = () => {
    onStopModify();
    if (value === changedValue) { return; }
    onModified({ id: id, title: changedValue});
  }

  return (
    <ToDoInput
      type="text"
      ref={inputRef}
      value={changedValue}
      onChange={(e) => setChangedValue(e.target.value)}
      onBlur={handleBlur}
      onKeyPress={handleKeyPress}
    />
  );
};

export default ToDoTitle;
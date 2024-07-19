import React, { useState, useEffect, useRef } from 'react';
import { ITodoItemProps } from './type';
import { getAllTodoItems, updateTodoItem, updateTodoItemIsEnd } from '../../apis/todo';
import Button from '../button/Button';
import { ButtonSize, ButtonType } from '../button/type';
import { TodoItemWrap } from './style';

const TodoItem: React.FC<ITodoItemProps> = ({ id, index, content, button, isEnd, draggedIndex, setTodoItemDatas }) => {
  const [oldContent, setoldContent] = useState(content);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isEndState, setIsEndState] = useState(isEnd);
  const [isHolding, setIsHolding] = useState(false);
  const timerRef = useRef<number | null>(null);

  const handleClickItem = () => {
    if (isEditMode) return;

    updateTodoItemIsEnd(id, !isEndState).then(() => {
      setIsEndState(!isEndState);
    });
  };

  const handleUpdateItem = () => {
    updateTodoItem(id, oldContent, isEndState).then(() => {
      getAllTodoItems().then(response => {
        setTodoItemDatas(response);
        setIsEditMode(false);
      });
    });
  };

  const handleMouseDown = () => {
    setIsHolding(true);
  };

  const handleMouseUp = () => {
    setIsHolding(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  useEffect(() => {
    if (isHolding) {
      timerRef.current = setTimeout(() => {
        setIsEditMode(true);
      }, 2000);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isHolding]);

  useEffect(() => {
    if (draggedIndex !== null) {
      timerRef.current && clearTimeout(timerRef.current);
    }
  }, [draggedIndex]);

  return (
    <TodoItemWrap
      index={index}
      draggedIndex={draggedIndex}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
    >
      {isEditMode ? (
        <input
          autoFocus={isEditMode}
          style={{ border: 'none', outline: 'none' }}
          type="text"
          maxLength={24}
          value={oldContent}
          onChange={e => setoldContent(e.target.value)}
        />
      ) : (
        <span
          onClick={handleClickItem}
          css={{
            textDecoration: isEndState ? 'line-through' : 'none',
            flexGrow: 1,
          }}
        >
          {oldContent}
        </span>
      )}

      {isEditMode ? (
        <Button size={ButtonSize.SMALL} type={ButtonType.EDIT} onClick={handleUpdateItem}>
          수정
        </Button>
      ) : (
        button
      )}
    </TodoItemWrap>
  );
};

export default TodoItem;

import React, { useState, useEffect } from 'react';
import TodoItem from '../todoItem/TodoItem';
import Button from '../button/Button';
import { logToggleButtonStyle, todoStyle } from './style';
import { Space } from '../../style/style';
import {
  createTodoItem,
  getAllTodoItems,
  deleteTodoItem,
  replaceTodoItems,
  getRecentSearchItems,
} from '../../apis/todo';
import { ITodoBoxProps } from './type';
import { ButtonSize, ButtonType } from '../button/type';
import { RiArrowRightDoubleFill, RiArrowLeftDoubleFill } from 'react-icons/ri';

const TodoBox: React.FC<ITodoBoxProps> = ({ todoItemDatas, setTodoItemDatas, isLogShow, setIsLogShow }) => {
  const [content, setContent] = useState('');
  const [draggedIndex, setdraggedIndex] = useState<number | null>(null);
  const [recentSearchItems, setRecentSearchItems] = useState<string[]>([]);

  useEffect(() => {
    updateTodoItemDatas();
  }, []);

  const updateTodoItemDatas = () => {
    getAllTodoItems().then(response => {
      setTodoItemDatas(response);
    });
    getRecentSearchItems().then(response => {
      setRecentSearchItems(response);
    });
  };

  const handleDeleteTodo = (id: number) => {
    deleteTodoItem(id).then(() => {
      setTodoItemDatas(prev => prev.filter(item => item.id !== id));
    });
  };

  const handleAddTodo = () => {
    if (content.trim()) {
      createTodoItem(content, false).then(() => {
        setContent('');
        updateTodoItemDatas();
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  const handleDragStart = (index: number) => {
    setdraggedIndex(index);
  };

  const handleDragEnter = (index: number) => {
    const newTodoItemDatas = [...todoItemDatas];
    const draggedIndexContent = newTodoItemDatas.splice(draggedIndex!, 1)[0];
    newTodoItemDatas.splice(index, 0, draggedIndexContent);
    setdraggedIndex(index);
    setTodoItemDatas(newTodoItemDatas);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLIElement>) => {
    e.preventDefault();
  };

  const handleDragEnd = () => {
    replaceTodoItems(todoItemDatas).then(() => {
      setdraggedIndex(null);
    });
  };

  return (
    <div css={todoStyle}>
      <div className="flex-center">
        <h1 className="title">My Todo App</h1>
        {isLogShow ? (
          <RiArrowLeftDoubleFill
            size={32}
            css={logToggleButtonStyle}
            onClick={() => {
              setIsLogShow(!isLogShow);
            }}
          />
        ) : (
          <RiArrowRightDoubleFill
            size={32}
            css={logToggleButtonStyle}
            onClick={() => {
              setIsLogShow(!isLogShow);
            }}
          />
        )}
      </div>

      <Space size={36} />

      <div>
        <div style={{ padding: 20 }} className="flex-between">
          <input
            type="text"
            maxLength={24}
            value={content}
            onChange={e => setContent(e.target.value)}
            onKeyPress={handleKeyPress}
            list="recent-search-items"
          />
          <datalist id="recent-search-items">
            {recentSearchItems.map((recentSearchItem, index) => (
              <option key={index} value={recentSearchItem} />
            ))}
          </datalist>
          <Button size={ButtonSize.LARGE} type={ButtonType.ADD} onClick={handleAddTodo}>
            등록
          </Button>
        </div>
        <ul css={{ overflowY: 'auto', height: '300px', scrollbarWidth: 'thin' }}>
          {todoItemDatas.map((todoItem, index) => (
            <li
              key={todoItem.id}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragEnter={() => handleDragEnter(index)}
              onDragEnd={handleDragEnd}
              onDragOver={handleDragOver}
            >
              <TodoItem
                id={todoItem.id}
                index={index}
                isEnd={todoItem.isEnd}
                content={todoItem.content}
                setTodoItemDatas={setTodoItemDatas}
                draggedIndex={draggedIndex}
                button={
                  <Button
                    size={ButtonSize.SMALL}
                    type={ButtonType.DELETE}
                    onClick={() => handleDeleteTodo(todoItem.id)}
                  >
                    삭제
                  </Button>
                }
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoBox;

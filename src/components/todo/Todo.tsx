import React from 'react';
import { css } from '@emotion/react';
import TodoItem from '../todoItem/TodoItem';
import Button from '../button/Button';
import { todoStyle } from './style';

const Todo: React.FC = () => {
  return (
    <div css={todoStyle}>
      <div className="flex-center">
        <h1 className="title">My Todo App</h1>
      </div>
      <div>
        <div>
          <input type="text" />
          <Button size="LARGE" type="ADD" onClick={() => {}}>
            등록
          </Button>
        </div>
        <ul>
          <TodoItem
            leftItem="hello"
            rightItem={
              <Button
                size="SMALL"
                type="DELETE"
                onClick={() => {
                  console.log('hello');
                }}
              >
                삭제
              </Button>
            }
          ></TodoItem>
          <TodoItem
            leftItem="hello"
            rightItem={
              <Button
                size="SMALL"
                type="DELETE"
                onClick={() => {
                  console.log('hello');
                }}
              >
                삭제
              </Button>
            }
          ></TodoItem>
          <TodoItem
            leftItem="hello"
            rightItem={
              <Button
                size="SMALL"
                type="DELETE"
                onClick={() => {
                  console.log('hello');
                }}
              >
                삭제
              </Button>
            }
          ></TodoItem>
        </ul>
      </div>
    </div>
  );
};

export default Todo;

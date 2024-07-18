import React from 'react';
import TodoItem from '../todoItem/TodoItem';
import Button from '../button/Button';
import { todoStyle } from './style';
import { Space } from '../../style/style';

const Todo: React.FC = () => {
  return (
    <div css={todoStyle}>
      <div className="flex-center mb-12">
        <h1 className="title">My Todo App</h1>
      </div>

      <Space size={36} />

      <div>
        <div style={{ padding: 20 }} className="flex-between">
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

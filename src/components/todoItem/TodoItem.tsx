import React from 'react';
import { todoItemStyle } from './style';
import { TodoItemProps } from './type';

const TodoItem: React.FC<TodoItemProps> = ({ leftItem, rightItem }) => {
  return (
    <li css={todoItemStyle}>
      {leftItem}
      {rightItem}
    </li>
  );
};

export default TodoItem;

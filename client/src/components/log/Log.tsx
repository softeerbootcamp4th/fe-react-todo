import React from 'react';
import TodoItem from '../todoItem/TodoItem';
import Badge from '../badge/Badge';
import { logStyle } from './style';
import { Space } from '../../style/style';

const Log: React.FC = () => {
  return (
    <div css={logStyle}>
      <h1 className="title">Log</h1>
      <Space size={36} />

      <TodoItem leftItem="hello" rightItem={<Badge text="DELETE" type="RED" />}></TodoItem>
    </div>
  );
};

export default Log;

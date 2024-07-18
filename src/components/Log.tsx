import React from 'react';
import { css } from '@emotion/react';
import TodoItem from './todoItem/TodoItem';
import Badge from './badge/Badge';

const logStyle = css`
  position: relative;
  width: 20%;
  min-width: 350px;
  max-width: 400px;
  min-height: 600px;
  border: 1px solid gainsboro;
  border-radius: 10px;
  box-shadow: 0 0 20px 10px gainsboro;
  left: -30px;
`;

const Log: React.FC = () => {
  return (
    <div css={logStyle}>
      <TodoItem leftItem="hello" rightItem={<Badge text="DELETE" type="RED" />}></TodoItem>
    </div>
  );
};

export default Log;

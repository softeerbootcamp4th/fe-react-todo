import React from 'react';
import { css } from '@emotion/react';

const todoStyle = css`
  width: 30%;
  min-width: 600px;
  max-width: 1200px;
  min-height: 600px;
  background-color: white;
  border: 1px solid gainsboro;
  border-radius: 10px;
  box-shadow: 0 0 20px 10px gainsboro;
  z-index: 999;
`;

const Todo: React.FC = () => {
  return <div css={todoStyle}></div>;
};

export default Todo;

import React, { useState } from 'react';
import Todo from '../components/todoBox/TodoBox';
import Log from '../components/logBox/LogBox';
import { css } from '@emotion/react';
import { ITodoItem } from '../apis/todo';

const containerStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

const Home: React.FC = () => {
  const [todoItemDatas, setTodoItemDatas] = useState<ITodoItem[]>([]);

  return (
    <div css={containerStyle}>
      <Todo todoItemDatas={todoItemDatas} setTodoItemDatas={setTodoItemDatas} /> <Log todoItemDatas={todoItemDatas} />
    </div>
  );
};

export default Home;

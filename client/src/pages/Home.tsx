import React, { useState } from 'react';
import TodoBox from '../components/todoBox/TodoBox';
import LogBox from '../components/logBox/LogBox';
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
  const [isLogShow, setIsLogShow] = useState<boolean>(false);

  return (
    <div css={containerStyle}>
      <TodoBox
        todoItemDatas={todoItemDatas}
        setTodoItemDatas={setTodoItemDatas}
        isLogShow={isLogShow}
        setIsLogShow={setIsLogShow}
      />
      <LogBox isLogShow={isLogShow} todoItemDatas={todoItemDatas} />
    </div>
  );
};

export default Home;

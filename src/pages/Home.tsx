import React from 'react';
import Todo from '../components/Todo';
import Log from '../components/Log';
import { css } from '@emotion/react';

const containerStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

const Home: React.FC = () => {
  return (
    <div css={containerStyle}>
      <Todo /> <Log />
    </div>
  );
};

export default Home;

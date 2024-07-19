import { css } from '@emotion/react';

export const todoStyle = css`
  width: 30%;
  min-width: 600px;
  max-width: 1200px;
  min-height: 600px;
  background-color: white;
  border: 1px solid gainsboro;
  border-radius: 10px;
  box-shadow: 0 0 20px 10px gainsboro;
  z-index: 999;
  padding: 60px 80px;
  position: relative;
  .title {
    font-size: 2.4rem;
    font-weight: 900;
  }
`;

export const logToggleButtonStyle = css`
  position: absolute;
  top: 30px;
  right: 30px;
  cursor: pointer;
  color: #aaa;
`;

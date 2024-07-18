import { css } from '@emotion/react';
import { ButtonProps } from './type';

export const ButtonStyleProps = {
  DELETE: css`
    background-color: #d8595d;
  `,
  ADD: css`
    background-color: #5d56e7;
  `,
  EDIT: css`
    background-color: #56a35d;
  `,
};

export const ButtonSizeProps = {
  LARGE: css`
    font-size: large;
    padding: 6px 12px;
  `,
  SMALL: css`
    font-size: small;
    padding: 4px 8px;
  `,
};

export const ButtonStyle = css`
  color: #fff;
  border-radius: 8px;
  border: none;
  cursor: pointer;
`;

// 사용자 Props와 스타일 합치는 함수
export const getButtonStyle = (type: ButtonProps['type'], size: ButtonProps['size']) => {
  return css`
    ${ButtonStyle};
    ${ButtonStyleProps[type]};
    ${ButtonSizeProps[size]};
  `;
};

import { css } from '@emotion/react';
import { BadgeProps } from './type';

// Badge 스타일 정의
export const BadgeStyleProps = {
  RED: css`
    color: #d8595d;
    background-color: #f7dedf;
  `,
  BLUE: css`
    color: #5d56e7;
    background-color: #dfddfa;
  `,
  GREEN: css`
    color: #56a35d;
    background-color: #ddedde;
  `,
};

// 기본 Badge 스타일
export const BadgeStyle = css`
  padding: 6px 12px;
  padding-top: 8px;
  border-radius: 12px;
  width: fit-content;
  font-size: 0.8rem;
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// 사용자 Props와 스타일 합치는 함수
export const getBadgeStyle = (type: BadgeProps['type']) => {
  return css`
    ${BadgeStyle};
    ${BadgeStyleProps[type]};
  `;
};

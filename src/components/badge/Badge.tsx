import React from 'react';
import { BadgeProps } from './type';
import { getBadgeStyle } from './style';

const Badge: React.FC<BadgeProps> = ({ type, text }) => {
  return <div css={getBadgeStyle(type)}>{text}</div>;
};

export default Badge;

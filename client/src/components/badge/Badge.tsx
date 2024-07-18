import React from 'react';
import { BadgeProps } from './type';
import { getBadgeStyle } from './style';

const Badge: React.FC<BadgeProps> = ({ type }) => {
  return <div css={getBadgeStyle(type)}>{type}</div>;
};

export default Badge;

import React from 'react';
import { ButtonProps } from './type';
import { getButtonStyle } from './style';

const Button: React.FC<ButtonProps> = ({ children, type, size, onClick }) => {
  return (
    <button onClick={onClick} css={getButtonStyle(type, size)}>
      {children}
    </button>
  );
};

export default Button;

import styled from "styled-components";
import React, { forwardRef } from "react";

const StyledInput = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 2px solid black;
  margin-right: 10px;
  transition: border-color 0.3s;

  &:focus {
    border-color: #666;
    outline: none;
  }

  &::placeholder {
    color: gray;
  }
`;

interface InputProps {
  placeholder: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, value, onChange, onFocus, onBlur, onKeyPress }, ref) => {
    return (
      <StyledInput
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyPress={onKeyPress}
        ref={ref}
      />
    );
  }
);

export default Input;

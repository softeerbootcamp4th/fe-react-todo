import styled from "styled-components";

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
}

export default function Input({placeholder, value, onChange}: InputProps) {
  return <StyledInput 
          type="text" 
          value={value} 
          placeholder={placeholder} 
          onChange={onChange} 
        />
}

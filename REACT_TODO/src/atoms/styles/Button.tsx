import { css, styled } from "styled-components";
import { ReactNode, MouseEventHandler } from "react";

interface StyledButtonProps {
    variant?: "register" | "delete";
}
  
const StyledButton = styled.button<StyledButtonProps>`
padding: 10px 20px;
font-size: 16px;
border: none;
border-radius: 5px;
cursor: pointer;
color: white;
transition:
    background-color 0.3s,
    color 0.3s;

${({variant}) => 
    variant == "register" &&
    css`
    background-color: green;

    &:hover {
        background-color: darkgreen;
    }
    `}

${({variant}) =>
    variant == "delete" &&
    css`
    background-color: blue;

    &:hover {
        background-color: darkblue;
    }
    `}
`;

export interface ButtonProps extends StyledButtonProps {
    children?: ReactNode;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}


export default function Button({ children, onClick, variant }: ButtonProps) {
    return <StyledButton variant={variant} onClick={onClick} >{children}</StyledButton>;
}
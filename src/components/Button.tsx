import { css } from "@emotion/react";
import { HTMLAttributes } from "react";

type ButtonVariants =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "info";
export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariants;
}

const getButtonStyles = (variant: ButtonVariants) => {
  switch (variant) {
    case "primary":
      return css`
        background-color: #0088ff;
        color: white;
        &:hover {
          background-color: #00208b;
        }
      `;
    case "secondary":
      return css`
        background-color: #f1f1f1;
        color: black;
        &:hover {
          background-color: #dcdcdc;
        }
      `;
    case "success":
      return css`
        background-color: #00a800;
        color: white;
        &:hover {
          background-color: #007500;
        }
      `;
    case "warning":
      return css`
        background-color: #ffaa00;
        color: white;
        &:hover {
          background-color: #cc7a00;
        }
      `;
    case "error":
      return css`
        background-color: #ff0000;
        color: white;
        &:hover {
          background-color: #cc0000;
        }
      `;
    case "info":
      return css`
        background-color: #00a8ff;
        color: white;
        &:hover {
          background-color: #0075cc;
        }
      `;
  }
};

export const Button = ({ variant = "primary", ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      css={css`
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 0.25rem;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;

        ${getButtonStyles(variant)}
      `}
    />
  );
};

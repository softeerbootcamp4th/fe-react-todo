export enum ButtonType {
  DELETE = 'DELETE',
  EDIT = 'EDIT',
  ADD = 'ADD',
}

export enum ButtonSize {
  SMALL = 'SMALL',
  LARGE = 'LARGE',
}

export interface ButtonProps {
  children: string;
  type: ButtonType;
  size: ButtonSize;
  onClick: () => void;
}

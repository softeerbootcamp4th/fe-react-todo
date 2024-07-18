export interface ButtonProps {
  children: string;
  type: 'DELETE' | 'ADD' | 'EDIT';
  size: 'SMALL' | 'LARGE';
  onClick: () => void;
}

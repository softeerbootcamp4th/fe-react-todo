export enum BadgeType {
  DELETE = 'DELETE',
  EDIT = 'EDIT',
  ADD = 'ADD',
}

export interface BadgeProps {
  type: BadgeType;
}

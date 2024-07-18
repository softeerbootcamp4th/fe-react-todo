import { ReactElement } from 'react';
import { ITodoItem } from '../../apis/todo';

export interface ITodoItemProps {
  id: number;
  content: string;
  button: ReactElement;
  isEnd: boolean;
  draggedIndex: number | null;
  setTodoItemDatas: React.Dispatch<React.SetStateAction<ITodoItem[]>>;
}

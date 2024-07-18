import { ReactElement } from 'react';
import { ITodoItem } from '../../apis/todo';

export interface TodoItemProps {
  leftItem: ReactElement | string;
  rightItem: ReactElement | string;
}

export interface ITodoBoxProps {
  todoItemDatas: ITodoItem[];
  setTodoItemDatas: React.Dispatch<React.SetStateAction<ITodoItem[]>>;
}

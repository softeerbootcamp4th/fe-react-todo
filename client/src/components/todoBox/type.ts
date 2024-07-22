import { ITodoItem } from '../../apis/todo';

export interface ITodoBoxProps {
  todoItemDatas: ITodoItem[];
  setTodoItemDatas: React.Dispatch<React.SetStateAction<ITodoItem[]>>;
  isLogShow: boolean;
  setIsLogShow: React.Dispatch<React.SetStateAction<boolean>>;
}

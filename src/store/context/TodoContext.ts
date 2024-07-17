import { createContext } from 'react';
import {
  TodoState,
  requestAddTodoProps,
  requestUpdateTodoProps,
  requestRemoveTodoProps,
  requestAddHistoryProps,
  requestRemoveHistoryProps,
  requestAddRecentTodoProps,
} from 'src/store/types/todoTypes';

const initialTodo = {
  recentTodoList: [],
  todoList: [],
  todoHistory: [],
};

const initContext = {
  todo: initialTodo,
  requestAddTodo: () => {},
  requestUpdateTodo: () => null,
  requestRemoveTodo: () => null,
  requestAddHistory: () => null,
  requestRemoveHistory: () => null,
  requestAddRecentTodo: () => null,
  requestRemoveLastRecentTodo: () => null,
};

interface ContextType {
  todo: TodoState;
  requestAddTodo: (payload: requestAddTodoProps) => void;
  requestUpdateTodo: (payload: requestUpdateTodoProps) => void;
  requestRemoveTodo: (payload: requestRemoveTodoProps) => void;
  requestAddHistory: (payload: requestAddHistoryProps) => void;
  requestRemoveHistory: (payload: requestRemoveHistoryProps) => void;
  requestAddRecentTodo: (payload: requestAddRecentTodoProps) => void;
  requestRemoveLastRecentTodo: () => void;
}

const TodoContext = createContext<ContextType>(initContext);

export { TodoContext, initialTodo };

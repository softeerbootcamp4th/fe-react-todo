import { PropsWithChildren, useMemo, useReducer } from 'react';
import { initialTodo, TodoContext } from 'src/store/context/TodoContext';
import todoReducer from 'src/store/reducer/todoReducer';
import {
  requestAddTodoProps,
  TODO_ACTION,
  requestRemoveTodoProps,
  requestAddHistoryProps,
  requestRemoveHistoryProps,
  requestAddRecentTodoProps,
  requestUpdateTodoProps,
} from 'src/store/types/todoTypes';

function TodoContextProvider({ children }: PropsWithChildren) {
  const [todo, dispatch] = useReducer(todoReducer, initialTodo);

  const requestAddTodo = (payload: requestAddTodoProps) =>
    dispatch({ type: TODO_ACTION.ADD_TODO, payload });

  const requestRemoveTodo = (payload: requestRemoveTodoProps) =>
    dispatch({ type: TODO_ACTION.REMOVE_TODO, payload });

  const requestAddHistory = (payload: requestAddHistoryProps) =>
    dispatch({ type: TODO_ACTION.ADD_HISTORY, payload });

  const requestRemoveHistory = (payload: requestRemoveHistoryProps) =>
    dispatch({ type: TODO_ACTION.REMOVE_HISTORY, payload });

  const requestAddRecentTodo = (payload: requestAddRecentTodoProps) =>
    dispatch({ type: TODO_ACTION.ADD_RECENT_TODO, payload });

  const requestRemoveLastRecentTodo = () => dispatch({ type: TODO_ACTION.REMOVE_LAST_RECENT_TODO });

  const requestUpdateTodo = (payload: requestUpdateTodoProps) =>
    dispatch({ type: TODO_ACTION.UPDATE_TODO, payload });

  const context = useMemo(
    () => ({
      todo,
      requestAddTodo,
      requestRemoveTodo,
      requestAddHistory,
      requestRemoveHistory,
      requestAddRecentTodo,
      requestRemoveLastRecentTodo,
      requestUpdateTodo,
    }),
    [todo],
  );

  return <TodoContext.Provider value={context}>{children}</TodoContext.Provider>;
}

export default TodoContextProvider;

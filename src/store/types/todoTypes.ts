import { Dispatch } from 'react';

export type TodoStatus = '수정' | '삭제' | '등록';

export interface TodoItem {
  title: string;
  registerDate: Date;
  status: TodoStatus;
}

export interface TodoState {
  recentTodoList: TodoItem[];
  todoList: TodoItem[];
  todoHistory: TodoItem[];
}

export const enum TODO_ACTION {
  ADD_TODO = 'ADD_TODO',
  REMOVE_TODO = 'REMOVE_TODO',
  UPDATE_TODO = 'UPDATE_TODO',

  ADD_HISTORY = 'ADD_HISTORY',
  REMOVE_HISTORY = 'REMOVE_HISTORY',

  ADD_RECENT_TODO = 'ADD_RECENT_TODO',
  REMOVE_LAST_RECENT_TODO = 'REMOVE_LAST_RECENT_TODO',
}

export interface requestAddTodoProps {
  title: string;
}

export interface requestRemoveTodoProps {
  index: number;
}

export interface requestAddHistoryProps {
  title: string;
  status: TodoStatus;
}

export interface requestRemoveHistoryProps {
  index: number;
}

export interface requestAddRecentTodoProps {
  title: string;
}

export interface requestUpdateTodoProps {
  index: number;
  title: string;
}

export type TodoAction =
  | { type: TODO_ACTION.ADD_TODO; payload: requestAddTodoProps }
  | { type: TODO_ACTION.UPDATE_TODO; payload: requestUpdateTodoProps }
  | { type: TODO_ACTION.REMOVE_TODO; payload: requestRemoveTodoProps }
  | { type: TODO_ACTION.ADD_HISTORY; payload: requestAddHistoryProps }
  | { type: TODO_ACTION.REMOVE_HISTORY; payload: requestRemoveHistoryProps }
  | { type: TODO_ACTION.ADD_RECENT_TODO; payload: requestAddRecentTodoProps }
  | { type: TODO_ACTION.REMOVE_LAST_RECENT_TODO; payload?: never };

export type UserDispatch = Dispatch<TodoAction>;

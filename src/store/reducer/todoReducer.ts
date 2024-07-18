import { TodoState, TodoAction, TODO_ACTION } from 'src/store/types/todoTypes';

const todoReducer = (state: TodoState, { type, payload }: TodoAction): TodoState => {
  switch (type) {
    case TODO_ACTION.ADD_TODO:
      return {
        ...state,
        todoList: [
          {
            status: '등록',
            registerDate: new Date(),
            title: payload.title,
          },
          ...state.todoList,
        ],
      };

    case TODO_ACTION.UPDATE_TODO: {
      return {
        ...state,
        todoList: state.todoList.map((todo, index) =>
          index === payload.index ? { ...todo, title: payload.title } : todo,
        ),
      };
    }
    case TODO_ACTION.REMOVE_TODO:
      return {
        ...state,
        todoList: state.todoList.filter((_, index) => index !== payload.index),
      };

    case TODO_ACTION.ADD_HISTORY:
      return {
        ...state,
        todoHistory: [
          {
            status: '등록',
            registerDate: new Date(),
            title: payload.title,
          },
          ...state.todoHistory,
        ],
      };

    case TODO_ACTION.REMOVE_HISTORY:
      return {
        ...state,
        todoHistory: state.todoHistory.filter((_, index) => index !== payload.index),
      };

    case TODO_ACTION.ADD_RECENT_TODO:
      return {
        ...state,
        recentTodoList: [
          {
            status: '등록',
            registerDate: new Date(),
            title: payload.title,
          },
          ...state.recentTodoList,
        ],
      };

    case TODO_ACTION.REMOVE_LAST_RECENT_TODO:
      return {
        ...state,
        recentTodoList: state.recentTodoList.slice(0, -1),
      };

    default:
      return state;
  }
};

export default todoReducer;

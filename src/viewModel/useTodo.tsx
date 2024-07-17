import useTodoContext from 'src/store/hooks/useTodoContext';

// view model
const useTodo = () => {
  const {
    todo,
    requestRemoveTodo,
    requestAddTodo,
    requestAddHistory,
    requestAddRecentTodo,
    requestRemoveLastRecentTodo,
    requestUpdateTodo,
  } = useTodoContext();

  const addTodo = (title: string) => {
    if (title.trim().length !== 0) {
      requestAddTodo({ title });
      if (todo.recentTodoList.length === 5) {
        requestRemoveLastRecentTodo();
      }
      requestAddRecentTodo({ title });
      requestAddHistory({ title, status: '등록' });
    }
  };

  const removeTodo = (index: number) => {
    if (index >= 0) {
      const todoTitle = todo.todoList[index].title;
      requestRemoveTodo({ index });
      requestAddHistory({ title: todoTitle, status: '삭제' });
    }
  };

  const updateTodo = ({ index, title }: { index: number; title: string }) => {
    if (title.length !== 0) {
      requestUpdateTodo({ index, title });
      requestAddHistory({ title, status: '수정' });
    }
  };

  return {
    todo,
    addTodo,
    removeTodo,
    updateTodo,
  };
};

export default useTodo;

import { useContext } from 'react';
import { TodoContext } from 'src/store/context/TodoContext';

export default function useTodoContext() {
  return useContext(TodoContext);
}

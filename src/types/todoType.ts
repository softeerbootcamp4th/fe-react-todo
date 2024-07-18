export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export interface PostTodoRequestBody {
  text: string;
  completed: boolean;
}

export interface PatchTodoSpliceRequestBody {
  targetIndex: number;
  destinationIndex: number;
}

export interface PatchTodoRequestBody {
  text?: string;
  completed?: boolean;
}

export interface TodoMutate {
  updateTodoItem: (id: number, data: PatchTodoRequestBody) => void;
  spliceTodoItem: (data: PatchTodoSpliceRequestBody) => void;
  deleteTodoItem: (id: number) => void;
}

export type Logs = "등록" | "수정" | "삭제";

export interface LogMsg {
  log: Logs;
  todoItem: string;
}

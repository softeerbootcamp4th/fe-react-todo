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

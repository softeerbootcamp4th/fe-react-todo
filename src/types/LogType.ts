export type Logs = "등록" | "수정" | "삭제";

export interface LogMsg {
  log: Logs;
  todoItem: string;
}

export interface PostLogRequestBody {
  log: Logs;
  todoItem: string;
}

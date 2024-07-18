interface BaseLog {
    id?: string;
    description: string;
    prevDescription?: string;
}

export interface AddLog extends BaseLog {
    status: "등록";
}
export interface DeleteLog extends BaseLog {
    status: "삭제";
}
export interface EditLog extends BaseLog {
    status: "수정";
}

export type LogType = AddLog | DeleteLog | EditLog;

export type LogStatus = "등록" | "삭제" | "수정";

interface BaseLog {
    id?: string;
    description: string;
    prevDescription?: string;
}

interface AddLog extends BaseLog {
    status: "등록";
}
interface DeleteLog extends BaseLog {
    status: "삭제";
}
interface EditLog extends BaseLog {
    status: "수정";
}

export type LogType = AddLog | DeleteLog | EditLog;

export type LogStatus = "등록" | "삭제" | "수정";

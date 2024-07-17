interface BaseLog {
    id: string;
}
interface AddLog {
    status: "등록";
    description: string;
}
interface DeleteLog extends BaseLog {
    status: "삭제";
    description: string;
}
interface EditLog extends BaseLog {
    status: "수정";
    description: string;
    prevDescription: string;
}

export type Log = AddLog | DeleteLog | EditLog;

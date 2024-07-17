import { LogStatus } from "../types/log";

export const LOG_STATUS: Record<string, LogStatus> = {
    add: "등록",
    edit: "수정",
    delete: "삭제",
};

export const STATUS_TO_COLOR: Record<LogStatus, string> = {
    등록: "blue",
    수정: "purple",
    삭제: "pink",
};

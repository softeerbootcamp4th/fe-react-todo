import { Dispatch } from "react";

export interface SystemState {
    loading: boolean;
    error: string | null;
}

export const enum SYSTEM_ACTION {
    SET_LOADING = "SET_LOADING",
    CLEAR_LOADING = "CLEAR_LOADING"
}

export interface SetLoadingProps {}
export interface ClearLoadingProps {}

export type SystemAction = 
    | { type: SYSTEM_ACTION.SET_LOADING; payload: SetLoadingProps}
    | { type: SYSTEM_ACTION.CLEAR_LOADING; payload: ClearLoadingProps}

export type SystemDispatch = Dispatch<SystemAction>;
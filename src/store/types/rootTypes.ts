import { Dispatch } from "react";
import { UserAction, UserState } from "./userTypes";
import { SystemAction, SystemState } from "./systemTypes";

export interface RootState {
    user: UserState;
    system: SystemState;
}

export type RootAction = UserAction | SystemAction;

export type RootDispatch = Dispatch<SystemAction | UserAction>;

export type RootReducer = (state: RootState, action: RootAction) => RootState;

export interface RootContextProps {
    state: RootState;
    dispatch: Dispatch<RootAction>;
}
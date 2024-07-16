import { Dispatch } from "react";

export interface UserState {
    name: string;
    isLoggedIn: boolean;
}

export const enum USER_ACTION {
    LOGIN_USER = "LOGIN_USER",
    LOGOUT_USER = "LOGOUT_USER"
}

export interface LoginUserProps { name: string }
export interface LogoutUserProps {}

export type UserAction = 
| { type: USER_ACTION.LOGIN_USER; payload: LoginUserProps}
| { type: USER_ACTION.LOGOUT_USER; payload: LogoutUserProps}

export type UserDispatch = Dispatch<UserAction>;
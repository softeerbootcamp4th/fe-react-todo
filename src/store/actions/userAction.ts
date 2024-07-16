import { LoginUserProps, LogoutUserProps, USER_ACTION, UserDispatch } from "../types/userTypes";

const requestLogin = (dispatch: UserDispatch, payload: LoginUserProps) => {
    console.log("hi login")
    dispatch({ type: USER_ACTION.LOGIN_USER, payload });
};

const requsetLogout = (dispatch: UserDispatch, payload: LogoutUserProps) => {
    dispatch({ type: USER_ACTION.LOGOUT_USER, payload });
};

export { requestLogin, requsetLogout };

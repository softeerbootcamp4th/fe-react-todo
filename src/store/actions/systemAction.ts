import { SYSTEM_ACTION, SystemDispatch } from "../types/systemTypes";

const requestSetLoading = (dispatch: SystemDispatch) => {
    dispatch({ type: SYSTEM_ACTION.SET_LOADING, payload: {} });
};

const requestClearLoading = (dispatch: SystemDispatch) => {
    dispatch({ type: SYSTEM_ACTION.CLEAR_LOADING, payload: {} });
};

export { requestSetLoading, requestClearLoading };

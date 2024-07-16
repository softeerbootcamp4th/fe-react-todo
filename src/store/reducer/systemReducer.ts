import { SYSTEM_ACTION, SystemAction, SystemState } from "../types/systemTypes";

const systemReducer = (state: SystemState, action: SystemAction) => {
    switch (action.type) {
        case SYSTEM_ACTION.SET_LOADING:
            return { ...state, loading: true };
        case SYSTEM_ACTION.CLEAR_LOADING:
            return { ...state, loading: false };
        default:
            return state;
    }
};

export default systemReducer;

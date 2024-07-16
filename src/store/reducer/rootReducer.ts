import userReducer from './userReducer';
import systemReducer from './systemReducer';
import { UserAction } from '../types/userTypes';
import { SystemAction } from '../types/systemTypes';
import { RootReducer } from '../types/rootTypes';

const rootReducer: RootReducer = (state, action) => {
    return {
        user: userReducer(state.user, action as UserAction),
        system: systemReducer(state.system, action as SystemAction),
    };
};

export default rootReducer;

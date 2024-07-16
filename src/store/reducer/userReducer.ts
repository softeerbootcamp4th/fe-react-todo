import { UserState, UserAction, USER_ACTION } from 'src/store/types/userTypes';

const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case USER_ACTION.LOGIN_USER:
      return { ...state, ...action.payload };
    case USER_ACTION.LOGOUT_USER:
      return { ...state };
    default:
      return state;
  }
};

export default userReducer;

import { PropsWithChildren, useMemo, useReducer } from 'react';
import { initialUser, UserContext } from 'src/store/context/UserContext';
import { LoginUserProps, USER_ACTION } from 'src/store/types/userTypes';
import userReducer from 'src/store/reducer/userReducer';

function UserContextProvider({ children }: PropsWithChildren) {
  const [user, dispatch] = useReducer(userReducer, initialUser);

  const login = (payload: LoginUserProps) => {
    dispatch({ type: USER_ACTION.LOGIN_USER, payload });
  };

  const logout = () => {
    dispatch({ type: USER_ACTION.LOGOUT_USER });
  };

  const context = useMemo(() => ({ user, login, logout }), [user]);

  return (
    <UserContext.Provider value={context}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;

import { createContext } from 'react';
import { LoginUserProps, UserState } from 'src/store/types/userTypes';

const initialUser = {
  name: '',
  isLoggedIn: false,
};

const UserContext = createContext<{
  user: UserState;
  login:(payload: LoginUserProps) => void;
  logout: () => void;
    }>({
      user: initialUser,
      login: () => null,
      logout: () => null,
    });

export { UserContext, initialUser };

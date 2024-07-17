import { useContext } from 'react';
import { UserContext } from 'src/store/context/UserContext';

export default function useUserContext() {
  return useContext(UserContext);
}

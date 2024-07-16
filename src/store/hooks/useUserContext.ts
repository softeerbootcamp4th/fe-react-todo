import { useContext } from 'react';
import { UserContext } from 'src/store/context/userContext';

export default function useUserContext() {
  return useContext(UserContext);
}

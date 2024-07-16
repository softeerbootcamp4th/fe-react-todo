import useUserContext from 'src/store/hooks/useUserContext';

// view model
const useUser = () => {
  const { user, login } = useUserContext();

  return { user, login };
};

export default useUser;

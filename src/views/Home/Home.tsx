import useUser from 'src/viewModel/useHome';

// view
export default function Home() {
  const {
    user,
    login,
  } = useUser();

  return (
    <div className="bg-pink-400 flex-row w-full">
      <button type="submit" onClick={() => login({ name: 'string' })}>
        {JSON.stringify(user)}
        LOGIN
      </button>
      Home
    </div>
  );
}

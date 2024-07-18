import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ROUTES from 'src/constants/routes';
import RootContextProvider from 'src/store/provider';
import Home from 'src/views/Home/Home';
import Todo from 'src/views/Todo/Todo';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <RootContextProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path={ROUTES.TODO} element={<Todo />} />
            <Route path={ROUTES.HOME} element={<Home />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </RootContextProvider>
  );
}

export default App;

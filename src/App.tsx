import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ROUTES from 'src/constants/routes';
import Todo from 'src/views/Todo/Todo';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.TODO} element={<Todo />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

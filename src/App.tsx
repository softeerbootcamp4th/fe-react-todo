import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ROUTES from 'src/constants/routes';
import RootContextProvider from 'src/store/provider';
import Home from 'src/views/Home/Home';

function App() {
  return (
    <RootContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
        </Routes>
      </BrowserRouter>
    </RootContextProvider>
  );
}

export default App;

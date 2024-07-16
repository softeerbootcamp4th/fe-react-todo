import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home/Home";
import Splash from "./pages/Splash/Splash";
import { ROUTES } from "./constants/routes";
import SystemWrapper from "./components/warpper/SystemWrapper";
import RootContextProvider from './store/provider/RootContextProvider';

function App() {
  return (
    <RootContextProvider>
      <SystemWrapper>
        <Router>
          <Routes >
            <Route path={ROUTES.SPLASH} element={<Splash />} />
            <Route path={ROUTES.HOME} element={<Home />} />
          </Routes>
        </Router>
      </SystemWrapper>
    </RootContextProvider>
  );
}

export default App;

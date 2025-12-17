import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { decodeToken } from 'react-jwt';
import { Navigate, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.scss';
import ProfilePage from './containers/profile-page/profile-page';
import Mainpage from './containers/main-page/main-page';
import TestPage from './containers/test-page/test-page';
import NotFoundPage from './containers/not-found-page/not-found-page';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import CreatePage from './containers/create-page/create-page';
import { setToken } from './store/slices/authSlice';

function App() {
  const dispatch = useDispatch();
  const token = Cookies.get('token');
  const decodedToken = token ? decodeToken(token) : null;

  useEffect(() => {
    if (token) {
      dispatch(setToken(token));
    }
  }, [token, dispatch]);

  return (
    <div className="App" id="App">
      <Router>
        <Routes>
          <Route path="/profile" element={<ProfilePage teacher={decodedToken?.teacher} />} />
          <Route path="/" element={<Mainpage />} />
          <Route path="/test/:id" element={<TestPage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

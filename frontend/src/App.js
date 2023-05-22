import Cookies from 'js-cookie';
import { decodeToken } from 'react-jwt';
import { Navigate, BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import LoginPage from './containers/login-page/login-page';
import ProfilePage from './containers/profile-page/profile-page';
import Mainpage from './containers/main-page/main-page';
import TestPage from './containers/test-page/test-page';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import CreatePage from './containers/create-page/create-page';

function App() {
  const token = decodeToken(Cookies.get('token'))?.teacher;

  return (
    <div className="App" id="App">
      <Router>
        <Routes>
          <Route path="/profile" element={<ProfilePage teacher={token} />} />
          <Route
            path="/login"
            element={<LoginPage />}
          />
          <Route
            path="/"
            element={<Mainpage />}
          />
          <Route path="/test/:id" element={<TestPage />} />
          <Route path="/create" element={<CreatePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

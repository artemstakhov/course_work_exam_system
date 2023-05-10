import logo from './logo.svg';
import './App.css';
import LoginPage from './containers/login-page/login-page';
import ProfilePage from './containers/profile-page/profile-page';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Mainpage from './containers/main-page/main-page';
import TestPage from './containers/test-page/test-page';

function App() {
  return (
    <div className="App" id="App">
    <Router>
      <Routes>
        <Route path='/profile' element={<ProfilePage teacher={true} />}/>
        <Route path='/login' element={<LoginPage />}/>
        <Route path='/' element={<Mainpage />}/>
        <Route path='/test' element={<TestPage />}/>
      </Routes>
    </Router>
      
    </div>
  );
}

export default App;

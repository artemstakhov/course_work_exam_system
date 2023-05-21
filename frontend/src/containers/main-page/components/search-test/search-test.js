import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './search-test.sass';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { decodeToken } from 'react-jwt';
import Cookies from 'js-cookie';

function SearchTest() {
  const [testItems, setTestItems] = useState([]);
  const [privateKey, setPrivateKey] = useState('');
  const [userTests, setUserTests] = useState([]);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const id = decodeToken(Cookies.get('token'))._id;
  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/tests`);
        setTestItems(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTests();
  }, []);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/user/${id}`);
        const passedTestsIds = response.data.passed_tests.map(test => test.test._id);
        setUserTests(passedTestsIds);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  };


const handleButtonClick = () => {
  const matchedTest = testItems.find(test => test.privateKey === privateKey);

  if (matchedTest && !userTests.includes(matchedTest._id)) {
    // Переход на страницу теста
    window.location.href = `/test/${matchedTest._id}`;
  } else {
    if (matchedTest && userTests.includes(matchedTest._id)) {
      setShowSnackbar(true);
    } else {
      console.log('Немає тестів з таким ключом');
    }
    // Вывод сообщения об отсутствии теста с таким ключом

  }
};

return (
  <>
    <div className="search_wrapper">
      <span>Пошук тестів по тегу</span>
      <div style={{ backgroundColor: '#fff' }} className="input_wrapper">
        <input
          type="text"
          placeholder="Введіть privateKey:"
          value={privateKey}
          onChange={event => setPrivateKey(event.target.value)}
        />
        <button onClick={handleButtonClick}><FontAwesomeIcon style={{ color: '#000' }} icon={faMagnifyingGlass} /></button>
      </div>
    </div>
    <Snackbar style={{marginLeft: '40%'}} open={showSnackbar} autoHideDuration={3000} onClose={handleSnackbarClose}>
      <MuiAlert  severity="warning" onClose={handleSnackbarClose}>
        You already passed this test
      </MuiAlert>
    </Snackbar>
  </>
);
}

export default SearchTest;

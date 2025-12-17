import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './search-test.scss';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { decodeToken } from 'react-jwt';
import Cookies from 'js-cookie';
import { fetchTests } from '../../../../store/slices/testsSlice';
import { getUserById } from '../../../../store/slices/authSlice';
import { useState } from 'react';

function SearchTest() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [privateKey, setPrivateKey] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);
  
  const { tests } = useSelector(state => state.tests);
  const { user } = useSelector(state => state.auth);
  const id = decodeToken(Cookies.get('token'))?._id;

  useEffect(() => {
    dispatch(fetchTests());
    if (id) {
      dispatch(getUserById(id));
    }
  }, [dispatch, id]);

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  };

  const handleButtonClick = () => {
    const matchedTest = tests.find(test => test.privateKey === privateKey);
    const passedTestsIds = user?.passed_tests?.map(test => test.test?._id) || [];

    if (matchedTest && !passedTestsIds.includes(matchedTest?._id)) {
      navigate(`/test/${matchedTest?._id}`);
    } else {
      if (matchedTest && passedTestsIds.includes(matchedTest?._id)) {
        setShowSnackbar(true);
      } else {
        console.log('Немає тестів з таким ключом');
      }
    }
  };

return (
  <>
    <div className="search_wrapper">
      <span>Знайди свій тест</span>
      <p className="search_subtitle">Введіть приватний ключ для доступу до закритого тесту</p>
      <div className="input_wrapper">
        <input
          type="text"
          placeholder="Введіть приватний ключ..."
          value={privateKey}
          onChange={event => setPrivateKey(event.target.value)}
        />
        <button onClick={handleButtonClick}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <span style={{marginLeft: '8px'}}>Знайти</span>
        </button>
      </div>
    </div>
    <Snackbar 
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={showSnackbar} 
      autoHideDuration={3000} 
      onClose={handleSnackbarClose}
    >
      <MuiAlert 
        elevation={6}
        variant="filled"
        severity="warning" 
        onClose={handleSnackbarClose}
        sx={{ borderRadius: 2 }}
      >
        Ви вже проходили цей тест
      </MuiAlert>
    </Snackbar>
  </>
);
}

export default SearchTest;

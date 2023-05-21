import { Link } from 'react-router-dom';
import PublicTestItem from '../public-test-item/public-test-item';
import './public-test.sass';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { decodeToken } from 'react-jwt';
import Cookies from 'js-cookie';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function PublicTest() {
  const id = decodeToken(Cookies.get('token'))._id;
  const [testItems, setTestItems] = useState([]);
  const [user, setUser] = useState([]);
  const [userTests, setUserTests] = useState([]);
  const [showSnackbar, setShowSnackbar] = useState(false);

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
        setUser(response.data);
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

  const handleLinkClick = (testId) => {
    if (userTests.includes(testId)) {
      setShowSnackbar(true);
    }
  };

  return (
    <div className="public_test_wrapper">
      <div className="ul_title main_test_title">Публічні тести</div>
      <ul className="public_test">
        {testItems.filter(item => item.privateKey.length === 0).map((testItem) => {
          return (
            <Link
              key={testItem.id}
              style={{ all: 'unset', width: '23%' }}
              to={
                userTests.includes(testItem._id) ? '/' : `/test/${testItem._id}`
              }
              className='public_test_item_link'
              onClick={() => handleLinkClick(testItem._id)}
            >
              <PublicTestItem
                src={testItem.img}
                alt={`${testItem.title} photo`}
                title={testItem.title}
                questions={testItem.questions.length}
              />
            </Link>
          );
        })}
      </ul>
      <Snackbar open={showSnackbar} autoHideDuration={3000} onClose={handleSnackbarClose}>
        <MuiAlert severity="warning" onClose={handleSnackbarClose}>
          You already passed this test
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

export default PublicTest;

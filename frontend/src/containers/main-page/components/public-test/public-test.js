import { Link } from 'react-router-dom';
import PublicTestItem from '../public-test-item/public-test-item';
import './public-test.scss';
import { useEffect, useState } from 'react';
import { decodeToken } from 'react-jwt';
import Cookies from 'js-cookie';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { testService, userService } from '../../../../utils/services';

function PublicTest() {
  const id = decodeToken(Cookies.get('token'))?._id;
  const [testItems, setTestItems] = useState([]);
  const [userTests, setUserTests] = useState([]);
  const [showSnackbar, setShowSnackbar] = useState(false);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await testService.getAll();
        setTestItems(response.tests || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTests();
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await userService.getById(id);
        const passedTestsIds = response.user.passed_tests.map(test => test.test._id);
        setUserTests(passedTestsIds);
      } catch (error) {
        console.log(error);
      }
    };
    
    if (id) {
      fetchUser();
    }
  }, [id]);

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
      <div className="public_test_header">
        <h2 className="public_test_title">Публічні тести</h2>
        <p className="public_test_subtitle">Оберіть тест і перевірте свої знання</p>
      </div>
      <ul className="public_test">
        {testItems.filter(item => !item.privateKey || item.privateKey.length === 0).map((testItem) => {
          const isPassed = userTests.includes(testItem._id);
          return (
            <Link
              key={testItem._id}
              to={isPassed ? '#' : `/test/${testItem._id}`}
              className={`public_test_item_link ${isPassed ? 'disabled' : ''}`}
              onClick={(e) => {
                if (isPassed) {
                  e.preventDefault();
                  handleLinkClick(testItem._id);
                }
              }}
            >
              <PublicTestItem
                src={testItem.img}
                alt={`${testItem.title} photo`}
                title={testItem.title}
                questions={testItem.questions.length}
                isPassed={isPassed}
              />
            </Link>
          );
        })}
      </ul>
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
    </div>
  );
}

export default PublicTest;

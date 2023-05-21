import { useEffect, useState } from 'react';
import ResultBlock from '../../../../components/result-block/result-block';
import './host-test.sass';
import { decodeToken } from 'react-jwt';
import Cookies from 'js-cookie';
import axios from 'axios';
import { IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function HostTest() {
  const [testList, setTestList] = useState([]);
  const id = decodeToken(Cookies.get('token'))?._id;
  const [userInfo, setUserInfo] = useState(null);
  const [deleteTestId, setDeleteTestId] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/user/${id}`);
        setUserInfo(response.data);
        setTestList(response.data?.created_tests);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserInfo();
  }, [id]);

  const handleDeleteTest = async () => {
    if (deleteTestId) {
      try {
        await axios.delete(`http://localhost:3002/tests/${deleteTestId}`);
        // Обновить список тестов после удаления
        setTestList(prevTestList => prevTestList.filter(test => test._id !== deleteTestId));
        closeDialog();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const openDialog = (testId) => {
    setDeleteTestId(testId);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setDeleteTestId(null);
  };

  testList?.sort((a, b) => b.date - a.date); // Сортируем по дате в обратном порядке

  return (
    <div className="host_test_wrapper">
      <h3 className="ul_title">Ви створиили</h3>
      <ul className="host_test">
        <li className="host_test_item">
          <div className="host_test_number host_test_header"></div>
          <div className="host_test_name host_test_header">Назва тесту</div>
          <div className="host_test_stats host_test_header">К-сть запитань</div>
          <div className="host_test_people host_test_header">К-сть учасників</div>
        </li>
        {testList?.map((item, index) => (
          <li className="host_test_item" key={index}>
            <div className="host_test_number"><span>{index + 1}</span></div>
            <div className="host_test_name"><span>{item.title}</span></div>
            <div className="host_test_stats"><span>{item.questions.length}</span></div>
            <div className="host_test_people"><span>{item.participants}</span></div>
            <IconButton onClick={() => openDialog(item._id)}>
              <FontAwesomeIcon icon={faTrash} />
            </IconButton>
          </li>
        ))}
      </ul>

      <Dialog open={isDialogOpen} onClose={closeDialog}>
        <DialogTitle>Підтвердження видалення</DialogTitle>
        <DialogContent>Ви впевнені, що хочете видалити цей тест?</DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Відміна</Button>
          <Button onClick={handleDeleteTest} color="error">Видалити</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default HostTest;

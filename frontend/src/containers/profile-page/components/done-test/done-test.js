import { useEffect, useState } from 'react';
import ResultBlock from '../../../../components/result-block/result-block';
import './done-test.sass';
import axios from 'axios';
import Cookies from 'js-cookie';
import { decodeToken } from 'react-jwt';

function DoneTest() {
    const id = decodeToken(Cookies.get('token'))?._id;
    const [userInfo, setUserInfo] = useState(null);
    useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/user/${id}`);
        setUserInfo(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserInfo();
  }, [id]);
    const testList = userInfo?.passed_tests;
    console.log(testList)
        console.log(testList)
        testList?.sort((a, b) => b.date - a.date); // Сортируем по дате в обратном порядке

        return (
            <div className="done_test_wrapper">
                <h3 className='ul_title'>Ви проходили</h3>
                <ul className="done_test">
                <li className="done_test_item">
                    <div className="done_test_number done_test_header"></div>
                    <div className="done_test_name done_test_header">Назва тесту</div>
                    <div className="done_test_stats done_test_header">Результат</div>
                    <div className="done_test_people done_test_header">Результат у %</div>
                </li>
                    {testList?.map((item, index) => (
                        <li className="done_test_item" key={index}>
                            <div className="done_test_number">{index + 1}</div>
                            <div className="done_test_name">{item.test.title}</div>
                            <div className="done_test_stats">{item.result} з {item.test?.questions.length}</div>
                            <ResultBlock percentage={((item.result / item.test.questions.length) * 100)%1===0 ? ((item.result / item.test.questions.length) * 100) : ((item.result / item.test.questions.length) * 100).toFixed(2)} />
                        </li>
                    ))}
                </ul>
            </div>
        );
        }
        
        export default DoneTest;

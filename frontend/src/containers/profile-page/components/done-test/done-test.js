import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ResultBlock from '../../../../components/result-block/result-block';
import './done-test.scss';
import Cookies from 'js-cookie';
import { decodeToken } from 'react-jwt';
import { getUserById } from '../../../../store/slices/authSlice';

function DoneTest() {
    const dispatch = useDispatch();
    const id = decodeToken(Cookies.get('token'))?._id;
    const { user } = useSelector(state => state.auth);
    const [testList, setTestList] = useState(user?.passed_tests || []);
    
    useEffect(() => {
        if (id) {
            dispatch(getUserById(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        setTestList(user?.passed_tests || []);
    }, [user]);

    const hasTests = Array.isArray(testList) && testList.length > 0;

    return (
        <div className="done_test_wrapper">
            <h3 className='ul_title'>Ви проходили</h3>
            {!hasTests ? (
                <div className="done_test empty-state">
                    <p>Ви ще не проходили жодного тесту</p>
                </div>
            ) : (
                <ul className="done_test">
                    <li className="done_test_item">
                        <div className="done_test_number done_test_header">Nº</div>
                        <div className="done_test_name done_test_header">Назва тесту</div>
                        <div className="done_test_time done_test_header">Час</div>
                        <div className="done_test_stats done_test_header">Результат</div>
                        <div className="done_test_people done_test_header">Результат %</div>
                    </li>
                    {testList.map((item, index) => {
                        console.log(`Rendering item ${index}:`, item);
                        const result = Number(item.result);
                        const totalQuestions = item.test?.questions?.length || 1;
                        const percentage = ((result / totalQuestions) * 100);
                        const displayPercentage = percentage % 1 === 0 ? percentage : percentage.toFixed(2);
                        
                        return (
                            <li className="done_test_item" key={index}>
                                <div className="done_test_number">{index + 1}</div>
                                <div className="done_test_name">{item.test?.title || 'Без назви'}</div>
                                <div className="done_test_time">{item.time || '00:00:00'}</div>
                                <div className="done_test_stats">{result} з {totalQuestions}</div>
                                <ResultBlock percentage={displayPercentage} />
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
        
export default DoneTest;

import ResultBlock from '../../../../components/result-block/result-block';
import './done-test.sass';

function DoneTest() {
    const testList = [
        { name: 'JavaScript Complete Test', correct: 10, total: 20, date: new Date('2023-05-05') },
        { name: 'ReactJS Basic Test', correct: 15, total: 20, date: new Date('2023-05-02') },
        { name: 'CSS Advanced Test', correct: 2, total: 8, date: new Date('2023-04-30') },
        { name: 'HTML5 Fundamentals', correct: 18, total: 20, date: new Date('2023-04-28') },
        { name: 'Node.js Essentials', correct: 8, total: 10, date: new Date('2023-04-25') },
        { name: 'Python Basics', correct: 25, total: 30, date: new Date('2023-04-20') },
        { name: 'TypeScript Mastery', correct: 12, total: 15, date: new Date('2023-04-15') },
        { name: 'Angular Framework', correct: 17, total: 20, date: new Date('2023-04-10') },
        { name: 'Bootstrap 5 Fundamentals', correct: 9, total: 12, date: new Date('2023-04-05') },
        { name: 'Vue.js Essentials', correct: 22, total: 25, date: new Date('2023-04-01') },
        { name: 'PHP Basics', correct: 7, total: 10, date: new Date('2023-03-30') },
        { name: 'Ruby on Rails', correct: 13, total: 15, date: new Date('2023-03-25') },
        ];

        testList.sort((a, b) => b.date - a.date); // Сортируем по дате в обратном порядке

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
                    {testList.map((test, index) => (
                        <li className="done_test_item" key={index}>
                            <div className="done_test_number">{index + 1}</div>
                            <div className="done_test_name">{test.name}</div>
                            <div className="done_test_stats">{test.correct} з {test.total}</div>
                            <ResultBlock percentage={((test.correct / test.total) * 100)%1===0 ? ((test.correct / test.total) * 100) : ((test.correct / test.total) * 100).toFixed(2)} />
                        </li>
                    ))}
                </ul>
            </div>
        );
        }
        
        export default DoneTest;

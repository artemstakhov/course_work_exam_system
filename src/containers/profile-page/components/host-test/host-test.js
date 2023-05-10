import ResultBlock from '../../../../components/result-block/result-block';
import './host-test.sass';

function HostTest() {
  const testList = [
    { name: 'JavaScript Complete Test', total: 20, date: new Date('2023-05-05'), numOfPeople: 10 },
    { name: 'ReactJS Basic Test', total: 20, date: new Date('2023-05-02'), numOfPeople: 8 },
    { name: 'CSS Advanced Test', total: 8, date: new Date('2023-04-30'), numOfPeople: 5 },
    { name: 'HTML5 Fundamentals', total: 20, date: new Date('2023-04-28'), numOfPeople: 12 },
    { name: 'Node.js Essentials', total: 10, date: new Date('2023-04-25'), numOfPeople: 6 },
    { name: 'Python Basics', total: 30, date: new Date('2023-04-20'), numOfPeople: 18 },
    { name: 'TypeScript Mastery', total: 15, date: new Date('2023-04-15'), numOfPeople: 9 },
    { name: 'Angular Framework', total: 20, date: new Date('2023-04-10'), numOfPeople: 11 },
    { name: 'Bootstrap 5 Fundamentals', total: 12, date: new Date('2023-04-05'), numOfPeople: 7 },
    { name: 'Vue.js Essentials', total: 25, date: new Date('2023-04-01'), numOfPeople: 15 },
    { name: 'PHP Basics', total: 10, date: new Date('2023-03-30'), numOfPeople: 3 },
    { name: 'Ruby on Rails', total: 15, date: new Date('2023-03-25'), numOfPeople: 6 },
  ];

  testList.sort((a, b) => b.date - a.date); // Сортируем по дате в обратном порядке

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
        {testList.map((test, index) => (
          <li className="host_test_item" key={index}>
            <div className="host_test_number">{index + 1}</div>
            <div className="host_test_name">{test.name}</div>
            <div className="host_test_stats">{test.total}</div>
            <div className="host_test_people">{test.numOfPeople}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HostTest;

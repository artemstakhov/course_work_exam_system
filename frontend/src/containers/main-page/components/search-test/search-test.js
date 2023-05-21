import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './search-test.sass';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function SearchTest() {
  const [testItems, setTestItems] = useState([]);
  const [privateKey, setPrivateKey] = useState('');

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

  const handleButtonClick = () => {
    const matchedTest = testItems.find(test => test.privateKey === privateKey);

    if (matchedTest) {
      // Переход на страницу теста
      window.location.href = `/test/${matchedTest._id}`;
    } else {
      // Вывод сообщения об отсутствии теста с таким ключом
      console.log('Немає тестів з таким ключом');
    }
  };

  return (
    <div className="search_wrapper">
      <span>Пошук тестів по тегу</span>
      <div className="input_wrapper">
        <input
            type="text"
            placeholder="Введіть privateKey:"
            value={privateKey}
            onChange={event => setPrivateKey(event.target.value)}
        />
        <button onClick={handleButtonClick}><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
      </div>
    </div>
  );
}

export default SearchTest;

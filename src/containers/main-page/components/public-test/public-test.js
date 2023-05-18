import { Link } from 'react-router-dom';
import PublicTestItem from '../public-test-item/public-test-item';
import './public-test.sass';

const testItems = [
    {
      id: 1,
      src: 'https://picsum.photos/200',
      alt: 'Test 1',
      title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      questions: [
        {
          title: 'What is the capital of France?',
          options: ['Paris', 'Berlin', 'London', 'Madrid'],
          answers: [0],
        },
        {
          title: 'What is the highest mountain in the world?',
          options: ['Mount Everest', 'K2', 'Makalu', 'Cho Oyu'],
          answers: [0],
        },
        {
          title: 'What is the largest country by area?',
          options: ['Russia', 'Canada', 'China', 'USA'],
          answers: [0, 1],
        },
      ],
    },
    {
      id: 2,
      src: 'https://picsum.photos/201',
      alt: 'Test 2',
      title: 'Suspendisse scelerisque mauris in tincidunt pellentesque.',
      questions: [
        {
          title: 'What is the capital of France?',
          options: ['Paris', 'Berlin', 'London', 'Madrid'],
          answers: [0],
        },
        {
          title: 'What is the highest mountain in the world?',
          options: ['Mount Everest', 'K2', 'Makalu', 'Cho Oyu'],
          answers: [0],
        },
        {
          title: 'What is the largest country by area?',
          options: ['Russia', 'Canada', 'China', 'USA'],
          answers: [0, 1],
        },
      ],
    },
    {
      id: 3,
      src: 'https://picsum.photos/202',
      alt: 'Test 3',
      title: 'Curabitur et urna id elit congue aliquam.',
      questions: [
        {
          title: 'What is the capital of France?',
          options: ['Paris', 'Berlin', 'London', 'Madrid'],
          answers: [0],
        },
        {
          title: 'What is the highest mountain in the world?',
          options: ['Mount Everest', 'K2', 'Makalu', 'Cho Oyu'],
          answers: [0],
        },
        {
          title: 'What is the largest country by area?',
          options: ['Russia', 'Canada', 'China', 'USA'],
          answers: [0, 1],
        },
      ],
    },
    {
      id: 4,
      src: 'https://picsum.photos/203',
      alt: 'Test 4',
      title: 'Pellentesque auctor turpis non nunc eleifend aliquet.',
      questions: [
        {
          title: 'What is the capital of France?',
          options: ['Paris', 'Berlin', 'London', 'Madrid'],
          answers: [0],
        },
        {
          title: 'What is the highest mountain in the world?',
          options: ['Mount Everest', 'K2', 'Makalu', 'Cho Oyu'],
          answers: [0],
        },
        {
          title: 'What is the largest country by area?',
          options: ['Russia', 'Canada', 'China', 'USA'],
          answers: [0, 1],
        },
      ],
    },
  ];

function PublicTest() {
  return (
    <div className="public_test_wrapper">
      <div className="ul_title main_test_title">Публічні тести</div>
      <ul className="public_test">
      {testItems.map((testItem) => {
          const { questions, ...otherProps } = testItem; // извлекаем свойство questions из объекта testItem в отдельную переменную
          return (
            <>
            <Link style={{all: 'unset', width: '23%'}} to={'/test'} className='public_test_item_link'>
              <PublicTestItem
                key={testItem.id}
                {...otherProps}
                questions={questions.length} // добавляем новое свойство questionsLength со значением равным длине массива questions
              />
            </Link>
            </>

          );
        })}
      </ul>
    </div>
  );
}

export default PublicTest;

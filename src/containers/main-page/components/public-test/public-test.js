import PublicTestItem from '../public-test-item/public-test-item';
import './public-test.sass';

const testItems = [
    {
      id: 1,
      src: 'https://picsum.photos/200',
      alt: 'Test 1',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      questions: '15',
    },
    {
      id: 2,
      src: 'https://picsum.photos/201',
      alt: 'Test 2',
      text: 'Suspendisse scelerisque mauris in tincidunt pellentesque.',
      questions: '20',
    },
    {
      id: 3,
      src: 'https://picsum.photos/202',
      alt: 'Test 3',
      text: 'Curabitur et urna id elit congue aliquam.',
      questions: '10',
    },
    {
      id: 4,
      src: 'https://picsum.photos/203',
      alt: 'Test 4',
      text: 'Pellentesque auctor turpis non nunc eleifend aliquet.',
      questions: '25',
    },
    {
        id: 5,
        src: 'https://picsum.photos/204',
        alt: 'Test 5',
        text: 'Phasellus vel consectetur augue, nec bibendum odio.',
        questions: '18',
      },
      {
        id: 6,
        src: 'https://picsum.photos/205',
        alt: 'Test 6',
        text: 'Etiam posuere libero ac mi finibus, ac commodo justo pellentesque.',
        questions: '12',
      },
      {
        id: 7,
        src: 'https://picsum.photos/206',
        alt: 'Test 7',
        text: 'Vivamus sed ipsum venenatis, lacinia mauris ut, fringilla turpis.',
        questions: '22',
      },
      {
        id: 8,
        src: 'https://picsum.photos/207',
        alt: 'Test 8',
        text: 'Donec euismod sem vitae orci hendrerit dignissim.',
        questions: '17',
      },
      {
        id: 9,
        src: 'https://picsum.photos/208',
        alt: 'Test 9',
        text: 'Mauris semper orci a velit tristique commodo.',
        questions: '14',
      }
  ];

function PublicTest() {
  return (
    <div className="public_test_wrapper">
      <div className="ul_title main_test_title">Публічні тести</div>
      <ul className="public_test">
        {testItems.map((testItem) => (
          <PublicTestItem key={testItem.id} {...testItem} />
        ))}
      </ul>
    </div>
  );
}

export default PublicTest;

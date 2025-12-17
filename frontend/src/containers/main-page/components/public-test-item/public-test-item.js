import './public-test-item.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

function PublicTestItem(props) {
    const { src, alt, title, questions, isPassed } = props;
    return (
        <li className={`public_test_item ${isPassed ? 'passed' : ''}`}>
            {isPassed && (
                <div className="passed-badge">
                    <FontAwesomeIcon icon={faCheckCircle} />
                    <span>Пройдено</span>
                </div>
            )}
            <div className="image_wrapper">
                <img src={src} alt={alt} />
            </div>
            <div className="content">
                <div className="title_test">{title}</div>
                <div className="question_number">
                    {questions} {questions === 1 ? 'запитання' : 'запитань'}
                    {!isPassed && <FontAwesomeIcon icon={faAngleRight} />}
                </div>
            </div>
        </li>
    );
}

export default PublicTestItem;
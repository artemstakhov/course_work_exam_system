import './public-test-item.sass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

function PublicTestItem(props){
    const {src, alt, title, questions} = props;
    return(
        <li className="public_test_item">
            <img src={src} alt={alt} />
            <div className="title_test">{title}</div>
            <div className="question_number">Кількість запитань: {questions} <FontAwesomeIcon icon={faAngleRight} /></div>
        </li>
    );
}

export default PublicTestItem;
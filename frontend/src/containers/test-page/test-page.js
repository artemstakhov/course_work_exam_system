import Header from '../../components/header/header';
import TestMain from './components/test-main/test-main';
import './test-page.scss';

function TestPage() {
    return(
        <>
            <Header />
            <TestMain title='Geography Test'/>
        </>
    );
}

export default TestPage
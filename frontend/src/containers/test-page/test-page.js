import Header from '../../components/header/header';
import TestMain from './components/test-main.js/test-main';
import './test-page.sass';

function TestPage() {
    return(
        <>
            <Header />
            <TestMain title='Geography Test'/>
        </>
    );
}

export default TestPage
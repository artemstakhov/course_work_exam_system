import Header from '../../components/header/header';
import PublicTest from './components/public-test/public-test';
import SearchTest from './components/search-test/search-test';
import './main-page.sass';

function Mainpage() {
    return (
        <div className='Main'>
            <Header />
            <SearchTest />
            <PublicTest />
        </div>
    );
}

export default Mainpage;
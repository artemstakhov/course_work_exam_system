import { decodeToken } from 'react-jwt';
import Header from '../../components/header/header';
import PublicTest from './components/public-test/public-test';
import SearchTest from './components/search-test/search-test';
import './main-page.sass';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Mainpage() {
    const token = decodeToken(Cookies.get('token'));
    const navigate = useNavigate()
    useEffect(() => {
        if (!token) {
            navigate('/');
        }
    }, [token])

    return (
        <div className='Main'>
            <Header />
            <SearchTest />
            <PublicTest />
        </div>
    );
}

export default Mainpage;
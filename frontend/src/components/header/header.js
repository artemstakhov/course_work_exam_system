import './header.sass';
import logo from '../../resources/logo_bg.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@mui/material';
import { decodeToken } from 'react-jwt';
import Cookies from 'js-cookie';
import axios from 'axios';

function Header() {

    const teacher = decodeToken(Cookies.get('token'))?.teacher===true ? true : false; 
    const token = decodeToken(Cookies.get('token'));
    const location = useLocation();
    const createTestUrl = location.pathname === "/create";
    const clearCookie = async () => {
        try {
      
          await axios.post('http://localhost:3002/auth/logout', {}, {
            headers: {
              Authorization: `${token}`,
            }
            });
          console.log('Logout successful');
          Cookies.remove('token');
          
        } catch (error) {
          console.log(error);
        }
      };

    return (
        <header>
            <Link style={{all: 'unset', cursor: 'pointer'}} to='/'>
                <div className="logo_img_wrapper">
                    <img src={logo} alt='logo_uzh_test' />
                </div>
            </Link>
            <ul className="header_menu">
                <li className="header_menu_item">
                    <a href="#">Тести</a>
                    
                </li>
                <li className="header_menu_item">
                    <a href="#">Про нас</a>
                </li>
                <li className="header_menu_item">
                    <a href="#">Для учня</a>
                </li>
                <li className="header_menu_item">
                    <a href="#">Для викладача</a>
                </li>
                    
            </ul>

            <div className="header_profile_wrapper">
                {teacher && !createTestUrl && <Link to='/create' style={{all: 'unset'}}>
                    <Button>
                        Створити тест
                    </Button>
                </Link>}
                <Link to='/profile' className='unset'>
                    <div className="header_profile">
                        <FontAwesomeIcon icon={faUser} style={{color: "#edf0f5"}} />
                    </div>
                </Link>
                {token && <Link to='/login' style={{all: 'unset'}}>
                    <Button onClick={() => clearCookie()}>
                        Logout
                    </Button>
                </Link>}
                {!token && <Link to='/login' style={{all: 'unset'}}>
                    <Button >
                        Login
                    </Button>
                </Link>}
                
            </div>

        </header>
    );
}

export default Header;
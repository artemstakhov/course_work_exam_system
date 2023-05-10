import './header.sass';
import logo from '../../resources/logo_bg.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header>
            <div className="logo_img_wrapper">
                <img src={logo} alt='logo_uzh_test' />
            </div>
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
                <Link to='/profile' className='unset'>
                    <div className="header_profile">
                        <FontAwesomeIcon icon={faUser} style={{color: "#edf0f5"}} />
                    </div>
                </Link>
            </div>

        </header>
    );
}

export default Header;
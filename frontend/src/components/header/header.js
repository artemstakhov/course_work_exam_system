import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './header.scss';
import logo from '../../resources/logo_bg.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faRightFromBracket, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Avatar, Menu, MenuItem, Divider } from '@mui/material';
import { logout } from '../../store/slices/authSlice';
import AuthModal from '../auth-modal/auth-modal';
import { useAuth } from '../../hooks/useAuth';

function Header() {
    const dispatch = useDispatch();
    const { user, isAuthenticated } = useAuth();
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const menuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleProfileMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        try {
            await dispatch(logout()).unwrap();
            handleProfileMenuClose();
            navigate('/');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const handleAuthSuccess = () => {
        setAuthModalOpen(false);
        
        // Если мы на странице теста, перезагрузим страницу
        if (location.pathname.startsWith('/test/')) {
            window.location.reload();
        }
    };

    return (
        <>
            <header className="modern-header">
                <div className="modern-header__container">
                    <Link to='/' className="modern-header__logo">
                        <img src={logo} alt='UZH Test' />
                        <span className="modern-header__logo-text">UZH Test</span>
                    </Link>

                    <nav className="modern-header__nav">
                        <Link to="/" className="modern-header__nav-link">
                            Тести
                        </Link>
                        <a href="/#about" className="modern-header__nav-link">
                            Про нас
                        </a>
                        <a href="#students" className="modern-header__nav-link">
                            Для учня
                        </a>
                        <a href="/#teachers" className="modern-header__nav-link">
                            Для викладача
                        </a>
                    </nav>

                    <div className="modern-header__actions">
                        {user?.teacher && location.pathname !== '/create' && (
                            <Link to='/create' className="modern-header__create-btn">
                                <Button 
                                    variant="contained" 
                                    startIcon={<FontAwesomeIcon icon={faPlus} />}
                                    className="create-test-btn"
                                >
                                    Створити тест
                                </Button>
                            </Link>
                        )}

                        {isAuthenticated ? (
                            <>
                                <Avatar 
                                    className="modern-header__avatar"
                                    onClick={handleProfileMenuOpen}
                                    sx={{ 
                                        cursor: 'pointer',
                                        background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                                    }}
                                >
                                    {user.name?.[0]?.toUpperCase() || <FontAwesomeIcon icon={faUser} />}
                                </Avatar>

                                <Menu
                                    anchorEl={anchorEl}
                                    open={menuOpen}
                                    onClose={handleProfileMenuClose}
                                    className="modern-header__menu"
                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                    PaperProps={{
                                        elevation: 3,
                                        sx: {
                                            mt: 1.5,
                                            borderRadius: 2,
                                            minWidth: 200,
                                        }
                                    }}
                                >
                                    <MenuItem onClick={() => { navigate('/profile'); handleProfileMenuClose(); }}>
                                        <FontAwesomeIcon icon={faUser} style={{ marginRight: 12 }} />
                                        Профіль
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem onClick={handleLogout}>
                                        <FontAwesomeIcon icon={faRightFromBracket} style={{ marginRight: 12 }} />
                                        Вийти
                                    </MenuItem>
                                </Menu>
                            </>
                        ) : (
                            <Button 
                                variant="contained" 
                                onClick={() => setAuthModalOpen(true)}
                                className="login-btn"
                            >
                                Увійти
                            </Button>
                        )}
                    </div>
                </div>
            </header>

            <AuthModal 
                open={authModalOpen}
                onClose={() => setAuthModalOpen(false)}
                onSuccess={handleAuthSuccess}
            />
        </>
    );
}

export default Header;
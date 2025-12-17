import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { decodeToken } from 'react-jwt';
import Cookies from 'js-cookie';
import Header from '../../components/header/header';
import DoneTest from './components/done-test/done-test';
import HostTest from './components/host-test/host-test';
import ProfileInfo from './components/profile-info/profile-info';
import AuthModal from '../../components/auth-modal/auth-modal';
import './profile-page.scss';
import { userService } from '../../utils/services';

function ProfilePage() {
  const navigate = useNavigate();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = Cookies.get('token');
  const decodedToken = token ? decodeToken(token) : null;
  const teacher = decodedToken?.teacher === true;
  const id = decodedToken?._id;

  useEffect(() => {
    if (!token || !id) {
      setAuthModalOpen(true);
      setLoading(false);
      return;
    }

    const fetchUserInfo = async () => {
      try {
        const response = await userService.getById(id);
        setUserInfo(response.user);
      } catch (error) {
        console.error('Error fetching user:', error);
        setAuthModalOpen(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [id, token]);

  const handleAuthSuccess = () => {
    setAuthModalOpen(false);
    window.location.reload();
  };

  const handleAuthClose = () => {
    setAuthModalOpen(false);
    navigate('/');
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="profile-page__loading">Завантаження...</div>
      </>
    );
  }

  if (!token || !userInfo) {
    return (
      <>
        <Header />
        <AuthModal 
          open={authModalOpen}
          onClose={handleAuthClose}
          onSuccess={handleAuthSuccess}
        />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="profile-page">
        {userInfo && <ProfileInfo name={userInfo.name} email={userInfo.email} />}
        <DoneTest id={id}/>
        {teacher && <HostTest />}
      </div>
    </>
  );
}

export default ProfilePage;

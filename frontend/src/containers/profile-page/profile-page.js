import { decodeToken } from 'react-jwt';
import Header from '../../components/header/header';
import DoneTest from './components/done-test/done-test';
import HostTest from './components/host-test/host-test';
import ProfileInfo from './components/profile-info/profile-info';
import './profile-page.sass';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
import axios from 'axios';

function ProfilePage() {
  const teacher = decodeToken(Cookies.get('token'))?.teacher === true ? true : false;
  const id = decodeToken(Cookies.get('token'))?._id;
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/user/${id}`);
        setUserInfo(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserInfo();
  }, [id]);

  return (
    <>
      <Header />
      {userInfo && <ProfileInfo name={userInfo.name} email={userInfo.email} />}
      <DoneTest id={id}/>
      {teacher && <HostTest />}
    </>
  );
}

export default ProfilePage;

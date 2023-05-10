import Header from '../../components/header/header';
import DoneTest from './components/done-test/done-test';
import HostTest from './components/host-test/host-test';
import ProfileInfo from './components/profile-info/profile-info';
import './profile-page.sass';

function ProfilePage(){
    const teacher = true;
    return(
        <>
            <Header/>
            <ProfileInfo name='Artem Stakhov' email='stakhov.artem@student.uzhnu.edu.ua' />
            <DoneTest />
            {teacher && <HostTest />}
        </>
    );
}

export default ProfilePage;
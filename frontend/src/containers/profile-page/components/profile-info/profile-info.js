import './profile-info.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function ProfileInfo(props){
    const {name, email} = props;
    return(
        <div className="profile_info_wrapper">
            <div className="profile_info">
                <div className="profile_icon">
                    <FontAwesomeIcon icon={faUser} />
                </div>
                <div className="profile_details">
                    <h2 className='profile_name'>{name}</h2>
                    <div className='profile_email'>{email}</div>
                </div>
            </div>
        </div>
    );
}

export default ProfileInfo;
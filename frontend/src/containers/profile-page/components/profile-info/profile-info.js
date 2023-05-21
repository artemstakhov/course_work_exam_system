import './profile-info.sass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function ProfileInfo(props){
    const {name, email} = props;
    return(
        <div className="profile_info_wrapper">
            
            <div className="profile_info">
                <h2 className='profile_name'>{name}</h2>
                <h2 className='profile_email'>{email}</h2>
                <div className="profile_icon">
                    <FontAwesomeIcon icon={faUser} style={{color: "#edf0f5",}} />
                </div>
            </div>
        </div>
    );
}

export default ProfileInfo;
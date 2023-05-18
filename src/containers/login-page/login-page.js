import './login-page.sass';
import { useState } from 'react';

function LoginPage() {
  const [clazz, setClazz] = useState('container');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');

  const handleClick1 = () => {
    setClazz('container right-panel-active');
  };

  const handleClick2 = () => {
    setClazz('container');
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmitRegister = (event) => {
    if (role === 'student' && email.indexOf("@student") === -1) {
        alert('Ви не студент');
    }
    if (role === 'teacher' && email.indexOf("@teacher") === -1) {
        alert('Ви не викладач');
      } 
    };
  
  return (
    <div className="login_wrapper">
      <div className={clazz} id="container">
        <div className="form-container sign-up-container">
          <form className="form" onSubmit={handleSubmitRegister}>
            <h1>Створити аккаунт</h1>
            <input type="text" placeholder="Ім'я" />
            <input type="email" placeholder="Електронна пошта" value={email} onChange={handleEmailChange} minLength={1}/>
            <input type="password" placeholder="Пароль" />
            <div className="radio_group">
              <input
                type="radio"
                id="role-student"
                name="role"
                value="student"
                checked={role === 'student'}
                onChange={handleRoleChange}
              />
              <label htmlFor="role-student">Студент</label>
              <input
                type="radio"
                id="role-teacher"
                name="role"
                value="teacher"
                checked={role === 'teacher'}
                onChange={handleRoleChange}
              />
              <label htmlFor="role-teacher">Викладач</label>
            </div>
            <button>Зареєструватися</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form className="form" action="#">
            <h1>Увійти</h1>
            <input type="email" placeholder="Електронна пошта" />
            <input type="password" placeholder="Пароль" />
            <button>Увійти</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <button className="ghost" id="signIn" onClick={handleClick2}>
                Увійти
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <button className="ghost" id="signUp" onClick={handleClick1}>
                Зареєструватися
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
